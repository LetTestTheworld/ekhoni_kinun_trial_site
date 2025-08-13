import { Link } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const UserProfile = () => {
    return (
        <>
            <div className="users-pages">
                <Navbar />
                <div className="container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                    <div className="row">
                        <ProfileSidebar />

                        <div className="col-lg-8">
                            {/* Profile Details */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Personal Information</h5>
                                    <Link to="/edit-profile" className="btn btn-sm btn-outline-primary" id="editProfileBtn">Edit Profile</Link>
                                </div>
                                <div className="card-body">
                                    <form id="profileForm">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="profileFirstName" className="form-label">First Name</label>
                                                <input type="text" className="form-control" id="profileFirstName" value="John" readOnly />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="profileLastName" className="form-label">Last Name</label>
                                                <input type="text" className="form-control" id="profileLastName" value="Doe" readOnly />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="profileEmail" className="form-label">Email Address</label>
                                            <input type="email" className="form-control" id="profileEmail" value="john.doe@example.com"
                                                readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="profilePhone" className="form-label">Phone Number</label>
                                            <input type="tel" className="form-control" id="profilePhone" value="+1 (555) 123-4567"
                                                readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="profileBirthday" className="form-label">Date of Birth</label>
                                            <input type="date" className="form-control" id="profileBirthday" value="1990-01-15"
                                                readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <div className="d-flex gap-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="profileGender"
                                                        id="profileGenderMale" value="male" checked disabled />
                                                    <label className="form-check-label" htmlFor="profileGenderMale">Male</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="profileGender"
                                                        id="profileGenderFemale" value="female" disabled />
                                                    <label className="form-check-label" htmlFor="profileGenderFemale">Female</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="profileGender"
                                                        id="profileGenderOther" value="other" disabled />
                                                    <label className="form-check-label" htmlFor="profileGenderOther">Other</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-none" id="profileFormActions">
                                            <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                                            <button type="button" className="btn btn-outline-secondary"
                                                id="cancelEditBtn">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-header bg-white border-0">
                                    <h5 className="mb-0">Change Password</h5>
                                </div>
                                <div className="card-body">
                                    <form id="passwordForm">
                                        <div className="mb-3">
                                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                            <input type="password" className="form-control" id="currentPassword" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label">New Password</label>
                                            <input type="password" className="form-control" id="newPassword" />
                                            <div className="form-text">Password must be at least 8 characters long</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                            <input type="password" className="form-control" id="confirmPassword" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Update Password</button>
                                    </form>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-white border-0">
                                    <h5 className="mb-0">Recent Activity</h5>
                                </div>
                                <div className="card-body">
                                    <div className="activity-timeline">
                                        <div className="activity-item d-flex mb-4">
                                            <div className="activity-icon bg-primary-light text-primary rounded-circle flex-shrink-0 me-3">
                                                <i className="fas fa-shopping-cart"></i>
                                            </div>
                                            <div className="activity-content">
                                                <h6 className="mb-1">Order Placed</h6>
                                                <p className="mb-1">You placed order #123456</p>
                                                <small className="text-muted">2 hours ago</small>
                                            </div>
                                        </div>
                                        <div className="activity-item d-flex mb-4">
                                            <div className="activity-icon bg-success-light text-success rounded-circle flex-shrink-0 me-3">
                                                <i className="fas fa-truck"></i>
                                            </div>
                                            <div className="activity-content">
                                                <h6 className="mb-1">Order Shipped</h6>
                                                <p className="mb-1">Your order #123455 has been shipped</p>
                                                <small className="text-muted">1 day ago</small>
                                            </div>
                                        </div>
                                        <div className="activity-item d-flex mb-4">
                                            <div className="activity-icon bg-warning-light text-warning rounded-circle flex-shrink-0 me-3">
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <div className="activity-content">
                                                <h6 className="mb-1">Product Review</h6>
                                                <p className="mb-1">You reviewed "Wireless Bluetooth Headphones"</p>
                                                <small className="text-muted">3 days ago</small>
                                            </div>
                                        </div>
                                        <div className="activity-item d-flex">
                                            <div className="activity-icon bg-info-light text-info rounded-circle flex-shrink-0 me-3">
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <div className="activity-content">
                                                <h6 className="mb-1">Wishlist Added</h6>
                                                <p className="mb-1">You added "Smart Watch Series 5" to your wishlist</p>
                                                <small className="text-muted">1 week ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default UserProfile;