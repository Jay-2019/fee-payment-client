import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import {
  arrayOfBranch,
  arrayOfGender,
  arrayOfAdmissionSession
} from "../constant";
export default function studentSignUp(props) {
  return (
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post("http://localhost:4000/feePaymentDB/studentSignUp", values)
          .then(response => {
            if (response.status === 200);
            window.alert("Congratulations! Sign-Up successful ");
            return props.history.push("/studentSignIn");
          })
          .catch(error => error.message);
        setSubmitting(true);
        resetForm();
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="card text-white border-light bg-dark ">
              <div className="card-header border-secondary text-danger text-center">
                <h2>Student SignUp</h2>
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

                    <ErrorMessage name="firstName" />
                  </div>
                  <div className="col">
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />
                    <ErrorMessage name="lastName" />
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

                    <ErrorMessage name="rollNumber" />
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
                    <ErrorMessage name="gender" />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col">
                    <Field as="select" name="branch" className="custom-select">
                      <option disabled value="">
                        B.Tech...
                      </option>
                      {arrayOfBranch.map((branch, index) => (
                        <option key={index} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="branch" />
                  </div>
                  <div className="col">
                    <Field
                      name="enrollmentNumber"
                      type="string"
                      placeholder="Enrollment Number e.g:16/06-065 (Optional)"
                      className="form-control"
                    />

                    <ErrorMessage name="enrollmentNumber" />
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
                    <ErrorMessage name="fatherName" />
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
                    <ErrorMessage name="admissionSession" />
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
                    <ErrorMessage name="email" />
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
                    <ErrorMessage name="password" />
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
                    <ErrorMessage name="confirmPassword" />
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
                    <ErrorMessage name="acceptTerms" />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col text-center">
                    <button
                      type="submit"
                      className="btn  btn-outline-secondary btn-block"
                    >
                      <b> Sign Up</b>
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
