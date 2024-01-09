import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { networkRequest } from '../helpers/NetworkRequest';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate()


    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await networkRequest({
                endpoint: 'authorize/login',
                method: 'POST',
                data: { email, password }
            });
            localStorage.setItem('token', response.token);
            window.location.href="/"
            //navigate ('/');
        } catch (error) {
            
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btnLogin">Login</button>
            </form>
            <p>
                {/*<a href="/register">Register</a>*/}
            </p>
        </div>
    );
};

export default LoginPage;
