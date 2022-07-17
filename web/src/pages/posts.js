import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Post from '../components/Post';

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
      }
    }
  }
`;

const PostPage = props => {
  const id = props.match.params._id;
  const { data, loading, error } = useQuery(GET_POST, { variables: { id } });
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return <Post post={data.post} />;
};

export default PostPage;
