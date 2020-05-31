import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import {
  arrayOfAge,
  arrayOfBranch,
  arrayOfGender,
  arrayOfSemester,
  arrayOfAdmissionSession
} from "../constant";
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
        fatherName: "",
        admissionSession: "",
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
          .oneOf(arrayOfAge, "Invalid Age")
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
        semester: Yup.string()
          .oneOf(arrayOfSemester, "Invalid Branch")
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
            return window.alert("Congratulations ");
          })
          .catch(error => error.message);
        setSubmitting(true);
        resetForm();

        setTimeout(() => props.history.push("/studentSignIn"), 1000);
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-75 ">
            <div className="card-header text-center">
              <h2>Student SignUp</h2>
            </div>
            <div className="card-body">
              <div>
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
                    {" "}
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
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
                      {arrayOfAge.map((age, index) => (
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
                      {arrayOfGender.map((gender, index) => (
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
                      as="select"
                      name="semester"
                      className="custom-select"
                    >
                      <option disabled value="">
                        Semester...
                      </option>
                      {arrayOfSemester.map((semester, index) => (
                        <option key={index} value={semester}>
                          {semester}
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
                <br />
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
                  <div className="col text-left">
                    <Field type="checkbox" name="acceptTerms" /> &nbsp;
                    <label htmlFor="acceptTerms" className="form-check-label">
                      Accept Terms & Conditions
                    </label>{" "}
                    <br />
                    <ErrorMessage name="acceptTerms" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col text-center">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center ">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
