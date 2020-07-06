import React, { useState, useEffect } from "react";
import Axios from "axios";
import { MyReceipt } from "./index";
import { useNavigationBar } from "../../customHooks/index";
import API from "../../config";

export default function CourseFeePdfReceipt(props) {
  const navigationBar = useNavigationBar(
    `${props.parentProps.student.firstName}
         ${props.parentProps.student.lastName}`
  );

  const [feeData, setFeeData] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Axios.get(`${API}/courseFeeData/${props.match.params.id}`, {
      cancelToken: source.token
    })
      .then(response => {
       if (response.status === 200) {
        return setFeeData(response.data);
        }

        return window.alert(
          "Something Went Wrong!!! Please Try After Sometime "
        );
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
