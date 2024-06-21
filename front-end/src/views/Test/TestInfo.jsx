import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import TestDetail from '../../components/Tests/TestDetail';


const TestInfo = () => {
    // Get the test ID from the URL parameters
    const { id } = useParams();

    // Find the test with the given ID in the Redux store
    const test = useSelector((state) => state.tests.tests.find((t) => t._id === id));
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Medical Test History Detail</h1>
                </div>
                <section className="section dashboard">
                    <TestDetail test={test}/>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default TestInfo
