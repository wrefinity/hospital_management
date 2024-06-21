import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DeathForm from '../../components/Death/DeathForm';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const DeathEdit = () => {
    // Get the death ID from the URL parameters
    const { id } = useParams();
    const { patientId } = useParams();
    
    // Find the death with the given ID in the Redux store
    const death = useSelector((state) => state.deaths.deaths.find((d) => d._id === id));
  
    return (

        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Death</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-6 card pt-5 pb-5">
                            <DeathForm death={death} isEditing={true} patientId={patientId} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default DeathEdit
