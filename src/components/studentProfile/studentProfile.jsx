import React, { StrictMode, useEffect, useState } from "react";
import Axios from "axios";
import style from "../../style/style.module.css";

import { useNavigationBar } from "../customHooks/index";

export default function StudentProfile(props) {
  const navigationBar = useNavigationBar();
  const [student, setStudent] = useState();

  useEffect(() => {
    Axios.get(
      `http://localhost:4000/feePaymentDB/getStudentProfile/${props.match.params.id}`
    )
      .then(response => setStudent(response.data))
      .catch(error => console.log(error.message));
  }, [props.match.params.id]);
  console.log(student);
  return (
    <StrictMode>
      {navigationBar}
      <br />
      <div className="d-flex justify-content-center">
        <div className="card border-warning bg-dark text-white w-75 text-center">
          <div className={`card-header ${style.courseFeeTitle}`}>
            <h2>My Profile</h2>
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
