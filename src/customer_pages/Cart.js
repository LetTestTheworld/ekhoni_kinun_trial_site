import axios from "axios";
import UseUser from "../common_component/UseUser";
import CartOperations from "../for_all_users/operations/CartOperations";
import useProductAndCategory from "../for_all_users/operations/useProductAndCategory";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import { useState } from "react";
import Modal from "../common_component/Modal";

const Cart = () => {
    const [itemQuantities, setItemQuantities] = useState({});
    const [showModal, setShowModal] = useState(false);
    const getCartItems = CartOperations().cartItems;
    const { deleteCartItem } = CartOperations();
    const user = UseUser();
    const products = useProductAndCategory().allProducts;
    const cartItems = getCartItems.filter(item => item.customer_username === user.username);
    const totalPrice = 0
    // cartData()
    // function cartData() {
    //     return {cartItems, totalPrice};
    // }
    // console.log(cartData().cartItems)
    async function increaseQuantity(cartId) {
        const { data } = await axios.post(`/increase-quantity/${cartId}`);
        setItemQuantities(prev => ({
            ...prev,
            [cartId]: data.cartItems.find(item => item.id === cartId).quantity
        }));
    }

    async function decreaseQuantity(cartId) {
        const { data } = await axios.post(`/decrease-quantity/${cartId}`);
        setItemQuantities(prev => ({
            ...prev,
            [cartId]: data.cartItems.find(item => item.id === cartId).quantity
        }));
    }

    async function removeItem(cartId) {
        await deleteCartItem(cartId);
        if (sessionStorage.getItem('respondedMessage')) {
            setShowModal(true);
            sessionStorage.removeItem('respondedMessage');
        }
    }


    return (
        <>

            {showModal && (
                <Modal
                    message="Product added to cart successfully"
                    onClose={() => setShowModal(false)}
                />
            )}

            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <nav aria-label="breadcrumb" className="mb-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                            </ol>
                        </nav>

                        <h2 className="mb-4">Your Shopping Cart</h2>

                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table cart-table mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: '120px' }}>Product</th>
                                                        <th scope="col">Details</th>
                                                        <th scope="col" style={{ width: '120px' }}>Price</th>
                                                        <th scope="col" style={{ width: '150px' }}>Quantity</th>
                                                        <th scope="col" style={{ width: '100px' }}>Total</th>
                                                        <th scope="col" style={{ width: '50px' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Cart Item 1 */}
                                                    {
                                                        cartItems.map((item, index) => {
                                                            const product = products.find(prod => prod.id === item.product_id);
                                                            return (
                                                                <tr className="cart-item">
                                                                    <td>
                                                                        <img src={'http://127.0.0.1:8000/uploads/' + product.product_image} alt="Product"
                                                                            className="img-fluid rounded-2" />
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="product-title mb-1">{product.product_name}</h6>
                                                                        <small className="text-muted">Vendor: TechHub</small>
                                                                        {/* <div className="product-options small mt-2">
                                                                        <div className="option-item"><span className="text-muted">Color:</span> Black</div>
                                                                        <div className="option-item"><span className="text-muted">Size:</span> Medium</div>
                                                                    </div> */}
                                                                    </td>
                                                                    <td>
                                                                        <span className="product-price">{product.product_price}</span>
                                                                        {/* <small className="text-muted d-block"><del>$129.99</del></small> */}
                                                                    </td>
                                                                    <td>
                                                                        <div className="input-group quantity-input">
                                                                            <button onClick={() => decreaseQuantity(item.id)} className="btn btn-outline-secondary minus-btn" type="button">
                                                                                <i className="fas fa-minus"></i>
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control text-center quantity-value"
                                                                                value={itemQuantities[item.id] || item.quantity}
                                                                                readOnly
                                                                            />
                                                                            <button onClick={() => increaseQuantity(item.id)} className="btn btn-outline-secondary plus-btn" type="button">
                                                                                <i className="fas fa-plus"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="product-total">{item.quantity * product.product_price}</span>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => removeItem(item.id)} className="btn btn-link text-danger remove-item">
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    {/* Cart Item 3 */}
                                                    {/* <tr className="cart-item">
                                                            <td>
                                                                <img src="https://via.placeholder.com/100x100/999999" alt="Product"
                                                                    className="img-fluid rounded-2" />
                                                            </td>
                                                            <td>
                                                                <h6 className="product-title mb-1">Wireless Charging Pad</h6>
                                                                <small className="text-muted">Vendor: TechHub</small>
                                                                <div className="product-options small mt-2">
                                                                    <div className="option-item"><span className="text-muted">Color:</span> White</div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="product-price">$29.99</span>
                                                                <small className="text-muted d-block"><del>$39.99</del></small>
                                                            </td>
                                                            <td>
                                                                <div className="input-group quantity-input">
                                                                    <button className="btn btn-outline-secondary minus-btn" type="button">
                                                                        <i className="fas fa-minus"></i>
                                                                    </button>
                                                                    <input type="text"
                                                                        className="form-control text-center quantity-value" value="2" />
                                                                    <button className="btn btn-outline-secondary plus-btn" type="button">
                                                                        <i className="fas fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="product-total">$59.98</span>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-link text-danger remove-item">
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </td>
                                                        </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-4">
                                    <a href="categories.html" className="btn btn-outline-primary">
                                        <i className="fas fa-arrow-left me-2"></i> Continue Shopping
                                    </a>
                                    <button className="btn btn-outline-danger" id="clearCart">
                                        <i className="fas fa-trash-alt me-2"></i> Clear Cart
                                    </button>
                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title mb-4">Apply Coupon Code</h5>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Enter coupon code" />
                                            <button className="btn btn-primary" type="button">Apply</button>
                                        </div>
                                        <div className="coupon-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-header bg-white border-0">
                                        <h5 className="mb-0">Order Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="order-summary">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Subtotal ({cartItems.length} items)</span>

                                                <span>
                                                    ${cartItems.reduce((sum, item) => sum + (parseFloat(item.total_price) || 0), 0).toFixed(2)}
                                                </span>

                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Shipping</span>
                                                <span>$9.99</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Tax</span>
                                                <span>$24.50</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <span className="text-muted">Discount</span>
                                                <span className="text-success">-$40.00</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between mb-3">
                                                <span className="fw-bold">Total</span>
                                                <span className="fw-bold">$344.45</span>
                                            </div>
                                            <div className="d-grid">
                                                <a href="checkout.html" className="btn btn-primary btn-lg">Proceed to Checkout</a>
                                            </div>
                                            <div className="text-center mt-3">
                                                <small className="text-muted">or <a href="#" className="text-primary">checkout with</a></small>
                                                <div className="d-flex justify-content-center gap-2 mt-2">
                                                    <a href="#" className="btn btn-outline-dark btn-sm">
                                                        <i className="fab fa-google me-1"></i> Google Pay
                                                    </a>
                                                    <a href="#" className="btn btn-outline-dark btn-sm">
                                                        <i className="fab fa-apple me-1"></i> Apple Pay
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Secure Payment</h5>
                                        <p className="small text-muted mb-3">All transactions are secure and encrypted.</p>
                                        <div className="payment-methods d-flex flex-wrap gap-2">
                                            <img src="https://via.placeholder.com/40x25" alt="Visa" className="img-fluid" />
                                            <img src="https://via.placeholder.com/40x25/cccccc" alt="Mastercard" className="img-fluid" />
                                            <img src="https://via.placeholder.com/40x25/999999" alt="Amex" className="img-fluid" />
                                            <img src="https://via.placeholder.com/40x25/666666" alt="Discover" className="img-fluid" />
                                            <img src="https://via.placeholder.com/40x25/333333" alt="PayPal" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Frequently Bought Together</h5>
                                        <div className="row g-4">
                                            {/* Product 1 */}
                                            <div className="col-xl-3 col-lg-4 col-md-6">
                                                <div className="product-card card border-0 shadow-sm h-100">
                                                    <div className="product-thumb position-relative overflow-hidden">
                                                        <img src="https://via.placeholder.com/300x300" className="card-img-top"
                                                            alt="Product Image" />
                                                        <div className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                                                            <button className="btn btn-outline-light rounded-circle me-2 quick-view"
                                                                data-bs-toggle="tooltip" title="Quick View">
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                            <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist"
                                                                data-bs-toggle="tooltip" title="Add to Wishlist">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                            <button className="btn btn-outline-light rounded-circle add-to-cart"
                                                                data-bs-toggle="tooltip" title="Add to Cart">
                                                                <i className="fas fa-shopping-cart"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="vendor-info d-flex align-items-center mb-2">
                                                            <img src="https://via.placeholder.com/30x30" alt="Vendor"
                                                                className="rounded-circle me-2" />
                                                            <small className="text-muted">TechHub</small>
                                                        </div>
                                                        <h5 className="product-title mb-1"><a href="product-details.html"
                                                            className="text-dark text-decoration-none">Phone Case</a></h5>
                                                        <div className="product-rating mb-2">
                                                            <i className="fas fa-star text-warning"></i>
                                                            <i className="fas fa-star text-warning"></i>
                                                            <i className="fas fa-star text-warning"></i>
                                                            <i className="fas fa-star text-warning"></i>
                                                            <i className="far fa-star text-warning"></i>
                                                            <small className="text-muted ms-1">(36)</small>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="product-price">
                                                                <span className="text-primary fw-bold">$19.99</span>
                                                            </div>
                                                            <div className="product-stock small">
                                                                <span className="text-success">In Stock</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* More products would go here (3 more) */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Cart;