import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import decode from "jwt-decode";

// custom function 
import { setLogout, getUser } from "../../slicer/Auth"
import { getUsers, reseter as resetUsers } from "../../slicer/UserSlice";
import { getCategory, reseter as ResetCat } from "../../slicer/Category";
import { getProducts, reseter as ResetProd } from "../../slicer/Products";
import { getOrders, reseter as ResetOrder } from "../../slicer/Orders";
import { getDashboardData, reseter as ResetDash } from "../../slicer/Dashboard";
import { getTests, reseter as ResetTest } from "../../slicer/Test";
import { getMedicalHistories, reseter as ResetMedical } from "../../slicer/Medical";
import { getDeaths, reseter as ResetDeaths } from "../../slicer/Death";

// import Messages from './Messages'
import Notifications from './Notifications'
import Profile from './Profile'
import logo from '../../assets/img/logo.png';

const DHeaders = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector(getUser);
    const token = user?.token || null;
    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout());
            <Navigate to="/login" state={{ from: location }} replace />;

        }
        }

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/login', { state: { from: location }, replace: true });
    };

    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout());
            <Navigate to="/" state={{ from: location }} replace />;

        }
    }
    useEffect(() => {
        dispatch(getCategory());
        dispatch(ResetCat())
        dispatch(getProducts());
        dispatch(ResetProd())
        dispatch(ResetOrder())
        dispatch(ResetDash())
        dispatch(ResetDash())
        dispatch(ResetTest())
        dispatch(ResetMedical())
        dispatch(ResetDeaths())
        // const roler = process.env.REACT_APP_ROLER
        if (
            user?.activeRole !== "patient"
        ) {
            dispatch(getUsers());
            dispatch(resetUsers());
            dispatch(getDashboardData());
            dispatch(getMedicalHistories());
            dispatch(getDeaths());
        }
        if (
            user
        ) {
            dispatch(getOrders());
            dispatch(getTests());
        }
    }, [dispatch, user]);

    return (
        <header id='#header' className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logo d-flex align-items-center txt-dec">
                    <img src={logo} alt="" />
                    <span className="d-none d-lg-block">HMS</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            {/* <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="/">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
            </div> */}

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item d-block d-lg-none">
                        <Link className="nav-link nav-icon search-bar-toggle" to="/">
                            <i className="bi bi-search"></i>
                        </Link>
                    </li>

                    <Notifications />

                    {/* < Messages /> */}
                    <Profile handleLogout={handleLogout} user={user} />

                </ul>
            </nav>

        </header>
    )
}

export default DHeaders
