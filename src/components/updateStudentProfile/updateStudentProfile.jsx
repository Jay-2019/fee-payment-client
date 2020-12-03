import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../config";
import { useNavigationBar } from "../customHooks/index";
import {
  arrayOfMinorityType,
  arrayOfDomicile,
  arrayOfCaste,
  arrayOfGender,
  arrayOfAdmissionSession
} from "../constant";

export default function UpdateStudentProfile(props) {
  const { student } = props.parentProps;
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);
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
          return props.history.push("/studentSignIn");
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
        return props.history.push("/studentSignIn");
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
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        rollNumber: student.rollNumber,
        gender: student.gender,
        branch: student.branch,
        fatherName: student.fatherName,
        motherName: student.motherName,
        admissionSession: student.admissionSession,
        enrollmentNumber: student.enrollmentNumber,
        caste: student.caste,
        domicile: student.domicile,
        minority: student.minority,
        minorityType: student.minorityType,
        physicalHandicap: student.physicalHandicap,
        physicalHandicapType: student.physicalHandicapType,
        password: student.password,
        confirmPassword: student.confirmPassword,
        acceptTerms: student.acceptTerms
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(3, "minimum 3 characters allow")
          .max(15, "maximum 15 characters allow")
          .required("First Name Required"),
        lastName: Yup.string()
          .min(3, "minimum 3 characters allow")
          .max(20, "maximum 20 characters allow")
          .required("Last Name Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email Required"),
        rollNumber: Yup.string()
          .min(6, "Roll No must be minimum 6 Digit (0-9)")
          .max(6, "Roll No must be maximum 6 Digit (0-9)")
          .matches(/^[-+]?[0-9]+$/, "Roll No contain only digit 0-9.")
          .required("Roll No. Required"),
        gender: Yup.string()
          .oneOf(arrayOfGender, "Invalid Gender")
          .required(" Gender Required"),
        branch: Yup.string()
          .oneOf(arrayOfBranch, "Invalid Branch")
          .required("Branch Required"),
        domicile: Yup.string()
          .oneOf(arrayOfDomicile, "Invalid Domicile")
          .required("Domicile Required"),
        caste: Yup.string()
          .oneOf(arrayOfCaste, "Invalid Caste")
          .required("Caste Required"),
        fatherName: Yup.string()
          .min(4, "minium 4 characters allow")
          .max(15, "maximum 15 characters allow")
          .required("Father Name Required"),
        motherName: Yup.string()
          .min(4, "minium 4 characters allow")
          .max(15, "maximum 15 characters allow")
          .required("Mother Name Required"),
        admissionSession: Yup.string()
          .oneOf(arrayOfAdmissionSession, "Invalid Admission Session")
          .required("Admission Session Required"),
        enrollmentNumber: Yup.string()
          .min(9, "minimum 9 characters allow")
          .max(9, "maximum 9 characters allow")
          .matches(
            /([0-9]?[/-])/,
            "Enrollment Number format must be same as which is in your document.   e.g: 16/06-065"
          )
          .required("Enrollment Number Required"),
        minority: Yup.string()
          .oneOf(["YES", "NO"], "Invalid Minority")
          .required("Minority option is Required"),
        minorityType: Yup.string()
          .oneOf(arrayOfMinorityType, "Invalid Minority")
          .required("Please Specify Minority"),
        physicalHandicap: Yup.string()
          .oneOf(["YES", "NO"], "Invalid Option Physical Handicap")
          .required("Physical Handicap option is Required"),
        physicalHandicapType: Yup.string()
          .matches(/[a-zA-Z]/, "only contain letters.")
          .required("Please Specify Type of Disability"),
        password: Yup.string()
          .min(4, "Password is too short - should be 4 characters minimum.")
          .max(8, "maximum 8 characters allow")
          .matches(/[a-zA-Z]/, "Password can only contain letters.")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password must match")
          .required("Passwords must match"),
        acceptTerms: Yup.boolean()
          .required("You must accept the terms and conditions.")
          .oneOf([true], "You must accept the terms and conditions.")
      })}
      //  the handler function call only when the onSubmit event occurs
      //  used for actual submission of form data that is responsible of student signUp.
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setLoading(true);

        Axios.post(
          `${API}/updateStudentProfile/${localStorage.getItem("token")}`,
          values
        )
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Congratulations! Profile Successfully Update :)",
                showConfirmButton: true,
                timer: 3000
              });
              resetForm();

              return props.history.push(
                `/studentProfile/${localStorage.getItem("token")}`
              );
            }

            if (response.status === 200 && response.data === null) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Profile Update Failed!!! Please Try Again.",
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
            return props.history.push(
              `/studentProfile/${localStorage.getItem("token")}`
            );
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
            return props.history.push(
              `/studentProfile/${localStorage.getItem("token")}`
            );
          });
        setSubmitting(true);
        resetForm();
      }}
    >
      {({ values }) => (
        <Form>
          {navigationBar}
          <hr />
          <div className="d-flex justify-content-center">
            <div className="col-sm-12 col-md-8 ">
              <div className="card text-white border-light bg-dark ">
                <div className="card-header text-warning border-secondary  text-center">
                  <i>
                    <h2> {"Update Profile"}</h2>
                  </i>
                </div>
                <div className="card-body">
                  {/* First Name && Last Name */}
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

                  {/* Mother Name && Father Name */}
                  <hr />
                  <div className="row">
                    <div className="col">
                      <Field
                        name="motherName"
                        type="string"
                        placeholder="Mother Name"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="motherName"
                        render={msg => (
                          <div className="alert alert-primary" role="alert">
                            {msg}
                          </div>
                        )}
                      />
                    </div>
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
                  </div>

                  {/* Roll Number && Gender */}
                  <hr />
                  <div className="row">
                    <div className="col">
                      <Field
                        as="select"
                        name="gender"
                        className="custom-select"
                      >
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
                  </div>

                  {/*   Branch  && Admission Session */}
                  <hr />
                  <div className="row">
                    <div className="col">
                      <Field
                        as="select"
                        name="branch"
                        className="custom-select"
                      >
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

                  {/* Enrollment Number */}
                  <hr />
                  <div className="row">
                    <div className="col">
                      <Field
                        name="enrollmentNumber"
                        type="string"
                        placeholder="Enrollment Number e.g:16/06-065"
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

                  {/*   Caste  && Domicile */}
                  <hr />
                  <div className="row">
                    <div className="col">
                      <Field as="select" name="caste" className="custom-select">
                        <option disabled value="">
                          Caste...
                        </option>
                        {arrayOfCaste.map((caste, index) => (
                          <option key={index} value={caste}>
                            {caste}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="caste"
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
                        name="domicile"
                        className="custom-select"
                      >
                        <option disabled value="">
                          Domicile...
                        </option>
                        {arrayOfDomicile.map((domicile, index) => (
                          <option key={index} value={domicile}>
                            {domicile}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="domicile"
                        render={msg => (
                          <div className="alert alert-primary" role="alert">
                            {msg}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/*  Minority */}
                  <hr />
                  <div className="row  text-left">
                    <div className="col">{"Minority"}</div>
                    <div className="col  ">
                      <Field
                        className="btn"
                        type="radio"
                        name="minority"
                        value="YES"
                      />
                      &nbsp;
                      <label htmlFor="minority" className="form-check-label">
                        {"Yes"}
                      </label>
                    </div>
                    <div className="col  ">
                      <Field
                        className="btn"
                        type="radio"
                        name="minority"
                        value="NO"
                      />
                      &nbsp;
                      <label htmlFor="minority" className="form-check-label">
                        {"No"}
                      </label>
                    </div>
                    <br />
                    <ErrorMessage
                      name="minority"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>

                  {/* Minority Type (Option Display Only If Minority is True) */}
                  {values.minority === "YES" ? (
                    <>
                      <hr />
                      <div className="row">
                        <div className="col">
                          <Field
                            as="select"
                            name="minorityType"
                            className="custom-select"
                          >
                            <option disabled value="">
                              Minority Type...
                            </option>
                            {arrayOfMinorityType.map((minorityType, index) => (
                              <option key={index} value={minorityType}>
                                {minorityType}
                              </option>
                            ))}
                          </Field>

                          <ErrorMessage
                            name="minorityType"
                            render={msg => (
                              <div className="alert alert-primary" role="alert">
                                {msg}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  {/*  Physical Handicap */}
                  <hr />
                  <div className="row  text-left">
                    <div className="col">{"Physical Handicap"}</div>
                    <div className="col  ">
                      <Field
                        className="btn"
                        type="radio"
                        name="physicalHandicap"
                        value="YES"
                      />
                      &nbsp;
                      <label
                        htmlFor="physicalHandicap"
                        className="form-check-label"
                      >
                        {"Yes"}
                      </label>
                    </div>
                    <div className="col  ">
                      <Field
                        className="btn"
                        type="radio"
                        name="physicalHandicap"
                        value="NO"
                      />
                      &nbsp;
                      <label
                        htmlFor="physicalHandicap"
                        className="form-check-label"
                      >
                        {"No"}
                      </label>
                    </div>
                    <br />
                    <ErrorMessage
                      name="physicalHandicap"
                      render={msg => (
                        <div className="alert alert-primary" role="alert">
                          {msg}
                        </div>
                      )}
                    />
                  </div>

                  {/* Physical Handicap Type */}
                  {values.physicalHandicap === "YES" ? (
                    <>
                      <hr />
                      <div className="row">
                        <div className="col">
                          <Field
                            type="physicalHandicapType"
                            name="physicalHandicapType"
                            placeholder="Type of Disability"
                            className="form-control"
                          />

                          <ErrorMessage
                            name="physicalHandicapType"
                            render={msg => (
                              <div className="alert alert-primary" role="alert">
                                {msg}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  {/* Email ID */}
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

                  {/* Password */}
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

                  {/* Confirm Password */}
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

                  {/*  Terms & Condition */}
                  <hr />
                  <div className="row">
                    <div className="col text-left">
                      <Field
                        className="btn"
                        type="checkbox"
                        name="acceptTerms"
                      />
                      &nbsp;
                      <label htmlFor="acceptTerms" className="form-check-label">
                        {"  Accept Terms & Conditions"}
                      </label>
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

                  {/* Submit Button */}
                  <hr />
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn  btn-outline-warning btn-block"
                      >
                        <i>
                          <b>{"Update Profile"}</b>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-footer border-secondary text-center ">
                  Faculty of engineering & technology
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};