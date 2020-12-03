import React, { useState, StrictMode } from "react";
import { Link } from "react-router-dom";
import style from "../../style/style.module.css";
import { editIcon, eyeOnIcon, eyeOffIcon } from "../../assets/index";
import { useNavigationBar } from "../customHooks/index";

export default function StudentProfile(props) {
  const { student } = props.parentProps;
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <StrictMode>
      {navigationBar}
      <hr />
      <div className="d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div className="card border-light text-success bg-dark text-center">
            <div
              className={`card-header text-warning    border-secondary ${style.courseFeeTitle}`}
            >
              <div className="row">
                <div className="col">
                  <i>
                    <b>
                      <h2>{"My Profile "}</h2>
                    </b>
                  </i>
                </div>
                <div className="col">
                  <Link
                    to={`/updateStudentProfile/${localStorage.getItem(
                      "token"
                    )}`}
                  >
                    <img src={editIcon} alt="Edit Profile" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/*  Student Name && Branch */}
              <div className="row">
                {/* Student name */}
                <div className="col">
                  <small className="text-muted">Student Name </small>
                  <br />
                  <i>
                    <b>{`${student.firstName} ${student.lastName}`}</b>
                  </i>
                </div>
                {/* Branch */}
                <div className="col">
                  <small className="text-muted">Branch </small>
                  <br />
                  <i>
                    <b>{student.branch}</b>
                  </i>
                </div>
              </div>
              <hr />

              {/* Father Name && Mother Name */}
              <div className="row">
                {/* Father name */}
                <div className="col">
                  <small className="text-muted">Father Name </small>
                  <br />
                  <i>
                    <b>{student.fatherName}</b>
                  </i>
                </div>
                {/* Mother Name */}
                <div className="col">
                  <small className="text-muted">Mother Name </small>
                  <br />
                  <i>
                    <b>{student.motherName}</b>
                  </i>
                </div>
              </div>
              <hr />

              {/* Roll Number &&  Admission Session */}
              <div className="row">
                {/* Roll Number */}
                <div className="col">
                  <small className="text-muted">Roll Number </small>
                  <br />
                  <i>
                    <b>{student.rollNumber}</b>
                  </i>
                </div>
                {/* Admission Session */}
                <div className="col">
                  <small className="text-muted">Admission Session </small>
                  <br />
                  <i>
                    <b>{student.admissionSession}</b>
                  </i>
                </div>
              </div>
              <hr />

              {/* Enrollment Number && Gender */}
              <div className="row">
                {/*  Enrollment Number */}
                <div className="col">
                  <small className="text-muted">Enrollment No. </small>
                  <br />
                  <i>
                    <b> {student.enrollmentNumber}</b>
                  </i>
                </div>
                {/* Gender */}
                <div className="col">
                  <small className="text-muted">Gender </small>
                  <br />
                  <i>
                    <b>{student.gender}</b>
                  </i>
                </div>
              </div>
              <hr />

              {/* Caste && Domicile */}
              <div className="row">
                {/* Caste */}
                <div className="col">
                  <small className="text-muted">Caste </small>
                  <br />
                  <i>
                    <b>{student.caste}</b>
                  </i>
                </div>
                {/* Domicile */}
                <div className="col">
                  <small className="text-muted">Domicile</small>
                  <br />
                  <i>
                    <b>{student.domicile}</b>
                  </i>
                </div>
              </div>
              <hr />

              {/*  Minority && Minority type  */}
              {student.minority === "YES" ? (
                <>
                  <div className="row">
                    {/* Minority */}
                    <div className="col">
                      <small className="text-muted">Minority </small>
                      <br />
                      <i>
                        <b>{student.minority}</b>
                      </i>
                    </div>
                    {/* Minority type */}
                    <div className="col">
                      <small className="text-muted">Minority Type</small>
                      <br />
                      <i>
                        <b>{student.minorityType}</b>
                      </i>
                    </div>
                  </div>
                  <hr />
                </>
              ) : null}

              {/*  physicalHandicap && physical Handicap Type   */}
              {student.physicalHandicap === "YES" ? (
                <>
                  <div className="row">
                    {/* physicalHandicap */}
                    <div className="col">
                      <small className="text-muted">physicalHandicap </small>
                      <br />
                      <i>
                        <b>{student.physicalHandicap}</b>
                      </i>
                    </div>
                    {/* physical Handicap Type  */}
                    <div className="col">
                      <small className="text-muted">
                        Physical Handicap Type
                      </small>
                      <br />
                      <i>
                        <b>{student.physicalHandicapType}</b>
                      </i>
                    </div>
                  </div>
                  <hr />
                </>
              ) : null}

              {/* Email Id && Password */}
              <div className="row">
                {/* Email Id */}
                <div className="col">
                  <small className="text-muted">Email Id </small>
                  <br />
                  <i>
                    <b>{student.email}</b>
                  </i>
                </div>
                {/* password */}
                <div className="col">
                  <small className="text-muted">Password</small>
                  <br />
                  {/* Password visibility Condition */}
                  {passwordVisibility ? (
                    <i>
                      <b>{student.password}</b>
                    </i>
                  ) : (
                    <i>
                      <b>{"********"}</b>
                    </i>
                  )}

                  {/* Password visibility Icon(Eye-On && Eye-Off) */}
                  {passwordVisibility ? (
                    <img
                      className="btn"
                      src={eyeOffIcon}
                      alt="Edit Profile"
                      onClick={handleClick}
                    />
                  ) : (
                    <img
                      className="btn"
                      src={eyeOnIcon}
                      alt="Edit Profile"
                      onClick={handleClick}
                    />
                  )}
                </div>
              </div>
              <hr />

              {/* Registered On */}
              <div className="row">
                {/* Registered On */}
                <div className="col">
                  <small className="text-muted"> Registered On</small>
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
