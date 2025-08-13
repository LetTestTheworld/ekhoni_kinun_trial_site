import { use, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UseUser from '../common_component/UseUser';
import useProductAndCategory from '../for_all_users/operations/useProductAndCategory';
import CartOperations from '../for_all_users/operations/CartOperations';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  let user = UseUser()
  const products = useProductAndCategory().allProducts
  const [search, setSearch] = useState('')
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [loader, setLoader] = useState(null);
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);

  function suggestProducts(searchedproducts) {
    let suggestedProducts = products.filter(product => product.product_name.toLowerCase().includes(searchedproducts.toLowerCase())).slice(0, 5)
    setSuggestedProducts(suggestedProducts)
  }

  const getCartItems = CartOperations();
  useEffect(() => {
    setLoader(getCartItems.loader)
  }, [getCartItems.loader])
  const cartItems = getCartItems.cartItems.filter(item => item.customer_username === user.username);
  // function handleSearch() {

  // }

  function logout() {
    // const { data } = axios.post('/logout', {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     "Authorization": `Bearer ${localStorage.getItem('auth-token')}`
    //   },
    // })
    localStorage.removeItem('auth-token');
    sessionStorage.setItem('respondedMessage', 'logged out successfully.');

    navigate("/login");

    // if (data.success) {
    // }
  }


  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-store me-2"></i>Shop<span>Sphere</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                  to={'#'} 
                  id="categoriesDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                  <li><Link className="dropdown-item" to="/categories">All Categories</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to={'#'}>Electronics</Link></li>
                  <li><Link className="dropdown-item" to={'#'}>Fashion</Link></li>
                  <li><Link className="dropdown-item" to={'#'}>Home & Garden</Link></li>
                  <li><Link className="dropdown-item" to={'#'}>Beauty</Link></li>
                  <li><Link className="dropdown-item" to={'#'}>Sports</Link></li>
                </ul>
              </li> */}
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/our-shops' ? 'active' : ''}`} to={'/our-shops'}>Shops</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/see-products' ? 'active' : ''}`} to={'/see-products'}>See Products</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '#' ? 'active' : ''}`} to={'#'}>About</Link>
              </li>
            </ul>
            <div className="search-box">
              <input type="text" onChange={(e) => { setSearch(e.target.value); suggestProducts(e.target.value); }} className="form-control search-input" placeholder="Search products..." />
              {search.length > 0 ?
              <button onClick={() => {navigate(`/searched-result/${search}`); setSuggestedProducts([])}} className="search-btn">
                <i className="fas fa-search"></i>
              </button>:
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
              }
                    {
                search.length > 0 ?
                  <div className="suggested-products">
                    <ul className='list-unstyled'>
                      {
                        suggestedProducts.map((product) => (
                          <Link className='text-decoration-none text-dark' to={`/search-result/${product.product_slug}`}><li>{product.product_name} <span><i class="bi bi-arrow-up-right"></i></span></li></Link>
                        ))
                      }
                    </ul>
                  </div>
                  : null
              }
            </div>
            <div className="user-actions d-flex ms-lg-3">
              <Link to="/cart" className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">{loader ? <span class="loader"></span> : (cartItems?.length || 0)}</span>
              </Link>

              <div className="dropdown">
                <Link
                  to={'#'}
                  className="user-icon dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">

                  {
                    user ?
                      user.role === 'user' ?
                        <>
                          <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user-circle me-2"></i>Profile</Link></li>
                          <li><Link className="dropdown-item" to="/orders"><i className="fas fa-clipboard-list me-2"></i>Orders</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to={''}><i className="fas fa-sign-out-alt me-2"></i>Logout</Link></li>
                        </>
                        :
                        <>
                          <li><Link className="dropdown-item" to="/shop-owner/dashboard"><i className="fas fa-user-circle me-2"></i>Dashboard</Link></li>
                          {/* <li><Link className="dropdown-item" to="/orders"><i className="fas fa-clipboard-list me-2"></i>Orders</Link></li> */}
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={logout}>
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                            </span>
                          </li>
                        </>

                      :
                      <>
                        <li><Link className="dropdown-item" to="/login"><i className="fas fa-sign-in-alt me-2"></i>Login</Link></li>
                        <li><Link className="dropdown-item" to="/register"><i className="fas fa-user-plus me-2"></i>Register</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/login-as-shop-owner"><i className="fas fa-sign-in-alt me-2"></i>Login as shop owner</Link></li>
                        <li><Link className="dropdown-item" to="/register-as-shop-owner"><i className="fas fa-user-plus me-2"></i>Register as shop owner</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                      </>
                  }





                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;