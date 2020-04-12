import React from "react";

import Axios from "axios";
import { useNavigationBar } from "../customHooks/index";
import { useState } from "react";
import { subject } from "../constant";
const fee = 350;

export default function BackFee(props) {
  const navigationBar = useNavigationBar();

  const [feeInfo, setFeeInfo] = useState({
    subject: "",
    backFee: 0,
    lateFee: 0,
    totalFee: 0
  });
  const [table, setTable] = useState(false);

  const showTable = (
    <div className="card-title">
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">
              <b>Back Fee</b>
            </th>
            <td>{feeInfo.backFee}.00 Rs</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <b>Late Fee</b>
            </th>
            <td>{feeInfo.lateFee}.00 Rs</td>
          </tr>
          <tr>
            <th scope="row">
              <b>Total Amount</b>
            </th>
            <td>{feeInfo.totalFee}.00 Rs</td>
          </tr>
        </tbody>
      </table>
      <div>
        <br />
        <button type="submit" className="btn btn-primary">
          Pay Now{" "}
        </button>
      </div>
    </div>
  );

  const handleSubjectChange = e => {
    feeInfo.subject = e.target.value;
    setTable(true);
    calculateFee(feeInfo.subject);
  };

  const calculateFee = subject => {
    feeInfo.backFee = fee;

    feeInfo.totalFee = feeInfo.backFee + feeInfo.lateFee;

    setFeeInfo({
      subject: subject,
      backFee: feeInfo.backFee,
      lateFee: feeInfo.lateFee,
      totalFee: feeInfo.totalFee
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (feeInfo.subject === "")
      return window.alert("please select valid year for fee payment");
    console.log(feeInfo);
    const value = {
      feeInfo: feeInfo
    };
    Axios.post(
      "http://localhost:4000/feePaymentDB/backFeePayment/" +
        props.match.params.id,
      value
    )
      .then(response => {
        return window.alert("fee submission successful");
      })
      .catch(error => console.log(error.message));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {navigationBar}
        <br />
        <div className="d-flex justify-content-center">
          <div className="card w-75 text-center">
            <div className="card-header">
              <h2>Back Fee</h2>
            </div>
            <div className="card-body">
              <div>
                <select
                  name="subject"
                  className="custom-select"
                  onChange={handleSubjectChange}
                >
                  <option hidden>Select Subject...</option>
                  {subject.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>

                <div>
                  <br />
                  {table ? showTable : null}
                </div>
              </div>
              <br />
              <div className="card-footer text-muted">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
