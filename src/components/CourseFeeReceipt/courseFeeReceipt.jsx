import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigationBar, useCourseFeeReceipt } from "../customHooks/index";

// const title = "Course Fee Receipt";
export default function CourseFeeReceipt(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);
  const [fee, setFee] = useState(Array);
  const courseFeeReceipt = useCourseFeeReceipt({
    title: "Course Fee Receipt",
    fee: fee
  });

  useEffect(() => {
    let source = Axios.CancelToken.source();
    Axios.get(
      "http://localhost:4000/feePaymentDB/receiptCourseFee/" +
        localStorage.getItem("token"),
      {
        cancelToken: source.token
      }
    )
      .then(response => {
        return setFee(response.data);
      })
      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return (
    <div>
      <div>{navigationBar}</div>
      {/* <h4>{title}</h4> */}
      <hr />
      <div>{courseFeeReceipt}</div>
    </div>
  );
}
