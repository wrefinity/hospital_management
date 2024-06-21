import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import ProductDetail from '../../components/Product/ProductDetail';



const ProductInfo = () => {
    // Get the product ID from the URL parameters
    const { id } = useParams();

    // Find the product with the given ID in the Redux store
    const product = useSelector((state) => state.products.products.find((p) => p._id === id));
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Product Detail</h1>
                </div>
                <section className="section dashboard">
                    <ProductDetail product={product}/>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default ProductInfo
