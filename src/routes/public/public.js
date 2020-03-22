import React from 'react'
import { studentSignUp, studentSignIn } from '../../components/index';
import PublicRoute from "./publicRoute";

const PublicRoutes = () => {
    const routes = [
        { path: "/studentSignUp", component: studentSignUp },
        { path: "/studentSignIn", component: studentSignIn },
        { path: "/", component: studentSignIn }
    ];
    return routes.map((route, index) => {
        return <PublicRoute key={index} path={route.path} component={route.component} />
    });
}
export default PublicRoutes;