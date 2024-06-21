import React from 'react'
import Filters from "./Filters"

const CustomerCounts = ({dashboard}) => {
  return (
    <div className="col-xxl-4 col-xl-12">

      <div className="card info-card customers-card">

        <Filters/>

        <div className="card-body">
          <h5 className="card-title">Users <span>| This Year</span></h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-people"></i>
            </div>
            <div className="ps-3">
              <h6>{dashboard?.users}</h6>
              <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default CustomerCounts
