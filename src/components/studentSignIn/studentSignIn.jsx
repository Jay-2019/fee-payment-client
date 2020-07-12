import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../config";

export default function StudentSignIn(props) {
  const [getCaptcha, setCaptcha] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleCaptcha = () => {
    setCaptcha("");
    const alphaNumericString =
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const captchaLength = 8;
    var randomString = "";
    for (let i = 0; i < captchaLength; i++) {
      var randomNumber = Math.floor(Math.random() * alphaNumericString.length);
      randomString += alphaNumericString.substring(
        randomNumber,
        randomNumber + 1
      );
    }

    var c = document.getElementById("captcha");
    var ctx = c.getContext("2d");

    ctx.font = "40px Georgia";
    ctx.font = "30px Verdana";
    // Create gradient
    let gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(randomString, 10, 25);
    setCaptcha(randomString);
  };

  useEffect(() => {
    
    if (!isLoading) {  
      handleCaptcha();
    
      return;
    }
  }, [isLoading]);

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
        email: "",
        password: "",
        captcha: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),

        password: Yup.string()
          .min(4, "Invalid Password.")
          .max(8, "Invalid Password.")
          .matches(/[a-zA-Z]/, "Password can only contain letters.")
          .required("Password is required"),
        captcha: Yup.string().required("Please Fill Required Captcha")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (getCaptcha !== values.captcha) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please Enter valid Captcha.",
            showConfirmButton: true,
            timer: 2000
          });
          resetForm();
          return;
        }
        setLoading(true);
        Axios.get(
          `${API}/studentAuthentication/${values.email}/${values.password}`
        )
          .then(response => {
            if (response.status === 200 && response.data) {
              localStorage.setItem("token", response.data._id);
              props.setStudent(response.data);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign-In Successful :)",
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
                title: "Student Not Found!!! Please Enter Valid Information",
                showConfirmButton: true,
                timer: 5000
              });
              resetForm();
              return setLoading(false);
            }

            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            resetForm();
            return props.history.push("/studentSignIn");
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

        setSubmitting(true);
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center ">
          <div className="col-sm-12 col-md-6 ">
            <div className="card text-white  border-light bg-dark">
              <div className="card-header text-warning text-center border-secondary">
                <i>
                  <h2> {" Student SignIn"}</h2>
                </i>
              </div>
              <div className="card-body ">
                <div>
                  <hr />
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
                    <div className="col text-center">
                      <canvas id="captcha" width="200" height="30"></canvas>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col">
                      <Field
                        name="captcha"
                        className="form-control"
                        id="userInputCaptcha"
                        placeholder="Fill Captcha"
                      />
                      <ErrorMessage
                        name="captcha"
                        render={msg => (
                          <div className="alert alert-primary" role="alert">
                            {msg}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn  btn-outline-warning btn-block"
                  >
                    <i>
                      <b>{" Sign In "}</b>
                    </i>
                  </button>
                </div>

                <div className="text-center">
                  <small id="note" className="form-text text-muted">
                    {"  If You Are New To Here Please"}
                    <a href="/studentSignUp">
                      <b>{" Sign-Up "}</b>
                    </a>
                    First.
                  </small>
                </div>
              </div>
              <div className="card-footer border-secondary text-center text-muted">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
