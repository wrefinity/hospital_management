
import React, { useRef, useEffect, useState } from "react";
import avatar from "../../assets/img/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import upload from "../../utills/cloudinaryUpload"
import { updateProfile, reseter } from "../../slicer/Auth";
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";

const ProfileEdit = ({ user }) => {
    const { status, message } = useSelector((state) => state?.products);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [singleFile, setSingleFile] = useState(undefined);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        about: user?.profile?.about || "",
        image: user?.profile?.image || "",
        country: user?.profile?.country || "",
        address: user?.profile?.address || "",
        phone: user?.profile?.phone || "",
    });
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (singleFile === undefined) {
                Notifier("kindly supply an image", "error");
                return
            }
            setUploading(true);
            const cover = await upload(singleFile);
            if (!cover) {
                Notifier("Image Uploaded Failed", "error");
                setUploading(false);
                return
            }
            setFormData((prev) => ({
                ...prev,
                "image": cover,
            }));
            setUploading(false);
            Notifier("Image Uploaded", "success");
        } catch (err) {
            Notifier(err, "error");
            setUploading(false);
        }
    };

    useEffect(() => {

        if (user) {
            setFormData({
                username: user?.username,
                about: user?.profile?.about,
                image: user?.profile?.image,
                country: user?.profile?.country,
                address: user?.profile?.address,
                phone: user?.profile?.phone,
            });
        }
    }, [user]);

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, user, dispatch]);

    const handleSubmit = (e) => {
        setFormErrors({})
        e.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    const reset = () => {
        setFormData({
            username: user?.username || "",
            about: user?.profile?.about || "",
            image: user?.profile?.image || "",
            country: user?.profile?.country || "",
            address: user?.profile?.address || "",
            phone: user?.profile?.phone || "",
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log('sending form data', formData)
            dispatch(updateProfile(formData));
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
        <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

            <form onSubmit={handleSubmit}>
                <div class="row mb-3">
                    <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div class="col-md-8 col-lg-9">
                        <img src={user?.profile?.image || avatar} alt={user?.username} />
                        <input
                            className="form-control"
                            type="file"
                            required
                            name="image"
                            id="images"
                            onChange={(e) => setSingleFile(e.target.files[0])}
                        />
                        <div className="pt-2">

                            <button disabled={uploading} onClick={(e) => handleUpload(e)} className="txt-dec btn btn-primary btn-sm" title="Upload Image"><i className="bi bi-upload"></i>{uploading ? (<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : "Upload"}</button>

                            {/* <Link to="#" class="text-dec btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></Link> */}
                        </div>

                    </div>

                    <div class="row mb-3">
                        <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                        <div class="col-md-8 col-lg-9">
                            <input name="username"
                                type="text"
                                class="form-control"
                                id="fullName"
                                placeholder="enter your username"
                                value={formData?.username}
                                onChange={(e) => handleInput(e, setFormData)}
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
                        <div class="col-md-8 col-lg-9">
                            <textarea
                                name="about"
                                className="form-control"
                                id="about"
                                style={{ height: '100px' }}
                                placeholder="brief information about you"
                                cols="0"
                                rows="5"
                                required
                                value={formData?.about}
                                onChange={(e) => handleInput(e, setFormData)}
                            >
                            </textarea>
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="Country" class="col-md-4 col-lg-3 col-form-label">Country</label>
                        <div class="col-md-8 col-lg-9">
                            <input
                                name="country"
                                type="text"
                                class="form-control"
                                id="Country"
                                placeholder="enter your country"
                                value={formData.country}
                                onChange={(e) => handleInput(e, setFormData)}
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="Address" class="col-md-4 col-lg-3 col-form-label">Address</label>
                        <div class="col-md-8 col-lg-9">
                            <input
                                name="address"
                                type="text"
                                class="form-control"
                                id="Address"
                                placeholder="enter your address"
                                value={formData.address}
                                onChange={(e) => handleInput(e, setFormData)}
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
                        <div class="col-md-8 col-lg-9">
                            <input
                                name="phone"
                                type="text"
                                class="form-control"
                                id="Phone"
                                placeholder="enter phone number"
                                value={formData.phone}
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
                            <button class="btn btn-primary" type="submit" disable={isSubmit || uploading}>Create Account</button>
                        )}
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ProfileEdit
