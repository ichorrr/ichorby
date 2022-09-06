import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import PostUser from './PostUser';

import { IS_LOGGED_IN } from '../gql/query';
import styled from 'styled-components';

const H4R = styled.div`
    background-color: #fff;
    display: inline;

    padding: 0.5em  0.8em;
    margin: 0.5em 1em 0.5em 0;
    font: normal 0.9em Arial, sans-serif;

    :hover {
      color: #fff;
      cursor: pointer;
      background: #bb0106;
    }

`;

const PRiv4 = styled.div`
    font-family: Arial, sans-serif;
    font-size: 1.2em;
`;

const linkStyle = {
  textDecoration: "none",
  display: "inline",
  padding: "0",
};

const Post = ({ post }) => {

  let  idcat = post.category._id;
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

  return (

    <article>
      <img
        src={post.author.avatar}
        alt={`${post.author.name} avatar`}
        heiaght="50px"
      />{' '}
      <h3>{post.title}</h3>
      <Link style={linkStyle} to={`/cats/${idcat}`}><H4R>{post.category.catname}</H4R></Link>
      <H4R>{post.createdAt}</H4R> <H4R>{`author ${post.author.name}`}</H4R>
      <PRiv4><p>{post.body}</p></PRiv4>
      {data.isLoggedIn ? (
        <div>
      <PostUser post={post} />
      </div>
    ) : (
        <div></div>
      )}
    </article>
  );
};

export default Post;
