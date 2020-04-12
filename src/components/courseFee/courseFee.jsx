import React from "react";

import Axios from "axios";
import { useNavigationBar } from "../customHooks/index";
import { useState, useEffect } from "react";
const fee = 56_205;
const lateFeeFine = 2000;
// (YYYY, MM, DD, Hr, Min, Sec) (India Standard Time)
const firstYearDueDate = new Date(2020, 3, 7, 11, 45, 55);
const secondYearDueDate = new Date(2021, 3, 7, 11, 45, 55);
const thirdYearDueDate = new Date(2022, 3, 7, 11, 45, 55);
const fourthYearDueDate = new Date(2019, 3, 7, 11, 45, 55);

export default function CourseFee(props) {
  const navigationBar = useNavigationBar();
  const [validFee, setValidFee] = useState(Array);
  const [hideFirstYear, setHideFirstYear] = useState(false);
  const [hideSecondYear, setHideSecondYear] = useState(false);
  const [hideThirdYear, setHideThirdYear] = useState(false);
  const [hideFourthYear, setHideFourthYear] = useState(false);
  const hideOption = () => {
    for (let data of validFee) {
      switch (data) {
        case "firstYear":
          setHideFirstYear(true);
          break;
        case "secondYear":
          setHideSecondYear(true);
          break;
        case "thirdYear":
          setHideThirdYear(true);
          break;
        case "fourthYear":
          setHideFourthYear(true);
          break;
        default:
          return null;
      }
    }
  };

  useEffect(() => {
    loadCourseFeeYear();
    hideOption();
  });

  const loadCourseFeeYear = () => {
    Axios.get(
      "http://localhost:4000/feePaymentDB/getCourseFeeYear/" +
        props.match.params.id
    )
      .then(response => {
        return setValidFee(response.data);
      })
      .catch(error => console.log(error.message));
  };

  const [feeInfo, setFeeInfo] = useState({
    year: "",
    courseFee: 0,
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
              <b>Course Fee</b>
            </th>
            <td>{feeInfo.courseFee}.00 Rs</td>
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

  const handleYearChange = e => {
    feeInfo.year = e.target.value;
    setTable(true);
    calculateFee(feeInfo.year);
  };

  const calculateFee = year => {
    feeInfo.courseFee = fee;

    switch (year) {
      case "firstYear":
        feeInfo.lateFee = checkDueDate(firstYearDueDate);
        break;
      case "secondYear":
        feeInfo.lateFee = checkDueDate(secondYearDueDate);
        break;
      case "thirdYear":
        feeInfo.lateFee = checkDueDate(thirdYearDueDate);
        break;
      case "fourthYear":
        feeInfo.lateFee = checkDueDate(fourthYearDueDate);
        break;
      default:
        return null;
    }

    feeInfo.totalFee = feeInfo.courseFee + feeInfo.lateFee;

    setFeeInfo({
      year: feeInfo.year,
      courseFee: feeInfo.courseFee,
      lateFee: feeInfo.lateFee,
      totalFee: feeInfo.totalFee
    });
  };

  const checkDueDate = yearOfDueDate => {
    if (yearOfDueDate < Date.now()) return lateFeeFine;
    return 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (feeInfo.year === "")
      return window.alert("please select valid year for fee payment");
    console.log(props.match.params.id);
    const value = {
      feeInfo: feeInfo
    };
    Axios.post(
      "http://localhost:4000/feePaymentDB/courseFeePayment/" +
        props.match.params.id,
      value
    )
      .then(response => {
        return window.alert("fee submission successful");
      })
      .catch(error => console.log(error.message));
    props.history.push("/courseFee/" + localStorage.getItem("token"));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {navigationBar}
        <br />
        <div className="d-flex justify-content-center">
          <div className="card w-75 text-center">
            <div className="card-header">
              <h2>Course Fee</h2>
            </div>
            <div className="card-body">
              <div>
                <select
                  name="year"
                  className="custom-select"
                  onChange={handleYearChange}
                >
                  <option hidden>Select Year...</option>
                  {hideFirstYear ? (
                    <option hidden>{`1st Year`}</option>
                  ) : (
                    <option value="firstYear">{`1st Year`} </option>
                  )}

                  {hideSecondYear ? (
                    <option hidden>{`2nd Year`}</option>
                  ) : (
                    <option value="secondYear">{`2nd Year`} </option>
                  )}
                  {hideThirdYear ? (
                    <option hidden>{`3rd Year`}</option>
                  ) : (
                    <option value="thirdYear">{`3rd Year`} </option>
                  )}
                  {hideFourthYear ? (
                    <option hidden>{`4th Year`}</option>
                  ) : (
                    <option value="fourthYear">{`4th Year`} </option>
                  )}
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
