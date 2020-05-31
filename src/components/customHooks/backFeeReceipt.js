import React from "react";
// import style from "../../style/style.module.css";
export default function useBackFeeReceipt(props) {
    const Card = ({ feeInfo, studentInfo, createdAt }) => (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-sm-12 col-md-8">
                    <div className="card border-light text-white bg-dark text-center">
                        <div className="card-header border-secondary">
                            <div className="card-title">
                                <h4>{new Date(createdAt).toLocaleDateString("en-GB")}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className={`table table-striped table-dark `}>
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
                                            <b>Course Fee</b>
                                        </th>
                                        <td>
                                            <b>{feeInfo.backFee}Rs</b>
                                        </td>
                                    </tr>
                                    <tr >
                                        <th scope="row">
                                            <b>Delay Fee</b>
                                        </th>
                                        <td>
                                            <b>{feeInfo.delayFee}Rs</b>
                                        </td>
                                    </tr>
                                    <tr >
                                        <th scope="row">
                                            <b>Total Amount</b>
                                        </th>
                                        <td>
                                            <b>{feeInfo.backFee} Rs</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-secondary text-muted">
                            {` Faculty of engineering & technology`}
                        </div>
                    </div>
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
                feeInfo={feeInfo}
                studentInfo={studentInfo}
                createdAt={data.createdAt}
            />
        });
    };

    return listReceipt();

};