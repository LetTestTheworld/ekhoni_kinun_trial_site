import { Link } from "react-router-dom"
import Footer from "../layouts/Footer"
import Navbar from "../layouts/Navbar"
import CheckoutInputs from "../common_component/CheckoutInputs"

function CheckOut() {
    return (
        <>
            <div className="users-pages">
                <Navbar />
                <div class="container my-5">
                    <div class="row">
                        <div class="col-12">
                            <nav aria-label="breadcrumb" class="mb-4">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                    <li class="breadcrumb-item"><a href="cart.html">Cart</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                                </ol>
                            </nav>

                            <h2 class="mb-4">Checkout</h2>

                            <div class="row">
                                <div class="col-lg-8">
                                    {/* Checkout Steps  */}
                                    {/* <div class="checkout-steps mb-5">
                                        <div class="steps d-flex flex-wrap">
                                            <div class="step active" data-step="1">
                                                <div class="step-number">1</div>
                                                <div class="step-title">Shipping</div>
                                            </div>
                                            <div class="step" data-step="2">
                                                <div class="step-number">2</div>
                                                <div class="step-title">Payment</div>
                                            </div>
                                            <div class="step" data-step="3">
                                                <div class="step-number">3</div>
                                                <div class="step-title">Review</div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* Shipping Information  */}
                                    <div class="checkout-section mb-5" id="shippingSection">
                                        <div class="card border-0 shadow-sm">
                                            <div class="card-header bg-white border-0">
                                                <h5 class="mb-0">Shipping Information</h5>
                                            </div>
                                            <div class="card-body">
                                                {/* <CheckoutInputs placeOrder={placeOrder}  /> */}
                                                <div class="d-flex justify-content-between mt-4">
                                                    <Link to={'/cart'} class="btn btn-outline-secondary">Back to Cart</Link>
                                                    <button type="submit" class="btn btn-primary">Continue to Payment</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Information (Hidden initially)  */}
                                    <div class="checkout-section mb-5 d-none" id="paymentSection">
                                        <div class="card border-0 shadow-sm">
                                            <div class="card-header bg-white border-0">
                                                <h5 class="mb-0">Payment Method</h5>
                                            </div>
                                            <div class="card-body">
                                                <form id="paymentForm">
                                                    <div class="payment-methods mb-4">
                                                        <div class="form-check mb-3">
                                                            <input class="form-check-input" type="radio" name="paymentMethod"
                                                                id="creditCard" checked />
                                                            <label class="form-check-label d-flex align-items-center"
                                                                for="creditCard">
                                                                <i class="far fa-credit-card fs-4 me-3"></i>
                                                                <span>Credit/Debit Card</span>
                                                            </label>
                                                        </div>
                                                        <div class="form-check mb-3">
                                                            <input class="form-check-input" type="radio" name="paymentMethod"
                                                                id="paypal" />
                                                            <label class="form-check-label d-flex align-items-center" for="paypal">
                                                                <i class="fab fa-paypal fs-4 me-3 text-primary"></i>
                                                                <span>PayPal</span>
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="paymentMethod"
                                                                id="bankTransfer" />
                                                            <label class="form-check-label d-flex align-items-center"
                                                                for="bankTransfer">
                                                                <i class="fas fa-university fs-4 me-3 text-primary"></i>
                                                                <span>Bank Transfer</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Credit Card Form  */}
                                                    <div class="credit-card-form" id="creditCardForm">
                                                        <div class="row">
                                                            <div class="col-12 mb-3">
                                                                <label for="cardNumber" class="form-label">Card Number</label>
                                                                <input type="text" class="form-control" id="cardNumber"
                                                                    placeholder="1234 5678 9012 3456" />
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <label for="cardName" class="form-label">Name on Card</label>
                                                                <input type="text" class="form-control" id="cardName"
                                                                    placeholder="John Doe" />
                                                            </div>
                                                            <div class="col-md-3 mb-3">
                                                                <label for="cardExpiry" class="form-label">Expiry Date</label>
                                                                <input type="text" class="form-control" id="cardExpiry"
                                                                    placeholder="MM/YY" />
                                                            </div>
                                                            <div class="col-md-3 mb-3">
                                                                <label for="cardCvv" class="form-label">CVV</label>
                                                                <input type="text" class="form-control" id="cardCvv"
                                                                    placeholder="123" />
                                                            </div>
                                                        </div>
                                                        <div class="mb-3 form-check">
                                                            <input type="checkbox" class="form-check-input" id="saveCard" />
                                                            <label class="form-check-label" for="saveCard">Save card for future
                                                                payments</label>
                                                        </div>
                                                    </div>

                                                    {/* PayPal Info (Hidden initially)  */}
                                                    <div class="paypal-info d-none" id="paypalInfo">
                                                        <div class="alert alert-info">
                                                            You will be redirected to PayPal to complete your payment securely.
                                                        </div>
                                                    </div>

                                                    {/* Bank Transfer Info (Hidden initially)  */}
                                                    <div class="bank-transfer-info d-none" id="bankTransferInfo">
                                                        <div class="alert alert-info">
                                                            <p>Please use the following bank details to complete your payment:</p>
                                                            <p><strong>Bank Name:</strong> ShopSphere Bank</p>
                                                            <p><strong>Account Number:</strong> 1234567890</p>
                                                            <p><strong>Routing Number:</strong> 987654321</p>
                                                            <p>Please include your order number as the payment reference.</p>
                                                        </div>
                                                    </div>

                                                    <div class="d-flex justify-content-between mt-4">
                                                        <button type="button"
                                                            class="btn btn-outline-secondary back-to-shipping">Back to
                                                            Shipping</button>
                                                        <button type="submit" class="btn btn-primary">Review Order</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Review (Hidden initially)  */}
                                    <div class="checkout-section mb-5 d-none" id="reviewSection">
                                        <div class="card border-0 shadow-sm">
                                            <div class="card-header bg-white border-0">
                                                <h5 class="mb-0">Order Review</h5>
                                            </div>
                                            <div class="card-body">
                                                <div class="order-summary mb-4">
                                                    <h6 class="mb-3">Shipping Information</h6>
                                                    <div class="shipping-info mb-4">
                                                        <p id="reviewShippingName">John Doe</p>
                                                        <p id="reviewShippingAddress">123 Main St, Apt 4B</p>
                                                        <p id="reviewShippingCity">New York, NY 10001</p>
                                                        <p id="reviewShippingCountry">United States</p>
                                                        <p id="reviewShippingPhone">+1 (555) 123-4567</p>
                                                        <p id="reviewShippingEmail">john.doe@example.com</p>
                                                    </div>

                                                    <h6 class="mb-3">Payment Method</h6>
                                                    <div class="payment-info mb-4">
                                                        <p id="reviewPaymentMethod">Credit Card ending in 3456</p>
                                                    </div>

                                                    <h6 class="mb-3">Order Items</h6>
                                                    <div class="order-items">
                                                        <div class="table-responsive">
                                                            <table class="table mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Product</th>
                                                                        <th scope="col">Price</th>
                                                                        <th scope="col">Qty</th>
                                                                        <th scope="col">Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Wireless Bluetooth Headphones</td>
                                                                        <td>$89.99</td>
                                                                        <td>1</td>
                                                                        <td>$89.99</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Smart Watch Series 5</td>
                                                                        <td>$199.99</td>
                                                                        <td>1</td>
                                                                        <td>$199.99</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Wireless Charging Pad</td>
                                                                        <td>$29.99</td>
                                                                        <td>2</td>
                                                                        <td>$59.98</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="order-totals">
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <span class="text-muted">Subtotal</span>
                                                        <span>$349.96</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <span class="text-muted">Shipping</span>
                                                        <span>$9.99</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <span class="text-muted">Tax</span>
                                                        <span>$24.50</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <span class="text-muted">Discount</span>
                                                        <span class="text-success">-$40.00</span>
                                                    </div>
                                                    <hr />
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <span class="fw-bold">Total</span>
                                                        <span class="fw-bold">$344.45</span>
                                                    </div>
                                                </div>

                                                <div class="form-check mb-4">
                                                    <input class="form-check-input" type="checkbox" id="agreeTerms" />
                                                    <label class="form-check-label" for="agreeTerms">
                                                        I agree to the <a href="#" class="text-primary">Terms and Conditions</a> and
                                                        <a href="#" class="text-primary">Privacy Policy</a>
                                                    </label>
                                                </div>

                                                <div class="d-flex justify-content-between">
                                                    <button type="button" class="btn btn-outline-secondary back-to-payment">Back to
                                                        Payment</button>
                                                    <button type="button" class="btn btn-primary" id="placeOrderBtn">Place
                                                        Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="card border-0 shadow-sm mb-4">
                                        <div class="card-header bg-white border-0">
                                            <h5 class="mb-0">Order Summary</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="order-items mb-4">
                                                <div class="order-item d-flex mb-3">
                                                    <img src="https://via.placeholder.com/80x80" alt="Product"
                                                        class="rounded-2 me-3"
                                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">Wireless Bluetooth Headphones</h6>
                                                        <div class="d-flex justify-content-between">
                                                            <small class="text-muted">Qty: 1</small>
                                                            <span class="fw-bold">$89.99</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="order-item d-flex mb-3">
                                                    <img src="https://via.placeholder.com/80x80/cccccc" alt="Product"
                                                        class="rounded-2 me-3"
                                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">Smart Watch Series 5</h6>
                                                        <div class="d-flex justify-content-between">
                                                            <small class="text-muted">Qty: 1</small>
                                                            <span class="fw-bold">$199.99</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="order-item d-flex">
                                                    <img src="https://via.placeholder.com/80x80/999999" alt="Product"
                                                        class="rounded-2 me-3"
                                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">Wireless Charging Pad</h6>
                                                        <div class="d-flex justify-content-between">
                                                            <small class="text-muted">Qty: 2</small>
                                                            <span class="fw-bold">$59.98</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="order-totals">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <span class="text-muted">Subtotal</span>
                                                    <span>$349.96</span>
                                                </div>
                                                <div class="d-flex justify-content-between mb-2">
                                                    <span class="text-muted">Shipping</span>
                                                    <span>$9.99</span>
                                                </div>
                                                <div class="d-flex justify-content-between mb-2">
                                                    <span class="text-muted">Tax</span>
                                                    <span>$24.50</span>
                                                </div>
                                                <div class="d-flex justify-content-between mb-3">
                                                    <span class="text-muted">Discount</span>
                                                    <span class="text-success">-$40.00</span>
                                                </div>
                                                <hr />
                                                <div class="d-flex justify-content-between mb-3">
                                                    <span class="fw-bold">Total</span>
                                                    <span class="fw-bold">$344.45</span>
                                                </div>
                                            </div>

                                            <div class="promo-code mt-4">
                                                <label for="promoCode" class="form-label">Promo Code</label>
                                                <div class="input-group mb-3">
                                                    <input type="text" class="form-control" id="promoCode"
                                                        placeholder="Enter promo code" />
                                                    <button class="btn btn-primary" type="button">Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card border-0 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="card-title mb-3">Secure Checkout</h5>
                                            <p class="small text-muted mb-3">All transactions are secure and encrypted.</p>
                                            <div class="payment-methods d-flex flex-wrap gap-2 mb-3">
                                                <img src="https://via.placeholder.com/40x25" alt="Visa" class="img-fluid" />
                                                <img src="https://via.placeholder.com/40x25/cccccc" alt="Mastercard"
                                                    class="img-fluid" />
                                                <img src="https://via.placeholder.com/40x25/999999" alt="Amex" class="img-fluid" />
                                                <img src="https://via.placeholder.com/40x25/666666" alt="Discover"
                                                    class="img-fluid" />
                                                <img src="https://via.placeholder.com/40x25/333333" alt="PayPal" class="img-fluid" />
                                            </div>
                                            <div class="customer-support">
                                                <h6 class="mb-2">Need Help?</h6>
                                                <p class="small text-muted mb-2"><i class="fas fa-phone-alt me-2"></i> +1 (800)
                                                    123-4567</p>
                                                <p class="small text-muted"><i class="fas fa-envelope me-2"></i>
                                                    support@shopsphere.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Success Modal  */}
                <div class="modal fade" id="orderSuccessModal" tabindex="-1" aria-labelledby="orderSuccessModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body text-center p-5">
                                <div class="icon-success mb-4">
                                    <div class="checkmark-circle">
                                        <div class="checkmark"></div>
                                    </div>
                                </div>
                                <h3 class="mb-3">Order Placed Successfully!</h3>
                                <p class="mb-4">Your order #123456 has been placed and will be processed shortly. A confirmation
                                    email has been sent to your registered email address.</p>
                                <div class="d-grid gap-3">
                                    <a href="index.html" class="btn btn-primary">Continue Shopping</a>
                                    <a href="orders.html" class="btn btn-outline-primary">View Order Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut