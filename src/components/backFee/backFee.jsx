import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
import style from "../../style/style.module.css";
import { useNavigationBar } from "../customHooks/index";
import { arrayOfSemester } from "../constant";
import { calculateFeeBasedOnExamMode } from "./helper";
import API from "../config";

const idOfBackFeeType = "5ec376a132e3ab0f689a9d34";
const idOfBackFeeDueDate = "5ec3822919bba72e54e8651d";

export default function BackFee(props) {
  const navigationBar = useNavigationBar(props.parentProps.student.firstName);

  const [isLoading, setLoading] = useState(true);
  const [backFeeType, setBackFeeType] = useState({});
  const [backFeeTypeBasedOnExamMode, setBackFeeTypeBasedOnExamMode] = useState(
    {}
  );
  const [dueDate, setDueDate] = useState({});
  const [arrayOfBranch, setArrayOfBranch] = useState([]);
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [feeInfo, setFeeInfo] = useState({
    subject: [],
    semester: "",
    branch: "",
    examMode: [],
    backFee: 0,
    delayFee: 0,
    totalFee: 0
  });

  const [examMode, setExamMode] = useState([]);
  const [table, setTable] = useState(false);

  // handler function for examMode(checkBox button)
  //this handler function call only when onChange event occurs.
  const handleExamMode = e => {
    const { value } = e.target;
    if (!examMode.includes(value)) return setExamMode([...examMode, value]);
    if (examMode.includes(value)) {
      setExamMode(examMode.filter(data => data !== value));
    }
  };

  // Exam-Mode input Group
  const showExamMode = (
    <div className="row">
      <div className="col ">
        <input
          className="form-check-input btn btn-outline-danger"
          type="checkbox"
          value="Internal"
          onChange={handleExamMode}
          checked={examMode.includes("Internal")}
        />
        <label className="form-check-label">
          <b>{"Internal"}</b>
        </label>
      </div>

      <div className="col">
        <input
          className="form-check-input btn"
          type="checkbox"
          value="External"
          onChange={handleExamMode}
          checked={examMode.includes("External")}
        />
        <label className="form-check-label">
          <b>{"External"}</b>
        </label>
      </div>
    </div>
  );

  // Display Real Time Calculated Fee in form of Table
  // render every time when user change Branch, Semester or No of Subjects.
  const showTable = (
    <div className="card-title">
      <table className={`table table-striped table-dark ${style.tableText}`}>
        <tbody>
          <tr className="table-info">
            <th scope="col">
              <b>Back Fee</b>
            </th>
            <td>
              <b>{feeInfo.backFee} Rs.</b>
            </td>
          </tr>
          <tr className="table-secondary">
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
            <b>{"Pay Now"}</b>
          </i>
        </button>
      </div>
    </div>
  );

  // Check Due-Date/last Date of Fee Submission
  // and return the amount if due-date exceed.
  const checkDueDate = dueDateOfSemester => {
    if (
      dueDateOfSemester < new Date(Date.now()).toISOString().substring(0, 10)
    ) {
      return backFeeType.delayFee;
    }
    return 0;
  };

  // calculating the fee on the basis of the Semester/Branch,
  // Exam-Mode and  number of selected subjects -
  // and set values in feeInfo state.
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

    if (backFeeTypeBasedOnExamMode.totalFee) {
      feeInfo.backFee = backFeeTypeBasedOnExamMode.totalFee;
      feeInfo.totalFee = backFeeTypeBasedOnExamMode.totalFee + feeInfo.delayFee;

      setFeeInfo({
        subject: selectSubject,
        semester: semester,
        branch: branch,
        examMode: examMode,
        backFee: feeInfo.backFee.toFixed(2),
        delayFee: feeInfo.delayFee.toFixed(2),
        totalFee: feeInfo.totalFee.toFixed(2)
      });
    }
    if (examMode.length > 0) {
      setTable(true);
    }
    if (examMode.length === 0) {
      setTable(false);
    }
  };

  // handler function for semester(dropDown list)
  //this handler function call only when onChange event occurs.
  const handleSemesterChange = e => {
    setSemester(e.target.value);
  };

  // handler function for branch(dropDown list)
  //this handler function call only when onChange event occurs.
  const handleBranchChange = e => {
    setBranch(e.target.value);
  };

  //this function reset list of  state values
  const resetForm = () => {
    setTable(false);
    setSemester("");
    setBranch("");
    setSelectSubject([]);
    setFeeInfo({
      subject: [],
      semester: "",
      branch: "",
      examMode: [],
      backFee: 0,
      delayFee: 0,
      totalFee: 0
    });
  };

  // this useEffect call only when the componentDidMount
  // used for get data of back-fee-type, back-fee-due-dates and list of branches
  // all apis are call in parallel.
  useEffect(() => {
    let source = Axios.CancelToken.source();

    (async () => {
      const [backFeeType, dueDate, branchName] = [
        await Axios.get(`${API}/getBackFeeType/${idOfBackFeeType}`, {
          cancelToken: source.token
        }),
        await Axios.get(`${API}/getBackFeeDueDate/${idOfBackFeeDueDate}`, {
          cancelToken: source.token
        }),
        await Axios.get(`${API}/getBranch`, {
          cancelToken: source.token
        })
      ];

      if (!(backFeeType.data && dueDate.data && branchName.data)) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        return setLoading(false);
      }

      if (backFeeType.data && dueDate.data && branchName.data) {
        setArrayOfBranch(branchName.data);
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
          secondSemester: new Date(secondSemester)
            .toISOString()
            .substring(0, 10),
          thirdSemester: new Date(thirdSemester).toISOString().substring(0, 10),
          fourthSemester: new Date(fourthSemester)
            .toISOString()
            .substring(0, 10),
          fifthSemester: new Date(fifthSemester).toISOString().substring(0, 10),
          sixthSemester: new Date(sixthSemester).toISOString().substring(0, 10),
          seventhSemester: new Date(seventhSemester)
            .toISOString()
            .substring(0, 10),
          eighthSemester: new Date(eighthSemester)
            .toISOString()
            .substring(0, 10)
        });
        setLoading(false);
        return;
      }
    })();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  // this useEffect call only when the semester & branch state change
  // used for get the list of subjects on the basis of selected branch and subjects.
  useEffect(() => {
    let source = Axios.CancelToken.source();

    if (semester && branch) {
      setLoading(true);
      Axios.get(`${API}/getSubject/${semester}/${branch}`, {
        cancelToken: source.token
      })
        .then(response => {
          if (response.status === 200 && response.data) {
            setSubject(response.data);
            return;
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
          setLoading(false);
          return;
        });
      setLoading(false);
    }
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [semester, branch]);

  // this useEffect call when the exam-mode or selected-subjected state change
  // used for calculate-fee-type based on selected exam-mode and number of selected-subjects.
  useEffect(() => {
    setLoading(true);
    let source = Axios.CancelToken.source();

    if (examMode.length === 0) {
      setFeeInfo({
        subject: [],
        examMode: [],
        backFee: 0,
        delayFee: 0,
        totalFee: 0
      });
      setTable(false);
    }

    setBackFeeTypeBasedOnExamMode(
      calculateFeeBasedOnExamMode(examMode, selectSubject, backFeeType)
    );
    setLoading(false);
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [examMode, selectSubject]);

  // this useEffect call when the backFeeTypeBasedOnExamMode state change
  // used for actual calculation of back-fee.
  useEffect(() => {
    setLoading(true);
    let source = Axios.CancelToken.source();
    calculateFee(semester);
    setLoading(false);
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [backFeeTypeBasedOnExamMode]);

  //  the handler function call only when the onSubmit event occurs 
  //  used for actual submission of back-fee
  const handleSubmit = e => {
    e.preventDefault();

    if (!(semester && branch && feeInfo.subject)) {
      setSemester();
      setBranch();
      setSelectSubject();
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please select valid information.",
        showConfirmButton: true,
        timer: 2000
      });
    }

    if (examMode.length === 0) {
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please select valid Exam Mode.",
        showConfirmButton: true,
        timer: 2000
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
      backFeeType: backFeeTypeBasedOnExamMode
    };

    setLoading(true);
    Axios.post(`${API}/backFeePayment/${props.match.params.id}`, data)
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
            `/backFeeReceipt/${localStorage.getItem("token")}`
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
          setLoading(false);
          return;
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
    <div>
      <form onSubmit={handleSubmit}>
        {navigationBar}
        <br />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="card border-light bg-dark text-success text-center">
              <div
                className={`card-header text-success border-secondary ${style.backFeeTitle}`}
              >
                <i>
                  <b>
                    <h2> {"Back Fee"}</h2>
                  </b>
                </i>
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
                    data={subject}
                    autoFocus={false}
                    onChange={value => setSelectSubject(value)}
                    placeholder="Select one or more Subjects"
                  />

                  <hr />
                  <div> {selectSubject.length > 0 ? showExamMode : null}</div>

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
    </div>
  );
}
