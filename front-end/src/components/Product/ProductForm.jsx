import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

// custom libs
import upload from "../../utills/cloudinaryUpload"
import { createProducts, updateProduct, reseter } from "../../slicer/Products";
import { selectAllCategories } from "../../slicer/Category";
import { categorySort } from '../Category/SategoryService'
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../utills/InputHelpers";

const ProductForm = ({ product, isEditing }) => {
    const { status, message } = useSelector((state) => state?.products);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [singleFile, setSingleFile] = useState(undefined);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        desc: product?.desc || "",
        name: product?.name || "",
        brand: product?.brand || "",
        category: product?.category || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        expiration_date: product?.expiration_date || "",
        image: product?.image || "",
    });
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //get catgories
    const categories = useSelector(selectAllCategories);
    const categoriesOption = categorySort(categories);


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

        if (product) {
            setFormData({
                desc: product.desc,
                name: product.name,
                brand: product.brand,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                expiration_date: product.expiration_date,
                image: product.image,
            });
        }
    }, [product]);

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
        setFormData({
            desc: "",
            name: "",
            brand: "",
            category: "",
            price: "",
            quantity: "",
            expiration_date: "",
            image: ""
        });
    };

    const dispatchSignup = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            isEditing
                ? dispatch(updateProduct({ ...formData, _id: product?._id }))
                : dispatch(createProducts(formData));
            setIsSubmit(false);

        }

        if (status === "succeeded") {
            Notifier(message, "success");
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            if (isEditing) navigate('/product-list')
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
                <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>
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
                <label for="pname" className="col-md-4 col-lg-3 col-form-label">Product Name</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="name"
                        type="text"
                        id='pname'
                        className="form-control"
                        placeholder="enter product name"
                        value={formData.name}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label for="brand" className="col-md-4 col-lg-3 col-form-label">Product Brand</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="brand"
                        type="text"
                        id='brand'
                        className="form-control"
                        placeholder="enter product brand name"
                        value={formData.brand}
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
                        placeholder="brief product descriptions"
                        cols="0"
                        rows="5"
                        required
                        value={formData.desc}
                        onChange={(e) => handleInput(e, setFormData)}
                    >
                    </textarea>
                </div>
            </div>

            <div className="row mb-3">
                <label for="price" className="col-md-4 col-lg-3 col-form-label">Price</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="price"
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="enter product price"
                        value={formData.price}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="expiration_date" className="col-md-4 col-lg-3 col-form-label">Expiration Date</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="expiration_date"
                        type="date"
                        className="form-control"
                        id="expiration_date"
                        placeholder="Select expiration date"
                        value={formData.expiration_date}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label for="quantity" className="col-md-4 col-lg-3 col-form-label">Quantity</label>
                <div className="col-md-8 col-lg-9">
                    <input
                        name="quantity"
                        type="text"
                        className="form-control"
                        id="quantity"
                        placeholder="enter product quantity"
                        value={formData.quantity}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label for="cat" className="col-md-4 col-lg-3 col-form-label">Category</label>
                <div className="col-md-8 col-lg-9">
                    <select
                        className="form-select"
                        name='category'
                        id="cat"
                        onChange={(e) => handleInput(e, setFormData)}
                        required>
                        <option selected disabled value="">Choose...</option>
                        {categoriesOption}
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
                    <button type="submit" onClick={handleProduct} disabled={uploading || isSubmit} className="btn btn-primary ">Submit</button>
                )}

                <button type="reset" onClick={reset} className="btn btn-secondary mx-2">Reset</button>
            </div>
        </form >
    )
}

export default ProductForm
