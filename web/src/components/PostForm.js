import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
  max-width: 95%;
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
    width: 95%;
    margin-bottom: 1em;
  }
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 200px;
`;

const PostForm = props => {

  // set the default state of the form
  const [values, setValues] = useState();

  // update the state when a user types in the form
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={event => {
          event.preventDefault();
          console.log(values)
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >

      <label htmlFor="title">Title Post:</label>
      <input
        required
        type="text"
        id="title"
        name="title"
        placeholder="enter title"
        onChange={onChange}
      />

      <label htmlFor="category">Category Post:</label>
      <input
        required
        type="text"
        id="category"
        name="category"
        placeholder="enter category"
        onChange={onChange}
      />

        <TextArea
          required
          type="text"
          name="body"
          placeholder="Post content"
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default PostForm;
