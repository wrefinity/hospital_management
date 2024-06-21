import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCat, reseter } from "../../slicer/Category";
import { LineWave } from "react-loader-spinner";
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";


const CategoryForm = () => {
    const [formData, setFormData] = useState({
        desc: "",
        name: "",
    });
    const { status, message } = useSelector((state) => state.categories);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatch]);

    const reset = () => {
        setFormData({
            desc: "",
            name: "",
        });
    };

    const dispatchFormData = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
            dispatch(createCat(formData));
            dispatch(reseter());
            setIsSubmit(false);
        }
        if (status === "succeeded") {
            reset();
            dispatch(reseter());
            Notifier(message, 'success');
            setIsSubmit(false);
        }
        if (status === "failed") {
            dispatch(reseter());
            Notifier(message, 'error');
            setIsSubmit(false);
        }
    };
    referal.current = dispatchFormData;

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='text-center mb-5'>
                <h3> Add Category</h3>
            </div>

            <div className="row mb-3">
                <label for="pname" className="col-md-4 col-lg-3 col-form-label">Category Name</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="name"
                        type="text"
                        id='pname'
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label for="desc" className="col-md-4 col-lg-3 col-form-label">Description</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="desc"
                        className="form-control"
                        id="desc"
                        style={{ height: '100px' }}
                        placeholder="brief leisure descriptions"
                        cols="0"
                        rows="5"
                        required
                        value={formData.desc}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>


            <div className="text-center">
                {status === "loading" ? (
                    <div className="d-flex justify-content-center">
                        <LineWave
                            color={loaderColor}
                            height={loaderSize}
                            width={loaderSize}
                        />
                    </div>
                ) : (
                    <button type="submit" className="btn btn-primary ">Submit</button>
                )}

                <button type="reset" className="btn btn-secondary mx-2">Reset</button>
            </div>
        </form>
    )
}

export default CategoryForm
