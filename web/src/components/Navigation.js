import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../css/app.css';
import styled from 'styled-components';
import { useQuery, useMutation, useApolloClient, gql } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';

const UserState = styled.div`
  margin-left: auto;
`;
const   IS_LOGGED_IN = gql`
    {
      isLoggedIn @client
    }
`;

const Navigation = props => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  return (
    <nav className="App-link">
      <ul>
        <li>
          <Link to="">Ichor.by</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/cats">Cats</Link>
        </li>
        <UserState>
        {data.isLoggedIn ? (
          <UserState>
        <li>
          <Link to="/myposts">My Posts</Link>
        </li>
        <li>
          <Link to="/myjobs">Jobs</Link>
        </li>
        <li>
          <Link to="/mycomments">My comments</Link>
        </li>
        </UserState>
      ) : (
          <UserState></UserState>
        )
      }
        </UserState>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
        <UserState>
        {data.isLoggedIn ? (
          <UserState>
          <ButtonAsLink
            onClick={() => {
              // remove the token
              localStorage.removeItem('token');
              // clear the application's cache
              client.resetStore();
              // update local state
              client.writeData({ data: { isLoggedIn: false } });
              // redirect the user to the homepage
              props.history.push('/');
            }}
          >
          <li>
            Logout
          </li>
          </ButtonAsLink>

          <li>
          <Link to="/new">New post</Link>
          </li>
          </UserState>
        ) : (
          <UserState>
            <li>
              <Link to="/signup">Sign Up</Link>
              </li><li>
              <Link to="/signin">Sign In</Link>
            </li>
          </UserState>
        )

        }
        </UserState>

      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
