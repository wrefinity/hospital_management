import React from 'react';
import {useSelector} from 'react-redux'
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import MedicalTable from '../../components/Medical/MedicalTable';
import { selectAllHistories } from '../../slicer/Medical';



const MedicalList = () => {
    const histories = useSelector(selectAllHistories);
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Medical Histories</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <MedicalTable histories={histories} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default MedicalList
