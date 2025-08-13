import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorRegister = () => {
    useEffect(() => {
            if (localStorage.getItem('auth-token')) {
                navigate('/profile');
            }
        })
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [shop_name, setShopName] = useState("");
    const [shop_address, setShopAddress] = useState("");
    const [shop_phone, setShopPhone] = useState("");
    const [shop_type, setShopType] = useState("");
    const [shop_owner_image, setShopOwnerImage] = useState(null);
    const [shop_image, setShopImage] = useState(null);
    const [shop_video, setShopVideo] = useState(null);
    const [shopCategory, setShopCategory] = useState([]);
    const navigate = useNavigate("")

    const nextStep = () => {
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('/shop-category')
                setShopCategory(data.shop_categories);
            }
        )()
    }, []);


    async function handleSubmit() {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);
        formData.append('shop_name', shop_name);
        formData.append('shop_address', shop_address);
        formData.append('shop_phone', shop_phone);
        formData.append('shop_type', shop_type);
        formData.append('shop_owner_image', shop_owner_image);
        formData.append('shop_image', shop_image);
        formData.append('shop_video', shop_video); 

        console.log(formData);

        let {data} = await axios.post('/shop-owner-registration', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            }
        })

        if (data.success) {
            sessionStorage.setItem('respondedMessage', data.success);
            navigate('/');
        }
    }

    console.log(shopCategory);



    return (
        <>
            <div className="users-pages">
                <Navbar />
                <div className="container vendor-register-container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                    <div className="auth-card m-auto">
                        <div className="auth-header">
                            <h1 className="auth-title">
                                {step === 1 && "Create an Account"}
                                {step === 2 && "shop Information"}
                                {step === 3 && "Additional Details"}
                            </h1>
                            <p className="auth-subtitle">
                                {step === 1 && "Join us to get started!"}
                                {step === 2 && "Tell us about your shop"}
                                {step === 3 && "Almost done! Just a few more details"}
                            </p>
                        </div>

                        {/* Progress indicator */}
                        <div className="progress-indicator">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`progress-step ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}
                                >
                                    <div className="step-number">{i}</div>
                                </div>
                            ))}
                        </div>

                        <div className="auth-form" >
                            {/* Step 1: Basic Information */}
                            {step === 1 && (
                                <>
                                    <div className="input-group">
                                        <label className="input-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="John Doe"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Username</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="John Doe"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Email</label>
                                        <input
                                            type="email"
                                            className="input-field"
                                            placeholder="john@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Password</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            placeholder="••••••••"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            placeholder="••••••••"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Step 2: shop Information */}
                            {step === 2 && (
                                <>
                                    <div className="input-group">
                                        <label className="input-label">Shop Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="My Awesome shop"
                                            onChange={(e) => setShopName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="input-field"
                                            placeholder="+1234567890"
                                            onChange={(e) => setShopPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Shop Address</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="123 Main St, City"
                                            onChange={(e) => setShopAddress(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Step 3: Additional Details */}
                            {step === 3 && (
                                <>
                                    <div className="input-group">
                                        <label className="input-label">Shop Type</label>
                                        <select
                                            className="input-field"
                                            onChange={(e) => setShopType(e.target.value)}
                                        >
                                            <option value="">Select Shop type</option>
                                            {
                                                shopCategory.map((item) =>
                                                    <option key={item.id} value={item.id}>{item.Shop_category}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Video of Shop</label>
                                        <input
                                            type="file"
                                            className="input-field"
                                            placeholder="Tax Identification Number"
                                            onChange={(e) => setShopOwnerImage(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Shop Image</label>
                                        <input
                                            type="file"
                                            className="input-field"
                                            placeholder="Shop profile picture"
                                            onChange={(e) => setShopImage(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Shop Video</label>
                                        <input
                                            type="file"
                                            className="input-field"
                                            placeholder="Account Number / IBAN"
                                            onChange={(e) => setShopVideo(e.target.files[0])}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-navigation">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        className="nav-button prev-button"
                                        onClick={prevStep}
                                    >
                                        Back
                                    </button>
                                )}

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        className="nav-button next-button"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="auth-button"
                                        onClick={handleSubmit}
                                    >
                                        Register
                                    </button>
                                )}
                            </div>
                        </div>

                        {step === 1 && (
                            <>
                                <div className="divider">OR</div>
                                <button className="google-button">
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
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default VendorRegister;