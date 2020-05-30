import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigationBar, useBackFeeReceipt } from "../customHooks/index";

export default function BackFeeReceipt(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);
  const [fee, setFee] = useState(Array);
  const backFeeReceipt = useBackFeeReceipt({
    title: "Back Fee Receipt",
    fee: fee
  });

  useEffect(() => {
    Axios.get(
      "http://localhost:4000/feePaymentDB/receiptBackFee/" +
        localStorage.getItem("token")
    )
      .then(response => {
        return setFee(response.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div>
      <div>{navigationBar}</div>
      <hr />
      <div>{backFeeReceipt}</div>
    </div>
  );
}
