import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import PostPage from './posts';
import SignUp from './signup';
import SignIn from './signin';
import NewPost from './new';
import CatsPage from './cats';
import CatPage from './cat';

const Pages = () => {
  return (
    <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/cats/:id" component={CatPage} />
      <Route exact path="/cats" component={CatsPage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/cats/:cname/post/:id" component={PostPage} />
      <Route path="/new" component={NewPost} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};
export default Pages;
