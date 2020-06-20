import React, { useState, useEffect } from "react";
import Axios from "axios";
import { MyReceipt } from "./index";
import { useNavigationBar } from "../../customHooks/index";

export default function CourseFeePdfReceipt(props) {
  const navigationBar = useNavigationBar(
    `${props.parentProps.student.firstName}
         ${props.parentProps.student.lastName}`
  );

  const [feeData, setFeeData] = useState();

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
    <>
      {feeData ? (
        <div className="col-sm-12">
          {navigationBar}
          <hr />
          <MyReceipt value={feeData} />
        </div>
      ) : null}
    </>
  );
}
