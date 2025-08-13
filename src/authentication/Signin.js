import React, { useEffect, useState } from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../common_component/Modal';

const Signin = () => {
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            navigate('/profile');
        }
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [respondedMessage, setRespondedMessage] = useState('');

    const navigate = useNavigate();
    if (sessionStorage.getItem('respondedMessage')) {
        setRespondedMessage(sessionStorage.getItem('respondedMessage'));
        sessionStorage.removeItem('respondedMessage');
    }

    async function login() {
        let { data } = await axios.post("signin", {
            email,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        if (data.token) {
            localStorage.setItem('auth-token', data.token);
            sessionStorage.setItem('respondedMessage', data.success);
            navigate('/');
        }
    }
    return (
        <>
            <div className="users-pages">
                <Navbar />
                {
                    respondedMessage && (
                        <Modal message={respondedMessage} />
                    )
                }
                    < div className="container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                <div className="auth-card w-50 m-auto">
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Log in to continue</p>
                    </div>

                    <div className="auth-form">
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="john@example.com" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
                        </div>
                        <button type="submit" onClick={login} className="auth-button">Log In</button>
                    </div>

                    <div className="divider">OR</div>

                    <button className="google-button w-50 m-auto">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google"
                            className="google-icon"
                        />
                        Log In with Google
                    </button>

                    <div className="auth-footer">
                        Don't have an account? <a href="#" className="auth-link">Sign Up</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
        </>
    );
};

export default Signin;