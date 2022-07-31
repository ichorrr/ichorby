import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { Link } from 'react-router-dom';

const PostBorder = styled.div`
  padding: 2em;
  margin-top: 3em;
  font-family: Arial;
  line-height: 1.8em;
`;

const PostFeed = ({ posts }) => {
  return (
    <PostBorder>
      {' '}
      {posts.map(post => (
        <div key={post._id}>
          <Post post={post} />
          <Link to={`posts/${post._id}`}>Permalink</Link>
        </div>
      ))}
    </PostBorder>
  );
};

export default PostFeed;
