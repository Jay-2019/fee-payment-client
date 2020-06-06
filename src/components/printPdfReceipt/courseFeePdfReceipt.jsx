import React, { useState, useEffect } from "react";
import Axios from "axios";
import Receipt from "./receipt";
import { useNavigationBar } from "../../components/customHooks/index";

export default function CourseFeePdfReceipt(props) {
  const navigationBar = useNavigationBar();
  
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
        return setFeeData(response.data);
      })

      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.match.params.id]);

  return (
    <>
      {navigationBar}
      <hr />
      <Receipt />
    </>
  );
}
