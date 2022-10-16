import { gql } from '@apollo/client';

const EDIT_POST = gql`
  mutation updatePost($id: String!, $imageUrl: String, $title: String!, $body: String!) {
    updatePost(_id: $id, imageUrl: $imageUrl, title: $title, body: $body) {
      _id
        title
        imageUrl
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
