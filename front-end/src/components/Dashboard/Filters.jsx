import React from 'react';
import { Link } from 'react-router-dom';

const Filters = () => {
  return (
    <div className="filter">
        <Link className="icon txt-dec" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>

          <li><Link className="dropdown-item txt-dec" to="#">Today</Link></li>
          <li><Link className="dropdown-item txt-dec" to="#">This Month</Link></li>
          <li><Link className="dropdown-item txt-dec" to="#">This Year</Link></li>
        </ul>
      </div>
  )
}

export default Filters
