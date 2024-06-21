import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import DeathDetail from '../../components/Death/DeathDetail';


const DeathInfo = () => {
    // Get the death ID from the URL parameters
    const { id } = useParams();

    // Find the death with the given ID in the Redux store
    const death = useSelector((state) => state.deaths.deaths.find((d) => d._id === id));
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Death Detail</h1>
                </div>
                <section className="section dashboard">
                    <DeathDetail death={death}/>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default DeathInfo
