import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { GET_MY_POST } from '../gql/query';

const PostParagraph = styled.div`
    background-color: #dae6f7;
    width: 100%;
    display: block;
    margin-bottom: 1em;
`;

const PostBlock = styled.div`
  padding-bottom: 4em;
  display: block;
`;

const MyPosts = props => {

  const { loading, error, data, fetchMore } = useQuery( GET_MY_POST,
  {refetchQueries: [{query: GET_MY_POST }]} );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

let uname = data.me.name;

  return (
    <div>
    {uname} (all posts: {data.me.posts.length})
    <ul>
      {data.me.posts.map(post => (

        <Link key={post._id} to={`posts/${post._id}`}><li>{post.title}</li></Link>

      ))}
    </ul>
    </div>
  );
};

export default MyPosts;
