import { useEffect, useState } from "react";
import Aside from "../layouts/vendor/Aside";
import "../css/vendor.css"
import UseUser from "../common_component/UseUser";
import axios from "axios";


function Orders() {
    const [openModal, setOpenModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [order_tracking_status, setOrderTrackingStatus] = useState({});
    const [loader, setLoader] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState();
    const user = UseUser();
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`/orders/${user.username}`)
                setOrders(data.orders)
                setUserInfo(data.users)
            }
        )()

        setOrderTrackingStatus({
            "pending": "Pending",
            "processing": "Processing",
            "shipped": "Shipped",
            "delivered": "Delivered",
            "cancelled": "Cancelled"
        })
    }, [user.username])
    const currentYear = new Date().getFullYear();

    function formatOrderDate(dateString) {
        const orderDate = new Date(dateString);
        const today = new Date();

        // Check if the order date is today
        const isToday =
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear();

        if (isToday) {
            // Format as "Today, hh:mm AM/PM"
            const timeString = orderDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            return `Today, ${timeString}`;
        } else {
            // Format as "MMM DD, YYYY" (e.g., "Jun 15, 2023")
            return orderDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        }
    }


    async function changeStatus(order_id, status) {
        setLoader(true)
        const { data } = await axios.put(`/update-order-status/${order_id}`, { status })
        setStatusUpdate(data)
        setLoader(false)
    }

    return (
        <>
            <div className="vendor-container">
                <Aside />
                {/* Main Content */}
                <main className="main-content">
                    <header className="header">
                        <div className="header-left">
                            <button className="menu-toggle">
                                <i className="fas fa-bars"></i>
                            </button>
                            <h1>Orders</h1>
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

                    <div className="orders-content">
                        <div className="orders-filter">
                            <div className="filter-group">
                                <label>Status:</label>
                                <select>
                                    <option value="all">All Orders</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Date:</label>
                                <select>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month" selected>This Month</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                            </div>
                            <div className="search-bar">
                                <input type="text" placeholder="Search orders..." />
                                <button><i className="fas fa-search"></i></button>
                            </div>
                        </div>

                        {/* Orders Table */}
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="orders-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Date</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((order) => {
                                                    const user = userInfo.find((user) => user.username === order.shop_owner_username);
                                                    return (
                                                        <tr key={order.id}>
                                                            <td>#ORD-{currentYear}-{order.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{formatOrderDate(order.created_at)}</td>
                                                            <td>{order.quantity}</td>
                                                            <td>{order.total_price}</td>
                                                            <td>
                                                                <div className="status-select-container">
                                                                    <select
                                                                        className={`status-select processing ${loader ? 'disabled' : ''}`}
                                                                        disabled={loader} // Disable dropdown when loading
                                                                        value={order.order_status}
                                                                        onChange={(e) => changeStatus(order.id, e.target.value)}
                                                                    >
                                                                        {Object.entries(order_tracking_status).map(([key, label]) => (
                                                                            <option key={key} value={key}>
                                                                                {label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {loader && <span className="loader"></span>} {/* Show loader next to select */}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => setOpenModal(true)} className="action-btn view"><i className="fas fa-eye"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {/* <tr>
                                                <td>#ORD-2023-002</td>
                                                <td>Michael Brown</td>
                                                <td>Today, 09:15 AM</td>
                                                <td>1</td>
                                                <td>$129.99</td>
                                                <td>
                                                    <select className="status-select shipped">
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped" selected>Shipped</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button className="action-btn view"><i className="fas fa-eye"></i></button>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            <button className="page-btn disabled"><i className="fas fa-chevron-left"></i></button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn">2</button>
                            <button className="page-btn">3</button>
                            <button className="page-btn"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </main>




                {/* Order Detail Modal  */}
                <div className={`modal ${openModal ? 'active' : ''}`}>
                    <div className="modal-content large">
                        <div className="modal-header">
                            <h3>Order #ORD-2023-001</h3>
                            <button onClick={() => setOpenModal(false)} className="close-modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="order-detail">
                                <div className="order-summary">
                                    <div className="summary-card">
                                        <h4>Order Summary</h4>
                                        <div className="summary-row">
                                            <span>Order Date:</span>
                                            <span>June 15, 2023 10:30 AM</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Status:</span>
                                            <span className="status processing">Processing</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Payment Method:</span>
                                            <span>Credit Card (Visa)</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Total Amount:</span>
                                            <span className="price">$89.98</span>
                                        </div>
                                    </div>

                                    <div className="customerInfo">
                                        <div className="customer-card">
                                            <h4>Customer Information</h4>
                                            <div className="customer-info">
                                                <img src="https://via.placeholder.com/60" alt="Customer" />
                                                <div>
                                                    <h5>Sarah Johnson</h5>
                                                    <p>sarah.johnson@example.com</p>
                                                    <p>+1 (555) 123-4567</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shipping-card">
                                            <h4>Shipping Address</h4>
                                            <address>
                                                123 Main Street<br />
                                                Apt 4B<br />
                                                New York, NY 10001<br />
                                                United States
                                            </address>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-items">
                                    <h4>Order Items (2)</h4>
                                    <div className="items-list">
                                        <div className="order-item">
                                            <img src="https://via.placeholder.com/80" alt="Product" />
                                            <div className="item-details">
                                                <h5>Wireless Headphones</h5>
                                                <p>SKU: WH-2023</p>
                                                <p>Quantity: 1</p>
                                            </div>
                                            <div className="item-price">$59.99</div>
                                        </div>
                                        <div className="order-item">
                                            <img src="https://via.placeholder.com/80" alt="Product" />
                                            <div className="item-details">
                                                <h5>Phone Charger</h5>
                                                <p>SKU: PC-2023</p>
                                                <p>Quantity: 1</p>
                                            </div>
                                            <div className="item-price">$29.99</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}

export default Orders