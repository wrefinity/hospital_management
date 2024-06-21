import React from 'react'
import { Link } from 'react-router-dom'
const ProductCard = ({ product }) => {
    return (
        <div className="col-lg-12">
        <Link to={`product-detail/${product._id}`} className='txt-dec'>
            <div className="card">
                <img src={product?.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="card-title text-center text-bold">{product?.name}</h3>
                    <p className="card-text text-center"> {product?.price} </p>
                </div>
            </div>
        </Link>
        </div>
    )
}

export default ProductCard
