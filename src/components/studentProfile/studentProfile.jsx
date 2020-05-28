import React, { StrictMode } from "react";
import style from "../../style/style.module.css";

import { useNavigationBar } from "../customHooks/index";

export default function StudentProfile(props) {
  const navigationBar = useNavigationBar();

  return (
    <StrictMode>
      {navigationBar}
      <br />
      <div className="d-flex justify-content-center">
        <div className="card border-warning bg-dark text-white w-75 text-center">
          <div className={`card-header ${style.courseFeeTitle}`}>
            <h2>My Profile</h2>
            {props.parentProps.student.firstName}
          </div>
          <div className="card-body">
            <div className="card-footer text-muted">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
