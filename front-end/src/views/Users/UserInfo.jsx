import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import UserDetail from '../../components/Users/UserDetail';


const UserInfo = () => {
    // Get the user ID from the URL parameters
    const { id } = useParams();

    // Find the user with the given ID in the Redux store
    const user = useSelector((state) => state?.users?.users.find((t) => t._id === id));
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1> {user?.username } Details </h1>
                </div>
                <section className="section dashboard">
                    <UserDetail user={user}/>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default UserInfo
