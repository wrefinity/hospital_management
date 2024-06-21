import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import { createTest, updateTest, reseter } from "../../slicer/Test";

import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";

const TestForm = ({ test, isEditing, patientId }) => {
    const { status, message } = useSelector((state) => state?.tests);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        testName: test?.testName || "",
        result: test?.result || "",
        notes: test?.notes || "",
        testDate: test?.testDate || "",
    });
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (test) {
            setFormData({
                testName: test?.testName || "",
                result: test?.result || "",
                notes: test?.notes || "",
                testDate: test?.testDate || "",
            });
        }
    }, [test]);

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, test, dispatch]);

    const handleDeath = (e) => {
        setFormErrors({})
        e.preventDefault();
        console.log("form Data: ", formData)
        setFormErrors(validateEmpty(formData));

        setIsSubmit(true);
    };

    const reset = () => {
        setFormData({
            patient: isEditing ? test?.patient : patientId || "",
            testName: test?.testName || "",
            result: test?.result || "",
            notes: test?.notes || "",
            testDate: test?.testDate || "",
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            isEditing
                ? dispatch(updateTest({ ...formData, _id: test?._id }))
                : dispatch(createTest({ ...formData, patientId }));
            setIsSubmit(false);

        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            navigate('/test-list')
        }
        if (status === "failed") {
            Notifier(message, "error");
            dispatch(reseter());
            setIsSubmit(false);
        }
    };

    referal.current = dispatchSignup;
    return (
        <form>
            <div className='text-center mb-5'>
                <h3>{isEditing ? "Edit Test" : "Add Test"}</h3>
            </div>


            
            <div className="row mb-3">
                <label for="testName" className="col-md-4 col-lg-3 col-form-label">Test Conducted</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="testName"
                        type="text"
                        id='testName'
                        className="form-control"
                        placeholder="enter test name"
                        value={formData.testName}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label for="result" className="col-md-4 col-lg-3 col-form-label">Test Result</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="result"
                        className="form-control"
                        id="result"
                        style={{ height: '100px' }}
                        placeholder="test result"
                        cols="0"
                        rows="5"
                        required
                        value={formData.result}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>
            <div className="row mb-3">
                <label for="notes" className="col-md-4 col-lg-3 col-form-label">Notes</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="notes"
                        className="form-control"
                        id="notes"
                        style={{ height: '100px' }}
                        placeholder="notes on test"
                        cols="0"
                        rows="5"
                        required
                        value={formData.notes}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="testDate" className="col-md-4 col-lg-3 col-form-label">Test Date</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="testDate"
                        type="date"
                        className="form-control"
                        id="testDate"
                        placeholder="select test date"
                        value={formData.testDate}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
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
                    <button type="submit" onClick={handleDeath} disabled={uploading || isSubmit} className="btn btn-primary ">Submit</button>
                )}

                <button type="reset" onClick={reset} className="btn btn-secondary mx-2">Reset</button>
            </div>
        </form >
    )
}

export default TestForm
