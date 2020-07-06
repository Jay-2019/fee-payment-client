import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigationBar, useCourseFeeReceipt } from "../customHooks/index";
import API from "../config";

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
    Axios.get(`${API}/receiptCourseFee/${localStorage.getItem("token")}`, {
      cancelToken: source.token
    })
      .then(response => {
        if (response.status === 200 && response.data.length > 0) {
          return setFee(response.data);
        }

        if (response.status === 200 && response.data.length === 0) {
          window.alert("There Is No Receipt of Course Fee!!!");
          return props.history.push(
            `/courseFee/${localStorage.getItem("token")}`
          );
        }
      })
      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.history]);

  return (
    <div key={Math.random()}>
      <div>{navigationBar}</div>
      {/* <h4>{title}</h4> */}
      <hr />
      <div className="d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div>{courseFeeReceipt}</div>
        </div>
      </div>
    </div>
  );
}
