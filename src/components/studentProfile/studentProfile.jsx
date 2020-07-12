import React, { StrictMode } from "react";
import style from "../../style/style.module.css";

import { useNavigationBar } from "../customHooks/index";

export default function StudentProfile(props) {
  const { student } = props.parentProps;
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);

  return (
    <StrictMode>
      {navigationBar}
      <hr />
      <div className="d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div className="card border-light text-success bg-dark text-center">
            <div
              className={`card-header text-warning border-secondary ${style.courseFeeTitle}`}
            >
              <i>
                <b>
                <h2>{"My Profile "}</h2>
                </b>
              </i>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Name </small>
                  <br />
                  <i>
                    <b>{`${student.firstName} ${student.lastName}`}</b>
                  </i>
                </div>
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Branch </small>
                  <br />
                  <i>
                    <b>{student.branch}</b>
                  </i>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Roll No. </small>
                  <br />
                  <i>
                    <b>{student.rollNumber}</b>
                  </i>
                </div>
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Admission Session </small>
                  <br />
                  <i>
                    <b>{student.admissionSession}</b>
                  </i>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Enrollment No. </small>
                  <br />
                  <i>
                    <b> {student.enrollmentNumber}</b>
                  </i>
                </div>
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Gender </small>
                  <br />
                  <i>
                    <b>{student.gender}</b>
                  </i>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Father Name </small>
                  <br />
                  <i>
                    <b>{student.fatherName}</b>
                  </i>
                </div>
                <div className="col-sm-12 col-md-6">
                  <small className="text-muted">Registered On </small>
                  <br />
                  <i>
                    <b>
                      {new Date(student.createdAt)
                        .toLocaleString("en-GB")
                        .substring(0, 10)}
                    </b>
                  </i>
                </div>
              </div>
            </div>
            <div className="card-footer border-secondary text-muted">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
