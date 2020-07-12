import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../config";

import { arrayOfGender, arrayOfAdmissionSession } from "../constant";

export default function StudentSignUp(props) {
  const [arrayOfBranch, setArrayOfBranch] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // this useEffect call only when the componentDidMount
  // used for get list of branch.
  useEffect(() => {
    let source = Axios.CancelToken.source();

    Axios.get(`${API}/getBranch`)
      .then(response => {
        if (response.status === 200 && response.data) {
          setArrayOfBranch(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && response.data === null) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something Went Wrong!!! Please Try After Sometime.",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push("/studentSignUp");
        }
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        return props.history.push("/studentSignUp");
      });

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.history]);

  return isLoading ? (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "200px" }}
    >
      <div className="row">
        <div className="col ">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="col    ">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="col ">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        rollNo: "",
        gender: "",
        branch: "",
        fatherName: "",
        admissionSession: "",
        semester: "",
        password: "",
        confirmPassword: "",
        acceptTerms: ""
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(3, "minimum 3 characters allow")
          .max(15, "maximum 15 characters allow")
          .required("Required"),
        lastName: Yup.string()
          .min(3, "minimum 3 characters allow")
          .max(20, "maximum 20 characters allow")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        rollNumber: Yup.string()
          .min(6, "Roll No must be minimum 6 Digit (0-9)")
          .max(6, "Roll No must be maximum 6 Digit (0-9)")
          .matches(/^[-+]?[0-9]+$/, "Roll no contain only digit 0-9.")
          .required("Required"),
        gender: Yup.string()
          .oneOf(arrayOfGender, "Invalid Gender")
          .required("Required"),
        branch: Yup.string()
          .oneOf(arrayOfBranch, "Invalid Branch")
          .required("Required"),
        fatherName: Yup.string()
          .min(3, "minium 3 characters allow")
          .max(15, "maximum 15 characters allow")
          .required("Required"),
        admissionSession: Yup.string()
          .oneOf(arrayOfAdmissionSession, "Invalid Admission Session")
          .required("Required"),
        enrollmentNumber: Yup.string()
          .min(9, "minimum 9 characters allow")
          .max(9, "maximum 9 characters allow")
          .matches(
            /([0-9]?[/-])/,
            "Enrollment Number format must be same as which is in your document.   e.g: 16/06-065"
          ),
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
      //  the handler function call only when the onSubmit event occurs
      //  used for actual submission of form data that is responsible of student signUp.
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setLoading(true);

        Axios.post(`${API}/studentSignUp`, values)
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Congratulations! Sign-Up successful :)",
                showConfirmButton: true,
                timer: 3000
              });
              resetForm();

              return props.history.push("/studentSignIn");
            }

            if (response.status === 200 && response.data === null) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Sign-Up Failed!!! Please Try Again.",
                showConfirmButton: true,
                timer: 5000
              });
              resetForm();
              setLoading(false);
            }

            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            return props.history.push("/studentSignUp");
          })
          .catch(error => {
            console.log(error.message);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            return props.history.push("/studentSignUp");
          });
        setSubmitting(true);
        resetForm();
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8 ">
            <div className="card text-white border-light bg-dark ">
              <div className="card-header text-warning border-secondary  text-center">
                <i>
                  <h2> {"Student SignUp"}</h2>
                </i>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="firstName"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                  <div className="col">
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="lastName"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col">
                    <Field
                      name="rollNumber"
                      type="text"
                      placeholder="Roll Number"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="rollNumber"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                  <div className="col">
                    <Field as="select" name="gender" className="custom-select">
                      <option disabled value="">
                        Gender...
                      </option>
                      {arrayOfGender.map((gender, index) => (
                        <option key={index} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="gender"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col">
                    <Field as="select" name="branch" className="custom-select">
                      <option disabled value="">
                        Branch...
                      </option>
                      {arrayOfBranch.map((branch, index) => (
                        <option key={index} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="branch"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                  <div className="col">
                    <Field
                      name="enrollmentNumber"
                      type="string"
                      placeholder="Enrollment Number e.g:16/06-065 (Optional)"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="enrollmentNumber"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col">
                    <Field
                      name="fatherName"
                      type="string"
                      placeholder="Father Name"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="fatherName"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                  <div className="col">
                    <Field
                      as="select"
                      name="admissionSession"
                      className="custom-select"
                    >
                      <option disabled value="">
                        Admission Session...
                      </option>
                      {arrayOfAdmissionSession.map(
                        (admissionSession, index) => (
                          <option key={index} value={admissionSession}>
                            {admissionSession}
                          </option>
                        )
                      )}
                    </Field>

                    <ErrorMessage
                      name="admissionSession"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col text-left">
                    <Field
                      name="email"
                      type="email"
                      placeholder="student@gmail.com"
                      className="form-control"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>

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

                <hr />
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

                <hr />
                <div className="row">
                  <div className="col">
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="confirmPassword"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="confirmPassword"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col text-left">
                    <Field type="checkbox" name="acceptTerms" /> &nbsp;
                    <label htmlFor="acceptTerms" className="form-check-label">
                      Accept Terms & Conditions
                    </label>{" "}
                    <br />
                    <ErrorMessage
                      name="acceptTerms"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col text-center">
                    <button
                      type="submit"
                      className="btn  btn-outline-warning btn-block"
                    >
                      <i>
                        <b>{"Sign Up"}</b>
                      </i>
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <small id="note" className="form-text text-muted">
                    {"If You Are Lost Here Back To"}
                    <a href="/studentSignIn">
                      <b>{" Sign-In "}</b>
                    </a>
                  </small>
                </div>
              </div>
              <div className="card-footer border-secondary text-center ">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
