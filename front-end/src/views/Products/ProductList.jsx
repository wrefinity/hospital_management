import React from 'react';
import {useSelector} from 'react-redux'
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import ProductTable from '../../components/Product/ProductTable';
import { selectAllProducts } from '../../slicer/Products';



const ProductList = () => {
    const productData = useSelector(selectAllProducts);
    return (
        <>
            <DHeaders />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Products</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProductTable productData={productData} />
                        </div>
                    </div>
                </section>
            </main>
            <SideBar />
            <Footer />
        </>
    )
}

export default ProductList
