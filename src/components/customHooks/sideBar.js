import React from 'react';
import style from "../../style/sideBar.module.css";

export default function useSideBar() {
    return (
        <div>
            <div className={style.sideNav}>
                <a href="/about">About</a>
                <a href="/courseFee">Course Fee</a>
                <a href="/backFee">Back Fee</a>
                <a href="/feeReceipt">Fee Receipts</a>
            </div>
        </div>
    )
}