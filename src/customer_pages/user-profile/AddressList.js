import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const AddressList = () => {
    return (
        <div className="users-pages">
            <Navbar />
            <div className="container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                <div className="row">
                    <div className="col-lg-4">
                        {/* Profile Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body text-center">
                                <div className="profile-avatar mb-3">
                                    <img src="https://via.placeholder.com/150x150" alt="User"
                                        className="rounded-circle img-thumbnail"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    <button className="btn btn-sm btn-primary change-avatar-btn">
                                        <i className="fas fa-camera me-1"></i> Change
                                    </button>
                                </div>
                                <h4 className="mb-1">John Doe</h4>
                                <p className="text-muted mb-3">Member since June 2020</p>
                                <div className="d-flex justify-content-center gap-2 mb-3">
                                    <a href="#" className="btn btn-outline-primary btn-sm rounded-circle">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-primary btn-sm rounded-circle">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-primary btn-sm rounded-circle">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-primary btn-sm rounded-circle">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                                <div className="profile-stats d-flex justify-content-around mt-4">
                                    <div className="stat-item">
                                        <h5 className="mb-0">24</h5>
                                        <small className="text-muted">Orders</small>
                                    </div>
                                    <div className="stat-item">
                                        <h5 className="mb-0">12</h5>
                                        <small className="text-muted">Wishlist</small>
                                    </div>
                                    <div className="stat-item">
                                        <h5 className="mb-0">8</h5>
                                        <small className="text-muted">Reviews</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Navigation */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0">Account</h5>
                            </div>
                            <div className="list-group list-group-flush">
                                <Link to="/profile" className="list-group-item list-group-item-action">
                                    <i className="fas fa-user-circle me-2"></i> Profile
                                </Link>
                                <Link to="/orders" className="list-group-item list-group-item-action">
                                    <i className="fas fa-clipboard-list me-2"></i> Orders
                                </Link>
                                <Link to="/wishlist" className="list-group-item list-group-item-action">
                                    <i className="fas fa-heart me-2"></i> Wishlist
                                </Link>
                                <Link to="/addresses" className="list-group-item list-group-item-action active">
                                    <i className="fas fa-map-marker-alt me-2"></i> Addresses
                                </Link>
                                <Link to="/payment-methods" className="list-group-item list-group-item-action">
                                    <i className="fas fa-credit-card me-2"></i> Payment Methods
                                </Link>
                                <Link to="/reviews" className="list-group-item list-group-item-action">
                                    <i className="fas fa-star me-2"></i> Reviews
                                </Link>
                                <Link to="/settings" className="list-group-item list-group-item-action">
                                    <i className="fas fa-cog me-2"></i> Settings
                                </Link>
                                <a href="#" className="list-group-item list-group-item-action text-danger">
                                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        {/* Addresses List */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">My Addresses</h5>
                                <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addAddressModal">
                                    <i className="fas fa-plus me-1"></i> Add New Address
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* Address 1 */}
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Home Address</h6>
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm p-0" type="button" id="addressDropdown1" 
                                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="addressDropdown1">
                                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className="mb-1">123 Main Street</p>
                                                <p className="mb-1">Apt 4B</p>
                                                <p className="mb-1">New York, NY 10001</p>
                                                <p className="mb-1">United States</p>
                                                <p className="mb-0">Phone: (123) 456-7890</p>
                                            </div>
                                            <div className="card-footer bg-white border-0">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="defaultAddress" 
                                                           id="defaultAddress1" checked />
                                                    <label className="form-check-label" htmlFor="defaultAddress1">
                                                        Default shipping address
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Address 2 */}
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Work Address</h6>
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm p-0" type="button" id="addressDropdown2" 
                                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="addressDropdown2">
                                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className="mb-1">456 Business Ave</p>
                                                <p className="mb-1">Floor 10</p>
                                                <p className="mb-1">New York, NY 10005</p>
                                                <p className="mb-1">United States</p>
                                                <p className="mb-0">Phone: (123) 456-7891</p>
                                            </div>
                                            <div className="card-footer bg-white border-0">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="defaultAddress" 
                                                           id="defaultAddress2" />
                                                    <label className="form-check-label" htmlFor="defaultAddress2">
                                                        Default shipping address
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Address 3 */}
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Parents' House</h6>
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm p-0" type="button" id="addressDropdown3" 
                                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="addressDropdown3">
                                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className="mb-1">789 Family Road</p>
                                                <p className="mb-1">Boston, MA 02108</p>
                                                <p className="mb-1">United States</p>
                                                <p className="mb-0">Phone: (123) 456-7892</p>
                                            </div>
                                            <div className="card-footer bg-white border-0">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="defaultAddress" 
                                                           id="defaultAddress3" />
                                                    <label className="form-check-label" htmlFor="defaultAddress3">
                                                        Default shipping address
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add Address Modal */}
            <div className="modal fade" id="addAddressModal" tabIndex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addAddressModalLabel">Add New Address</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="addressType" className="form-label">Address Type</label>
                                    <select className="form-select" id="addressType">
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstName" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address1" className="form-label">Address Line 1</label>
                                    <input type="text" className="form-control" id="address1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address2" className="form-label">Address Line 2 (Optional)</label>
                                    <input type="text" className="form-control" id="address2" />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="state" className="form-label">State/Province</label>
                                        <input type="text" className="form-control" id="state" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="zipCode" className="form-label">Zip/Postal Code</label>
                                        <input type="text" className="form-control" id="zipCode" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select className="form-select" id="country">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                            <option>Australia</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="phone" />
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="defaultAddress" />
                                    <label className="form-check-label" htmlFor="defaultAddress">
                                        Set as default shipping address
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Save Address</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default AddressList;