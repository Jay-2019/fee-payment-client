import React from 'react'
import { Link } from "react-router-dom";

export default function useNavigationBar(props) {

    return (
        <>
            {/* navbar navbar-dark bg-dark */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <b>
                    <a className="navbar-brand" href={"/myProfile/" + localStorage.getItem("token")} >{props}</a>
                </b>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" collapse navbar-collapse" id="navbarNavAltMarkup">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className=" navbar-nav">
                        <Link className="nav-item nav-link " to={"/about"} >
                            <b>About</b>
                        </Link>
                        <Link className="nav-item nav-link " to={"/myProfile/" + localStorage.getItem("token")} >
                            <b>My Profile</b>
                        </Link>
                        <Link className="nav-item nav-link " to={"/courseFee/" + localStorage.getItem("token")} >
                            <b>  Course Fee</b>
                        </Link>
                        <Link className="nav-item nav-link " to={"/backFee/" + localStorage.getItem("token")} >
                            <b> Back Fee</b>
                        </Link>
                        <Link className="nav-item nav-link " to={"/courseFeeReceipt/" + localStorage.getItem("token")} >
                            <b>  Course Fee Receipt</b>
                        </Link>
                        <Link className="nav-item nav-link " to={"/backFeeReceipt/" + localStorage.getItem("token")} >
                            <b> Back Fee Receipt</b>
                        </Link>
                        <Link className="nav-item nav-link " to={"/signOut"} >
                            <b> Sign Out</b>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
