import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import PostForm from '../components/PostForm';
import { GET_POST, GET_ME } from '../gql/query';
import {EDIT_POST} from '../gql/mutation';

const EditPost = props => {

  let  id = props.match.params.id;
  const {data: userdata } = useQuery(GET_ME);
  const {  loading, error, data } = useQuery(GET_POST, { variables: { id } });
  {console.log(data)}

  {console.log(userdata)}
const [editPost] = useMutation(EDIT_POST, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/posts/${id}`);
    }
  });

if (loading) return <p>loading...</p>;
if (error) return <p>error...</p>;


if(userdata.me._id !== data.getPost.author._id)
{return <p>You do not have access to edit this post</p>}
  return <PostForm body={data.getPost.body} imageUrl={data.getPost.imageUrl} title={data.getPost.title} category={data.getPost.category._id} action={editPost}/>
};

export default EditPost;
