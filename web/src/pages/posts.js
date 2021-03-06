import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';


const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(_id: $id) {
      _id
      title
      createdAt
      updatedAt
      body
      author {
        name
        email
      }
    }
  }
`;

const PostPage = props => {
  let  id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return <Post post={data.getPost} />
};

export default PostPage;
