import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDeath, reseter } from '../../slicer/Death';
import { Notifier } from "../../utills/InputHelpers";
import { Link } from 'react-router-dom';

const DeathTable = ({ deaths }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { status, message } = useSelector((state) => state?.deaths);
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
      Notifier('kindly select death record to delete', 'error');
      return
    }
    setIsSubmit(true);
    dispatch(deleteDeath({ _id: id }));
  };

  


  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">All Death</h5>

          {status === 'loading' && <p><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...</p>}
          {status === 'failed' && <p>Error updating death record</p>}

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Name</th>
                <th scope="col">Place of Death</th>
                <th scope="col">Date of Death</th>
                <th scope="col">Details</th>
                <th scope="col">Reason</th>
                <th scope="col">CapturedBy</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {deaths.map((death, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img src={death?.patient?.profile?.image} alt={death?.patient?.username} style={{ width: '50px', height: '50px' }} />
                  </th>
                  <td>
                    {death?.patient?.username}
                  </td>
                  <td>${death?.placeOfDeath}</td>
                  <td className="fw-bold">{new Date(death?.dateOfDeath).toDateString()}</td>
                  <td>
                    Address: {death?.patient?.profile?.address} <br/>
                    Country: {death?.patient?.profile?.country} <br/>
                    Date of Birth: {death?.patient?.profile?.dateOfBirth} <br/>
                  </td>
                  <td>{death?.reason}</td>
                  <td>{death?.createdBy?.username}</td>
                  
                  <td>
                    <Link to={`/death-edit/${death?.patient?._id}/${death._id}`} className="btn btn-sm btn-success ms-2 icon">
                      <i className="ri-edit-2-fill"></i>
                      Edit
                    </Link>


                    <button type="button" className="btn btn-sm btn-danger ms-2 icon" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this death record?')) {
                        handleDelete(death._id);
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

export default DeathTable;
