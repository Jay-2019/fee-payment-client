import React from 'react'
import { StudentProfile, CourseFee, BackFee, SignOut, CourseFeeReceipt, BackFeeReceipt } from '../../components/index';
import PrivateRoute from "./privateRoute";

const privateRoutes = (props) => {
    const routes = [
        { path: "/studentProfile/:id", component: StudentProfile },
        // { path: "/myProfile", component: MyProfile },
        { path: "/courseFeeReceipt/:id", component: CourseFeeReceipt },
        { path: "/backFeeReceipt/:id", component: BackFeeReceipt },
        { path: "/courseFee/:id", component: CourseFee },
        { path: "/backFee/:id", component: BackFee },
        { path: "/signOut", component: SignOut },
    ];
    return routes.map((route, index) => {
        return <PrivateRoute key={index} path={route.path} component={(prop) => <route.component {...prop} />} />
    });
}
export default privateRoutes;