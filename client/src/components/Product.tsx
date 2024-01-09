import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
    productId: string;
    name: string;
    description: string;
    imageUrl: string;
}

const Product = ({ product, img, i }: { product: ProductProps, img: string, i: number }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={img} alt={product.name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/product/${product.productId}/${i}`} className="btn btn-primary">Detaylar</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
