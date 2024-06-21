import React from 'react';
import { useSelector } from 'react-redux';
import DHeaders from '../components/Heads/DHeaders';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import TopSelling from '../components/Dashboard/TopSelling';
import RecentSales from '../components/Dashboard/RecentSales';
import SalesCount from '../components/Dashboard/SalesCount';
import RevenueGenerated from '../components/Dashboard/RevenueGenerated';
import CustomerCounts from '../components/Dashboard/CustomerCounts';
// import News from '../components/Dashboard/News';
import Activities from '../components/Dashboard/Activities';
import { selectAllDashboardData } from '../slicer/Dashboard';
import SalesList from '../components/Sales/SalesList';
import { getUser } from "../slicer/Auth"
import { selectAllOrders } from '../slicer/Orders';
import RevenueChart from '../components/Dashboard/RevenueChart';

const Dashboard = () => {
    const dashboard = useSelector(selectAllDashboardData);

    const { user } = useSelector(getUser);
    let orders = useSelector(selectAllOrders);
    const roler = process.env.REACT_APP_ROLER
    if(user?.activeRole !== roler){
        orders = orders.filter((ord) => ord?.user?._id === user?._id)
    }
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                </div>

                <section className="section dashboard">

                    {user?.activeRole === roler ? (
                        <>
                        <div className='row'>
                        <RevenueChart revenueData={dashboard?.revenueData}/>
                        </div>
                            <div className="row">

                                <div className="col-lg-8">
                                    <div className="row">
                                        <SalesCount dashboard={dashboard} />
                                        <RevenueGenerated dashboard={dashboard} />
                                        <CustomerCounts dashboard={dashboard} />
                                        <RecentSales sales={dashboard?.recentTopFiveSales} />
                                        <TopSelling sales={dashboard?.topSales} />
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <Activities logs={dashboard?.logs} />
                                    {/* <News /> */}
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            <div className="row">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SalesList salesData={orders} isEditor={user?.activeRole === roler} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default Dashboard
