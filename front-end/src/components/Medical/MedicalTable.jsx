import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedicalHistory, reseter } from '../../slicer/Medical';
import { Notifier } from "../../utills/InputHelpers";
import { Link } from 'react-router-dom';

const MedicalTable = ({ histories }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { status, message } = useSelector((state) => state?.histories);
  const dispatch = useDispatch();



  useEffect(() => {
    if (status === 'succeeded') {
      Notifier(message, 'success');
      dispatch(reseter());
      setIsSubmit(false)
    } else if (status === 'failed') {
      Notifier(message, 'error');
      dispatch(reseter());
      setIsSubmit(false)
    }
  }, [status, message, dispatch]);

 

 
  const handleDelete = (id) => {
    if (!id) {
      Notifier('kindly select medical history to delete', 'error');
      return
    }
    setIsSubmit(true);
    dispatch(deleteMedicalHistory({ _id: id }));
  };

  


  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">All Medical Histories</h5>

          {status === 'loading' && <p><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...</p>}
          {status === 'failed' && <p>Error updating death record</p>}

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Name</th>
                <th scope="col">Diagnosis Date</th>
                <th scope="col">Condition</th>
                <th scope="col">Treatment</th>
                <th scope="col">Patient Address</th>
                <th scope="col">CapturedBy</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((history, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img src={history?.patient?.image} alt={history?.patient?.username} style={{ width: '50px', height: '50px' }} />
                  </th>
                  <td>
                    {history?.patient?.username}
                  </td>
                  <td>${history?.diagnosisDate}</td>
                  <td className="fw-bold">{history?.condition}</td>
                  <td className="fw-bold">{history?.treatment}</td>
                  <td>
                    Address: {history?.patient?.profile?.address}
                    Country: {history?.patient?.profile?.country}
                    Date of Birth: {history?.patient?.profile?.dateOfBirth}
                  </td>
                  <td>{history?.createdBy?.username}</td>
                  
                  <td>
                    <Link to={`/history-edit/${history._id}`} className="btn btn-sm btn-success ms-2 icon">
                      <i className="ri-edit-2-fill"></i>
                      Edit
                    </Link>


                    <button type="button" className="btn btn-sm btn-danger ms-2 icon" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this medical record?')) {
                        handleDelete(history._id);
                      }
                    }}><i class="bi bi-basket"></i> delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalTable;
