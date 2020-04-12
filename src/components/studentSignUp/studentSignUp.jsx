import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
// import {history} from "react-router-dom";

export default function studentSignUp(props) {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        branch: "",
        semester: "",
        password: "",
        confirmPassword: "",
        acceptTerms: ""
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(3, "minium 3 characters allow")
          .max(15, "maximum 15 characters allow")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        age: Yup.number()
          .oneOf(
            [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            "Invalid Age"
          )
          .required("Required"),
        gender: Yup.string()
          .oneOf(["Male", "Female", "Other"], "Invalid Gender")
          .required("Required"),
        branch: Yup.string()
          .oneOf([" IT", " FT", "AG", " CIVIL"], "Invalid Branch")
          .required("Required"),
        semester: Yup.number()
          .oneOf([8, 7, 6, 5, 4, 3, 2, 1], "Invalid Branch")
          .required("Required"),
        password: Yup.string()
          .min(4, "Password is too short - should be 4 characters minimum.")
          .max(8, "maximum 8 characters allow")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .required("Passwords must match")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
        acceptTerms: Yup.boolean()
          .required("You must accept the terms and conditions.")
          .oneOf([true], "You must accept the terms and conditions.")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post("http://localhost:4000/feePaymentDB/studentSignUp", values)
          .then(response => {
            return response.data;
          })
          .catch(error => error.message);
        setSubmitting(true);
        resetForm();
        props.history.push("/studentSignIn");
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card w-75 ">
            <div className="card-header  text-center">
              <h2>Student SignUp</h2>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col">
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="firstName"
                      className="form-control"
                    />

                    <ErrorMessage name="firstName" />
                  </div>
                  <div className="col">
                    {" "}
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="lastName"
                      className="form-control"
                    />
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <Field as="select" name="age" className="custom-select">
                      <option disabled value="">
                        Age...
                      </option>
                      {[
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30
                      ].map((age, index) => (
                        <option key={index} value={age}>
                          {age}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="age" />
                  </div>
                  <div className="col">
                    <Field as="select" name="gender" className="custom-select">
                      <option disabled value="">
                        Gender...
                      </option>
                      {["Male", "Female", "Other"].map((gender, index) => (
                        <option key={index} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <Field as="select" name="branch" className="custom-select">
                      <option disabled value="">
                        B.Tech...
                      </option>
                      {[" IT", " FT", "AG", " CIVIL"].map((branch, index) => (
                        <option key={index} value={branch}>
                          {"B.Tech" + branch}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="branch" />
                  </div>
                  <div className="col">
                    <Field
                      as="select"
                      name="semester"
                      className="custom-select"
                    >
                      <option disabled value="">
                        Semester...
                      </option>
                      {[8, 7, 6, 5, 4, 3, 2, 1].map((semester, index) => (
                        <option key={index} value={semester}>
                          {semester + "th"}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="semester" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <Field
                      name="email"
                      type="email"
                      placeholder="student@gmail.com"
                      className="form-control"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                    <ErrorMessage name="email" />
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
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="confirmPassword"
                      className="form-control"
                    />
                    <ErrorMessage name="confirmPassword" />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col">
                    <Field type="checkbox" name="acceptTerms" /> &nbsp;
                    <label htmlFor="acceptTerms" className="form-check-label">
                      Accept Terms & Conditions
                    </label>{" "}
                    <br />
                    <ErrorMessage name="acceptTerms" />
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
