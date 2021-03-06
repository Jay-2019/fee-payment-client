import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { MyReceipt } from "./index";
import { useNavigationBar } from "../../customHooks/index";
import API from "../../config";

export default function BackFeePdfReceipt(props) {
  const navigationBar = useNavigationBar(
    `${props.parentProps.student.firstName}
         ${props.parentProps.student.lastName}`
  );
  const [isLoading, setLoading] = useState(true);
  const [feeData, setFeeData] = useState();

  // this useEffect call only when the componentDidMount
  // used for get data particular back-fee.
  useEffect(() => {
    setLoading(true);
    let source = Axios.CancelToken.source();

    Axios.get(`${API}/backFeeData/${props.match.params.id}`, {
      cancelToken: source.token
    })
      .then(response => {
        console.log(response);
        if (response.status === 200 && response.data) {
          setFeeData(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && response.data === null) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Not Found!!!",
            showConfirmButton: true,
            timer: 5000
          });

          return props.history.push(
            `/backFee/${localStorage.getItem("token")}`
          );
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });

        return props.history.push(
          `/backFeeReceipt/${localStorage.getItem("token")}`
        );
      })

      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });

        return props.history.push(
          `/backFeeReceipt/${localStorage.getItem("token")}`
        );
      });

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.match.params.id, props.history]);

  return isLoading ? (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "200px" }}
    >
      <div className="row">
        <div className="col ">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="col    ">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="col ">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      {feeData ? (
        <div className="col-sm-12">
          {navigationBar}
          <hr />
          {/* render the pdf receipt */}
          <MyReceipt value={feeData} />
        </div>
      ) : null}
    </>
  );
}
