import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Ana Sayfa</Link>
            <Link to="/login">Giriþ Yap</Link>
            <Link to="/create-user">Kullanýcý Oluþtur</Link>
        </nav>
    );
};

export default Navbar;
