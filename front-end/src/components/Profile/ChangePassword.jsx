import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

import { resetPassword, reseter } from "../../slicer/Auth";
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";




const ChangePassword = ({ user }) => {
    const [formData, setFormData] = useState({
        newPassword: '',
        password: ''
    })

    const { status, message } = useSelector((state) => state?.auth);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, dispatch]);

    const handleChangePassword = (e) => {
        setFormErrors({})
        e.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    const reset = () => {
        setFormData({
            newPassword: '',
            password: ''
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(resetPassword(formData));
            setIsSubmit(false);
        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            navigate('/profile')
        }
        if (status === "failed") {
            Notifier(message, "error");
            dispatch(reseter());
            setIsSubmit(false);
        }
    };
    referal.current = dispatchSignup;
    return (
        <div class="tab-pane fade pt-3" id="profile-change-password">

            <form onSubmit={handleChangePassword}>

                <div class="row mb-3">

                    {formErrors.all && (

                        <div class="alert alert-danger alert-dismissible fade show" role="alert" >
                            {formErrors?.all}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                </div>
                <div class="row mb-3">
                    <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                    <div class="col-md-8 col-lg-9">
                        <input
                            name="password"
                            type="password"
                            class="form-control" id="currentPassword"
                            placeholder="enter current password"
                            value={formData?.password}
                            onChange={(e) => handleInput(e, setFormData)}
                        />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                    <div class="col-md-8 col-lg-9">
                        <input
                            name="newPassword"
                            type="password"
                            class="form-control"
                            id="newPassword"
                            placeholder="enter current password"
                            value={formData?.newPassword}
                            onChange={(e) => handleInput(e, setFormData)}

                        />
                    </div>
                </div>

                <div class="text-center">
                    {status === "loading" ? (
                        <LineWave
                            color={loaderColor}
                            height={loaderSize}
                            width={loaderSize}
                        />
                    ) : (
                        <button class="btn btn-primary" type="submit" disable={isSubmit}>Change Password</button>
                    )}
                </div>
            </form>

        </div>
    )
}

export default ChangePassword

