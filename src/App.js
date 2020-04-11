import React, { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";

// const { log } = console;
const test = "testing";
const test2 = "testing2222222222";
export default function App() {
  return (
    <StrictMode>
      < div className="container-fluid">
        <Router>
          <Switch>
            {publicRoutes(test, test2)}
            {privateRoutes()}
          </Switch>
        </Router>
      </div>
    </StrictMode>
  );
}