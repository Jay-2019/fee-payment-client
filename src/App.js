import React, { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRoutes } from "./routes/index";

// const { log } = console;

export default function App() {
  return (
    <StrictMode>
      < div className="container">
        <Router>
          <Switch>
            {PublicRoutes()}
          </Switch>
        </Router>
      </div>
    </StrictMode>
  );
}