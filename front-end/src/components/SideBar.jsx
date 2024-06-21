import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getUser } from "../slicer/Auth"

const SideBar = () => {

    const { user } = useSelector(getUser);
    return (
        <div>
            <aside id="sidebar" class="sidebar">

                <ul class="sidebar-nav" id="sidebar-nav">
                    <li class="nav-item">
                        <Link class="nav-link txt-dec" to="/dashboard">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {user?.activeRole === process.env.REACT_APP_ROLER && (
                        <>

                            <li class="nav-item">
                                <Link class="nav-link collapsed txt-dec" data-bs-target="#components-nav" data-bs-toggle="collapse" to="/">
                                    <i class="bi bi-gem"></i><span>Drugs</span><i class="bi bi-chevron-down ms-auto"></i>
                                </Link>
                                <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to="/product-add" className='txt-dec'>
                                            <i class="bi bi-circle"></i><span>Add-Drugs</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/product-list" className='txt-dec'>
                                            <i class="bi bi-circle"></i><span>Drugs</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/categories" className='txt-dec'>
                                            <i class="bi bi-circle"></i><span>Categories</span>
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link collapsed txt-dec" data-bs-target="#components-user" data-bs-toggle="collapse" to="/">
                                    <i class="bi bi-gem"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
                                </Link>
                                <ul id="components-user" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to="/user-add" className='txt-dec'>
                                            <i class="bi bi-circle"></i><span>Register</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/user-list" className='txt-dec'>
                                            <i class="bi bi-circle"></i><span>Users</span>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li class="nav-item">
                                <Link class="nav-link collapsed txt-dec" data-bs-target="#forms-nav" data-bs-toggle="collapse" to="/">
                                    <i class="bi bi-journal-text"></i><span>Sales</span><i class="bi bi-chevron-down ms-auto"></i>
                                </Link>
                                <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to="/sales" className='txt-dec'>
                                            <i class="bi bi-circle"></i><span>sales</span>
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                        </>
                    )}

                    <li class="nav-heading">Pages</li>

                    <li class="nav-item">
                        <Link class="nav-link collapsed txt-dec" to={"/products"}>
                            <i class="bi bi-gem"></i>
                            <span>Drugs</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link collapsed txt-dec" to={"/test-list"}>
                            <i class="bi bi-gem"></i>
                            <span>Tests</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link collapsed txt-dec" to={"/sales"}>
                            <i class="bi bi-journal-text"></i><span>Orders</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link collapsed txt-dec" to={"/profile"}>
                            <i class="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>

                </ul>

            </aside>


        </div>
    )
}

export default SideBar
