import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductForm from '../../components/Product/ProductForm';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const ProductEdit = () => {
    // Get the product ID from the URL parameters
    const { id } = useParams();
    
    // Find the product with the given ID in the Redux store
    const product = useSelector((state) => state.products.products.find((p) => p._id === id));
  
    return (

        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Products</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-6 card pt-5 pb-5">
                            <ProductForm product={product} isEditing={true} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default ProductEdit
