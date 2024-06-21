import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import { createOrder, reseter } from "../../slicer/Orders";
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";


const ProductDetail = ({ product }) => {

    const { status, message } = useSelector((state) => state?.orders);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formData, setFormData] = useState({ quantity: 1 })
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, product, dispatch]);

    const handleProduct = (e) => {
        setFormErrors({})
        e.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    const reset = () => {
        setFormData({ quantity: 1 });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) { 
            dispatch(createOrder({...formData, productId:product?._id}));
            setIsSubmit(false);

        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            navigate('/sales')
        }
        if (status === "failed") {
            Notifier(message, "error");
            dispatch(reseter());
            setIsSubmit(false);
        }
    };

    referal.current = dispatchSignup;

    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={product?.image} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{product?.name}</h5>
                        <p class="card-text">{product?.desc}</p>
                        <p class="card-text">${product?.price}</p>
                        <p class="card-text">Brand : {product?.brand}</p>
                        <p class="card-text">Category : {product?.category?.name}</p>

                        <form onSubmit={handleProduct}>
                            <div className="row mb-3">
                                <label for="pname" className="col-md-4 col-lg-3 col-form-label">Quantity to Order</label>
                                <div className="col-md-4 col-lg-4">
                                    <input
                                        name="quantity"
                                        type="text"
                                        id='pname'
                                        className="form-control"
                                        value={formData.quantity}
                                        onChange={(e) => handleInput(e, setFormData)}
                                    />
                                </div>

                                <div className="text-center mt-2">
                                    {status === "loading" ? (
                                        <div className="d-flex justify-content-center">
                                            <LineWave
                                                color={loaderColor}
                                                height={loaderSize}
                                                width={loaderSize}
                                            />
                                        </div>
                                    ) : (
                                        <button type="submit" onClick={handleProduct} disabled={isSubmit} className="btn btn-success">order</button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductDetail
