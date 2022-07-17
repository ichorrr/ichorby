import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './home';
import PostPage from './posts';

const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:id" component={PostPage} />
    </Router>
  );
};
export default Pages;
