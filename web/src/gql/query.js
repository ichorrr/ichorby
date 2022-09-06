import { gql } from '@apollo/client';

const GET_CATS = gql`
  query getCats {
    getCats {
      _id
      catname
      posts{
        title
      }
    }
  }
`;

const GET_CAT = gql`
  query getCat($id: ID!) {
    getCat(_id: $id) {
      _id
      catname
      posts{
        _id
        title
        createdAt
      }
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(_id: $id) {
      _id
      name
      posts{
        _id
        title
        createdAt
        body
      }
    }
  }
`;

const GET_NOTES = gql`
  query postFeed($cursor: String) {
    postFeed(cursor: $cursor) {
      cursor
      hasNextPage
      posts {
        _id
        title
        createdAt
        category{
          _id
          catname
        }
        body
        author {
          _id
          name
        }
      }
    }
  }
`;

const GET_MY_POST = gql`
  query me {
    me {
      _id
      name
      email
      posts{
        _id
        title
      }
    }
  }
`;

const GET_ME = gql`
  query me {
    me {
      _id
    }
  }
`;

const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(_id: $id) {
      _id
      title
      createdAt
      updatedAt
      category{
        _id
        catname
      }
      body
      author {
        _id
        name
        email
      }
    }
  }
`;

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export {
  GET_CATS,
  GET_CAT,
  GET_NOTES,
  GET_USER,
  GET_POST,
  GET_MY_POST,
  GET_ME,
  IS_LOGGED_IN
};
