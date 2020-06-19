import React, { useState, useEffect } from "react";
import Axios from "axios";
import MyReceipt from "./receipt";
import { useNavigationBar } from "../../components/customHooks/index";

export default function CourseFeePdfReceipt(props) {
  const navigationBar = useNavigationBar(
    `${props.parentProps.student.firstName}
    ${props.parentProps.student.lastName}`
  );

  const [feeData, setFeeData] = useState({});

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Axios.get(
      `http://localhost:4000/feePaymentDB/courseFeeData/${props.match.params.id}`,
      {
        cancelToken: source.token
      }
    )
      .then(response => {
        setFeeData(response.data);
      })

      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.match.params.id]);

  return (
    <div className="col-sm-12">
      {navigationBar}
      <hr />
      <MyReceipt />
    </div>
  );
}
