import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigationBar, useBackFeeReceipt } from "../customHooks/index";

export default function BackFeeReceipt(props) {
  const navigationBar = useNavigationBar();
  const [fee, setFee] = useState(Array);
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

  const backFeeReceipt = useBackFeeReceipt({
    title: "Back Fee Receipt",
    fee: fee
  });
  console.log(fee);
  return (
    <div>
      <div>{navigationBar}</div>
      <br />
      <div>{backFeeReceipt}</div>
      {/* <div>{fee}</div> */}
    </div>
  );
}
