import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import { createMedicalHistory, updateMedicalHistory, reseter } from "../../slicer/Medical";

import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";

const MedicalForm = ({ history, isEditing, patientId }) => {
    const { status, message } = useSelector((state) => state?.deaths);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        // patient: history?.patient || "",
        treatment: history?.treatment || "",
        condition: history?.condition || "",
        diagnosisDate: history?.diagnosisDate || "",
    });
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {

        if (history) {
            setFormData({
                patient: history?.patient || "",
                treatment: history?.treatment || "",
                condition: history?.condition || "",
                diagnosisDate: history?.diagnosisDate || "",
            });
        }
    }, [history]);

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, history, dispatch]);

    const handleDeath = (e) => {
        setFormErrors({})
        e.preventDefault();

        console.log(formData, "_-")
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    const reset = () => {
        setFormData({
            patient: isEditing ? history?.patient : patientId || "",
            condition: "",
            treatment: "",
            diagnosisDate: "",
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            isEditing
                ? dispatch(updateMedicalHistory({ ...formData, _id: history?._id }))
                : dispatch(createMedicalHistory({ ...formData, patientId }));
            setIsSubmit(false);

        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            navigate('/history-list')
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
                <h3>{isEditing ? "Edit Medical Record" : "Add Medical Record"}</h3>
            </div>


            <div className="row mb-3">
                <label for="condition" className="col-md-4 col-lg-3 col-form-label">Patient Condition</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="condition"
                        className="form-control"
                        id="condition"
                        style={{ height: '100px' }}
                        placeholder="patient condition"
                        cols="0"
                        rows="5"
                        required
                        value={formData.condition}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>

            <div className="row mb-3">
                <label for="treatment" className="col-md-4 col-lg-3 col-form-label">Treatments</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="treatment"
                        className="form-control"
                        id="treatment"
                        style={{ height: '100px' }}
                        placeholder="treatment issued"
                        cols="0"
                        rows="5"
                        required
                        value={formData.treatment}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="diagnosisDate" className="col-md-4 col-lg-3 col-form-label">Date of Diagnosis</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="diagnosisDate"
                        type="date"
                        className="form-control"
                        id="diagnosisDate"
                        placeholder="select diagnosis date"
                        value={formData.diagnosisDate}
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

export default MedicalForm
