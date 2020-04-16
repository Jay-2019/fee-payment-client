import React from "react";
import Axios from "axios";
import style from "../../style/style.module.css";
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
      <table className={`table table-striped table-dark ${style.tableText}`}>
        <tbody>
          <tr className="table-info">
            <th scope="col">
              <b>Back Fee</b>
            </th>
            <td>
              <b>{feeInfo.backFee}.00 Rs</b>
            </td>
          </tr>
          <tr className="table-secondary">
            <th scope="row">
              <b>Late Fee</b>
            </th>
            <td>
              <b>{feeInfo.lateFee}.00 Rs</b>
            </td>
          </tr>
          <tr className="table-success">
            <th scope="row">
              <b>Total Amount</b>
            </th>
            <td>
              <b>{feeInfo.totalFee}.00 Rs</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <br />
        <button type="submit" className="btn  btn-outline-danger">
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

    Axios.post(
      "http://localhost:4000/feePaymentDB/backFeePayment/" +
        props.match.params.id,
      feeInfo
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
          <div className="card border-danger bg-dark text-white w-75 text-center">
            <div className={`card-header ${style.backFeeTitle}`}>
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
