import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import PostPage from './posts';
import SignUp from './signup';
import SignIn from './signin';
import NewPost from './new';

const Pages = () => {
  return (
    <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/new" component={NewPost} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};
export default Pages;
