import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const GET_CAT = gql`
  query getCat($id: ID!) {
    getCat(_id: $id) {
      _id
      catname
      posts{
        title
        createdAt
      }
    }
  }
`;

const CatPage = props => {
  let  id = props.match.params.id;
  const { loading, error, data, fetchMore } = useQuery(GET_CAT, {variables: {id}});
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return (
  <div>
  {data.getCat.catname}
  {data.getCat.posts.map(cat => (
    <div key={cat.id}>
    {cat.title}</div>
  ))}

  </div>
);
};

export default CatPage;
