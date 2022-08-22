import { gql } from '@apollo/client';

const GET_CATS = gql`
  query getCats {
    getCats {
      _id
      catname
      posts{
        title
      }
    }
  }
`;

const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(_id: $id) {
      _id
      title
      createdAt
      updatedAt
      category{
        catname
      }
      body
      author {
        name
        email
      }
    }
  }
`;

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export {
  GET_CATS,
  GET_POST,
  IS_LOGGED_IN
};
