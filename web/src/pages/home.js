import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
import Navigation from '../components/Navigation';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import PostFeed from '../components/PostFeed';
import styled from 'styled-components';

const GET_NOTES = gql`
  query postFeed($cursor: String) {
    postFeed(cursor: $cursor) {
      cursor
      hasNextPage
      posts {
        _id
        title
        createdAt
        body
        author {
          name
        }
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return (
    <div className="App-link">
      <PostFeed posts={data.postFeed.posts} />;
      <h1>Topical Ichor-Messanger Uni (TIMU)</h1>
      <p>
        The specified software is intended for thematic communication between.
        everyone
      </p>
      <Navigation />
    </div>
  );
};

export default Home;
