import React, { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";



export default function App() {
  return (
    <StrictMode>
      < div className="container-fluid">
        <Router>
          <Switch>
            {publicRoutes()}
            {privateRoutes()}
          </Switch>
        </Router>
      </div>
    </StrictMode>
  );
}