import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { GET_NOTES, GET_MY_POST, GET_POST } from '../gql/query';

const PostPage = props => {
  let  id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_POST, { variables: { id },
   refetchQueries: [{query: GET_NOTES, GET_MY_POST, GET_POST }]});
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return <Post post={data.getPost} />
};

export default PostPage;
