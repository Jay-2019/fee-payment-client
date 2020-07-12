import React from 'react'
import {
    StudentProfile,
    CourseFee,
    BackFee,
    SignOut,
    CourseFeeReceipt,
    BackFeeReceipt,
    CourseFeePdfReceipt,
    BackFeePdfReceipt
} from '../../components/index';
import PrivateRoute from "./privateRoute";

// list of all private routes.
const privateRoutes = (props) => {
    const routes = [

        { path: "/studentProfile/:id", component: StudentProfile },
        { path: "/myProfile/:id", component: StudentProfile },
        { path: "/courseFeeReceipt/:id", component: CourseFeeReceipt },
        { path: "/backFeeReceipt/:id", component: BackFeeReceipt },
        { path: "/courseFee/:id", component: CourseFee },
        { path: "/backFee/:id", component: BackFee },
        { path: "/signOut", component: SignOut },
        { path: "/about" },
        { path: "/courseFeePdfReceipt/:id", component: CourseFeePdfReceipt },
        { path: "/backFeePdfReceipt/:id", component: BackFeePdfReceipt }
    ];

    return routes.map((route, index) => {
        return <PrivateRoute key={index} exact path={route.path} component={(prop) =>
            <route.component parentProps={props} {...prop} />
        } />
    });
}
export default privateRoutes;