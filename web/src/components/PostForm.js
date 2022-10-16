import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
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
  const inputFileRef = useRef(null);
  const [body, setBody] = useState({body: props.body || ''});
  const [imageUrl, setImageUrl] = useState({imageUrl: props.imageUrl || ''});
  const [value, setValue] = useState( { category: props.category, title: props.title || ''} );

  // update the state when a user types in the form
  const onChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeMDE = (body) => {
    setBody({body});
  };


  const handleChangeFile = async (imageUrl) =>{

          const formData = new FormData();
          const file = event.target.files[0];
          formData.append('imageUrl', file);
          const res = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          imageUrl = await data.url;
          setImageUrl({ imageUrl});

  }
  console.log(imageUrl);
  console.log(body);
  console.log(value);
  return (
    <Wrapper>
    <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large" >Upload images</Button>

      <Form
        onSubmit={event => {
          event.preventDefault();

          props.action({
            variables: {
              ...value,
              ...body,
              ...imageUrl,
            }
          });
        }}
      >

      <input
        className="hidden"
        ref={inputFileRef}
        type="file"
        name="imageUrl"
        onChange={handleChangeFile}
        value={value.imageUrl}
      />
      <img src={imageUrl.imageUrl} />

      <label htmlFor="title">Title Post:</label>
      <input
        required
        type="text"
        name="title"
        id="title"
        placeholder="enter title"
        onChange={onChange}
        value={value.title}
      />
      <label htmlFor="category">
      Category Post:
               <select onChange={onChange} type="text"
                 id="category" name="category" value={value.category}>
                 <option >enter category</option>
                 <option value="6251ef28413373118838bbdd">news</option>
                 <option value="6251f1532f7a51343c8ed7df">arts</option>
                 <option value="6251f1632f7a51343c8ed7e0">notes</option>
               </select>
             </label>

        <SimpleMDE
          required
          type="text"
          name="body"
          id="body"
          placeholder="Post content"
          onChange={onChangeMDE}
          value={body.body}
        />
        <Button type="submit">Save</Button>
      </Form>

    </Wrapper>
  );
};

export default PostForm;
