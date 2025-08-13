import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "../layouts/Footer"
import Navbar from "../layouts/Navbar"
import { safeBase64Decode } from "../common_component/EnEdUtils";
import { useEffect, useState } from "react";
import Loader from "../common_component/Loader";
import useProductAndCategory from "./operations/useProductAndCategory";
import CartOperations from "./operations/CartOperations";
import UseUser from "../common_component/UseUser";
import Modal from "../common_component/Modal";
import CheckoutModal from "../common_component/CheckoutModal";

function ProductDetails() {
    const param = useParams();
    const username = safeBase64Decode(param.owner_username);
    const productAndCategory = useProductAndCategory(username);
    const product_details = productAndCategory.products.find(product => product.product_slug === param.product_slug);
    const categoryWiseProducts = productAndCategory.products.filter(product => product.product_category === product_details.product_category);

    const [quantity, setQuantity] = useState(1);
    const [showCheckout, setShowCheckout] = useState(false);
    const [respondedMessage, setRespondedMessage] = useState('');
    const { addToCart } = CartOperations();
    const user = UseUser();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = async () => {
        if (!user?.username) {
            sessionStorage.setItem('respondedMessage', 'please login first')
            navigate('/login')
        }

        else{
            try {
            await addToCart(
                user.username,
                param.product_slug,
                product_details.id,
                quantity,
                product_details.product_price * quantity
            );
            if (sessionStorage.getItem('respondedMessage')) {
                setRespondedMessage(sessionStorage.getItem('respondedMessage'));
                sessionStorage.removeItem('respondedMessage');
            }
        } catch (error) {
            console.error("Order failed:", error);
        }
        }
    }
    return (
        <>
            {
                product_details == undefined ?
                    <Loader />
                    :
                    <div className="users-pages">
                        <Navbar />
                        {respondedMessage && (
                            <Modal
                                message="Product added to cart successfully"
                                onClose={() => setShowModal(false)}
                            />
                        )}
                        {/* Main Content will go here */}
                        <div class="container my-5">
                            <nav aria-label="breadcrumb" class="mb-4">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                    <li class="breadcrumb-item"><a href="categories.html">Electronics</a></li>
                                    <li class="breadcrumb-item"><a href="#">Headphones</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Wireless Bluetooth Headphones</li>
                                </ol>
                            </nav>

                            <div class="row g-4">
                                <div class="col-lg-6">
                                    <div class="product-gallery">
                                        <div class="main-image mb-3 border rounded-3 overflow-hidden">
                                            <img id="mainProductImage" src={`http://127.0.0.1:8000/uploads/${product_details.product_image}`} class="img-fluid w-100" alt="Product Image" />
                                        </div>
                                        {/* <div class="thumbnail-images d-flex flex-wrap gap-2">
                                            <div class="thumbnail border rounded-2 overflow-hidden cursor-pointer"
                                                style={{ width: '80px', height: '80px' }}>
                                                <img src={`127.0.0.1:8000/uploads/${product_details.product_image}`}
                                                    class="img-fluid w-100 h-100 object-fit-cover" onclick="changeMainImage(this)" />
                                            </div>
                                            <div class="thumbnail border rounded-2 overflow-hidden cursor-pointer"
                                                style={{ width: '80px', height: '80px' }}>
                                                <img src="https://via.placeholder.com/600x600/cccccc"
                                                    class="img-fluid w-100 h-100 object-fit-cover" onclick="changeMainImage(this)" />
                                            </div>
                                            <div class="thumbnail border rounded-2 overflow-hidden cursor-pointer"
                                                style={{ width: '80px', height: '80px' }}>
                                                <img src="https://via.placeholder.com/600x600/999999"
                                                    class="img-fluid w-100 h-100 object-fit-cover" onclick="changeMainImage(this)" />
                                            </div>
                                            <div class="thumbnail border rounded-2 overflow-hidden cursor-pointer"
                                                style={{ width: '80px', height: '80px' }}>
                                                <img src="https://via.placeholder.com/600x600/666666"
                                                    class="img-fluid w-100 h-100 object-fit-cover" onclick="changeMainImage(this)" />
                                            </div>
                                            <div class="thumbnail border rounded-2 overflow-hidden cursor-pointer"
                                                style={{ width: '80px', height: '80px' }}>
                                                <img src="https://via.placeholder.com/600x600/333333"
                                                    class="img-fluid w-100 h-100 object-fit-cover" onclick="changeMainImage(this)" />
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <div class="product-video mt-4">
                                        <div class="card border-0 shadow-sm">
                                            <div class="card-header bg-light">
                                                <h5 class="mb-0">Product Video</h5>
                                            </div>
                                            <div class="card-body p-0 ratio ratio-16x9">
                                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Product Video"
                                            allowfullscreen></iframe>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                                <div class="col-lg-6">
                                    <div class="product-details">
                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                            <h1 class="product-title mb-1">{product_details.product_name}</h1>
                                            {/* <button class="btn btn-outline-secondary btn-sm rounded-circle add-to-wishlist">
                                                <i class="far fa-heart"></i>
                                            </button> */}
                                        </div>

                                        {/* <div class="vendor-info d-flex align-items-center mb-3">
                                            <img src="https://via.placeholder.com/40x40" alt="Vendor" class="rounded-circle me-2" />
                                            <div>
                                                <h6 class="mb-0">TechHub</h6>
                                                <small class="text-muted">Official Store</small>
                                            </div>
                                            <div class="ms-3 ps-3 border-start">
                                                <div class="rating-stars">
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star-half-alt text-warning"></i>
                                                    <small class="text-muted ms-1">(128 reviews)</small>
                                                </div>
                                                <a href="#reviews" class="small text-primary">View all reviews</a>
                                            </div>
                                        </div> */}

                                        <div class="product-meta mb-4">
                                            <div class="availability mb-2">
                                                <span class="badge bg-success">
                                                    {
                                                        product_details.product_stock_quantity > 0 ? "In Stock" : "Out of Stock"
                                                    }
                                                </span>
                                                <small class="text-muted ms-2">Only {product_details.product_stock_quantity.length} left</small>
                                            </div>
                                            {/* <div class="product-sku mb-2">
                                                <small class="text-muted">SKU: TH-WBHP-001</small>
                                            </div> */}
                                            <div class="product-category">
                                                <small class="text-muted">Category:
                                                    {/* <a href="#" class="text-primary">Headphones</a>, <a
                                                    href="#" class="text-primary">Electronics</a> */}
                                                    <p href="#" class="text-primary d-inline ms-2">{productAndCategory.categories.find(category => category.category_id === product_details.category_id).category_name}</p>
                                                </small>
                                            </div>
                                        </div>

                                        <div class="price-section mb-4">
                                            <div class="current-price d-flex align-items-center">
                                                <h3 class="text-primary mb-0">{product_details.product_price} Tk.</h3>
                                                {/* <span class="original-price text-decoration-line-through text-muted ms-3">$129.99</span>
                                                <span class="discount-percent bg-danger text-white small ms-2 px-2 py-1 rounded">30%
                                                    OFF</span> */}
                                            </div>
                                            <div class="price-note small text-muted">
                                                Inclusive of all taxes
                                            </div>
                                        </div>

                                        {/* <div class="product-variants mb-4">
                                            <div class="variant-option mb-3">
                                                <h6 class="option-title mb-2">Color</h6>
                                                <div class="color-options d-flex flex-wrap gap-2">
                                                    <div class="color-option active" data-color="black" style={{ backgroundColor: "#000000" }}
                                                        data-bs-toggle="tooltip" title="Black"></div>
                                                    <div class="color-option" data-color="blue" style={{ backgroundColor: '#0d6efd' }}
                                                        data-bs-toggle="tooltip" title="Blue"></div>
                                                    <div class="color-option" data-color="red" style={{ backgroundColor: '#dc3545' }}
                                                        data-bs-toggle="tooltip" title="Red"></div>
                                                    <div class="color-option" data-color="white"
                                                        style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }} data-bs-toggle="tooltip"
                                                        title="White"></div>
                                                </div>
                                            </div>

                                            <div class="variant-option mb-3">
                                                <h6 class="option-title mb-2">Size</h6>
                                                <div class="size-options d-flex flex-wrap gap-2">
                                                    <div class="size-option active" data-size="small">Small</div>
                                                    <div class="size-option" data-size="medium">Medium</div>
                                                    <div class="size-option" data-size="large">Large</div>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div class="quantity-selector mb-4">
                                            <h6 class="option-title mb-2">Quantity</h6>
                                            <div class="input-group quantity-input" style={{ maxWidth: '150px' }}>
                                                <button class="btn btn-outline-secondary minus-btn" onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }} type="button">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <input type="text" onChange={(e) => setQuantity(e.target.value)} class="form-control text-center quantity-value" value={quantity} />
                                                <button class="btn btn-outline-secondary plus-btn" onClick={() => setQuantity(quantity + 1)} type="button">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="action-buttons d-flex flex-wrap gap-3 mb-4">
                                            <button onClick={handleAddToCart} class="btn btn-primary flex-grow-1 py-3 add-to-cart-btn">
                                                <i class="fas fa-shopping-cart me-2"></i> Add to Cart
                                            </button>
                                            <button onClick={() => setShowCheckout(true)} class="btn btn-outline-primary flex-grow-1 py-3 buy-now-btn">
                                                <i class="fas fa-bolt me-2"></i> Buy Now
                                            </button>
                                        </div>

                                        {/* <div class="delivery-info mb-4">
                                            <div class="card border-0 shadow-sm">
                                                <div class="card-body">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <i class="fas fa-truck text-primary me-3 fs-5"></i>
                                                        <div>
                                                            <h6 class="mb-0">Delivery Options</h6>
                                                            <small class="text-muted">Enter your PIN code to check delivery time</small>
                                                        </div>
                                                    </div>
                                                    <div class="input-group mt-3">
                                                        <input type="text" class="form-control" placeholder="Enter PIN code" />
                                                        <button class="btn btn-primary">Check</button>
                                                    </div>
                                                    <div class="delivery-options mt-3">
                                                        <div class="option-item d-flex justify-content-between py-2">
                                                            <div>
                                                                <i class="fas fa-home me-2 text-muted"></i>
                                                                <span>Standard Delivery</span>
                                                            </div>
                                                            <span class="text-muted">3-5 business days</span>
                                                        </div>
                                                        <div class="option-item d-flex justify-content-between py-2">
                                                            <div>
                                                                <i class="fas fa-bolt me-2 text-muted"></i>
                                                                <span>Express Delivery</span>
                                                            </div>
                                                            <span class="text-muted">1-2 business days</span>
                                                        </div>
                                                        <div class="option-item d-flex justify-content-between py-2">
                                                            <div>
                                                                <i class="fas fa-store me-2 text-muted"></i>
                                                                <span>Pickup from Store</span>
                                                            </div>
                                                            <span class="text-muted">Ready in 24 hours</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <div class="product-share mb-4">
                                            <h6 class="option-title mb-2">Share this product</h6>
                                            <div class="share-buttons d-flex gap-2">
                                                <a href="#" class="btn btn-outline-secondary rounded-circle p-2">
                                                    <i class="fab fa-facebook-f"></i>
                                                </a>
                                                <a href="#" class="btn btn-outline-secondary rounded-circle p-2">
                                                    <i class="fab fa-twitter"></i>
                                                </a>
                                                <a href="#" class="btn btn-outline-secondary rounded-circle p-2">
                                                    <i class="fab fa-instagram"></i>
                                                </a>
                                                <a href="#" class="btn btn-outline-secondary rounded-circle p-2">
                                                    <i class="fab fa-whatsapp"></i>
                                                </a>
                                                <a href="#" class="btn btn-outline-secondary rounded-circle p-2">
                                                    <i class="fas fa-envelope"></i>
                                                </a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-12">
                                    <div class="product-tabs">
                                        <ul class="nav nav-tabs" id="productTabs" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="description-tab" data-bs-toggle="tab"
                                                    data-bs-target="#description" type="button" role="tab">Description</button>
                                            </li>
                                            {/* <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="specifications-tab" data-bs-toggle="tab"
                                                    data-bs-target="#specifications" type="button" role="tab">Specifications</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews"
                                                    type="button" role="tab">Reviews (128)</button>
                                            </li> */}
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="shipping-tab" data-bs-toggle="tab" data-bs-target="#shipping"
                                                    type="button" role="tab">Shipping & Returns</button>
                                            </li>
                                        </ul>
                                        <div class="tab-content p-4 border border-top-0 rounded-bottom" id="productTabsContent">
                                            <div class="tab-pane fade show active" id="description" role="tabpanel">
                                                <h4 class="mb-4">Product Description</h4>
                                                <p>{product_details.product_description}</p>

                                                {/* <h5 class="mt-4 mb-3">Key Features</h5>
                                                <ul class="list-unstyled">
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Active Noise
                                                        Cancellation (ANC) technology</li>
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> 40mm dynamic
                                                        drivers for powerful sound</li>
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Up to 30 hours of
                                                        battery life</li>
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Built-in
                                                        microphone for hands-free calls</li>
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Comfortable
                                                        over-ear design with memory foam cushions</li>
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Bluetooth 5.0
                                                        with 33ft wireless range</li>
                                                    <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Foldable design
                                                        for easy storage and portability</li>
                                                </ul>

                                                <div class="row mt-4">
                                                    <div class="col-md-6 mb-4">
                                                        <img src="https://via.placeholder.com/600x400" class="img-fluid rounded-3 shadow-sm"
                                                            alt="Feature 1" />
                                                    </div>
                                                    <div class="col-md-6 mb-4">
                                                        <img src="https://via.placeholder.com/600x400/cccccc"
                                                            class="img-fluid rounded-3 shadow-sm" alt="Feature 2" />
                                                    </div>
                                                </div> */}
                                            </div>

                                            {/* <div class="tab-pane fade" id="specifications" role="tabpanel">
                                                <h4 class="mb-4">Technical Specifications</h4>
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" style={{ width: '30%' }}>Brand</th>
                                                                <td>TechHub</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Model</th>
                                                                <td>WB-HP500</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Color</th>
                                                                <td>Black, Blue, Red, White</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Form Factor</th>
                                                                <td>Over Ear</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Connectivity</th>
                                                                <td>Bluetooth 5.0, 3.5mm AUX</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Battery Life</th>
                                                                <td>Up to 30 hours (ANC on), 40 hours (ANC off)</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Charging Time</th>
                                                                <td>2 hours</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Weight</th>
                                                                <td>255g</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Warranty</th>
                                                                <td>1 Year Manufacturer Warranty</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> */}

                                            {/* <div class="tab-pane fade" id="reviews" role="tabpanel">
                                                <h4 class="mb-4">Customer Reviews</h4>

                                                <div class="row mb-5">
                                                    <div class="col-md-4">
                                                        <div class="card border-0 shadow-sm h-100">
                                                            <div class="card-body text-center py-4">
                                                                <h1 class="display-4 fw-bold text-primary">4.7</h1>
                                                                <div class="rating-stars mb-2">
                                                                    <i class="fas fa-star text-warning"></i>
                                                                    <i class="fas fa-star text-warning"></i>
                                                                    <i class="fas fa-star text-warning"></i>
                                                                    <i class="fas fa-star text-warning"></i>
                                                                    <i class="fas fa-star-half-alt text-warning"></i>
                                                                </div>
                                                                <p class="mb-0">Based on 128 reviews</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="card border-0 shadow-sm h-100">
                                                            <div class="card-body py-4">
                                                                <div class="rating-progress mb-3">
                                                                    <div class="d-flex align-items-center mb-2">
                                                                        <small class="me-2">5 Star</small>
                                                                        <div class="progress flex-grow-1" style={{ height: '8px' }}>
                                                                            <div class="progress-bar bg-warning" role="progressbar"
                                                                                style={{ width: '75%' }}></div>
                                                                        </div>
                                                                        <small class="ms-2">75%</small>
                                                                    </div>
                                                                    <div class="d-flex align-items-center mb-2">
                                                                        <small class="me-2">4 Star</small>
                                                                        <div class="progress flex-grow-1" style={{ height: '8px' }}>
                                                                            <div class="progress-bar bg-warning" role="progressbar"
                                                                                style={{ width: '15%' }}></div>
                                                                        </div>
                                                                        <small class="ms-2">15%</small>
                                                                    </div>
                                                                    <div class="d-flex align-items-center mb-2">
                                                                        <small class="me-2">3 Star</small>
                                                                        <div class="progress flex-grow-1" style={{ height: '8px' }}>
                                                                            <div class="progress-bar bg-warning" role="progressbar"
                                                                                style={{ width: '7%' }}></div>
                                                                        </div>
                                                                        <small class="ms-2">7%</small>
                                                                    </div>
                                                                    <div class="d-flex align-items-center mb-2">
                                                                        <small class="me-2">2 Star</small>
                                                                        <div class="progress flex-grow-1" style={{ height: '8px' }}>
                                                                            <div class="progress-bar bg-warning" role="progressbar"
                                                                                style={{ width: '2%' }}></div>
                                                                        </div>
                                                                        <small class="ms-2">2%</small>
                                                                    </div>
                                                                    <div class="d-flex align-items-center">
                                                                        <small class="me-2">1 Star</small>
                                                                        <div class="progress flex-grow-1" style={{ height: '8px' }}>
                                                                            <div class="progress-bar bg-warning" role="progressbar"
                                                                                style={{ width: '1%' }}></div>
                                                                        </div>
                                                                        <small class="ms-2">1%</small>
                                                                    </div>
                                                                </div>
                                                                <button class="btn btn-primary mt-2" data-bs-toggle="modal"
                                                                    data-bs-target="#reviewModal">
                                                                    Write a Review
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="review-list">
                                                    <div class="review-item mb-4 pb-4 border-bottom">
                                                        <div class="d-flex justify-content-between mb-2">
                                                            <div class="d-flex align-items-center">
                                                                <img src="https://via.placeholder.com/40x40" alt="User"
                                                                    class="rounded-circle me-2" />
                                                                <div>
                                                                    <h6 class="mb-0">John Doe</h6>
                                                                    <div class="rating-stars small">
                                                                        <i class="fas fa-star text-warning"></i>
                                                                        <i class="fas fa-star text-warning"></i>
                                                                        <i class="fas fa-star text-warning"></i>
                                                                        <i class="fas fa-star text-warning"></i>
                                                                        <i class="fas fa-star text-warning"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <small class="text-muted">2 weeks ago</small>
                                                        </div>
                                                        <h5 class="mb-2">Excellent sound quality!</h5>
                                                        <p class="mb-2">These headphones are amazing. The noise cancellation works
                                                            perfectly, and the sound quality is crisp and clear. Battery life is impressive
                                                            too.</p>
                                                        <div class="review-images d-flex gap-2 mt-3">
                                                            <img src="https://via.placeholder.com/100x100" alt="Review Image"
                                                                class="rounded-2" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                            <img src="https://via.placeholder.com/100x100/cccccc" alt="Review Image"
                                                                class="rounded-2" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                        </div>
                                                        <div class="helpful-actions mt-3">
                                                            <small class="text-muted me-3">Was this review helpful?</small>
                                                            <button class="btn btn-sm btn-outline-secondary me-2">Yes (24)</button>
                                                            <button class="btn btn-sm btn-outline-secondary">No (2)</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <nav aria-label="Review pagination" class="mt-4">
                                                    <ul class="pagination justify-content-center">
                                                        <li class="page-item disabled">
                                                            <a class="page-link" href="#" tabindex="-1">Previous</a>
                                                        </li>
                                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                        <li class="page-item">
                                                            <a class="page-link" href="#">Next</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div> */}

                                            <div class="tab-pane fade" id="shipping" role="tabpanel">
                                                <h4 class="mb-4">Shipping & Returns</h4>

                                                <div class="mb-4">
                                                    <h5 class="mb-3">Shipping Policy</h5>
                                                    <p>We offer worldwide shipping. Most orders are processed within 1-2 business days and
                                                        shipped via standard delivery (3-5 business days) or express delivery (1-2 business
                                                        days) depending on the option you choose at checkout.</p>
                                                    <p>Shipping costs are calculated at checkout based on weight, dimensions and destination
                                                        of the items in your order.</p>
                                                </div>

                                                <div class="mb-4">
                                                    <h5 class="mb-3">Return Policy</h5>
                                                    <p>We accept returns within 30 days of receipt for most items in new, unused condition
                                                        with original packaging. To initiate a return, please contact our customer service
                                                        team.</p>
                                                    <p>Return shipping costs are the responsibility of the customer, except in cases of
                                                        defective or incorrect items.</p>
                                                </div>

                                                <div class="mb-4">
                                                    <h5 class="mb-3">Warranty Information</h5>
                                                    <p>This product comes with a 1-year manufacturer warranty against defects in materials
                                                        and workmanship. The warranty does not cover damage caused by misuse, accidents, or
                                                        normal wear and tear.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-12">
                                    <h3 class="mb-4">You May Also Like</h3>
                                    <div class="row g-4">
                                        {
                                            categoryWiseProducts.filter(product => product.product_slug !== param.product_slug).map((product) => (
                                                <div className="col-xl-3 col-lg-4 col-md-6">
                                                    <div className="product-card card border-0 shadow-sm h-100">
                                                        <div className="badge bg-success position-absolute m-2">New</div>
                                                        <div className="product-thumb position-relative overflow-hidden">
                                                            <img src={'http://127.0.0.1:8000/uploads/' + product.product_image} className="card-img-top"
                                                                alt="Product Image" />
                                                            <div
                                                                className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
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
                                                            {/* <div className="vendor-info d-flex align-items-center mb-2">
                                                    <img src="https://via.placeholder.com/30x30" alt="Vendor"
                                                        className="rounded-circle me-2" />
                                                    <small className="text-muted">TechHub</small>
                                                </div> */}
                                                            <h5 className="product-title mb-1"><Link to={`/shop/${param.shop_name}/${param.owner_username}/${product.product_slug}`}
                                                                className="text-dark text-decoration-none">{product.product_name}</Link>
                                                            </h5>
                                                            {/* <div className="product-rating mb-2">
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star-half-alt text-warning"></i>
                                                    <small className="text-muted ms-1">(42)</small>
                                                </div> */}
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="product-price">
                                                                    <span className="text-primary fw-bold">{product.product_price} Tk.</span>
                                                                    {/* <span
                                                                        className="text-decoration-line-through text-muted small ms-2">$129.99</span> */}
                                                                </div>
                                                                <div className="product-stock small">
                                                                    <span className="text-success">{product.product_stock_quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review Modal */}
                        <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true" >
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="reviewModalLabel">Write a Review</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-4">
                                                <label class="form-label">Overall Rating</label>
                                                <div class="rating-input">
                                                    <input type="radio" id="star5" name="rating" value="5" />
                                                    <label for="star5" class="star-label"><i class="fas fa-star"></i></label>
                                                    <input type="radio" id="star4" name="rating" value="4" />
                                                    <label for="star4" class="star-label"><i class="fas fa-star"></i></label>
                                                    <input type="radio" id="star3" name="rating" value="3" />
                                                    <label for="star3" class="star-label"><i class="fas fa-star"></i></label>
                                                    <input type="radio" id="star2" name="rating" value="2" />
                                                    <label for="star2" class="star-label"><i class="fas fa-star"></i></label>
                                                    <input type="radio" id="star1" name="rating" value="1" />
                                                    <label for="star1" class="star-label"><i class="fas fa-star"></i></label>
                                                    {/* </div>
                                                    </div> */}
                                                    <div class="mb-3">
                                                        <label for="reviewTitle" class="form-label">Review Title</label>
                                                        <input type="text" class="form-control" id="reviewTitle"
                                                            placeholder="Summarize your experience" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="reviewText" class="form-label">Your Review</label>
                                                        <textarea class="form-control" id="reviewText" rows="5"
                                                            placeholder="Share details of your experience with this product"></textarea>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Add Photos (Optional)</label>
                                                        <div class="file-upload">
                                                            <input type="file" id="reviewPhotos" class="d-none" multiple />
                                                            <label for="reviewPhotos" class="btn btn-outline-secondary">
                                                                <i class="fas fa-camera me-2"></i> Upload Photos
                                                            </label>
                                                            <small class="text-muted ms-2">Maximum 5 images</small>
                                                        </div>
                                                        <div class="preview-images mt-2 d-flex flex-wrap gap-2"></div>
                                                    </div>
                                                    <div class="mb-3 form-check">
                                                        <input type="checkbox" class="form-check-input" id="recommendCheck" />
                                                        <label class="form-check-label" for="recommendCheck">I recommend this product</label>
                                                    </div>

                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-primary">Submit Review</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                        <CheckoutModal
                            isOpen={showCheckout}
                            onClose={() => setShowCheckout(false)}
                            product_details={product_details}
                            quantity={quantity}
                        // cartItems={cartItems}
                        // totalPrice={totalPrice}
                        />
                    </div>
            }

        </>
    )
}

export default ProductDetails