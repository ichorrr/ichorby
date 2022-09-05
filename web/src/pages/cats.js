import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { GET_CATS } from '../gql/query';

const CatBlock = styled.li`
  padding: 1em 1em;
  font: bold 1em Arial, sans-serif;
  text-decoration: none;
`;

const Ulblock = styled.ul`
  a:link {
  color: #19829f;
  display: block;
  text-decoration: none;
}

a:hover {
  color: #c00214;
  background: #eaeaea;
}
`;

const CatsPage = props => {

  const { loading, error, data, fetchMore } = useQuery( GET_CATS, {
  refetchQueries: [{query: GET_CATS} ] });
  
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return (
  <Ulblock>
    {data.getCats.map(cats => (
      <Link key={cats._id} to={`cats/${cats._id}`}>
        <CatBlock key={cats._id}>{cats.catname}</CatBlock>
      </Link>
    ))}
  </Ulblock>
);
};

export default CatsPage;
