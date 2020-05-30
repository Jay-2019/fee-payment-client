import React from "react";
import style from "../../style/style.module.css";
export default function useCourseFeeReceipt(props) {
    const Card = ({ feeInfo, studentInfo, createdAt }) => (

        <div className={`card border-danger bg-info text-center ${style.receiptWidth}`} >
            <div className="card-header">
                <div className="card-title">
                    <h4>{new Date(createdAt).toLocaleDateString("en-GB")}</h4>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h4>{`${studentInfo.firstName} ${studentInfo.lastName}`}</h4>
                    </div>
                    <div className="col">
                        <h4>{`${studentInfo.branch}`}</h4>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h4>Year</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.year}</h4>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h4>Course Fee</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.courseFee}</h4>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h4>Delay Fee</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.delayFee}</h4>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h4>Total Fee</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.totalFee}</h4>

                    </div>
                </div>
            </div>
        
            <div className="card-footer text-muted">
                Faculty of engineering & technology
            </div>
        </div>
    )
    const listReceipt = () => {
        return props.fee.map((data, index) => {
            const { feeInfo, studentInfo } = data;
            return <Card
                key={index}
                feeInfo={feeInfo}
                studentInfo={studentInfo}
                createdAt={data.createdAt}
            />
        });
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <ul>  {listReceipt()}</ul>
            </div>
        </>
    )
}