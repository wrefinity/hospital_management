import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TestForm from '../../components/Tests/TestForm';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const TestEdit = () => {
    // Get the test ID from the URL parameters
    const { id } = useParams();
    const { patientId } = useParams();
    
    // Find the test with the given ID in the Redux store
    const test = useSelector((state) => state.tests.tests.find((d) => d._id === id));
  
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Test</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-6 card pt-5 pb-5">
                            <TestForm test={test} isEditing={true} patientId={patientId} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default TestEdit
