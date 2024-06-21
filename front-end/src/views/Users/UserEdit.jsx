import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserForm from '../../components/Users/UserForm';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const UserEdit = () => {
    // Get the user ID from the URL parameters
    const { id } = useParams();
 
    // Find the user with the given ID in the Redux store
    const user = useSelector((state) => state.users.users.find((u) => u._id === id));
  
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Edit User</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-6 card pt-5 pb-5">
                            <UserForm user={user} isEditing={true} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default UserEdit
