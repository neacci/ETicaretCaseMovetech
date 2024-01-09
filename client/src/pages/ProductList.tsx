import React, { useState, useEffect, useMemo } from 'react';
import Product from '../components/Product';
import { networkRequest } from '../helpers/NetworkRequest';
import image1 from '../images/img1.png';
import image2 from '../images/img2.png';
import image3 from '../images/img3.png';
import { useSearch } from '../helpers/SeachContext';


const ProductList = () => {
    const [products, setProducts] = useState<Array<any>>([]);
    const { searchQuery } = useSearch();

    const images = [image1, image2, image3];


    const filteredProducts = useMemo(() => {
        return Array.isArray(products) ? products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) : [];
    }, [products, searchQuery]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await networkRequest({ endpoint: 'product', method: 'GET' });
                setProducts(response.$values);
                debugger;
            } catch (error) {
                
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            {filteredProducts.map((product, i) => (
                <Product key={product.id} product={product} img={images[i % images.length]} i={i%images.length} />
            ))}
        </div>
    );
};

export default ProductList;
