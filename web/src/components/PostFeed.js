import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { Link } from 'react-router-dom';

const PostBorder = styled.div`
  padding: 3em 3em;
  display: block;
`;

const PostBlock = styled.div`
  padding-bottom: 4em;
  display: block;
`;

const PostFeed = ({ posts }) => {
  return (
    <PostBorder>
      {' '}
      {posts.map(post => (
        <PostBlock key={post._id}>
          <Post post={post} />
          <Link to={`posts/${post._id}`}>Permalink</Link>
        </PostBlock>
      ))}
    </PostBorder>
  );
};

export default PostFeed;
