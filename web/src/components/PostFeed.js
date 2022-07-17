import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { Link } from 'react-router-dom';

const PostFeed = ({ posts }) => {
  return (
    <div className="App-link">
      {' '}
      {posts.map(post => (
        <div key={post._id}>
          <Post post={post} />
          <Link to={`posts/${post._id}`}>Permalink</Link>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
