import { gql } from '@apollo/client';

const EDIT_POST = gql`
  mutation updatePost($id: String!, $title: String!, $body: String!) {
    updatePost(_id: $id, title: $title, body: $body) {
      _id
        title
        createdAt
        category{
          _id
          catname
        }
        body
        author {
          _id
          name
        }
        comments{
          text
        }
      }
    }`;

    export {
      EDIT_POST
    };
