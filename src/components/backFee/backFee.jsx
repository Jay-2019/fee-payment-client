import React, { StrictMode } from "react";
import Axios from "axios";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
import style from "../../style/style.module.css";
import { useNavigationBar } from "../customHooks/index";
import { useState, useEffect } from "react";
import { arrayOfSemester, arrayOfBranch } from "../constant";

const idOfBackFeeType = "5ec376a132e3ab0f689a9d34";
const idOfBackFeeDueDate = "5ec3822919bba72e54e8651d";
export default function BackFee(props) {
  const navigationBar = useNavigationBar();

  const [backFeeType, setBackFeeType] = useState({
    totalFee: 0,
    examinationFormFee: 0,
    backPaper: 0,
    delayFee: 0
  });
  const [dueDate, setDueDate] = useState({
    firstSemester: "",
    secondSemester: "",
    thirdSemester: "",
    fourthSemester: "",
    fifthSemester: "",
    sixthSemester: "",
    seventhSemester: "",
    eighthSemester: ""
  });
  const [feeInfo, setFeeInfo] = useState({
    subject: [],
    semester: "",
    branch: "",
    backFee: 0,
    lateFee: 0,
    totalFee: 0
  });
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
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
              <b>{feeInfo.backFee} Rs</b>
            </td>
          </tr>
          <tr className="table-secondary">
            <th scope="row">
              <b>Late Fee</b>
            </th>
            <td>
              <b>{feeInfo.lateFee}Rs</b>
            </td>
          </tr>
          <tr className="table-success">
            <th scope="row">
              <b>Total Amount</b>
            </th>
            <td>
              <b>{feeInfo.totalFee} Rs</b>
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

  const checkDueDate = dueDateOfSemester => {
    if (dueDateOfSemester < new Date().toLocaleString("en-GB")) {
      return backFeeType.delayFee;
    }
    return 0;
  };

  const calculateFee = semester => {
    switch (semester) {
      case "First Semester":
        feeInfo.lateFee = checkDueDate(dueDate.firstSemester);
        break;
      case "Second Semester":
        feeInfo.lateFee = checkDueDate(dueDate.secondSemester);
        break;
      case "Third Semester":
        feeInfo.lateFee = checkDueDate(dueDate.thirdSemester);
        break;
      case "Fourth Semester":
        feeInfo.lateFee = checkDueDate(dueDate.fourthSemester);
        break;
      case "Fifth Semester":
        feeInfo.lateFee = checkDueDate(dueDate.fifthSemester);
        break;
      case "Sixth Semester":
        feeInfo.lateFee = checkDueDate(dueDate.sixthSemester);
        break;
      case "Seventh Semester":
        feeInfo.lateFee = checkDueDate(dueDate.seventhSemester);
        break;
      case "Eighth Semester":
        feeInfo.lateFee = checkDueDate(dueDate.eighthSemester);
        break;
      default:
        return null;
    }

    if (backFeeType.backPaper) {
      feeInfo.totalFee =
        backFeeType.backPaper * selectSubject.length + feeInfo.lateFee;
      setFeeInfo({
        subject: selectSubject,
        backFee: (backFeeType.backPaper * selectSubject.length).toFixed(2),
        lateFee: feeInfo.lateFee.toFixed(2),
        totalFee: feeInfo.totalFee.toFixed(2)
      });
      setTable(true);
    }
  };

  const handleSemesterChange = e => {
    setSemester(e.target.value);
  };
  const handleBranchChange = e => {
    setBranch(e.target.value);
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchData = async () => {
      const [backFeeType, dueDate] = [
        await Axios.get(
          `http://localhost:4000/feePaymentDB/getBackFeeType/${idOfBackFeeType}`
        ),
        await Axios.get(
          `http://localhost:4000/feePaymentDB/getBackFeeDueDate/${idOfBackFeeDueDate}`
        )
      ];
      const {
        totalFee,
        examinationFormFee,
        backPaper,
        delayFee
      } = backFeeType.data;
      const {
        firstSemester,
        secondSemester,
        thirdSemester,
        fourthSemester,
        fifthSemester,
        sixthSemester,
        seventhSemester,
        eighthSemester
      } = dueDate.data;
      setBackFeeType({ totalFee, examinationFormFee, backPaper, delayFee });
      setDueDate({
        firstSemester: new Date(firstSemester).toLocaleString("en-GB"),
        secondSemester: new Date(secondSemester).toLocaleString("en-GB"),
        thirdSemester: new Date(thirdSemester).toLocaleString("en-GB"),
        fourthSemester: new Date(fourthSemester).toLocaleString("en-GB"),
        fifthSemester: new Date(fifthSemester).toLocaleString("en-GB"),
        sixthSemester: new Date(sixthSemester).toLocaleString("en-GB"),
        seventhSemester: new Date(seventhSemester).toLocaleString("en-GB"),
        eighthSemester: new Date(eighthSemester).toLocaleString("en-GB")
      });
    };
    fetchData();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  useEffect(() => {
    Axios.get(
      `http://localhost:4000/feePaymentDB/getSubject/${semester}/${branch}`
    )
      .then(response => {
        setSubject(response.data);
      })
      .catch(error => console.log(error.message));
  }, [semester, branch]);

  useEffect(() => {
    calculateFee(semester);
  }, [selectSubject]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!(semester && branch && feeInfo.subject))
      return window.alert("please select valid information");
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
    <StrictMode>
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
                  name="semester"
                  className="custom-select"
                  onChange={handleSemesterChange}
                  required
                >
                  <option hidden>Select Semester...</option>
                  {arrayOfSemester.map((semester, index) => (
                    <option key={index} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
                <hr />
                <select
                  name="branch"
                  className="custom-select"
                  onChange={handleBranchChange}
                  required
                >
                  <option hidden>Select Branch...</option>
                  {arrayOfBranch.map((branch, index) => (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                <hr />
                <Multiselect
                  busy
                  data={subject}
                  autoFocus={false}
                  onChange={value => setSelectSubject(value)}
                  placeholder="Select one or more Subjects"
                />
                <br /> <br /> <br />
                <div>{table ? showTable : null}</div>
              </div>
              <br />
              <div className="card-footer text-muted">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </form>
    </StrictMode>
  );
}
