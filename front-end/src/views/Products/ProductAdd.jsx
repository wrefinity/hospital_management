import React from 'react';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import ProductForm from '../../components/Product/ProductForm';

const ProductAdd = () => {
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
                            <ProductForm isEditing={false} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default ProductAdd