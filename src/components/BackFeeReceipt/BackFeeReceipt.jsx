import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigationBar, useBackFeeReceipt } from "../customHooks/index";
import API from "../config";

export default function BackFeeReceipt(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);
  const [isLoading, setLoading] = useState(true);
  const [fee, setFee] = useState(Array);
  const backFeeReceipt = useBackFeeReceipt({
    title: "Back Fee Receipt",
    fee: fee
  });

  // this useEffect call only when the componentDidMount
  // used for get data of list of back-fee.
  useEffect(() => {
    setLoading(true);
    Axios.get(`${API}/receiptBackFee/${localStorage.getItem("token")}`)
      .then(response => {
        if (response.status === 200 && response.data.length > 0) {
          setFee(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && response.data.length === 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "There Is No Receipt of Back Fee!!!",
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
        return setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        return setLoading(false);
      });
  }, [props.history]);

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
