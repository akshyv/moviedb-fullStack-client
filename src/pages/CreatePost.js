import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  let history = useNavigate();
  const initialValues = {
    name: "",
    rating: 0,
    cast: "",
    genre: "",
    date: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("You must input a Movie name!"),
    rating: Yup.number().min(0).max(5).required(),
    cast: Yup.string().min(3).max(100).required(),
    genre: Yup.string().required("Enter the genre of movie"),
    date: Yup.date().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("https://moviedb-fullstack-api-akshy.herokuapp.com/posts", data)
      .then((response) => {
        console.log("IT WORKED");
      });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Movie Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="name"
            placeholder="(Ex. Thor:Ragnorak)"
          />
          <label>Rating: </label>
          <ErrorMessage name="rating" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="rating"
            placeholder="(0 to 5)"
          />
          <label>Cast: </label>
          <ErrorMessage name="cast" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="cast"
            placeholder="(Ex. Chris Hemsworth, Jeff Goldblum)"
          />
          <label>Genre: </label>
          <ErrorMessage name="genre" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="genre"
            placeholder="(Ex. Fiction)"
          />
          <label>Date: </label>
          <ErrorMessage name="date" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="date"
            placeholder="(Ex. 2017/11/03)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
