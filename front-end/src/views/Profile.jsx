import React from 'react';
import { useSelector } from 'react-redux';
// custom function 
import {getUser } from "../slicer/Auth"
import DHeaders from '../components/Heads/DHeaders';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import UserDetail from '../components/Profile/UserDetail';
import ProfileOverview from '../components/Profile/ProfileOverview';
import ProfileEdit from '../components/Profile/ProfileEdit';
import ProfileSetting from '../components/Profile/ProfileSetting';
import ChangePassword from '../components/Profile/ChangePassword';




const Profile = () => {
    const { user } = useSelector(getUser);
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Profile</h1>
                </div>

                <section class="section profile">
                    <div class="row">
                        <UserDetail  user={user}/>

                        <div class="col-xl-8">
                            <div class="card">
                                <div class="card-body pt-3">
                                    <ul class="nav nav-tabs nav-tabs-bordered">

                                        <li class="nav-item">
                                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                        </li>

                                        <li class="nav-item">
                                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                        </li>

                                        <li class="nav-item">
                                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                                        </li>

                                        <li class="nav-item">
                                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content pt-2">
                                        <ProfileOverview user={user} />
                                        <ProfileEdit user={user}/>
                                        <ProfileSetting />
                                        <ChangePassword user={user}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <SideBar user={user}/>
            <Footer />
        </>
    )
}

export default Profile

