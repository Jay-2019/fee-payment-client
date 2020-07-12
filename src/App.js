import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import { NoMatch } from './components/index';
import Axios from "axios";
import API from "./components/config";
import './App.css';

export default function App() {
  const [student, setStudent] = useState({});

  useEffect(() => {
    Axios.get(
      `${API}/getStudentProfile/${localStorage.getItem("token")}`
    )
      .then(response => setStudent(response.data))
      .catch(error => console.log(error.message));
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          < div className="container-fluid  ">
            <Router>
              <Switch>
                {publicRoutes(setStudent)}
                {privateRoutes({ student, setStudent })}
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Router>
          </div>
        </header>
      </div>
    </>
  );
}