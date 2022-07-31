import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Post = ({ post }) => {
  return (
    <article>
      <img
        src={post.author.avatar}
        alt={`${post.author.name} avatar`}
        heiaght="50px"
      />{' '}
      <h3>{post.title}</h3>
      {post.createdAt} {post.author.name}
      {post.body}
    </article>
  );
};

export default Post;
