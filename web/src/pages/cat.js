import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import { GET_CAT } from '../gql/query';

const CatPage = props => {
  let  id = props.match.params.id;

  const { loading, error, data, fetchMore } = useQuery(GET_CAT, {variables: {id}});
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;
let cname = data.getCat.catname;
  return (
  <div>
  {data.getCat.catname}
  <ul>
  {data.getCat.posts.map(post => (
    <Link key={post._id} to={`/cats/${cname}/post/${post._id}`}><li>{post.title}</li></Link>
  ))}
</ul>
  </div>
);
};

export default CatPage;
