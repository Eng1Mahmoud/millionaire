import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUserAlt, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import axios from "axios";
import * as yub from "yup";
import {useNavigate} from "react-router-dom"
function Forms() {
  let [error,setError] = useState("")
  let navigat = useNavigate()
  const ref = useRef(null);
  const [file, setFile] = useState("");
  useEffect(() => {
    ref.current.onchange = () => {
      const reder = new FileReader();
      reder.readAsDataURL(ref.current.files[0]);
      reder.onload = () => {
        setFile(reder.result);
      };
    };
  }, []);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    file: "",
  };

  const validationSchema = yub.object({
    name: yub.string().required(" name required"),
    email: yub
      .string()
      .required("email required")
      .email("this email not right"),
    password: yub
      .string()
      .required("password required")
      .min(8, "password must be at least 8 characters "),
  });
  const validatFile = (value) => {
    let error;
    if (!value) {
      error = "required";
    }
    return error;
  };
  const onSubmit = (values, onSubmitProps) => {
  
    values.file = file;
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm(true);

    axios
    .get(
      `http://localhost:4000/user?email=${values.email}`
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        setError("This Email Are used Actually")
        console.log("exist")
      }
      else{
        axios
        .post("http://localhost:4000/user", values)
        .then((res) => console.log("good"))
        .catch((err) => console.log(err));
        navigat("/login")
        console.log("post")
      }
    })
 
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(arg) => {
          return (
            <Form>
            <p className="validation-error">{error}</p>
              <div className="group">
                <FaUserAlt className="icon" />
                <Field
                  type="text"
                  placeholder="enter your name "
                  name="name"></Field>
              </div>
              <ErrorMessage name="name">
                {(error) => {
                  return <p className="validation-error">{error}</p>;
                }}
              </ErrorMessage>
              <div className="group">
                <FaEnvelope className="icon" />
                <Field
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"></Field>
              </div>
              <ErrorMessage name="email">
                {(error) => {
                  return <p className="validation-error">{error}</p>;
                }}
              </ErrorMessage>
              <div className="group">
                <FaLock className="icon" />
                <Field
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"></Field>
              </div>
              <ErrorMessage name="password">
                {(error) => {
                  return <p className="validation-error">{error}</p>;
                }}
              </ErrorMessage>
              <div className="group">
                <label htmlFor="file">
                  <FaImage  className="file" />
                  <span className="fw-bold ps-2">Chose an Image</span>
                </label>

                <Field
                  type="file"
                  name="file"
                  id="file"
                  validate={validatFile}
                  innerRef={ref}
                  className="d-none"></Field>
              </div>
              <ErrorMessage name="file">
                {(error) => {
                  return <p className="validation-error">{error}</p>;
                }}
              </ErrorMessage>
              <button type="submit" className="fw-bold px-4 py-2 rounded-2">SINE UP</button>
              <span className="create-or-login" onClick={() => navigat("/login")}>Log In ?</span>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Forms;
