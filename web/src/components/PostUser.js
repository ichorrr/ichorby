import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {GET_ME} from '../gql/query';
import DeletePost from './DeletePost';

const PostUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

  return (
<React.Fragment>

{data.me._id === props.post.author._id && (
  <React.Fragment>
    <Link to={`/edit/${props.post._id}`}>Edit</Link>
    <DeletePost postId={props.post._id} />
    </React.Fragment>
)}
</React.Fragment>
 )};

export default PostUser;
