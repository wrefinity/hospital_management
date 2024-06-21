import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import { createDeath, updateDeath, reseter } from "../../slicer/Death";

import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";

const DeathForm = ({ death, isEditing, patientId}) => {
    const { status, message } = useSelector((state) => state?.deaths);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [uploading, setUploading] = useState(false);

    

    const [formData, setFormData] = useState({
        // patient: death?.patient || "",
        reason: death?.reason || "",
        dateOfDeath: death?.dateOfDeath || "",
        placeOfDeath: death?.placeOfDeath || "",
    });
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    useEffect(() => {

        if (death) {
            setFormData({
                // patient: death?.patient || "",
                reason: death?.reason,
                dateOfDeath: death?.dateOfDeath,
                placeOfDeath: death?.placeOfDeath,
            });
        }
    }, [death]);

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, death, dispatch]);

    const handleDeath = (e) => {
        setFormErrors({})
        e.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    const reset = () => {
        setFormData({
            // patient: "",
            reason: "",
            dateOfDeath: "",
            placeOfDeath: "",
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            isEditing
                ? dispatch(updateDeath({ ...formData, _id: death?._id }))
                : dispatch(createDeath({...formData, patientId}));
            setIsSubmit(false);

        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            navigate('/death-list')
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
                <h3>{isEditing ? "Edit Death" : "Add Death"}</h3>
            </div>
            

            <div className="row mb-3">
                <label for="placeOfDeath" className="col-md-4 col-lg-3 col-form-label">Place of Death</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="placeOfDeath"
                        type="text"
                        id='placeOfDeath'
                        className="form-control"
                        placeholder="enter place of death"
                        value={formData.placeOfDeath}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label for="reason" className="col-md-4 col-lg-3 col-form-label">Reason</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="reason"
                        className="form-control"
                        id="reason"
                        style={{ height: '100px' }}
                        placeholder="reason for death"
                        cols="0"
                        rows="5"
                        required
                        value={formData.reason}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>
        
            <div className="row mb-3">
                <label htmlFor="dateOfDeath" className="col-md-4 col-lg-3 col-form-label">Date of Death</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="dateOfDeath"
                        type="date"
                        className="form-control"
                        id="dateOfDeath"
                        placeholder="select date of death"
                        value={formData.dateOfDeath}
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

export default DeathForm
