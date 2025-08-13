import { useState } from 'react';
import axios from 'axios';
import CheckoutInputs from './CheckoutInputs';
import usePlaceOrder from '../for_all_users/operations/usePlaceOrder';

// const CheckoutModal = ({ isOpen, onClose }) => {
const CheckoutModal = ({ isOpen, onClose, product_details, quantity }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address_to_deliver, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [upazila, setUpazila] = useState('');
    const [zip_code, setZip_Code] = useState('');
    const { placeOrder } = usePlaceOrder();
    const [showModal, setShowModal] = useState(false);
    if (!isOpen) return null;
    const total = (product_details.product_price * quantity) + 9.99
    async function placeOrderOperation() {
        try {
            await placeOrder(
                product_details.shop_owner_username,
                product_details.product_slug,
                product_details.id,
                quantity,
                total,
                phoneNumber,
                city,
                upazila,
                address_to_deliver,
                zip_code
            );
            setShowModal(true);
        } catch (error) {
            console.error("Order failed:", error);
            // Consider adding user feedback here
        }
    }

    return (
        <div className="modal-overlay active">
            <div className="modal-container">
                {showModal ? (
                    <div className="text-center">
                        <div className="position-relative d-flex justify-content-center mb-4" style={{ height: '80px' }}>
                            <div className="circle"></div>
                            <div className="checkmark"></div>
                        </div>
                        <h3 className="mb-3">Order Placed Successfully!</h3>
                        <p className="mb-4">Thank you for your purchase. Your order has been received.</p>
                        <button
                            onClick={onClose}
                            className="btn btn-primary"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="checkout-section">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Checkout</h5>
                                <button
                                    onClick={onClose}
                                    className="btn btn-link text-dark p-0"
                                    style={{ fontSize: '1.5rem' }}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="card-body">
                                <CheckoutInputs setPhoneNumber={setPhoneNumber} setAddress={setAddress} setCity={setCity} setUpazila={setUpazila} setZip_Code={setZip_Code} />

                                <div className="order-summary mt-4 mb-4">
                                    <h6 className="mb-3">Order Summary</h6>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal ( items)</span>
                                        {/* <span>Subtotal ({cartItems.length} items)</span> */}
                                        <span>${product_details.product_price * quantity}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Shipping</span>
                                        <span>$9.99</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Tax</span>
                                        <span>$24.50</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold">
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        onClick={placeOrderOperation}
                                        className="btn btn-primary"
                                    // disabled={loading}
                                    >
                                        {/* {loading ? (
                                        <span className="d-flex align-items-center justify-content-center">
                                            <span className="loader me-2"></span>
                                            Processing...
                                        </span>
                                    ) : 'Place Order'} */}
                                        Place Order
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;