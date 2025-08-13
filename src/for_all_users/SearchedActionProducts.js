import { Link, useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import { FaSearch, FaShoppingCart, FaUser, FaTimes, FaEye, FaHeart, FaShoppingBag, FaStar, FaStarHalfAlt, FaEllipsisV, FaShare, FaFlag, FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaFilter, FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { useState } from "react";
import useProductAndCategory from "./operations/useProductAndCategory";

function SearchedActionProducts() {
    const [shop, setShop] = useState([]);
    const param = useParams();
    const products = useProductAndCategory().allProducts
    const fileredProducts = products.filter(product => product.product_name.toLowerCase().includes(param.product_name.toLowerCase())).slice(0, 5)

    // const [showFilters, setShowFilters] = useState(false);
    // const [products] = useState([
    //     {
    //         id: 1,
    //         name: "Wireless Bluetooth Headphones",
    //         price: 79.99,
    //         originalPrice: 99.99,
    //         discount: 20,
    //         rating: 4.5,
    //         reviewCount: 142,
    //         inStock: true,
    //         lowStock: false,
    //         image: "https://via.placeholder.com/300x200"
    //     },
    //     {
    //         id: 2,
    //         name: "Smart Watch with Fitness Tracker",
    //         price: 129.99,
    //         originalPrice: null,
    //         discount: 0,
    //         rating: 4,
    //         reviewCount: 87,
    //         inStock: true,
    //         lowStock: false,
    //         image: "https://via.placeholder.com/300x200"
    //     },
    //     {
    //         id: 3,
    //         name: "Portable Bluetooth Speaker",
    //         price: 50.99,
    //         originalPrice: 59.99,
    //         discount: 15,
    //         rating: 5,
    //         reviewCount: 215,
    //         inStock: true,
    //         lowStock: false,
    //         image: "https://via.placeholder.com/300x200"
    //     },
    //     {
    //         id: 4,
    //         name: "4K Ultra HD Smart TV",
    //         price: 499.99,
    //         originalPrice: null,
    //         discount: 0,
    //         rating: 3.5,
    //         reviewCount: 42,
    //         inStock: true,
    //         lowStock: true,
    //         image: "https://via.placeholder.com/300x200"
    //     },
    //     {
    //         id: 5,
    //         name: "Gaming Laptop",
    //         price: 899.99,
    //         originalPrice: 1299.99,
    //         discount: 30,
    //         rating: 5,
    //         reviewCount: 178,
    //         inStock: true,
    //         lowStock: false,
    //         image: "https://via.placeholder.com/300x200"
    //     },
    //     {
    //         id: 6,
    //         name: "Wireless Charging Pad",
    //         price: 24.99,
    //         originalPrice: null,
    //         discount: 0,
    //         rating: 4,
    //         reviewCount: 63,
    //         inStock: false,
    //         lowStock: false,
    //         image: "https://via.placeholder.com/300x200"
    //     }
    // ]);

    // const toggleFilters = () => {
    //     setShowFilters(!showFilters);
    // };

    // const renderStars = (rating) => {
    //     const stars = [];
    //     const fullStars = Math.floor(rating);
    //     const hasHalfStar = rating % 1 !== 0;

    //     for (let i = 1; i <= 5; i++) {
    //         if (i <= fullStars) {
    //             stars.push(<FaStar key={i} className="text-warning" />);
    //         } else if (i === fullStars + 1 && hasHalfStar) {
    //             stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
    //         } else {
    //             stars.push(<FaStar key={i} className="text-secondary" />);
    //         }
    //     }

    //     return stars;
    // };

    return (
        <>
            <div className="users-pages">
                <Navbar />
                {/* Search Results Section */}
                <section className="search-results-container" style={{ marginTop: '100px' }}>
                    <div className="container">
                        <div className="row">
                            {/* Filter Sidebar */}
                            {/* <div className={`col-lg-3 filter-sidebar ${showFilters ? 'show' : ''}`}>
                                <button className="close-filters d-lg-none" onClick={toggleFilters}>
                                    <FaTimes />
                                </button>

                                <div className="card mb-4">
                                    <div className="card-header bg-light">
                                        <h5 className="mb-0">Search Filters</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-section mb-3">
                                            <h6 className="filter-title">Categories</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="category1" defaultChecked />
                                                <label className="form-check-label" htmlFor="category1">Electronics (128)</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="category2" />
                                                <label className="form-check-label" htmlFor="category2">Fashion (76)</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="category3" />
                                                <label className="form-check-label" htmlFor="category3">Home & Garden (54)</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="category4" />
                                                <label className="form-check-label" htmlFor="category4">Sports (32)</label>
                                            </div>
                                        </div>

                                        <div className="filter-section mb-3">
                                            <h6 className="filter-title">Price Range</h6>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>$10</span>
                                                <span>$1000</span>
                                            </div>
                                            <input type="range" className="form-range" min="10" max="1000" step="10" />
                                            <div className="d-flex justify-content-between mt-2">
                                                <input type="number" className="form-control form-control-sm" placeholder="Min" style={{ width: '45%' }} />
                                                <input type="number" className="form-control form-control-sm" placeholder="Max" style={{ width: '45%' }} />
                                            </div>
                                        </div>

                                        <div className="filter-section mb-3">
                                            <h6 className="filter-title">Brands</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand1" defaultChecked />
                                                <label className="form-check-label" htmlFor="brand1">Samsung (42)</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand2" />
                                                <label className="form-check-label" htmlFor="brand2">Apple (38)</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand3" />
                                                <label className="form-check-label" htmlFor="brand3">Sony (28)</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand4" />
                                                <label className="form-check-label" htmlFor="brand4">LG (22)</label>
                                            </div>
                                        </div>

                                        <div className="filter-section">
                                            <h6 className="filter-title">Ratings</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="rating5" />
                                                <label className="form-check-label" htmlFor="rating5">
                                                    {renderStars(5)} (128)
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="rating4" />
                                                <label className="form-check-label" htmlFor="rating4">
                                                    {renderStars(4)} (76)
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="rating3" defaultChecked />
                                                <label className="form-check-label" htmlFor="rating3">
                                                    {renderStars(3)} (54)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-100">Apply Filters</button>
                                <button className="btn btn-outline-secondary w-100 mt-2">Reset All</button>
                            </div> */}

                            {/* Main Content */}
                            <div className="col-lg-9">
                                <div className="search-header mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h2>Search Results</h2>
                                        <div className="d-flex align-items-center">
                                            <span className="results-count me-3">Showing 1-12 of 128 results</span>
                                            {/* <div className="dropdown sort-dropdown">
                                                <button className="dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown">
                                                    Sort by: Recommended <i className="fas fa-chevron-down ms-2"></i>
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                                                    <li><a className="dropdown-item" href="#">Recommended</a></li>
                                                    <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
                                                    <li><a className="dropdown-item" href="#">Price: High to Low</a></li>
                                                    <li><a className="dropdown-item" href="#">Top Rated</a></li>
                                                    <li><a className="dropdown-item" href="#">Newest Arrivals</a></li>
                                                </ul>
                                            </div>
                                            <button className="filter-toggle d-lg-none" onClick={toggleFilters}>
                                                <FaFilter className="me-2" /> Filters
                                            </button> */}
                                        </div>
                                    </div>


                                    {/* <div className="filter-tags mb-3">
                                        <span className="badge bg-light text-dark me-2 mb-2">
                                            Electronics <button type="button" className="btn-close ms-2" aria-label="Close"></button>
                                        </span>
                                        <span className="badge bg-light text-dark me-2 mb-2">
                                            $100 - $500 <button type="button" className="btn-close ms-2" aria-label="Close"></button>
                                        </span>
                                        <span className="badge bg-light text-dark me-2 mb-2">
                                            Samsung <button type="button" className="btn-close ms-2" aria-label="Close"></button>
                                        </span>
                                        <span className="badge bg-light text-dark me-2 mb-2">
                                            3+ Stars <button type="button" className="btn-close ms-2" aria-label="Close"></button>
                                        </span>
                                        <a href="#" className="text-primary ms-2">Clear all</a>
                                    </div> */}
                                </div>

                                {/* Products Grid */}
                                <div className="row">
                                    {fileredProducts.map(product => (
                                        <div className="col-xl-3 col-lg-4 col-md-6">
                                            <div className="product-card card border-0 shadow-sm h-100">
                                                <div className="badge bg-success position-absolute m-2">New</div>
                                                <div className="product-thumb position-relative overflow-hidden">
                                                    <img src={'http://127.0.0.1:8000/uploads/' + product.product_image} className="card-img-top"
                                                        alt="Product Image" />
                                                    <div
                                                        className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                                                        {/* <button className="btn btn-outline-light rounded-circle me-2 quick-view"
                                                        data-bs-toggle="tooltip" title="Quick View">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist"
                                                        data-bs-toggle="tooltip" title="Add to Wishlist">
                                                        <i className="fas fa-heart"></i>
                                                    </button> */}
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
                                                    <h5 className="product-title mb-1"><Link to={`/product-details/${product.product_slug}`}
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
                                    ))}
                                </div>

                                {/* Pagination */}
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter Overlay (Mobile) */}
                {/* <div className={`filter-overlay ${showFilters ? 'show' : ''}`} onClick={toggleFilters}></div> */}

                <Footer />
            </div>
        </>
    )
}

export default SearchedActionProducts