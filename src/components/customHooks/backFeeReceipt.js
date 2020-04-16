import React from "react";
import style from "../../style/style.module.css";
export default function useBackFeeReceipt(props) {
    const Card = (feeInfo) => (
        <div className={`card border-success  text-center ${style.receiptWidth}`} >
            <div className="card-header">
                <div className="card-title">
                    <h4>{new Date(feeInfo.feeInfo.createdAt).toLocaleDateString("en-GB")}</h4>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h4>Subject</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.feeInfo.subject}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4>Course Fee</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.feeInfo.backFee}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4>Late Fee</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.feeInfo.lateFee}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4>Total Fee</h4>
                    </div>
                    <div className="col">
                        <h4>{feeInfo.feeInfo.totalFee}</h4>

                    </div>
                </div>
            </div>
            <br />
            <div className="card-footer text-muted">
                Faculty of engineering & technology
            </div>
        </div>
    )
    const listReceipt = () => {
        return props.fee.map((data, index) => {

            console.log(data.totalFee);
            return <Card key={index} feeInfo={data} />
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