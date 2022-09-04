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
import MyPosts from './myposts';
import EditPost from './edit';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = () => {
  return (
    <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/cats/:id" component={CatPage} />
      <Route exact path="/cats" component={CatsPage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/cats/:cname/post/:id" component={PostPage} />
      <PrivateRoute path="/new" component={NewPost} />
      <PrivateRoute path="/edit/:id" component={EditPost} />
      <PrivateRoute path="/myposts" component={MyPosts} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;
