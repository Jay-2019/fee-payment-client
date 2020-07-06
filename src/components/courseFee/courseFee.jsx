import React from "react";
// import { Redirect } from "react-router-dom";
import Axios from "axios";
import style from "../../style/style.module.css";
import { useNavigationBar } from "../customHooks/index";
import { useState, useEffect } from "react";
import { calculateSemesterFeeType, mapSelectedYearWithId } from "./helper";
import API from "../config";

const courseFeeDueDateId = "5ec0ec3d70f1cc05e0d9f6d8";

export default function CourseFee(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);
  const [dueDate, setDueDate] = useState({
    firstYear: "",
    secondYear: "",
    thirdYear: "",
    fourthYear: ""
  });

  const [feeMode, setFeeMode] = useState("");
  const [table, setTable] = useState(false);
  const [idOfSelectedYear, setIdOfSelectedYear] = useState("");
  const [feeTypeBasedOnFeeMode, setFeeTypeBasedOnFeeMode] = useState({});
  const [fee, setFee] = useState(0);
  const [delayFeeFine, setDelayFeeFine] = useState(0);
  const [feeInfo, setFeeInfo] = useState({
    year: "",
    feeMode: "",
    courseFee: 0,
    delayFee: 0,
    totalFee: 0
  });

  const [hideFirstYear, setHideFirstYear] = useState(false);
  const [hideSecondYear, setHideSecondYear] = useState(false);
  const [hideThirdYear, setHideThirdYear] = useState(false);
  const [hideFourthYear, setHideFourthYear] = useState(false);

  const handleFeeModeChange = e => {
    const { value } = e.target;
    if (value !== "") setFeeMode(value);
  };

  const showFeeModeOptions = (
    <div className="row">
      <div className="col ">
        <div className="form-check">
          <input
            className="form-check-input btn"
            type="radio"
            name="Year Wise"
            value="Year Wise"
            onChange={handleFeeModeChange}
            checked={feeMode === "Year Wise"}
          />
          <label className="form-check-label">Year Wise</label>
        </div>
      </div>
      <div className="col ">
        <div className="form-check">
          <input
            className="form-check-input btn"
            type="radio"
            name="Semester Wise"
            value="Semester Wise"
            onChange={handleFeeModeChange}
            checked={feeMode === "Semester Wise"}
          />
          <label className="form-check-label">Semester Wise</label>
        </div>
      </div>
    </div>
  );

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
              <b>Delay Fee</b>
            </th>
            <td>
              <b>{feeInfo.delayFee}.00 Rs</b>
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

  const checkDueDate = yearOfDueDate => {
    if (yearOfDueDate < new Date(Date.now()).toISOString().substring(0, 10)) {
      return delayFeeFine;
    }
    return 0;
  };

  const calculateYearWiseFee = idOfSelectedYear => {
    feeInfo.courseFee = fee;
    switch (idOfSelectedYear) {
      case "5ec13f8678ea5a2e0c1a6bfe":
        feeInfo.delayFee = checkDueDate(dueDate.firstYear);
        break;
      case "5ec13ffc78ea5a2e0c1a6bff":
        feeInfo.delayFee = checkDueDate(dueDate.secondYear);
        break;
      case "5ec1401078ea5a2e0c1a6c00":
        feeInfo.delayFee = checkDueDate(dueDate.thirdYear);
        break;
      case "5ec1402178ea5a2e0c1a6c01":
        feeInfo.delayFee = checkDueDate(dueDate.fourthYear);
        break;
      default:
        return null;
    }

    if (fee && delayFeeFine) {
      setFeeInfo({
        year: feeInfo.year,
        feeMode: feeMode,
        courseFee: feeInfo.courseFee,
        delayFee: feeInfo.delayFee,
        totalFee: fee + feeInfo.delayFee
      });
    }
    setTable(true);
  };

  const calculateSemesterWiseFee = () => {
    feeInfo.courseFee = fee / 2;

    if (fee && delayFeeFine) {
      setFeeInfo({
        year: feeInfo.year,
        feeMode: feeMode,
        courseFee: feeInfo.courseFee,
        delayFee: delayFeeFine,
        totalFee: fee / 2 + delayFeeFine
      });
      setTable(true);
    }
  };

  const handleYearChange = async e => {
    setTable(false);
    feeInfo.year = e.target.value;
    setIdOfSelectedYear(mapSelectedYearWithId(e.target.value));
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
      }
    }
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();

    (async () => {
      const [dueDate, validYear, validSemester] = await Promise.all([
        Axios.get(`${API}/getCourseFeeDueDate/${courseFeeDueDateId}`, {
          cancelToken: source.token
        }),
        //get year of fee is already submitted
        Axios.get(`${API}/getCourseFeeYear/${localStorage.getItem("token")}`, {
          cancelToken: source.token
        }),
        //get semester of fee is already submitted
        Axios.get(
          `${API}/getCourseFeeSemester/${localStorage.getItem("token")}`,
          { cancelToken: source.token }
        )
      ]);
      const { firstYear, secondYear, thirdYear, fourthYear } = dueDate.data;
      setDueDate({
        firstYear: new Date(firstYear).toISOString().substring(0, 10),
        secondYear: new Date(secondYear).toISOString().substring(0, 10),
        thirdYear: new Date(thirdYear).toISOString().substring(0, 10),
        fourthYear: new Date(fourthYear).toISOString().substring(0, 10)
      });
      hideOption(validYear.data);
      hideOption(validSemester.data);
    })();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [hideFirstYear, hideSecondYear, hideThirdYear, hideFourthYear]);

  // get selected year of courseFee-Type
  useEffect(() => {
    let source = Axios.CancelToken.source();
    Axios.get(`${API}/getCourseFeeType/${idOfSelectedYear}`, {
      cancelToken: source.token
    })
      .then(response => {
        const { totalFee, delayFee } = response.data;
        setDelayFeeFine(delayFee);
        setFee(totalFee);
        if (feeMode === "Year Wise") setFeeTypeBasedOnFeeMode(response.data);
        if (feeMode === "Semester Wise")
          setFeeTypeBasedOnFeeMode(calculateSemesterFeeType(response.data));
      })
      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [idOfSelectedYear, feeMode]);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    if (feeMode === "Year Wise") calculateYearWiseFee(idOfSelectedYear);

    if (feeMode === "Semester Wise") calculateSemesterWiseFee();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [fee, delayFeeFine, feeMode]);

  const handleSubmit = e => {
    e.preventDefault();
    if (feeInfo.year === "" && feeMode === "")
      return window.alert("please select valid year/fee-mode for fee payment");

    const data = {
      feeInfo: feeInfo,
      studentInfo: {
        firstName: props.parentProps.student.firstName,
        lastName: props.parentProps.student.lastName,
        fatherName: props.parentProps.student.fatherName,
        branch: props.parentProps.student.branch,
        admissionSession: props.parentProps.student.admissionSession
      },
      courseFeeType: feeTypeBasedOnFeeMode
    };

    Axios.post(`${API}/courseFeePayment/${props.match.params.id}`, data)
      .then(response => {
        if (response.status === 200) {
          window.alert("Congratulations! Fee Submission Successful");
          return props.history.push(
            `/courseFeeReceipt/${localStorage.getItem("token")}`
          );
        }

        return window.alert("Something Went Wrong!!! Please Try Again Later ");
      })
      .catch(error => console.log(error.message));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {navigationBar}
        <br />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="card border-light bg-dark text-white text-center">
              <div
                className={`card-header border-secondary ${style.courseFeeTitle}`}
              >
                <h2>Course Fee</h2>
              </div>
              <div className="card-body">
                <div>
                  <select
                    name="year"
                    type="button"
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
                  <hr />
                  <div>{showFeeModeOptions}</div>
                  <hr />
                  <div>{table ? showTable : null}</div>
                </div>
              </div>
              <div className="card-footer border-secondary text-muted">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
