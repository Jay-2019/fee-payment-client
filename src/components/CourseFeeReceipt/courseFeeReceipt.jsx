import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigationBar, useFeeReceipt } from "../customHooks/index";

// const title = "Course Fee Receipt";
export default function CourseFeeReceipt(props) {
  const navigationBar = useNavigationBar();
  const [fee, setFee] = useState(Array);
  useEffect(() => {
    Axios.get(
      "http://localhost:4000/feePaymentDB/receiptCourseFee/" +
        localStorage.getItem("token")
    )
      .then(response => {
        return setFee(response.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  const courseFeeReceipt = useFeeReceipt({
    title: "Course Fee Receipt",
    fee: fee
  });
  console.log(fee);
  return (
    <div>
      <div>{navigationBar}</div>
      <br />
      <div>{courseFeeReceipt}</div>
      {/* <div>{fee}</div> */}
    </div>
  );
}
