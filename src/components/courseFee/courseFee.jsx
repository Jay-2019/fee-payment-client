import React from "react";
// import { Redirect } from "react-router-dom";
import Axios from "axios";
import style from "../../style/style.module.css";
import { useNavigationBar } from "../customHooks/index";
import { useState, useEffect } from "react";

const courseFeeDueDateId = "5ec0ec3d70f1cc05e0d9f6d8";

export default function CourseFee(props) {
  const navigationBar = useNavigationBar();
  const [dueDate, setDueDate] = useState({
    firstYear: "",
    secondYear: "",
    thirdYear: "",
    fourthYear: ""
  });

  const [table, setTable] = useState(false);
  const [idOfSelectedYear, setIdOfSelectedYear] = useState("");
  const [fee, setFee] = useState(0);
  const [lateFeeFine, setLateFeeFine] = useState(0);
  const [feeInfo, setFeeInfo] = useState({
    year: "",
    courseFee: 0,
    lateFee: 0,
    totalFee: 0
  });

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

  //map selected year of feeType with Id
  const mapSelectedYearWithId = year => {
    let idOfSelectedYear;
    switch (year) {
      case "First Year":
        idOfSelectedYear = "5ec13f8678ea5a2e0c1a6bfe";
        break;
      case "Second Year":
        idOfSelectedYear = "5ec13ffc78ea5a2e0c1a6bff";
        break;
      case "Third Year":
        idOfSelectedYear = "5ec1401078ea5a2e0c1a6c00";
        break;
      case "Fourth Year":
        idOfSelectedYear = "5ec1402178ea5a2e0c1a6c01";
        break;
      default:
        return null;
    }
    setIdOfSelectedYear(idOfSelectedYear);
  };

  const checkDueDate = yearOfDueDate => {
    if (yearOfDueDate < new Date().toLocaleString("en-GB")) {
      return lateFeeFine;
    }
    return 0;
  };

  const calculateFee = idOfSelectedYear => {
    feeInfo.courseFee = fee;
    switch (idOfSelectedYear) {
      case "5ec13f8678ea5a2e0c1a6bfe":
        feeInfo.lateFee = checkDueDate(dueDate.firstYear);
        break;
      case "5ec13ffc78ea5a2e0c1a6bff":
        feeInfo.lateFee = checkDueDate(dueDate.secondYear);
        break;
      case "5ec1401078ea5a2e0c1a6c00":
        feeInfo.lateFee = checkDueDate(dueDate.thirdYear);
        break;
      case "5ec1402178ea5a2e0c1a6c01":
        feeInfo.lateFee = checkDueDate(dueDate.fourthYear);
        break;
      default:
        return null;
    }

    if (fee && lateFeeFine) {
      setFeeInfo({
        year: feeInfo.year,
        courseFee: feeInfo.courseFee,
        lateFee: feeInfo.lateFee,
        totalFee: fee + feeInfo.lateFee
      });
    }
    return setTable(true);
  };

  const handleYearChange = async e => {
    setTable(false);
    feeInfo.year = e.target.value;
    mapSelectedYearWithId(e.target.value);
    calculateFee(idOfSelectedYear);
  };

  const hideOption = validFee => {
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

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchData = async () => {
      const [dueDate, validFee] = await Promise.all([
        Axios.get(
          `http://localhost:4000/feePaymentDB/getCourseFeeDueDate/${courseFeeDueDateId}`
        ),
        //get year of fee is already submitted
        Axios.get(
          `http://localhost:4000/feePaymentDB/getCourseFeeYear/${localStorage.getItem(
            "token"
          )}`
        )
      ]);
      const { firstYear, secondYear, thirdYear, fourthYear } = dueDate.data;
      setDueDate({
        firstYear: new Date(firstYear).toLocaleString("en-GB"),
        secondYear: new Date(secondYear).toLocaleString("en-GB"),
        thirdYear: new Date(thirdYear).toLocaleString("en-GB"),
        fourthYear: new Date(fourthYear).toLocaleString("en-GB")
      });
      hideOption(validFee.data);
    };
    fetchData();
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [hideFirstYear, hideSecondYear, hideThirdYear, hideFourthYear]);

  // get selected year of courseFee-Type
  useEffect(() => {
    let source = Axios.CancelToken.source();
    Axios.get(
      `http://localhost:4000/feePaymentDB/getCourseFeeType/${idOfSelectedYear}`,
      {
        cancelToken: source.token
      }
    )
      .then(response => {
        const { totalFee, delayFee } = response.data;
        setLateFeeFine(delayFee);
        return setFee(totalFee);
      })
      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [idOfSelectedYear]);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    calculateFee(idOfSelectedYear);
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [fee, lateFeeFine]);

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
