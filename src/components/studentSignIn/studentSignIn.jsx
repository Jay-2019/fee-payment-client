import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

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
            localStorage.setItem("token", response.data._id);
            props.setStudent(response.data);
            return setTimeout(
              () =>
                props.history.push(
                  "/studentProfile/" + localStorage.getItem("token")
                ),
              500
            );
          })
          .catch(error => error.message);
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-50">
            <div className="card-header text-center">
              <h2>Student SignIn</h2>
            </div>
            <div className="card-body">
              <div>
                <br />
                <div className="row">
                  <div className="col">
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
                </div>
                <br />
                <div className="row">
                  <div className="col">
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
                </div>
                <br />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary ">
                  Sign In{" "}
                </button>
              </div>
            </div>
            <div className="card-footer text-center text-muted">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
