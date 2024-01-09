import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import ProductList from './pages/ProductList';
import CartPage from './pages/CartPage';

import ProductDetail from './components/ProductDetail';
import './App.css';
import './output.css';

import { SearchProvider } from './helpers/SeachContext';
import SalesReport from './pages/SalesReport';

const useAuth = () => {
    return localStorage.getItem('token') != null;
};

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = useAuth();
    return isAuth ? <> {children} </> : <Navigate to="/login" />;
};

function App() {
    return (
        <SearchProvider>
            <Router>
                <div className="App" data-theme="light">
                    {useAuth() &&
                        <Navbar />
                    }
                    <div className="App-content">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/create-user" element={<CreateUserPage />} />
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <ProductList />
                                </ProtectedRoute>
                            } />
                            <Route path="/salesReport" element={
                                <ProtectedRoute>
                                    <SalesReport />
                                </ProtectedRoute>
                            } />
                            <Route path="/product/:id/:img" element={
                                <ProtectedRoute>
                                    <ProductDetail />
                                </ProtectedRoute>
                            } />

                            <Route path="/cart" element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </SearchProvider>
    );
}

export default App;
