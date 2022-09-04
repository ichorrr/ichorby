import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { GET_POST, GET_ME } from '../gql/query';

import PostForm from '../components/PostForm';

const EDIT_POST = gql`
  mutation updatePost($id: String!, $title: String!, $body: String!) {
    updatePost(_id: $id, title: $title, body: $body) {
      _id
        title
        createdAt
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
          text
        }
      }
    }`;

const EditPost = props => {

  let  id = props.match.params.id;

  const { data } = useQuery(GET_POST, { variables: { id } });

const {  loading, error, data: userdata, fetchMore } = useQuery(GET_ME);

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



let ipme = data.getPost.author._id;
{console.log(ipme)}

let idme = userdata.me._id;
{console.log(idme)}
{console.log(data.getPost.body)}

if(userdata.me._id !== data.getPost.author._id)
{return <p>You do not have access to edit this post</p>}
  return <PostForm body={data.getPost.body} title={data.getPost.title} category={data.getPost.category._id} action={editPost}/>
};

export default EditPost;
