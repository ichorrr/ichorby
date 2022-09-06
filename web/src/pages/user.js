import React from 'react';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import { GET_USER } from '../gql/query';

const GetUser = props => {
  let  id = props.match.params.id;

  const { loading, error, data } = useQuery(GET_USER, {variables: {id} });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  let uname = data.getUser.name;

  return (
  <div>
  <ul>
  {data.getUser.name} (all posts: {data.getUser.posts.length})
    {data.getUser.posts.map(post => (
      <Link key={post._id} to={`/users/${uname}/post/${post._id}`}><li>{post.title}</li></Link>
    ))}
    </ul>
  </div>
);
};

export default GetUser;
