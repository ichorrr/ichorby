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
{console.log(props.title)}
  // set the default state of the form
  const [values, setValues] = useState( { body: props.body, title: props.title || ''} );


  // update the state when a user types in the form
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
{console.log(props)}
  return (
    <Wrapper>
      <Form
        onSubmit={event => {
          event.preventDefault();

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
        name="title"
        id="title"
        placeholder="enter title"
        onChange={onChange}
        value={values.title}
      />



      <label htmlFor="category">
      Category Post:
               <select defaultValue={'DEFAULT'} onChange={onChange}   type="text"
                 id="category"
                 name="category">
                 <option value="DEFAULT" disabled>enter category</option>
                 <option value="6251ef28413373118838bbdd">news</option>
                 <option value="6251f1532f7a51343c8ed7df">arts</option>
                 <option value="6251f1632f7a51343c8ed7e0">notes</option>
               </select>
             </label>


        <TextArea
          required
          type="text"
          name="body"
          id="body"
          placeholder="Post content"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default PostForm;
