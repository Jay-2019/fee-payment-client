import React from "react";
// import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import style from "../../style/style.module.css";
import { useNavigationBar } from "../customHooks/index";
import { useState, useEffect } from "react";
import { calculateSemesterFeeType, mapSelectedYearWithId } from "./helper";
import API from "../config";

const courseFeeDueDateId = "5ec0ec3d70f1cc05e0d9f6d8";

export default function CourseFee(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);

  const [isLoading, setLoading] = useState(true);
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

  //this function reset list of  state values
  const resetForm = () => {
    setFeeMode("");
    setIdOfSelectedYear("");
    setDelayFeeFine(0);
    setFeeInfo({
      year: "",
      feeMode: "",
      courseFee: 0,
      delayFee: 0,
      totalFee: 0
    });
  };

  const [hideFirstYear, setHideFirstYear] = useState(false);
  const [hideSecondYear, setHideSecondYear] = useState(false);
  const [hideThirdYear, setHideThirdYear] = useState(false);
  const [hideFourthYear, setHideFourthYear] = useState(false);

  // handler function for fee-Mode(Radio button)
  //this handler function call only when onChange event occurs.
  const handleFeeModeChange = e => {
    const { value } = e.target;
    if (value !== "") setFeeMode(value);
  };

  // Fee-Mode input Group
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
          <label className="form-check-label">
            <b>{"Year Wise"}</b>
          </label>
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
          <label className="form-check-label">
            <b>{"Semester Wise"}</b>
          </label>
        </div>
      </div>
    </div>
  );

  // Display Real Time Calculated Fee in form of Table
  // render every time when user change fee-mode.
  const showTable = (
    <div className="card-title">
      <table className={`table table-striped table-dark ${style.tableText}`}>
        <tbody>
          <tr className="table-info">
            <th scope="col">
              <b>Course Fee</b>
            </th>
            <td>
              <b>{feeInfo.courseFee} Rs.</b>
            </td>
          </tr>

          <tr className="table-warning">
            <th scope="row">
              <b>Delay Fee</b>
            </th>
            <td>
              <b>{feeInfo.delayFee} Rs.</b>
            </td>
          </tr>

          <tr className="table-success">
            <th scope="row">
              <b>Total Amount</b>
            </th>
            <td>
              <b>{feeInfo.totalFee} Rs.</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <br />
        <button type="submit" className="btn btn-block btn-outline-success">
          <i>
            <b>{" Pay Now "}</b>
          </i>
        </button>
      </div>
    </div>
  );

  // Check Due-Date/last Date of Fee Submission
  // and return the amount if due-date exceed.
  const checkDueDate = yearOfDueDate => {
    if (yearOfDueDate < new Date(Date.now()).toISOString().substring(0, 10)) {
      return delayFeeFine;
    }
    return 0;
  };

  // calculating the fee on the basis of the selected-year & Fee-Mode is yearWise
  // and set values in feeInfo state.
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
        courseFee: feeInfo.courseFee.toFixed(2),
        delayFee: feeInfo.delayFee.toFixed(2),
        totalFee: (fee + feeInfo.delayFee).toFixed(2)
      });
    }
    setTable(true);
  };

  // calculating the fee on the basis of the selected-year & Fee-Mode is semesterWise
  // and set values in feeInfo state.
  const calculateSemesterWiseFee = () => {
    feeInfo.courseFee = fee / 2;

    if (fee && delayFeeFine) {
      setFeeInfo({
        year: feeInfo.year,
        feeMode: feeMode,
        courseFee: feeInfo.courseFee.toFixed(2),
        delayFee: (delayFeeFine / 2).toFixed(2),
        totalFee: (fee / 2 + delayFeeFine).toFixed(2)
      });
      setTable(true);
    }
  };

  // handler function for Year(dropDown list)
  //this handler function call only when onChange event occurs.
  const handleYearChange = async e => {
    setTable(false);
    feeInfo.year = e.target.value;
    setIdOfSelectedYear(mapSelectedYearWithId(e.target.value));
  };

  // function check the year of fee is already submitted,
  // and particular year option during componentDidMount.
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

  // this useEffect call only when the componentDidMount
  // used for get data  course-fee-due-dates and list of branches,
  //list of years(that's fee is already submitted) and list of semester(that's fee is already submitted)
  // all apis are call in parallel.
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
      setLoading(false);
    })();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [hideFirstYear, hideSecondYear, hideThirdYear, hideFourthYear]);

  // this useEffect call only when the feeMode & idOfSelectedYear state change
  //used for calculate-fee-type based on selected fee-mode .
  useEffect(() => {
    let source = Axios.CancelToken.source();

    if (idOfSelectedYear) {
      Axios.get(`${API}/getCourseFeeType/${idOfSelectedYear}`, {
        cancelToken: source.token
      })
        .then(response => {
          if (response.status === 200 && response.data) {
            const { totalFee, delayFee } = response.data;
            setDelayFeeFine(delayFee);
            setFee(totalFee);
          }

          if (response.status === 200 && response.data === null) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            resetForm();
            return;
          }

          if (feeMode === "Year Wise") {
            setFeeTypeBasedOnFeeMode(response.data);
            setLoading(false);
            return;
          }

          if (feeMode === "Semester Wise") {
            setFeeTypeBasedOnFeeMode(calculateSemesterFeeType(response.data));
            setLoading(false);
            return;
          }
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
          resetForm();
          return setLoading(false);
        });

      return;
    }

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [idOfSelectedYear, feeMode]);

  // this useEffect call when the feeMode state change
  // used for actual calculation of course-fee.
  useEffect(() => {
    setLoading(true);
    let source = Axios.CancelToken.source();

    if (feeMode === "Year Wise") calculateYearWiseFee(idOfSelectedYear);

    if (feeMode === "Semester Wise") calculateSemesterWiseFee();

    setLoading(false);
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [fee, delayFeeFine, feeMode]);

  //  the handler function call only when the onSubmit event occurs
  //  used for actual submission of course-fee
  const handleSubmit = e => {
    e.preventDefault();
    if (feeInfo.year === "" && feeMode === "") {
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please select valid Year/Fee-Mode for fee payment.",
        showConfirmButton: true,
        timer: 5000
      });
    }

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

    setLoading(true);
    Axios.post(`${API}/courseFeePayment/${props.match.params.id}`, data)
      .then(response => {
        if (response.status === 200 && response.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congratulations!!! Fee Submission Successful :)",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(
            `/courseFeeReceipt/${localStorage.getItem("token")}`
          );
        }

        if (response.status === 200 && response.data === null) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Submission Failed!!! Please Try Again.",
            showConfirmButton: true,
            timer: 5000
          });
          resetForm();
          return setLoading(false);
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        resetForm();
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
        resetForm();
        return setLoading(false);
      });
    resetForm();
  };

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
    <form onSubmit={handleSubmit}>
      {navigationBar}
      <br />
      <div className="d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div className="card border-light bg-dark text-success text-center">
            <div
              className={`card-header text-success border-secondary ${style.courseFeeTitle}`}
            >
              <i>
                <h2> {"Course Fee "}</h2>
              </i>
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
  );
}
