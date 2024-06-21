import React from 'react';
import { useParams } from 'react-router-dom';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import DeathForm from '../../components/Death/DeathForm';

const DeathAdd = () => {
    const { patientId } = useParams();
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Deaths</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-6 card pt-5 pb-5">
                            <DeathForm isEditing={false} patientId={patientId}/>
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default DeathAdd
