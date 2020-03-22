import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = (props) => {
    const { path, component: Component } = props;
    return <Route path={path} component={Component} />
}
export default PublicRoute;
