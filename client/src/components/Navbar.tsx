import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Ana Sayfa</Link>
            <Link to="/login">Giri� Yap</Link>
            <Link to="/create-user">Kullan�c� Olu�tur</Link>
        </nav>
    );
};

export default Navbar;
