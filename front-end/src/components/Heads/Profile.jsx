import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/img/avatar.png';

const Profile = ({handleLogout, user}) => {
    return (
        <>
            <li className="nav-item dropdown pe-3">

                <Link className="nav-link nav-profile d-flex align-items-center pe-0 txt-dec" to="/" data-bs-toggle="dropdown">
                    <img src={user?.profile?.image || avatar} alt="Profile" className="rounded-circle" />

                    
                    <span className="d-none d-md-block dropdown-toggle ps-2">{user?.username}</span>
                </Link>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li className="dropdown-header">
                        <h6> {user?.username}</h6>
                        <span>{user?.email}</span>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li>
                        <Link className="dropdown-item d-flex align-items-center txt-dec" to="/profile">
                            <i className="bi bi-person"></i>
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li>
                        <Link className="dropdown-item d-flex align-items-center txt-dec" to="/">
                            <i className="bi bi-gear"></i>
                            <span>Account Settings</span>
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li>
                        <Link className="dropdown-item d-flex align-items-center txt-dec" to="/">
                            <i className="bi bi-question-circle"></i>
                            <span>Need Help?</span>
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li>
                        <Link className="dropdown-item d-flex align-items-center txt-dec" onClick={(e)=>handleLogout()}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Sign Out</span>
                        </Link>
                    </li>

                </ul>
            </li>
        </>
    )
}

export default Profile