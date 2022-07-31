import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import styled from 'styled-components';
import Button from '../components/Button';
const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;



const SIGNUP_USER = gql`mutation signUp($name: String!, $email: String!, $password: String!){
  signUp(name: $name, email: $email, password: $password)
}`;

const SignUp = props => {
const [values, setValues] = useState();

const onChange = event => {
  setValues({
    ...values,
    [event.target.name]: event.target.value
  });
};

  useEffect(() => {

    document.title = 'Sign Up — Notedly';
  });

  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {

      localStorage.setItem('token', data.signUp);
      client.writeData({data: {isLoggedIn: true}});
      props.history.push('/');
    }
  });

  return (
    <Wrapper>
      {/* Display the appropriate form header */}
       <h2>Sign Up</h2>
      {/* perform the mutation when a user submits the form */}
      <Form
      onSubmit={event => {
        event.preventDefault();
        signUp({
          variables: {
            ...values
          }
        });
      }}
      >

            <label htmlFor="name">Username:</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="name"
              onChange={onChange}
            />

        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
