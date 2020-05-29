import React, { StrictMode, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import Axios from "axios";

export default function App() {
  const [student, setStudent] = useState({});

  useEffect(() => {
    Axios.get(
      `http://localhost:4000/feePaymentDB/getStudentProfile/${localStorage.getItem("token")}`
    )
      .then(response => setStudent(response.data))
      .catch(error => console.log(error.message));
  }, []);

  return (
    <>
      < div className="container-fluid">
        <Router>
          <Switch>
            {publicRoutes(setStudent)}
            {privateRoutes({ student, setStudent })}
          </Switch>
        </Router>
      </div>
    </>
  );
}