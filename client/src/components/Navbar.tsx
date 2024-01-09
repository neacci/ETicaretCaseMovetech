import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { networkRequest } from '../helpers/NetworkRequest'; // Ensure this is the correct path
import { useSearch } from '../helpers/SeachContext';
const Navbar = () => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const { setSearchQuery } = useSearch();

    const handleSearchChange = (e: { target: { value: any; }; }) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await networkRequest({ endpoint: 'cart', method: 'GET' });

                setCartItemCount(response.cartItems.$values.length);
            } catch (error) {
                
            }
        };

        fetchCartItems();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        //navigate('/login'); 
        window.location.href = "/login"

    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost">Home</Link>
                <Link to="/salesReport" className="btn btn-ghost">Orders Report</Link>
            </div>
            <div className="navbar-end">
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        className="input input-bordered"
                    />
                )}
                <button className="btn btn-ghost btn-circle ml-4" onClick={() => setShowSearch(!showSearch)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <Link to="/cart" className="btn ">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2 a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cartItemCount}</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
