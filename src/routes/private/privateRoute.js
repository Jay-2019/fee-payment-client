import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
    const { path, component: Component } = props;
    return <Route path={path} component={props => {
        if (localStorage.getItem("token")) {
            return <Component {...props} />;
        }
        return <Redirect to={{
            pathname: "./studentSignIn",
        }}
        />
    }} />;
}
export default PrivateRoute;
