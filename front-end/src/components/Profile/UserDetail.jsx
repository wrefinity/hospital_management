import React from 'react';
import avatar from "../../assets/img/avatar.png";

const UserDetail = ({ user }) => {
    return (
        <div class="col-xl-4">

            <div class="card">
                <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

                    <img src={user?.profile?.image || avatar} alt="Profile" class="rounded-circle" />
                    <h2>{user?.username}</h2>
                    <h3>{user?.email}</h3>
                </div>
            </div>

        </div>
    )
}

export default UserDetail
