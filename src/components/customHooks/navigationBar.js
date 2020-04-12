import React from 'react'
import { Link } from "react-router-dom";

export default function useNavigationBar() {
    return (
        <>

            {/* navbar navbar-dark bg-dark */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link " to={"/about"} >
                            About
                        </Link>
                        <Link className="nav-item nav-link " to={"/myProfile/" + localStorage.getItem("token")} >
                            My Profile
                        </Link>
                        <Link className="nav-item nav-link " to={"/courseFee/" + localStorage.getItem("token")} >
                            Course Fee
                        </Link>
                        <Link className="nav-item nav-link " to={"/backFee/" + localStorage.getItem("token")} >
                            Back Fee
                              </Link>
                        <Link className="nav-item nav-link " to={"/feeReceipts/" + localStorage.getItem("token")} >
                            Fee Receipt
                        </Link>
                        <Link className="nav-item nav-link " to={"/signOut"} >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
