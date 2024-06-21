import React from 'react';
import Filters from "./Filters"

const RecentSales = ({ sales }) => {
    return (
        <div className="col-12">
            <div className="card recent-sales overflow-auto">

                <Filters />

                <div className="card-body">
                    <h5 className="card-title">Recent Sales <span>| Today</span></h5>


                    <table className="table table-borderless datatable">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Drug</th>
                                <th scope="col">Price</th>
                                <th scope="col">quantity</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales?.map((sale, index) => (
                                <tr key={index}>
                                    <th scope="row">

                                        {index}
                                    </th>
                                    <td>{sale?.user?.username}</td>
                                    <td>
                                        {sale?.drug?.name}
                                    </td>
                                    <td>{sale?.drug?.price}</td>
                                    <td>{sale?.quantity}</td>
                                    <td>
                                        <span className={`badge ${sale.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>
                                            {sale.status}
                                        </span>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RecentSales
