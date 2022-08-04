import React, {useEffect} from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';

import PostForm from '../components/PostForm';

const NEW_POST = gql`
  mutation createPost($title: String, $category: String, $body: String) {
    createPost(title: $title, category: $category, body: $body) {
      _id
        title
        createdAt
        updatedAt
        body
        author {
          name
        }
        comments{
          text
        }
      }
    }`;

const NewPost = props => {

  useEffect(() => {
    document.title = 'NewPost - Notedly';
  });

  const [ data, { loading, error } ] = useMutation(NEW_POST, {
    onCompleted: data => {
      props.history.push(`posts/${data.createPost._id}`);
    }
  });

  return (
    <React.Fragment>
    {loading && <p> loading...</p>}
    {error && <p>Error saving the note</p>}

      <PostForm action={data} />
    </React.Fragment>
  );
};

export default NewPost;
