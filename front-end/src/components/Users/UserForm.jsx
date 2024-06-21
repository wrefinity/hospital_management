import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import upload from "../../utills/cloudinaryUpload"
import { updateUser, reseter } from "../../slicer/UserSlice";
import { register, reseter as resetUser } from "../../slicer/Auth";
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
    formatDate
} from "../../utills/InputHelpers";

const UserForm = ({ user, isEditing }) => {
    const { status, message } = useSelector((state) =>
        isEditing ? state?.users : state?.auth
    );

    
    

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [singleFile, setSingleFile] = useState(undefined);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        image: user?.profile?.image || "",
        phone: user?.profile?.phone || "",
        country: user?.profile?.country || "",
        about: user?.profile?.about || "",
        dateOfBirth: user?.profile?.dateOfBirth ? formatDate(user.profile.dateOfBirth) : "",
        gender: user?.profile?.gender || "",
        address: user?.profile?.address || "",
        role: user?.role || "",
    });

    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                username: user?.username || "",
                email: user?.email || "",
                image: user?.profile?.image || "",
                phone: user?.profile?.phone || "",
                country: user?.profile?.country || "",
                about: user?.profile?.about || "",
                dateOfBirth: user?.profile?.dateOfBirth ? formatDate(user.profile.dateOfBirth) : "",
                gender: user?.profile?.gender || "",
                address: user?.profile?.address || "",
                role: user?.role || "",
            });
        }
    }, [user]);

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, user, dispatch]);

    const handleCreate = (e) => {
        setFormErrors({});
        e.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

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

    const reset = () => {
        setFormData({
            username: "",
            email: "",
            image: "",
            phone: "",
            country: "",
            about: "",
            dateOfBirth: "",
            gender: "",
            address: "",
            role: "",
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            isEditing
                ? dispatch(updateUser({ ...formData, _id: user?._id }))
                : dispatch(register(formData));
            setIsSubmit(false);
        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            dispatch(resetUser());
            setIsSubmit(false);
            navigate('/user-list');
        }
        if (status === "failed") {
            Notifier(message, "error");
            dispatch(reseter());
            dispatch(resetUser());
            setIsSubmit(false);
        }
    };

    referal.current = dispatchSignup;

    return (
        <form>
            <div className='text-center mb-5'>
                <h3>{isEditing ? "Edit User" : "Add User"}</h3>
            </div>

            <div className="row mb-3">
                <label htmlFor="username" className="col-md-4 col-lg-3 col-form-label">Username</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="username"
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="email"
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label for="image" className="col-md-4 col-lg-3 col-form-label">Product Image</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        className="form-control"
                        type="file"
                        required
                        name="image"
                        id="images"
                        onChange={(e) => setSingleFile(e.target.files[0])}
                    />
                    <div className="pt-2">
                        {!formData.image && (
                            <button onClick={(e) => handleUpload(e)} className="txt-dec btn btn-primary btn-sm" title="Upload Image"><i className="bi bi-upload"></i>{uploading ? (<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : "Upload"}</button>
                        )}
                    </div>


                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="phone"
                        type="text"
                        id="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="country"
                        type="text"
                        id="country"
                        className="form-control"
                        placeholder="Enter country"
                        value={formData.country}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        name="about"
                        className="form-control"
                        id="about"
                        style={{ height: '100px' }}
                        placeholder="About user"
                        cols="0"
                        rows="5"
                        required
                        value={formData.about}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="dateOfBirth" className="col-md-4 col-lg-3 col-form-label">Date of Birth</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="dateOfBirth"
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        placeholder="Select date of birth"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="gender" className="col-md-4 col-lg-3 col-form-label">Gender</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="gender"
                        type="text"
                        className="form-control"
                        id="gender"
                        placeholder="Enter gender"
                        value={formData.gender}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="address"
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="role" className="col-md-4 col-lg-3 col-form-label">Role</label>
                <div className="col-md-8 col-lg-9">
                    <select
                        name="role"
                        className="form-select"
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                        <option value="">Select role</option>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="pharmacy">Pharmacy</option>
                    </select>
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
                    <button type="submit" onClick={handleCreate} disabled={uploading || isSubmit} className="btn btn-primary ">Submit</button>
                )}

                <button type="reset" onClick={reset} className="btn btn-secondary mx-2">Reset</button>
            </div>
        </form>
    );
};

export default UserForm;
