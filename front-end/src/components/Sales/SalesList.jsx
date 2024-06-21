import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveOrder, declineOrder, reseter } from '../../slicer/Orders';
import { Notifier } from "../../utills/InputHelpers";


const SalesList = ({ salesData, isEditor }) => {

  const [isSubmit, setIsSubmit] = useState(false);
  const { status, message } = useSelector((state) => state?.orders);
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

  const handleApprove = (orderId) => {
    setIsSubmit(true);
    dispatch(approveOrder({ _id: orderId }));
  };


  const handleDecline = (orderId) => {
    dispatch(declineOrder({ _id: orderId }));
    setIsSubmit(true);
  };
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">Orders </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">quantity</th>
                <th scope="col">Status</th>
                {
                  isEditor && (
                    
                    <th scope="col">Controls</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {salesData?.map((sale, index) => (
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
                  <td>
                    {
                      isEditor && (<>
                        <button className='btn btn-sm btn-success mx-1' onClick={() => handleApprove(sale._id)} disabled={isSubmit}>Approve</button>

                        <button
                          className='btn btn-sm btn-danger mx-1'
                          onClick={() => handleDecline(sale._id)}
                          disabled={isSubmit}>
                          decline
                        </button>
                      </>)
                    }
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

export default SalesList;
