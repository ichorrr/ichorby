const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

require('dotenv').config();
const db = require('./db');
const mongoose = require('mongoose');
const { GraphQLDateTime } = require('graphql-iso-date');
const models = require('./models');
const gravatar = require('./util/gravatar');
const typeDefs = gql`
  scalar DateTime
  type User {
    _id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    _id: ID!
    title: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    category: Cat!
    body: String!
    author: User!
    comments: [Comment!]!
  }

  type Cat {
    _id: ID!
    catname: String!
    posts: [Post!]!
  }

  type Comment {
    _id: ID!
    text: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    post: Post!
    author: User!
  }

  type postFeed {
    posts: [Post!]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Mutation {
    signIn(name: String!, email: String!, password: String!): String!
    signUp(name: String!, email: String!, password: String!): String!

    createCat(catname: String!): Cat!
    deleteCat(_id: String!): Boolean!
    createPost(title: String!, category: String!, body: String!): Post!
    deletePost(_id: String!): Boolean!
    updatePost(_id: String!, title: String!, body: String!): Post!
    createComment(text: String!, post: String!): Comment!
  }

  type Query {
    getUsers: [User!]!
    getCats: [Cat!]!
    getPosts: [Post!]!
    getComments: [Comment!]!
    getPost(_id: ID!): Post!
    getCat(_id: ID!): Cat!
    postFeed(cursor: String): postFeed
  }
`;
const resolvers = {
  DateTime: GraphQLDateTime,

  Query: {
    async getUsers() {
      const users = await models.User.find({});
      return users;
    },

    async getCats() {
      const cats = await models.Cat.find({});
      return cats;
    },

    async getPosts() {
      return await models.Post.find().limit(100);
    },

    async getComments() {
      const comments = await models.Comment.find({});
      return comments;
    },
    async getPost(parent, args, { models }) {
      const post = await models.Post.findById(args._id);
      return post;
    },
    async getCat(parent, args, { models }) {
      const cat = await models.Cat.findById(args._id);
      return cat;
    },
    postFeed: async (parent, { cursor }, { models }) => {
      const limit = 2;
      let hasNextPage = false;
      let cursorQuery = {};

      if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
      }

      let posts = await models.Post.find(cursorQuery)
        .sort({ _id: -1 })
        .limit(limit + 1);

      if (posts.length > limit) {
        hasNextPage = true;
        posts = posts.slice(0, -1);
      }

      const newCursor = posts[posts.length - 1]._id;

      return {
        posts,
        cursor: newCursor,
        hasNextPage
      };
    }
  },

  Mutation: {
    signUp: async (parent, { name, email, password }, { models }) => {
      // normalize email address
      email = email.trim().toLowerCase();
      // hash the password
      const hashed = await bcrypt.hash(password, 10);
      // create the gravatar url
      const avatar = gravatar(email);
      try {
        const username = await models.User.create({
          name,
          email,
          avatar,
          password: hashed
        });

        // create and return the json web token
        return jwt.sign({ id: username._id }, process.env.JWT_SECRET);
      } catch (err) {
        // if there's a problem creating the account, throw an error
        throw new Error('Error creating account');
      }
    },

    signIn: async (parent, { name, email, password }, { models }) => {
      if (email) {
        // normalize email address
        email = email.trim().toLowerCase();
      }
      const username = await models.User.findOne({
        $or: [{ email }, { name }]
      });
      // if no user is found, throw an authentication error
      if (!username) {
        throw new AuthenticationError('Error signing in');
      }
      // if the passwords don't match, throw an authentication error
      const valid = await bcrypt.compare(password, username.password);
      if (!valid) {
        throw new AuthenticationError('Error signing in');
      }
      // create and return the json web token
      return jwt.sign({ id: username._id }, process.env.JWT_SECRET);
    },
    async createCat(_, { catname }) {
      const newCat = new models.Cat({ catname });
      const createdCat = await newCat.save();
      return createdCat;
    },
    async deleteCat(_, { _id: id }, { models }) {
      try {
        await models.Cat.findOneAndRemove({ _id: id });
        return true;
      } catch (err) {
        return false;
      }
    },

    deletePost: async (parent, { _id }, { models, user }) => {
      // if not a user, throw an Authentication Error
      if (!user) {
        throw new AuthenticationError('You must be signed in to delete a note');
      }

      // find the note
      const note = await models.Post.findById(_id);
      // if the note owner and current user don't match, throw a forbidden error
      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError(
          "You don't have permissions to delete the note"
        );
      }

      try {
        // if everything checks out, remove the note
        await note.remove();
        return true;
      } catch (err) {
        // if there's an error along the way, return false
        return false;
      }
    },

    updatePost: async (parent, { title, body, _id }, { models, user }) => {
      // if not a user, throw an Authentication Error
      if (!user) {
        throw new AuthenticationError('You must be signed in to update a note');
      }
      // find the note
      const note = await models.Post.findById(_id);
      // if the note owner and current user don't match, throw a forbidden error
      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError(
          "You don't have permissions to update the note"
        );
      }
      // Update the note in the db and return the updated note
      return await models.Post.findOneAndUpdate(
        {
          _id: _id
        },
        {
          $set: {
            title,
            body
          }
        },
        {
          new: true
        }
      );
    },

    createPost: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('You must be signed in to create a note');
      }

      const newPost = await models.Post({
        title: args.title,
        body: args.body,
        category: args.category,
        author: mongoose.Types.ObjectId(user.id)
      });

      const createPost = await newPost.save();

      const cat = await models.Cat.findById(
        mongoose.Types.ObjectId(args.category)
      );
      const author = await models.User.findById(
        mongoose.Types.ObjectId(user.id)
      );

      author.posts.push(newPost.id);
      cat.posts.push(newPost.id);

      await author.save();
      await cat.save();

      return createPost;
    },

    createComment: async (_, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be signed in to create a comments'
        );
      }

      const newComment = new models.Comment({
        text: args.text,
        post: args.post,
        author: mongoose.Types.ObjectId(user.id)
      });

      const createComment = await newComment.save();

      const post = await models.Post.findById(
        mongoose.Types.ObjectId(args.post)
      );
      const author = await models.User.findById(
        mongoose.Types.ObjectId(user.id)
      );

      author.comments.push(newComment.id);
      post.comments.push(newComment.id);

      await author.save();
      await post.save();

      return createComment;
    }
  },

  User: {
    async posts(parent, args, { models }) {
      return await models.Post.find({ author: parent._id });
    },

    async comments(parent) {
      return await models.Comment.find({ user: parent._id });
    }
  },

  Cat: {
    async posts(parent) {
      return await models.Post.find({ category: parent._id });
    }
  },

  Post: {
    async author(post, args, { models }) {
      return await models.User.findById(post.author);
    },
    async category(parent) {
      return await models.Cat.findById(parent.category);
    },

    async comments(parent) {
      return await models.Comment.find({ post: parent._id });
    }
  },

  Comment: {
    async post(parent) {
      return await models.Post.findById(parent.post);
    },

    async author(parent) {
      return await models.User.findById(parent.user);
    }
  }
};

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
db.connect(DB_HOST);

// Security middleware
app.use(helmet());
// CORS middleware
app.use(cors());

// get the user info from a JWT
const getUser = token => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};

// Apollo Server setup
// updated to include `validationRules`
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);

    console.log(user);

    return { models, user };
  }
});
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
  console.log(`server running at http://localhost:${port}${server.graphqlPath}`)
);
