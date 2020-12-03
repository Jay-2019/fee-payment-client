import React from "react";
// import style from "../../style/style.module.css";
import { Link } from 'react-router-dom';
import {printIcon} from '../../assets/index';

export default function useCourseFeeReceipt(props) {
    const Card = ({ feeId, feeInfo, studentInfo, createdAt }) => (
        <>
            <div className={`card border-light text-success bg-dark text-center `} >
                <div className="card-header border-secondary">
                    <div className="card-title text-warning">
                        <div className='row'>
                            <div className='col-sm-6 '>
                                <h4>{new Date(createdAt).toLocaleDateString("en-GB")}</h4>
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
                            <b>{`${studentInfo.firstName} ${studentInfo.lastName}`}</b>
                        </div>
                        <div className="col">
                            <b>{`${studentInfo.branch}`}</b>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <b>Year</b>
                        </div>
                        <div className="col">
                            <b>{feeInfo.year}</b>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <b>Fee Mode</b>
                        </div>
                        <div className="col">
                            <b>{feeInfo.feeMode}</b>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <b>Course Fee</b>
                        </div>
                        <div className="col">
                            <b>{(feeInfo.courseFee).toFixed(2)} Rs.</b>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <b>Delay Fee</b>
                        </div>
                        <div className="col">
                            <b>{(feeInfo.delayFee).toFixed(2)} Rs.</b>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <b>Total Fee</b>
                        </div>
                        <div className="col">
                            <b>{(feeInfo.totalFee).toFixed(2)} Rs.</b>

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