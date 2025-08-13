import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import ProfileSidebar from "./ProfileSidebar";


const EditUserProfile = () => {
    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                <div className="row">
                    <ProfileSidebar />

                    <div className="col-lg-8">
                        {/* Profile Details */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0">Edit Profile Information</h5>
                            </div>
                            <div className="card-body">
                                <form id="profileForm">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="profileFirstName" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="profileFirstName" defaultValue="John" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="profileLastName" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" id="profileLastName" defaultValue="Doe" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="profileEmail" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="profileEmail" defaultValue="john.doe@example.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="profilePhone" className="form-label">Phone Number</label>
                                        <input type="tel" className="form-control" id="profilePhone" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="profileBirthday" className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control" id="profileBirthday" defaultValue="1990-01-15" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Gender</label>
                                        <div className="d-flex gap-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="profileGender"
                                                    id="profileGenderMale" value="male" defaultChecked />
                                                <label className="form-check-label" htmlFor="profileGenderMale">Male</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="profileGender"
                                                    id="profileGenderFemale" value="female" />
                                                <label className="form-check-label" htmlFor="profileGenderFemale">Female</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="profileGender"
                                                    id="profileGenderOther" value="other" />
                                                <label className="form-check-label" htmlFor="profileGenderOther">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="button" className="btn btn-outline-secondary">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
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
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">Update Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Social Media Accounts */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0">Social Media Accounts</h5>
                            </div>
                            <div className="card-body">
                                <form id="socialForm">
                                    <div className="mb-3">
                                        <label htmlFor="facebookLink" className="form-label">Facebook</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fab fa-facebook-f"></i></span>
                                            <input type="text" className="form-control" id="facebookLink" placeholder="https://facebook.com/username" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="twitterLink" className="form-label">Twitter</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fab fa-twitter"></i></span>
                                            <input type="text" className="form-control" id="twitterLink" placeholder="https://twitter.com/username" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="instagramLink" className="form-label">Instagram</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fab fa-instagram"></i></span>
                                            <input type="text" className="form-control" id="instagramLink" placeholder="https://instagram.com/username" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="linkedinLink" className="form-label">LinkedIn</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fab fa-linkedin-in"></i></span>
                                            <input type="text" className="form-control" id="linkedinLink" placeholder="https://linkedin.com/in/username" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">Save Social Links</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditUserProfile;