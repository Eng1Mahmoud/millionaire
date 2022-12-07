import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import * as yub from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveId } from "../../../redux/acticeUser.js";
import { setLogdIn } from "../../../redux/acticeUser";
function Forms() {
  const dispatch = useDispatch();
  let navigat = useNavigate();
  let [error, setError] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yub.object({
    email: yub
      .string()
      .required("email required")
      .email("this email not right"),
    password: yub
      .string()
      .required("password required")
      .min(8, "password must be at least 8 characters "),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm(true);
    axios
      .get(
        `https://millionaires.glitch.me/user?email=${values.email}&password=${values.password}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          navigat("/");
          dispatch(setActiveId(res.data[0].id)); // set active id
          dispatch(setLogdIn(true));
          sessionStorage.setItem("id", res.data[0].id); // set active id in setion storeg
        } else {
          setError("This Email or Password Is Not Correct");
        }
      });
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

              <button type="submit" className="fw-bold px-4 py-2 rounded-2">
                SINE IN
              </button>

              <span
                className="create-or-login"
                onClick={() => navigat("/register")}>
                Create New Acount ?
              </span>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Forms;
