import React from 'react';
import Filters from "./Filters"
const TopSelling = ({sales}) => {
    return (
        <div class="col-12">
            <div class="card top-selling overflow-auto">

                <Filters/>

                <div class="card-body pb-0">
                    <h5 class="card-title">Top Selling <span>| Today</span></h5>

                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Preview</th>
                                <th scope="col">Drug</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sold</th>
                                <th scope="col">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sales?.map((sale, index) => (

                            <tr index={index}>
                                <th scope="row"><img src={sale?.image} alt="" /></th>
                                <td> {sale?.drugName} </td>
                                <td> {sale?.price}</td>
                                <td class="fw-bold"> {sale?.totalQuantity}</td>
                                <td>{sale?.revenue}</td>
                            </tr>
                        ))}
                           

                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}

export default TopSelling
