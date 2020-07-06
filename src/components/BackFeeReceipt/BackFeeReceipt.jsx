import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigationBar, useBackFeeReceipt } from "../customHooks/index";
import API from "../config";

export default function BackFeeReceipt(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);
  const [fee, setFee] = useState(Array);
  const backFeeReceipt = useBackFeeReceipt({
    title: "Back Fee Receipt",
    fee: fee
  });

  useEffect(() => {
    Axios.get(`${API}/receiptBackFee/${localStorage.getItem("token")}`)
      .then(response => {
        if (response.status === 200 && response.data.length > 0) {
          return setFee(response.data);
        }

        if (response.status === 200 && response.data.length === 0) {
          window.alert("There Is No Receipt of Back Fee!!!");
          return props.history.push(
            `/backFee/${localStorage.getItem("token")}`
          );
        }
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div>
      <div>{navigationBar}</div>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div>{backFeeReceipt}</div>
        </div>
      </div>
    </div>
  );
}
