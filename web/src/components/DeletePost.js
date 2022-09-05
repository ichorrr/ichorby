import React from 'react';

import { useMutation, gql } from '@apollo/client';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import {GET_POST, GET_CATS, GET_NOTES, GET_MY_POST} from '../gql/query';

const DELETE_POST = gql`
  mutation deletePost($id: String!){
    deletePost(_id: $id)
  }
`;

const DeletePost = props => {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      id: props.postId
    },
    refetchQueries: [{query: GET_NOTES}, {query: GET_MY_POST}, {query: GET_CATS} ],

    onCompleted: data => {
      props.history.push('/myposts');
    }
  });

  return (
    <div>
    <button onClick={deletePost}>Delete Post</button>
  </div>)
};

export default withRouter(DeletePost);
