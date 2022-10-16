import React, {useEffect} from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';

import PostForm from '../components/PostForm';

import { GET_MY_POST, GET_NOTES } from '../gql/query';

const NEW_POST = gql`
  mutation createPost($title: String!, $imageUrl: String, $category: String!, $body: String!) {
    createPost(title: $title, imageUrl: $imageUrl, category: $category, body: $body) {
      _id
        title
        imageUrl
        category{
          _id
          catname
        }
        body
        author {
          _id
          name
        }
        comments{
          _id
          text
        }
      }
    }`;

const NewPost = props => {

  useEffect(() => {
    document.title = 'NewPost - Notedly';
  });

  const [ data, { loading, error } ] = useMutation(NEW_POST, {
    refetchQueries: [{ query: GET_MY_POST }, { query: GET_NOTES }],
    onCompleted: data => {
      console.log(data.createPost)
      props.history.push(`posts/${data.createPost._id}`);
    }
  });

  return (

    <React.Fragment>
    {loading && <p> loading...</p>}
    {error && <p>Error saving the note</p>}
{console.log(data)}
      <PostForm action={data} />
    </React.Fragment>
  );
};

export default NewPost;
