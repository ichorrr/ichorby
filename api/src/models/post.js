const mongoose = require('mongoose');

const Post = mongoose.model(
  'Post',

  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: 'Cat'
      },
      viewsCount: {
        type: Number,
        default: 0
      },
      body: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },
      comments: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
      timestamps: true
    }
  )
);

module.exports = Post;
