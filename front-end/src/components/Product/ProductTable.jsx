import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, incrementProduct, decrementProduct, reseter } from '../../slicer/Products';
import { Notifier } from "../../utills/InputHelpers";
import { Link } from 'react-router-dom';

const ProductTable = ({ productData }) => {
  const [adjustmentValue, setAdjustmentValue] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { status, message } = useSelector((state) => state?.products);
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



  const handleInputChange = (productId, value) => {
    setAdjustmentValue((prev) => ({
      ...prev,
      [productId]: parseInt(value, 10),
    }));
  };

  const handleIncrement = (productId) => {
    const value = adjustmentValue[productId] || 1;
    setIsSubmit(true);
    dispatch(incrementProduct({ _id: productId, quantity: value }));
  };
  const handleDelete = (id) => {
    if (!id) {
      Notifier('kindly select product to delete', 'error');
      return
    }
    setIsSubmit(true);
    dispatch(deleteProduct({ _id: id }));
  };

  const handleDecrement = (productId) => {
    const value = adjustmentValue[productId] || 1;
    dispatch(decrementProduct({ _id: productId, quantity: value }));
    setIsSubmit(true);
  };


  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">All Products</h5>

          {status === 'loading' && <p><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...</p>}
          {status === 'failed' && <p>Error updating product stock</p>}

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Brand</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Adjust Stock</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {productData?.map((product, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img src={product?.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
                  </th>
                  <td>
                    {product?.name}
                  </td>
                  <td>${product?.price}</td>
                  <td className="fw-bold">{product?.quantity}</td>
                  <td>${product?.brand}</td>
                  <td>{product?.desc}</td>
                  <td>{product?.category?.name}</td>
                  <td>
                    <button className='btn btn-sm btn-success mx-1' onClick={() => handleIncrement(product._id)} disabled={isSubmit}>+</button>
                    <input
                      type="number"
                      min="1"
                      disabled={isSubmit}
                      value={adjustmentValue[product._id] || 1} // Default value
                      onChange={(e) => handleInputChange(product._id, e.target.value)}
                      style={{ width: '60px' }}
                    />
                    <button
                      className='btn btn-sm btn-danger mx-1'
                      onClick={() => handleDecrement(product._id)}
                      disabled={isSubmit}>
                      -
                    </button>
                  </td>
                  <td>

                    <Link to={`/product-edit/${product._id}`} className="btn btn-sm btn-success ms-2 icon">
                      <i className="ri-edit-2-fill"></i>
                      Edit
                    </Link>


                    <button type="button" className="btn btn-sm btn-danger ms-2 icon" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this category?')) {
                        handleDelete(product._id);
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

export default ProductTable;
