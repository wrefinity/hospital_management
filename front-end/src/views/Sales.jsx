import React from 'react';
import DHeaders from '../components/Heads/DHeaders';
import SideBar from '../components/SideBar';
import {useSelector} from 'react-redux'
import Footer from '../components/Footer';
import SalesList from '../components/Sales/SalesList';
import { selectAllOrders } from '../slicer/Orders';
import { getUser } from "../slicer/Auth"


const Sales = () => {
    const { user } = useSelector(getUser);
    let orders = useSelector(selectAllOrders);
    const roler = process.env.REACT_APP_ROLER
    if(user?.activeRole !== roler){
        orders = orders?.filter((ord) => ord?.user?._id === user?._id)
    }
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Sales</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                        <SalesList salesData={orders} isEditor={user?.activeRole === roler} /> 
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default Sales
