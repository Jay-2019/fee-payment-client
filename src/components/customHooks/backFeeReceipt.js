import React from "react";
// import style from "../../style/style.module.css";
import { Link } from 'react-router-dom';
import {printIcon} from '../../assets/index';

export default function useBackFeeReceipt(props) {
    const Card = ({ feeId, feeInfo, studentInfo, createdAt }) => (
        <>
            <div className="card border-light text-success bg-dark text-center">
                <div className="card-header border-secondary">
                    <div className="card-title text-warning">
                        <div className='row'>
                            <div className='col-sm-6'>
                                <h4>{new Date(createdAt).toLocaleDateString("en-GB")}</h4>
                            </div>
                            <div className='col-sm-6 '>
                                <Link to={`/backFeePdfReceipt/${feeId}`}>
                                    <img src={printIcon} alt="Print Receipt" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body ">
                    <table className={`table table-striped table-dark text-success `}>
                        <tbody>
                            <tr>
                                <th>
                                    {`${studentInfo.firstName} ${studentInfo.lastName}`}
                                </th>
                                <th>
                                    {`${studentInfo.branch}`}
                                </th>

                            </tr>
                            <tr>
                                <th>
                                    <b>Subjects</b>
                                </th>
                                <td>
                                    <b>
                                        {
                                            feeInfo.subject.map((subject, index) => (
                                                <p key={index}>{subject}</p>
                                            ))
                                        }
                                    </b>

                                </td>
                            </tr>

                            <tr >
                                <th scope="row">
                                    <b>Exam Mode</b>
                                </th>
                                <td>
                                    <b>{
                                        feeInfo.examMode.map((examMode, index) => (
                                            <p key={index}>{examMode}</p>
                                        ))
                                    }
                                    </b>
                                </td>
                            </tr>

                            <tr >
                                <th scope="row">
                                    <b>Course Fee</b>
                                </th>
                                <td>
                                    <b>{(feeInfo.backFee).toFixed(2)} Rs.</b>
                                </td>
                            </tr>
                            <tr >
                                <th scope="row">
                                    <b>Delay Fee</b>
                                </th>
                                <td>
                                    <b>{(feeInfo.delayFee).toFixed(2)} Rs.</b>
                                </td>
                            </tr>
                            <tr >
                                <th scope="row">
                                    <b>Total Amount</b>
                                </th>
                                <td>
                                    <b>{(feeInfo.totalFee).toFixed(2)} Rs.</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer border-secondary text-muted">
                    {` Faculty of engineering & technology`}
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

};