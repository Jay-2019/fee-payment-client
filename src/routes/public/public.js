import React from 'react'
import { StudentSignUp, StudentSignIn } from '../../components/index';
import PublicRoute from "./publicRoute";

const publicRoutes = (props) => {
    const routes = [
        // { path: "/", component: StudentSignUp },
        { path: "/studentSignUp", component: StudentSignUp },
        { path: "/studentSignIn", component: StudentSignIn },

    ];
    return routes.map((route, index) => {
        return <PublicRoute key={index} path={route.path} component={(prop) =>
            <route.component setStudent={props} {...prop} />
        } />
    });
}
export default publicRoutes;