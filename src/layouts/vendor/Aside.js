import { Link, useLocation } from "react-router-dom"
// import '../../css/vendor.module.css'
function Aside() {
    const location = useLocation();
    return (
        <>
            <aside className="sidebar">
                <div className="logo">
                    <h2>VendorHub</h2>
                </div>
                <nav className="vendor-nav">
                    <ul>
                        <li className={location.pathname === '/shop-owner/dashboard' ? 'active' : ''}><Link to={'/shop-owner/dashboard'}><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                        <li className={location.pathname === '/shop-owner/product' ? 'active' : ''}><Link to={"/shop-owner/product"}><i className="fas fa-box"></i> Products</Link></li>
                        <li className={location.pathname === '/shop-owner/orders' ? 'active' : ''}><Link to={"/shop-owner/orders"}><i className="fas fa-shopping-cart"></i> Orders</Link></li>
                        <li className={location.pathname === '/shop-owner/category' ? 'active' : ''}><Link to={"/shop-owner/category"}><i className="fas fa-tags"></i> Categories</Link></li>
                        <li className={location.pathname === '/shop-owner/profile' ? 'active' : ''}><Link href="profile.html"><i className="fas fa-store"></i> Shop Profile</Link></li>
                        <li className={location.pathname === '/shop-owner/analytics' ? 'active' : ''}><Link href="#"><i className="fas fa-chart-line"></i> Analytics</Link></li>
                        <li className={location.pathname === '/shop-owner/settings' ? 'active' : ''}><Link href="#"><i className="fas fa-cog"></i> Settings</Link></li>
                    </ul>
                </nav>
                <div className="logout">
                    <a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </aside>
        </>
    )
}

export default Aside