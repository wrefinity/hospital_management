import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTest, reseter } from '../../slicer/Test';
import { Notifier, formatDate } from "../../utills/InputHelpers";
import { Link } from 'react-router-dom';

const TestTable = ({ tests, role }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { status, message } = useSelector((state) => state?.tests);
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
      Notifier('kindly select medical test test to delete', 'error');
      return
    }
    setIsSubmit(true);
    dispatch(deleteTest({ _id: id }));
  };

  
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">All Medical Test Histories</h5>

          {status === 'loading' && <p><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...</p>}
          {status === 'failed' && <p>Error updating test records </p>}

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Name</th>
                <th scope="col">Test Date</th>
                <th scope="col">Test Conducted</th>
                <th scope="col">Result</th>
                <th scope="col">Notes</th>
                <th scope="col">Patient Address</th>
                <th scope="col">CapturedBy</th>
                {role !== "patient" && (
                  <th scope="col">Controls</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tests?.map((test, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img src={test?.patient?.profile?.image} alt={test?.patient?.username} style={{ width: '50px', height: '50px' }} />
                  </th>
                  <td>
                    {test?.patient?.username}
                  </td>
                  <td> {formatDate(test?.testDate)}</td>
                  <td className="fw-bold">{test?.testName}</td>
                  <td className="fw-bold">{test?.result}</td>
                  <td className="fw-bold">{test?.notes}</td>
                  <td>
                    Address: {test?.patient?.profile?.address} <br/>
                    Country: {test?.patient?.profile?.country} <br/>
                    Date of Birth: {formatDate(test?.patient?.profile?.dateOfBirth)}
                  </td>
                  <td>{test?.createdBy?.username}</td>

                    {role !== "patient" ? (
                      <td>
                      <Link to={`/test-edit/${test._id}`} className="btn btn-sm btn-success ms-2 icon">
                        <i className="ri-edit-2-fill"></i>
                        Edit
                      </Link>
  
                      <button type="button" className="btn btn-sm btn-danger ms-2 icon" onClick={() => {
                        if (window.confirm('Are you sure you want to delete this test record?')) {
                          handleDelete(test?._id);
                        }
                      }}><i class="bi bi-basket"></i> delete
                      </button>
  
                    </td>
                    ) : ""}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestTable;
