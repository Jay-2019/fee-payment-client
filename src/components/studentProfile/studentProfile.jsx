import React, { StrictMode } from "react";
import style from "../../style/style.module.css";

import { useNavigationBar } from "../customHooks/index";

export default function StudentProfile(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);

  return (
    <StrictMode>
      {navigationBar}
      <br />
      <div className="d-flex justify-content-center">
        <div className="card border-light text-white bg-dark w-50 text-center">
          <div
            className={`card-header border-secondary ${style.courseFeeTitle}`}
          >
            <h2>My Profile</h2>
          </div>
          <div className="card-body">{props.parentProps.student.firstName}</div>
          <div className="card-footer border-secondary text-muted">
            Faculty of engineering & technology
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
