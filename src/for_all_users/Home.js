import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';
import { useEffect, useState } from 'react';
import Modal from '../common_component/Modal';

const Home = () => {
  const [respondedMessage, setRespondedMessage] = useState('');
  useEffect(() => {
    if (sessionStorage.getItem('respondedMessage')) {
      const message = sessionStorage.getItem('respondedMessage');
      setRespondedMessage(message);
      sessionStorage.removeItem('respondedMessage');
    }
  }, []);

  // Sample data for partnered shops - showing only 6 on homepage
  const partneredShops = [
    { 
      id: 1, 
      name: 'TechHub', 
      logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', 
      category: 'Electronics' 
    },
    { 
      id: 2, 
      name: 'FashionNova', 
      logo: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', 
      category: 'Clothing' 
    },
    { 
      id: 3, 
      name: 'HomeDecor', 
      logo: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', 
      category: 'Home Goods' 
    },
    { 
      id: 4, 
      name: 'BeautySpot', 
      logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', 
      category: 'Cosmetics' 
    },
  ];

  return (
    <>
      <div className="users-pages">
        <Navbar />
        {respondedMessage && <Modal message={respondedMessage} />}

        <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
          <div className="container">
            <section className="hero-section mb-5">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 order-lg-1 order-2">
                    <h1 className="display-4 fw-bold mb-4">Discover Amazing Products from Trusted Vendors</h1>
                    <p className="lead mb-4">ShopSphere brings together the best vendors worldwide to offer you a seamless shopping experience with quality products and great deals.</p>
                    <div className="d-flex flex-wrap gap-3">
                      <Link to="/categories" className="btn btn-primary btn-lg px-4">Shop Now</Link>
                      <Link to="/vendors" className="btn btn-outline-dark btn-lg px-4">Explore Vendors</Link>
                    </div>
                  </div>
                  <div className="col-lg-6 order-lg-2 order-1 mb-lg-0 mb-4">
                    <div className="position-relative">
                      <img src="https://via.placeholder.com/600x500" alt="Hero Image" className="img-fluid rounded-4 shadow" />
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Partnered Shops Gallery Section */}
            <section className="partnered-shops mb-5 py-5 bg-light">
              <div className="container">
                <div className="section-header d-flex justify-content-between align-items-center mb-5">
                  <h2 className="section-title">Shops Collaborating With Us</h2>
                  <Link to="/all-shops" className="btn btn-link text-primary">
                    View All <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
                <div className="row g-4 justify-content-center">
                  {partneredShops.map(shop => (
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={shop.id}>
                      <div className="shop-gallery-card position-relative rounded-3 overflow-hidden">
                        <img 
                          src={shop.logo} 
                          alt={shop.name} 
                          className="img-fluid w-100 h-100 object-fit-cover" 
                          style={{ minHeight: '200px' }}
                        />
                        <div className="shop-info-overlay position-absolute bottom-0 start-0 w-100 p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="text-white mb-0">{shop.name}</h6>
                              <small className="text-light">{shop.category}</small>
                            </div>
                            <Link 
                              to={`/shop/${shop.id}`} 
                              className="btn btn-sm btn-primary rounded-pill px-3"
                            >
                              Visit
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="featured-products mb-5 py-5">
              <div className="container">
                <div className="section-header d-flex justify-content-between align-items-center mb-5">
                  <h2 className="section-title">Featured Products</h2>
                  <Link to="/products" className="btn btn-link text-primary">View All <i className="fas fa-arrow-right ms-2"></i></Link>
                </div>
                <div className="row g-4">
                  {/* Product Card 1 */}
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-card card border-0 shadow-sm h-100">
                      <div className="badge bg-success position-absolute m-2">New</div>
                      <div className="product-thumb position-relative overflow-hidden">
                        <img src="https://via.placeholder.com/300x300" className="card-img-top" alt="Product Image" />
                        <div className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-light rounded-circle me-2 quick-view" data-bs-toggle="tooltip" title="Quick View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist" data-bs-toggle="tooltip" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle add-to-cart" data-bs-toggle="tooltip" title="Add to Cart">
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="vendor-info d-flex align-items-center mb-2">
                          <img src="https://via.placeholder.com/30x30" alt="Vendor" className="rounded-circle me-2" />
                          <small className="text-muted">TechHub</small>
                        </div>
                        <h5 className="product-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Wireless Bluetooth Headphones</Link></h5>
                        <div className="product-rating mb-2">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star-half-alt text-warning"></i>
                          <small className="text-muted ms-1">(42)</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="product-price">
                            <span className="text-primary fw-bold">$89.99</span>
                            <span className="text-decoration-line-through text-muted small ms-2">$129.99</span>
                          </div>
                          <div className="product-stock small">
                            <span className="text-success">In Stock</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Product Card 2 */}
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-card card border-0 shadow-sm h-100">
                      <div className="badge bg-danger position-absolute m-2">-30%</div>
                      <div className="product-thumb position-relative overflow-hidden">
                        <img src="https://via.placeholder.com/300x300" className="card-img-top" alt="Product Image" />
                        <div className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-light rounded-circle me-2 quick-view" data-bs-toggle="tooltip" title="Quick View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist" data-bs-toggle="tooltip" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle add-to-cart" data-bs-toggle="tooltip" title="Add to Cart">
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="vendor-info d-flex align-items-center mb-2">
                          <img src="https://via.placeholder.com/30x30" alt="Vendor" className="rounded-circle me-2" />
                          <small className="text-muted">FashionNova</small>
                        </div>
                        <h5 className="product-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Premium Denim Jeans</Link></h5>
                        <div className="product-rating mb-2">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="far fa-star text-warning"></i>
                          <small className="text-muted ms-1">(28)</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="product-price">
                            <span className="text-primary fw-bold">$49.99</span>
                            <span className="text-decoration-line-through text-muted small ms-2">$71.99</span>
                          </div>
                          <div className="product-stock small">
                            <span className="text-success">In Stock</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Product Card 3 */}
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-card card border-0 shadow-sm h-100">
                      <div className="product-thumb position-relative overflow-hidden">
                        <img src="https://via.placeholder.com/300x300" className="card-img-top" alt="Product Image" />
                        <div className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-light rounded-circle me-2 quick-view" data-bs-toggle="tooltip" title="Quick View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist" data-bs-toggle="tooltip" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle add-to-cart" data-bs-toggle="tooltip" title="Add to Cart">
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="vendor-info d-flex align-items-center mb-2">
                          <img src="https://via.placeholder.com/30x30" alt="Vendor" className="rounded-circle me-2" />
                          <small className="text-muted">HomeDecor</small>
                        </div>
                        <h5 className="product-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Ceramic Coffee Mug Set</Link></h5>
                        <div className="product-rating mb-2">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <small className="text-muted ms-1">(56)</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="product-price">
                            <span className="text-primary fw-bold">$24.99</span>
                          </div>
                          <div className="product-stock small">
                            <span className="text-success">In Stock</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Product Card 4 */}
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-card card border-0 shadow-sm h-100">
                      <div className="badge bg-primary position-absolute m-2">Bestseller</div>
                      <div className="product-thumb position-relative overflow-hidden">
                        <img src="https://via.placeholder.com/300x300" className="card-img-top" alt="Product Image" />
                        <div className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-light rounded-circle me-2 quick-view" data-bs-toggle="tooltip" title="Quick View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist" data-bs-toggle="tooltip" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle add-to-cart" data-bs-toggle="tooltip" title="Add to Cart">
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="vendor-info d-flex align-items-center mb-2">
                          <img src="https://via.placeholder.com/30x30" alt="Vendor" className="rounded-circle me-2" />
                          <small className="text-muted">BeautySpot</small>
                        </div>
                        <h5 className="product-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Vitamin C Serum</Link></h5>
                        <div className="product-rating mb-2">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star-half-alt text-warning"></i>
                          <i className="far fa-star text-warning"></i>
                          <small className="text-muted ms-1">(34)</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="product-price">
                            <span className="text-primary fw-bold">$29.99</span>
                            <span className="text-decoration-line-through text-muted small ms-2">$39.99</span>
                          </div>
                          <div className="product-stock small">
                            <span className="text-warning">Low Stock</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="top-vendors mb-5 py-5 bg-light">
              <div className="container">
                <div className="section-header text-center mb-5">
                  <h2 className="section-title">Our Top Vendors</h2>
                  <p className="text-muted">Shop from our most trusted vendors with excellent ratings</p>
                </div>
                <div className="row g-4">
                  {/* Vendor Card 1 */}
                  <div className="col-lg-3 col-md-6">
                    <div className="vendor-card card border-0 shadow-sm h-100 text-center p-4 hover-effect">
                      <div className="vendor-logo mx-auto mb-3">
                        <img src="https://via.placeholder.com/100x100" alt="Vendor Logo" className="rounded-circle img-thumbnail" />
                      </div>
                      <h5 className="vendor-name mb-1">TechHub</h5>
                      <div className="vendor-rating mb-2">
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star-half-alt text-warning"></i>
                        <span className="text-muted ms-1">(128)</span>
                      </div>
                      <p className="vendor-category small text-muted mb-3">Electronics & Gadgets</p>
                      <Link to="/vendor" className="btn btn-outline-primary btn-sm">Visit Store</Link>
                    </div>
                  </div>
                  {/* Vendor Card 2 */}
                  <div className="col-lg-3 col-md-6">
                    <div className="vendor-card card border-0 shadow-sm h-100 text-center p-4 hover-effect">
                      <div className="vendor-logo mx-auto mb-3">
                        <img src="https://via.placeholder.com/100x100" alt="Vendor Logo" className="rounded-circle img-thumbnail" />
                      </div>
                      <h5 className="vendor-name mb-1">FashionNova</h5>
                      <div className="vendor-rating mb-2">
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <span className="text-muted ms-1">(215)</span>
                      </div>
                      <p className="vendor-category small text-muted mb-3">Clothing & Accessories</p>
                      <Link to="/vendor" className="btn btn-outline-primary btn-sm">Visit Store</Link>
                    </div>
                  </div>
                  {/* Vendor Card 3 */}
                  <div className="col-lg-3 col-md-6">
                    <div className="vendor-card card border-0 shadow-sm h-100 text-center p-4 hover-effect">
                      <div className="vendor-logo mx-auto mb-3">
                        <img src="https://via.placeholder.com/100x100" alt="Vendor Logo" className="rounded-circle img-thumbnail" />
                      </div>
                      <h5 className="vendor-name mb-1">HomeDecor</h5>
                      <div className="vendor-rating mb-2">
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="far fa-star text-warning"></i>
                        <span className="text-muted ms-1">(87)</span>
                      </div>
                      <p className="vendor-category small text-muted mb-3">Home & Kitchen</p>
                      <Link to="/vendor" className="btn btn-outline-primary btn-sm">Visit Store</Link>
                    </div>
                  </div>
                  {/* Vendor Card 4 */}
                  <div className="col-lg-3 col-md-6">
                    <div className="vendor-card card border-0 shadow-sm h-100 text-center p-4 hover-effect">
                      <div className="vendor-logo mx-auto mb-3">
                        <img src="https://via.placeholder.com/100x100" alt="Vendor Logo" className="rounded-circle img-thumbnail" />
                      </div>
                      <h5 className="vendor-name mb-1">BeautySpot</h5>
                      <div className="vendor-rating mb-2">
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star-half-alt text-warning"></i>
                        <span className="text-muted ms-1">(142)</span>
                      </div>
                      <p className="vendor-category small text-muted mb-3">Beauty & Cosmetics</p>
                      <Link to="/vendor" className="btn btn-outline-primary btn-sm">Visit Store</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="deals-section mb-5 py-5">
              <div className="container">
                <div className="section-header d-flex justify-content-between align-items-center mb-5">
                  <h2 className="section-title">Today's Hot Deals</h2>
                  <div className="deals-countdown">
                    <div className="countdown-timer d-flex gap-2">
                      <div className="countdown-item bg-primary text-white rounded-2 p-2 text-center">
                        <div className="countdown-value fw-bold">12</div>
                        <div className="countdown-label small">HRS</div>
                      </div>
                      <div className="countdown-item bg-primary text-white rounded-2 p-2 text-center">
                        <div className="countdown-value fw-bold">45</div>
                        <div className="countdown-label small">MIN</div>
                      </div>
                      <div className="countdown-item bg-primary text-white rounded-2 p-2 text-center">
                        <div className="countdown-value fw-bold">30</div>
                        <div className="countdown-label small">SEC</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-4">
                  {/* Deal Product 1 */}
                  <div className="col-lg-4 col-md-6">
                    <div className="deal-card card border-0 shadow-sm overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-5 position-relative">
                          <img src="https://via.placeholder.com/200x200" className="img-fluid h-100 object-fit-cover" alt="Deal Product" />
                          <div className="discount-badge bg-danger text-white position-absolute top-0 start-0 m-2 px-2 py-1 rounded">
                            30% OFF
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Smart Watch Series 5</Link></h5>
                            <div className="vendor-info small d-flex align-items-center mb-2">
                              <img src="https://via.placeholder.com/20x20" alt="Vendor" className="rounded-circle me-1" />
                              <span className="text-muted">GadgetWorld</span>
                            </div>
                            <div className="product-rating mb-2">
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="far fa-star text-warning small"></i>
                              <small className="text-muted ms-1">(36)</small>
                            </div>
                            <div className="product-price mb-3">
                              <span className="text-primary fw-bold">$199.99</span>
                              <span className="text-decoration-line-through text-muted small ms-2">$285.00</span>
                            </div>
                            <div className="progress mb-2" style={{ height: "6px" }}>
                              <div className="progress-bar bg-danger" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="d-flex justify-content-between small text-muted mb-3">
                              <span>Available: 15</span>
                              <span>Sold: 45</span>
                            </div>
                            <button className="btn btn-primary w-100">Buy Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Deal Product 2 */}
                  <div className="col-lg-4 col-md-6">
                    <div className="deal-card card border-0 shadow-sm overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-5 position-relative">
                          <img src="https://via.placeholder.com/200x200" className="img-fluid h-100 object-fit-cover" alt="Deal Product" />
                          <div className="discount-badge bg-danger text-white position-absolute top-0 start-0 m-2 px-2 py-1 rounded">
                            25% OFF
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Wireless Earbuds Pro</Link></h5>
                            <div className="vendor-info small d-flex align-items-center mb-2">
                              <img src="https://via.placeholder.com/20x20" alt="Vendor" className="rounded-circle me-1" />
                              <span className="text-muted">AudioTech</span>
                            </div>
                            <div className="product-rating mb-2">
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star-half-alt text-warning small"></i>
                              <small className="text-muted ms-1">(52)</small>
                            </div>
                            <div className="product-price mb-3">
                              <span className="text-primary fw-bold">$89.99</span>
                              <span className="text-decoration-line-through text-muted small ms-2">$119.99</span>
                            </div>
                            <div className="progress mb-2" style={{ height: "6px" }}>
                              <div className="progress-bar bg-danger" role="progressbar" style={{ width: "60%" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="d-flex justify-content-between small text-muted mb-3">
                              <span>Available: 22</span>
                              <span>Sold: 33</span>
                            </div>
                            <button className="btn btn-primary w-100">Buy Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Deal Product 3 */}
                  <div className="col-lg-4 col-md-6">
                    <div className="deal-card card border-0 shadow-sm overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-5 position-relative">
                          <img src="https://via.placeholder.com/200x200" className="img-fluid h-100 object-fit-cover" alt="Deal Product" />
                          <div className="discount-badge bg-danger text-white position-absolute top-0 start-0 m-2 px-2 py-1 rounded">
                            40% OFF
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title mb-1"><Link to="/product-details" className="text-dark text-decoration-none">Fitness Tracker Band</Link></h5>
                            <div className="vendor-info small d-flex align-items-center mb-2">
                              <img src="https://via.placeholder.com/20x20" alt="Vendor" className="rounded-circle me-1" />
                              <span className="text-muted">FitLife</span>
                            </div>
                            <div className="product-rating mb-2">
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="fas fa-star text-warning small"></i>
                              <i className="far fa-star text-warning small"></i>
                              <small className="text-muted ms-1">(41)</small>
                            </div>
                            <div className="product-price mb-3">
                              <span className="text-primary fw-bold">$59.99</span>
                              <span className="text-decoration-line-through text-muted small ms-2">$99.99</span>
                            </div>
                            <div className="progress mb-2" style={{ height: "6px" }}>
                              <div className="progress-bar bg-danger" role="progressbar" style={{ width: "85%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="d-flex justify-content-between small text-muted mb-3">
                              <span>Available: 8</span>
                              <span>Sold: 57</span>
                            </div>
                            <button className="btn btn-primary w-100">Buy Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;