import React from 'react'
import { StudentProfile, CourseFee } from '../../components/index';
import PrivateRoute from "./privateRoute";

const privateRoutes = (props) => {
    const routes = [
        { path: "/studentProfile", component: StudentProfile },
        // { path: "/myProfile", component: MyProfile },
        { path: "/courseFee", component: CourseFee },
    ];
    return routes.map((route, index) => {
        return <PrivateRoute key={index} path={route.path} component={() => <route.component {...props} />} />
    });
}
export default privateRoutes;