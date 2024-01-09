import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { networkRequest } from '../helpers/NetworkRequest';
import image1 from '../images/img1.png';
import image2 from '../images/img2.png';
import image3 from '../images/img3.png';
import { toast } from 'react-toastify';
const ProductDetail = () => {
    const [product, setProduct] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const [isInCart, setIsInCart] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(q => q + 1);
        updateQuantity();
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(q => q - 1);
            updateQuantity();
        }
    };

    const addToCart = async () => {
        try {
            const response = await networkRequest({
                endpoint: 'cart/add',
                method: 'POST',
                data: { productId: product.productId, quantity: quantity }
            });
            toast("Sepete Eklendi", { type: 'success', theme: 'dark', position: 'top-center', autoClose: 2500 });
        } catch (error) {

        }
    };
    const updateQuantity = async () => {
        try {
            if (quantity > 0) {
                await networkRequest({
                    endpoint: 'cart/update',
                    method: 'POST',
                    data: { productId: id, quantity: quantity }
                });

            } else {
                await removeFromCart();
            }
        } catch (error) {

        } finally {
            fetchProduct();
        }
    };

    const removeFromCart = async () => {
        try {
            await networkRequest({
                endpoint: 'cart/remove',
                method: 'POST',
                data: { productId: id }
            });
            toast("Sepetten çıkarıldı", { type: 'success', theme: 'dark', position: 'top-center', autoClose: 2500 });

        } catch (error) {

        }
    };


    const fetchProduct = async () => {
        try {
            const response = await networkRequest({ endpoint: `product/${id}`, method: 'GET' });
            setProduct(response);
        } catch (error) {

        }
    };

    useEffect(() => {

        const checkCart = async () => {
            try {
                const cartResponse = await networkRequest({
                    endpoint: 'cart',
                    method: 'GET'
                });
                const productInCart = cartResponse.cartItems.$values.find((item: { productId: any; }) => item.productId === id);
                if (productInCart) {
                    setQuantity(productInCart.quantity);
                    setIsInCart(true);
                }
            } catch (error) {

            }
        };

        fetchProduct();
        checkCart();
    }, [id]);



    if (!product) return <div>Ürün yükleniyor...</div>;

    const images = [image1, image2, image3];

    return (
        <div className="product-detail-container">
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box" id="carausel">


                {images.map((image, i) => (
                    <div id={`slide${i}`} className="carousel-item relative ">
                        <img src={image} alt="Product" />

                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${i - 1}`}
                                className={`btn btn-circle slideLeft ${i === 0 ? 'btn-disabled' : ''}`}
                            >❮</a>

                            <a href={`#slide${i + 1}`}
                                className={`btn btn-circle slideRight ${i === images.length - 1 ? 'btn-disabled' : ''}`}
                            >❯</a>

                        </div>
                    </div>

                ))}
            </div>
            <div className="product-details">

                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{product.name}</h1>
                <p>{product.description}</p>

                <div className="cartControls">
                    <div className="quantity-controls">
                        <button onClick={decreaseQuantity} disabled={quantity === 0} className="btn">-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity} className="btn">+</button>
                    </div>

                    {isInCart ? (
                        <button onClick={updateQuantity} className="btn btn-primary">
                            {quantity > 0 ? "Sepeti Güncelle" : "Sepetten Çıkar"}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                        </button>
                    ) : (
                        <button onClick={addToCart} className="btn btn-primary">
                            Sepete Ekle
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
