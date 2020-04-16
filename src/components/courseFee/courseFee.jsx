import React from "react";
// import { Redirect } from "react-router-dom";
import Axios from "axios";
import style from "../../style/style.module.css";
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

  const [feeInfo, setFeeInfo] = useState({
    year: "",
    courseFee: 0,
    lateFee: 0,
    totalFee: 0
  });
  const [table, setTable] = useState(false);

  const [validFee, setValidFee] = useState(Array);
  const [hideFirstYear, setHideFirstYear] = useState(false);
  const [hideSecondYear, setHideSecondYear] = useState(false);
  const [hideThirdYear, setHideThirdYear] = useState(false);
  const [hideFourthYear, setHideFourthYear] = useState(false);

  const showTable = (
    <div className="card-title">
      <table className={`table table-striped table-dark ${style.tableText}`}>
        <tbody>
          <tr className="table-info">
            <th scope="col">
              <b>Course Fee</b>
            </th>
            <td>
              <b>{feeInfo.courseFee}.00 Rs</b>
            </td>
          </tr>

          <tr className="table-warning">
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
        <button type="submit" className="btn  btn-outline-warning">
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
      case "First Year":
        feeInfo.lateFee = checkDueDate(firstYearDueDate);
        break;
      case "Second Year":
        feeInfo.lateFee = checkDueDate(secondYearDueDate);
        break;
      case "Third Year":
        feeInfo.lateFee = checkDueDate(thirdYearDueDate);
        break;
      case "Fourth Year":
        feeInfo.lateFee = checkDueDate(fourthYearDueDate);
        break;
      default:
        return null;
    }
    //calculate totalFee
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

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Axios.get(
      "http://localhost:4000/feePaymentDB/getCourseFeeYear/" +
        localStorage.getItem("token"),
      {
        cancelToken: source.token
      }
    )
      .then(response => {
        return setValidFee(response.data);
      })
      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [hideFirstYear, hideSecondYear, hideThirdYear, hideFourthYear]);

  useEffect(() => {
    const hideOption = () => {
      for (let data of validFee) {
        switch (data) {
          case "First Year":
            setHideFirstYear(true);
            break;
          case "Second Year":
            setHideSecondYear(true);
            break;
          case "Third Year":
            setHideThirdYear(true);
            break;
          case "Fourth Year":
            setHideFourthYear(true);
            break;
          default:
            return null;
        }
      }
    };
    hideOption();
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (feeInfo.year === "")
      return window.alert("please select valid year for fee payment");

    Axios.post(
      "http://localhost:4000/feePaymentDB/courseFeePayment/" +
        props.match.params.id,
      feeInfo
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
          <div className="card border-warning bg-dark text-white w-75 text-center">
            <div className={`card-header ${style.courseFeeTitle}`}>
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
                    <option value="First Year">{`1st Year`} </option>
                  )}
                  {hideSecondYear ? (
                    <option hidden>{`2nd Year`}</option>
                  ) : (
                    <option value="Second Year">{`2nd Year`} </option>
                  )}
                  {hideThirdYear ? (
                    <option hidden>{`3rd Year`}</option>
                  ) : (
                    <option value="Third Year">{`3rd Year`} </option>
                  )}
                  {hideFourthYear ? (
                    <option hidden>{`4th Year`}</option>
                  ) : (
                    <option value="Fourth Year">{`4th Year`} </option>
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
