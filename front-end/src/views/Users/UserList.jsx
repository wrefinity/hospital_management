import React from 'react';
import {useSelector} from 'react-redux'
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import { fetchUsers } from '../../slicer/UserSlice';
import UserTable from '../../components/Users/UserTable';



const UserList = () => {
    const users = useSelector(fetchUsers);
    const user = useSelector(state =>  state?.auth?.user );
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Users Record's </h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <UserTable users={users} role={user?.activeRole} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default UserList
