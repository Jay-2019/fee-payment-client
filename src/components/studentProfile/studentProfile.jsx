import React, { StrictMode } from "react";
// import style from "../../style/style.module.css";

import { useNavigationBar } from "../customHooks/index";

export default function StudentProfile(props) {
  const navigationBar = useNavigationBar();

  return (
    <StrictMode>
      <div>{navigationBar}</div>

      <div>
        <div className="d-flex justify-content-center">
          <div className="card ">
            <div className="card-header text-center">Featured</div>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="/sass" className="btn btn-primary">
                Pay Now
              </a>
            </div>
            <div className="card-footer text-muted text-center">2 days ago</div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
