import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MedicalForm from '../../components/Medical/MedicalForm';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const MedicalEdit = () => {
    // Get the history ID from the URL parameters
    const { id } = useParams();
    const { patientId } = useParams();
    
    // Find the histories with the given ID in the Redux store
    const history = useSelector((state) => state.histories.histories.find((d) => d._id === id));
  
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>History</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-6 card pt-5 pb-5">
                            <MedicalForm history={history} isEditing={true} patientId={patientId} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default MedicalEdit
