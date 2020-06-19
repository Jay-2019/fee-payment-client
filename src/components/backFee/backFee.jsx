import React from "react";
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
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);

  const [backFeeType, setBackFeeType] = useState({});
  const [dueDate, setDueDate] = useState({});
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [feeInfo, setFeeInfo] = useState({
    subject: [],
    semester: "",
    branch: "",
    backFee: 0,
    delayFee: 0,
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
              <b>{feeInfo.backFee} Rs</b>
            </td>
          </tr>
          <tr className="table-secondary">
            <th scope="row">
              <b>Delay Fee</b>
            </th>
            <td>
              <b>{feeInfo.delayFee}Rs</b>
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
    if (
      dueDateOfSemester < new Date(Date.now()).toISOString().substring(0, 10)
    ) {
      return backFeeType.delayFee;
    }
    return 0;
  };

  const calculateFee = semester => {
    switch (semester) {
      case "First Semester":
        feeInfo.delayFee = checkDueDate(dueDate.firstSemester);
        break;
      case "Second Semester":
        feeInfo.delayFee = checkDueDate(dueDate.secondSemester);
        break;
      case "Third Semester":
        feeInfo.delayFee = checkDueDate(dueDate.thirdSemester);
        break;
      case "Fourth Semester":
        feeInfo.delayFee = checkDueDate(dueDate.fourthSemester);
        break;
      case "Fifth Semester":
        feeInfo.delayFee = checkDueDate(dueDate.fifthSemester);
        break;
      case "Sixth Semester":
        feeInfo.delayFee = checkDueDate(dueDate.sixthSemester);
        break;
      case "Seventh Semester":
        feeInfo.delayFee = checkDueDate(dueDate.seventhSemester);
        break;
      case "Eighth Semester":
        feeInfo.delayFee = checkDueDate(dueDate.eighthSemester);
        break;
      default:
        return null;
    }

    if (backFeeType.backPaper) {
      feeInfo.totalFee =
        backFeeType.totalFee * selectSubject.length + feeInfo.delayFee;
      setFeeInfo({
        subject: selectSubject,
        semester: semester,
        branch: branch,
        backFee: (backFeeType.totalFee * selectSubject.length).toFixed(2),
        delayFee: feeInfo.delayFee.toFixed(2),
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

  const reSet = () => {
    setSemester("");
    setBranch("");
    setSelectSubject([]);
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();

    const fetchData = async () => {
      const [backFeeType, dueDate] = [
        await Axios.get(
          `http://localhost:4000/feePaymentDB/getBackFeeType/${idOfBackFeeType}`,
          {
            cancelToken: source.token
          }
        ),
        await Axios.get(
          `http://localhost:4000/feePaymentDB/getBackFeeDueDate/${idOfBackFeeDueDate}`,
          {
            cancelToken: source.token
          }
        )
      ];
      setBackFeeType(backFeeType.data);
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
      setDueDate({
        firstSemester: new Date(firstSemester).toISOString().substring(0, 10),
        secondSemester: new Date(secondSemester).toISOString().substring(0, 10),
        thirdSemester: new Date(thirdSemester).toISOString().substring(0, 10),
        fourthSemester: new Date(fourthSemester).toISOString().substring(0, 10),
        fifthSemester: new Date(fifthSemester).toISOString().substring(0, 10),
        sixthSemester: new Date(sixthSemester).toISOString().substring(0, 10),
        seventhSemester: new Date(seventhSemester)
          .toISOString()
          .substring(0, 10),
        eighthSemester: new Date(eighthSemester).toISOString().substring(0, 10)
      });
    };
    fetchData();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    Axios.get(
      `http://localhost:4000/feePaymentDB/getSubject/${semester}/${branch}`,
      {
        cancelToken: source.token
      }
    )
      .then(response => {
        setSubject(response.data);
      })
      .catch(error => console.log(error.message));

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [semester, branch]);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    calculateFee(semester);
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [selectSubject]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!(semester && branch && feeInfo.subject)) {
      setSemester();
      setBranch();
      setSelectSubject();
      return window.alert("please select valid information");
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
      backFeeType: backFeeType
    };

    Axios.post(
      "http://localhost:4000/feePaymentDB/backFeePayment/" +
        props.match.params.id,
      data
    )
      .then(response => {
        return window.alert("fee submission successful");
      })
      .catch(error => console.log(error.message));
    reSet();

    setTimeout(
      () =>
        props.history.push("/backFeeReceipt/" + localStorage.getItem("token")),
      1000
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {navigationBar}
        <br />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="card border-light bg-dark text-white text-center">
              <div
                className={`card-header border-secondary ${style.backFeeTitle}`}
              >
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
                    // busy
                    data={subject}
                    autoFocus={false}
                    onChange={value => setSelectSubject(value)}
                    placeholder="Select one or more Subjects"
                  />

                  <br />
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
    </div>
  );
}
