import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import MedicalDetail from '../../components/Medical/MedicalDetail';


const MedicalInfo = () => {
    // Get the history ID from the URL parameters
    const { id } = useParams();

    // Find the history with the given ID in the Redux store
    const histories = useSelector((state) => state.histories.histories.find((h) => h._id === id));
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Medical History Detail</h1>
                </div>
                <section className="section dashboard">
                    <MedicalDetail histories={histories}/>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default MedicalInfo
