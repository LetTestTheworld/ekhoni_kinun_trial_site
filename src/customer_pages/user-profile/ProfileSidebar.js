import { Link } from "react-router-dom";

function ProfileSidebar() {
    return (
        <>
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
                        <Link to="/your-orders" className="list-group-item list-group-item-action active">
                            <i className="fas fa-clipboard-list me-2"></i> Orders
                        </Link>
                        <Link to="/wishlist" className="list-group-item list-group-item-action">
                            <i className="fas fa-heart me-2"></i> Wishlist
                        </Link>
                        <Link to="/your-saved-addresses" className="list-group-item list-group-item-action">
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
        </>
    )
}

export default ProfileSidebar