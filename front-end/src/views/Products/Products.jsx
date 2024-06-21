import React from 'react';
import { useSelector } from 'react-redux'
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/Product/ProductCard';
import { selectAllProducts } from '../../slicer/Products';


const Products = () => {
    const productData = useSelector(selectAllProducts);
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1> All Products</h1>
                </div>
                <section className="section dashboard">
                    <div className="row pt-5 pb-5">
                        {/* <div className="col-lg-6 card "> */}

                            {productData?.map((product) => (
                                <div key={product?._id} className="col-lg-4 col-md-6 mb-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        {/* </div> */}
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default Products
