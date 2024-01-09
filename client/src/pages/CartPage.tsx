import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { networkRequest } from '../helpers/NetworkRequest';

interface Product {
    productId: string;
    name: string;
    price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const fetchCartItems = async () => {
        try {
            const response = await networkRequest({ endpoint: 'cart', method: 'GET' });
            setCartItems(response.cartItems.$values);
        } catch (error) {
            
        }
    };
    useEffect(() => {
        fetchCartItems();
    }, []);

    const updateQuantity = async (productId: string, newQuantity: number) => {
        try {
            if (newQuantity > 0) {
                await networkRequest({
                    endpoint: 'cart/update',
                    method: 'POST',
                    data: { productId, quantity: newQuantity }
                });

            } else {
                await removeFromCart(productId);
            }
        } catch (error) {
            
        } finally {
            fetchCartItems();
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            await networkRequest({
                endpoint: 'cart/remove',
                method: 'POST',
                data: { productId: productId }
            });
        } catch (error) {
            
        }
        finally {
            fetchCartItems();
        }
    };

    const handleBuy = async () => {
        try {
            await networkRequest({
                endpoint: 'order/create',
                method: 'POST'
            });

        } catch (error) {
            
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Cart</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    <Link to={`/product/${item.product.productId}`}>{item.product.name}</Link>
                                </td>
                                <td>{item.product.price} TL</td>
                                <td>

                                    <div className="quantity-controls" style={{ justifyContent: "normal" }}>
                                        <button onClick={() => updateQuantity(item.product.productId, item.quantity - 1)} className="btn">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.productId, item.quantity + 1)} className="btn">+</button>
                                    </div>
                                </td>
                                <td>{(item.product.price * item.quantity).toFixed(2)} TL</td>
                                <td>
                                    <button className="btn " onClick={() => removeFromCart(item.product.productId)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary mt-4" onClick={handleBuy}>Buy</button>
        </div>
    );
};

export default CartPage;

