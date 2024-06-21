import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, reseter } from '../../slicer/UserSlice';
import { Notifier } from "../../utills/InputHelpers";
import { Link } from 'react-router-dom';
import moment from "moment"

const UserTable = ({ users, role }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { status, message } = useSelector((state) => state?.users);
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
      Notifier('kindly select users record to delete', 'error');
      return
    }
    setIsSubmit(true);
    dispatch(deleteUser({ _id: id }));
  };




  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">Users Records</h5>

          {status === 'loading' && <p><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...</p>}
          {status === 'failed' && <p>Error fetching records</p>}

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Gender</th>
                <th scope="col">Details</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img src={user?.profile?.image} alt={user?.username} style={{ width: '50px', height: '50px' }} />
                  </th>
                  <td>
                    {user?.username}
                  </td>
                  <td> {moment(user?.profile?.dateOfBirth).format('MMMM Do, YYYY, h:mm:ss A Z')}</td>
                  <td className="fw-bold">{user?.profile?.gender}</td>
                  <td>
                    Address: {user?.profile?.address} <br />
                    Country: {user?.profile?.country}
                  </td>
                  <td>{user?.profile?.phone}</td>
                  <td>{user?.email}</td>

                  <td>

                    <Link to={`/user-info/${user?._id}`} className="btn btn-sm btn-outline-success ms-2 icon mb-2">
                      View
                    </Link>
                    {/* admin can only delete a user  */}
                    {role === "admin" && (
                      <>
                        <button type="button" className="btn btn-sm btn-outline-danger ms-2 mb-2 icon" onClick={() => {
                          if (window.confirm('Are you sure you want to delete this user?')) {
                            handleDelete(user?._id);
                          }
                        }}><i class="bi bi-basket"></i> delete
                        </button>
                        <Link to={`/death-add/${user?._id}`} className="btn btn-sm btn-danger ms-2 mb-2 icon">
                          <i class="bi bi-basket"></i>  Mark Died
                        </Link>
                        <Link to={`/user-edit/${user._id}`} className="btn btn-sm btn-success ms-2 mb-2 icon mb-2">
                          <i className="ri-edit-2-fill"></i>
                          Edit
                        </Link>
                      </>
                    )}

                    <br />
                    <Link to={`/test-add/${user?._id}`} className="btn btn-sm btn-warning ms-2 mb-2 icon">
                      Add Test
                    </Link>
                    <Link to={`/history-add/${user._id}`} className="btn btn-sm btn-secondary ms-2 icon">
                      Add Medical Record
                    </Link>

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

export default UserTable;
