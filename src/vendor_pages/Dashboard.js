import Aside from "../layouts/vendor/Aside";
import "../css/vendor.css"
import { useEffect, useState } from "react";
import Modal from "../common_component/Modal";

function Dashboard(){

    const [respondedMessage, setRespondedMessage] = useState('');
      useEffect(() => {
        if (sessionStorage.getItem('respondedMessage')) {
          const message = sessionStorage.getItem('respondedMessage');
          setRespondedMessage(message);
          sessionStorage.removeItem('respondedMessage');
        }
      }, []);

    return(
        <>
            <div className="vendor-container">
                <Aside />
        {
          respondedMessage && (
            <Modal message={respondedMessage} />
          )
        }

                <main className="main-content">
            <header className="header">
                <div className="header-left">
                    <button className="menu-toggle">
                        <i className="fas fa-bars"></i>
                    </button>
                    <h1>Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="notifications">
                        <i className="fas fa-bell"></i>
                        <span className="badge">3</span>
                    </div>
                    <div className="user-profile">
                        <img src="https://via.placeholder.com/40" alt="User" />
                        <span>John Doe</span>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                 {/* Stats Cards  */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: "#FFC10720", color: "#FFC107" }}>
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <div className="stat-info">
                            <h3>24</h3>
                            <p>Today's Orders</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: "#007BFF20", color: "#007BFF" }}>
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-info">
                            <h3>$1,245</h3>
                            <p>Today's Revenue</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: "#28A74520", color: "#28A745" }} >
                            <i className="fas fa-box-open"></i>
                        </div>
                        <div className="stat-info">
                            <h3>56</h3>
                            <p>Total Products</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: "#DC354520", color: "#DC3545" }}>
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="stat-info">
                            <h3>4.8</h3>
                            <p>Average Rating</p>
                        </div>
                    </div>
                </div>

                 {/* Recent Orders  */}
                <div className="card">
                    <div className="card-header">
                        <h3>Recent Orders</h3>
                        <a href="orders.html" className="view-all">View All</a>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#ORD-2023-001</td>
                                        <td>Sarah Johnson</td>
                                        <td>Today, 10:30 AM</td>
                                        <td>$45.99</td>
                                        <td><span className="status processing">Processing</span></td>
                                        <td><a href="#" className="action-link">View</a></td>
                                    </tr>
                                    <tr>
                                        <td>#ORD-2023-002</td>
                                        <td>Michael Brown</td>
                                        <td>Today, 09:15 AM</td>
                                        <td>$89.50</td>
                                        <td><span className="status shipped">Shipped</span></td>
                                        <td><a href="#" className="action-link">View</a></td>
                                    </tr>
                                    <tr>
                                        <td>#ORD-2023-003</td>
                                        <td>Emily Davis</td>
                                        <td>Yesterday, 4:45 PM</td>
                                        <td>$120.00</td>
                                        <td><span className="status delivered">Delivered</span></td>
                                        <td><a href="#" className="action-link">View</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                 {/* Quick Actions  */}
                <div className="quick-actions">
                    <button className="quick-action-btn">
                        <i className="fas fa-plus"></i>
                        <span>Add Product</span>
                    </button>
                    <button className="quick-action-btn">
                        <i className="fas fa-chart-pie"></i>
                        <span>View Reports</span>
                    </button>
                    <button className="quick-action-btn">
                        <i className="fas fa-bullhorn"></i>
                        <span>Create Promotion</span>
                    </button>
                </div>
            </div>
        </main>
            </div>
        </>
    )
}

export default Dashboard