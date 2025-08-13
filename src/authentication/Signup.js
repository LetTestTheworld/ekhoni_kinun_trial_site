import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import axios from "axios";


function Signup() {
    useEffect(() => {
            if (localStorage.getItem('auth-token')) {
                navigate('/profile');
            }
        })
    const [name, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    async function register() {
        const response = await axios.post("/signup", {
            name,
            username,
            email,
            password,
            password_confirmation,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });

        if (response.data.success) {
            setSuccessMsg(response.data.success);
            setFullName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            sessionStorage.setItem('respondedMessage', response.data.success);
            navigate('/');
        } else {
            setErrorMsg(response.data.error);
        }
    }
    // if(name){
    //     errorMsg.name = null
    // }else if(errorMsg.email !=null && errorMsg.email === "The email field is required."){
    //     if(email){
    //         errorMsg.email = null
    //     }
    // }else if(password){
    //     errorMsg.password = null
    // }else if(password_confirmation){
    //     errorMsg.password_confirmation = null
    // }

    return (
        <>
            <div className="users-pages">
                <Navbar />
                <div className="container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                    <div className="auth-card w-50 m-auto">
                        <div className="auth-header">
                            <h1 className="auth-title">Create an Account</h1>
                            <p className="auth-subtitle">Join us to get started!</p>
                        </div>


                        <div className="input-group">
                            <label className="input-label">Full Name</label>
                            <input
                                type="text"
                                onChange={(e) => setFullName(e.target.value)}
                                className="input-field"
                                placeholder="John Doe"
                            />
                            {
                                errorMsg.name ?
                                    <span className="text-danger">{errorMsg.name}</span> : null
                            }
                        </div>

                        <div className="input-group">
                            <label className="input-label">Username</label>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                placeholder="johndoe"
                            />
                            {
                                errorMsg.username ?
                                    <span className="text-danger">{errorMsg.username}</span> : null
                            }
                        </div>

                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="john@example.com"
                            />
                            {
                                errorMsg.email ?
                                    <span className="text-danger">{errorMsg.email}</span> : null
                            }
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                            />
                            {
                                errorMsg.password ?
                                    <span className="text-danger">{errorMsg.password}</span> : null
                            }
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                            />
                            {
                                errorMsg.password_confirmation ?
                                    <span className="text-danger">{errorMsg.password_confirmation}</span> : null
                            }
                        </div>

                        <button type="submit" onClick={register} className="auth-button">
                            Sign Up
                        </button>


                        <div className="divider">OR</div>

                        <button className="google-button w-50 m-auto">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google"
                                className="google-icon"
                            />
                            Sign Up with Google
                        </button>

                        <div className="auth-footer">
                            Already have an account? <a href="#" className="auth-link">Log In</a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Signup;