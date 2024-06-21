import React from 'react';
import {useSelector} from 'react-redux'
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import DeathTable from '../../components/Death/DeathTable';
import { selectAllDeaths } from '../../slicer/Death';



const DeathList = () => {
    const deaths = useSelector(selectAllDeaths);
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Deaths</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <DeathTable deaths={deaths} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default DeathList
