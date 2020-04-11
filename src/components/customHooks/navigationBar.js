import React from 'react'

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
                        <a className="nav-item nav-link " href="/about">About <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/myProfile">My Profile</a>
                        <a className="nav-item nav-link" href="/courseFee">Course Fee</a>
                        <a className="nav-item nav-link" href="/backFee">Back Fee</a>
                        <a className="nav-item nav-link " href="/feeReceipts">Fee Receipts</a>
                    </div>
                </div>
            </nav>
        </>
    );
}
