import React from 'react'
import Filters from "./Filters"
import { formatDistanceToNow } from 'date-fns';
const Activities = ({logs}) => {
  return (
    <div className="card">
      <Filters/>
      <div className="card-body">
        <h5 className="card-title">Recent Activity <span>| Today</span></h5>

        <div className="activity">

          {logs?.map((log)=>(
            <div className="activity-item d-flex" key={log?._id}>
            <div className="activite-label"> {formatDistanceToNow(log.timestamp, { addSuffix: true })}</div>
            <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
            <div className="activity-content">
              {log?.action} : {log.details}
            </div>
          </div>
          ))}    

        </div>

      </div>
    </div>
  )
}

export default Activities
