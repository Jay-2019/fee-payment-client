import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

// import {history} from "react-router-dom";

export default function studentSignIn(props) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),

        password: Yup.string()
          .min(4, "Invalid Password.")
          .max(8, "Invalid Password.")
          .matches(/[a-zA-Z]/, "Password can only contain letters.")
          .required("Password is required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.get(
          "http://localhost:4000/feePaymentDB/studentAuthentication/" +
            values.email +
            "/" +
            values.password
        )
          .then(response => {
            console.log(response.data._id);
            localStorage.setItem("token", response.data._id);
            return props.history.push(
              "/studentProfile/" + localStorage.getItem("token")
            );
          })
          .catch(error => error.message);
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
        <div className="card w-75 text-center">
          <div className="card-header">
            <h2>Student SignIn</h2>
          </div>
          <div className="card-body">
            <div>
              <br />
              <div className="row">
                <Field
                  name="email"
                  type="email"
                  placeholder="student@gmail.com"
                  className="form-control"
                />

                <ErrorMessage
                  name="email"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
              </div>
              <br />
              <div className="row">
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
              </div>
              <br />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In{" "}
            </button>
          </div>
          <div className="card-footer text-muted">
            Faculty of engineering & technology
          </div>
        </div>
        </div>
      </Form>
    </Formik>
  );
}
