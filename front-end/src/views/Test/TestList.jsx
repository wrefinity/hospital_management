import React from 'react';
import {useSelector} from 'react-redux'
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import TestTable from '../../components/Tests/TestTable';
import { selectAllTests } from '../../slicer/Test';



const TestList = () => {
    const tests = useSelector(selectAllTests);
    const user = useSelector(state =>  state?.auth?.user );
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Medical Test Histories</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <TestTable tests={tests} role={user?.activeRole}/>
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default TestList
