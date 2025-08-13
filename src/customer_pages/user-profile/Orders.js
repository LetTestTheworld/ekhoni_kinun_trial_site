import { Link } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const OrdersPage = () => {
    return (
        <div className="users-pages">
            <Navbar />
            <div className="container" style={{ marginTop: '100px', marginBottom: '2rem' }}>
                <div className="row">
                    <ProfileSidebar />

                    <div className="col-lg-8">
                        {/* Orders List */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">My Orders</h5>
                                <div className="dropdown">
                                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" 
                                            id="filterOrders" data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter Orders
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="filterOrders">
                                        <li><a className="dropdown-item" href="#">All Orders</a></li>
                                        <li><a className="dropdown-item" href="#">Completed</a></li>
                                        <li><a className="dropdown-item" href="#">Processing</a></li>
                                        <li><a className="dropdown-item" href="#">Cancelled</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order #</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Order 1 */}
                                            <tr className="order-item">
                                                <td>#123456</td>
                                                <td>June 15, 2023</td>
                                                <td>
                                                    <span className="badge bg-success">Completed</span>
                                                </td>
                                                <td>$129.99</td>
                                                <td>
                                                    <Link to="/order-details/123456" className="btn btn-sm btn-outline-primary me-2">
                                                        View
                                                    </Link>
                                                    <button className="btn btn-sm btn-outline-secondary">
                                                        Reorder
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                            {/* Order 2 */}
                                            <tr className="order-item">
                                                <td>#123455</td>
                                                <td>June 10, 2023</td>
                                                <td>
                                                    <span className="badge bg-primary">Shipped</span>
                                                </td>
                                                <td>$89.99</td>
                                                <td>
                                                    <Link to="/order-details/123455" className="btn btn-sm btn-outline-primary me-2">
                                                        View
                                                    </Link>
                                                    <button className="btn btn-sm btn-outline-secondary">
                                                        Track
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                            {/* Order 3 */}
                                            <tr className="order-item">
                                                <td>#123454</td>
                                                <td>June 5, 2023</td>
                                                <td>
                                                    <span className="badge bg-warning">Processing</span>
                                                </td>
                                                <td>$199.99</td>
                                                <td>
                                                    <Link to="/order-details/123454" className="btn btn-sm btn-outline-primary me-2">
                                                        View
                                                    </Link>
                                                    <button className="btn btn-sm btn-outline-danger">
                                                        Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                            {/* Order 4 */}
                                            <tr className="order-item">
                                                <td>#123453</td>
                                                <td>May 28, 2023</td>
                                                <td>
                                                    <span className="badge bg-danger">Cancelled</span>
                                                </td>
                                                <td>$59.99</td>
                                                <td>
                                                    <Link to="/order-details/123453" className="btn btn-sm btn-outline-primary me-2">
                                                        View
                                                    </Link>
                                                    <button className="btn btn-sm btn-outline-secondary">
                                                        Buy Again
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Pagination */}
                                <nav aria-label="Orders pagination">
                                    <ul className="pagination justify-content-center mt-4">
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

                        {/* Order Tracking */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0">Track Order #123455</h5>
                            </div>
                            <div className="card-body">
                                <div className="order-tracking">
                                    <div className="timeline">
                                        <div className="timeline-step completed">
                                            <div className="step-icon">
                                                <i className="fas fa-check"></i>
                                            </div>
                                            <div className="step-content">
                                                <h6 className="step-title">Order Placed</h6>
                                                <p className="step-date">June 10, 2023</p>
                                            </div>
                                        </div>
                                        <div className="timeline-step completed">
                                            <div className="step-icon">
                                                <i className="fas fa-check"></i>
                                            </div>
                                            <div className="step-content">
                                                <h6 className="step-title">Order Processed</h6>
                                                <p className="step-date">June 11, 2023</p>
                                            </div>
                                        </div>
                                        <div className="timeline-step active">
                                            <div className="step-icon">
                                                <i className="fas fa-truck"></i>
                                            </div>
                                            <div className="step-content">
                                                <h6 className="step-title">Shipped</h6>
                                                <p className="step-date">June 12, 2023</p>
                                            </div>
                                        </div>
                                        <div className="timeline-step">
                                            <div className="step-icon">
                                                <i className="fas fa-home"></i>
                                            </div>
                                            <div className="step-content">
                                                <h6 className="step-title">Delivered</h6>
                                                <p className="step-date">Estimated: June 15, 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tracking-info mt-4 p-3 bg-light rounded">
                                        <div className="tracking-row mb-2">
                                            <span className="tracking-label">Carrier:</span>
                                            <span className="tracking-value">FedEx</span>
                                        </div>
                                        <div className="tracking-row mb-2">
                                            <span className="tracking-label">Tracking Number:</span>
                                            <span className="tracking-value">123456789012</span>
                                        </div>
                                        <div className="tracking-row">
                                            <span className="tracking-label">Expected Delivery:</span>
                                            <span className="tracking-value">June 15, 2023</span>
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
    );
};

export default OrdersPage;