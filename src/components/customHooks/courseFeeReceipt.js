import React from "react";
// import style from "../../style/style.module.css";
import { Link } from 'react-router-dom';
import printIcon from '../../assets/index';

export default function useCourseFeeReceipt(props) {
    const Card = ({ feeId, feeInfo, studentInfo, createdAt }) => (

        <>
            <div className={`card border-light text-white bg-dark text-center `} >
                <div className="card-header border-secondary">
                    <div className="card-title">
                        <div className='row'>
                            <div className='col-sm-6'>
                                <h5>{new Date(createdAt).toLocaleDateString("en-GB")}</h5>
                            </div>
                            <div className='col-sm-6 '>
                                <Link to={`/courseFeePdfReceipt/${feeId}`}>
                                    <img src={printIcon} alt="Print Receipt" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h5>{`${studentInfo.firstName} ${studentInfo.lastName}`}</h5>
                        </div>
                        <div className="col">
                            <h5>{`${studentInfo.branch}`}</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h5>Year</h5>
                        </div>
                        <div className="col">
                            <h5>{feeInfo.year}</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h5>Fee Mode</h5>
                        </div>
                        <div className="col">
                            <h5>{feeInfo.feeMode}</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h5>Course Fee</h5>
                        </div>
                        <div className="col">
                            <h5>{feeInfo.courseFee}</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h5>Delay Fee</h5>
                        </div>
                        <div className="col">
                            <h5>{feeInfo.delayFee}</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h5>Total Fee</h5>
                        </div>
                        <div className="col">
                            <h5>{feeInfo.totalFee}</h5>

                        </div>
                    </div>
                </div>
                <div className="card-footer border-secondary text-muted">
                    Faculty of engineering & technology
            </div>
            </div>
            <hr />
        </>

    );

    const listReceipt = () => {
        return props.fee.map((data, index) => {
            const { feeInfo, studentInfo } = data;
            return <Card
                key={index}
                feeId={data._id}
                feeInfo={feeInfo}
                studentInfo={studentInfo}
                createdAt={data.createdAt}

            />
        });
    };

    return listReceipt();
}