import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './for_all_users/Home';
import Shops from './for_all_users/Shops';
import AllProduct from './for_all_users/AllProducts';
import Cart from './customer_pages/Cart';
import Signup from './authentication/Signup';
import Signin from './authentication/Signin';
import VendorRegister from './authentication/VendorRegister';
import VendorLogin from './authentication/VendorLogin';
import Vendor_Protected from './vendor_pages/Vendor_Protected';
import Category_Management_page from './vendor_pages/Category__Management_page';
import Dashboard from './vendor_pages/Dashboard';
import Orders from './vendor_pages/Orders';
import ProductManagementPage from './vendor_pages/Product_Management_page';
import './css/style.css';
import './css/responsive.css';
import SingleShop from './for_all_users/SingleShop';
import ProductDetails from './for_all_users/ProductDetails';
import SearchedProducts from './for_all_users/SearchedProducts';
import ProductDetailsPageTwo from './for_all_users/ProductDetailsPageTwo';
import Protected from './customer_pages/Protected';
import CheckOut from './customer_pages/CheckOut';
import EditUserProfile from './customer_pages/user-profile/EditUserProfile';
import UserProtected from './customer_pages/user-profile/UserProtect';
import UserProfile from './customer_pages/user-profile/UserProfile';
import OrdersPage from './customer_pages/user-profile/Orders';
import AddressList from './customer_pages/user-profile/AddressList';
import SearchedActionProducts from './for_all_users/SearchedActionProducts';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/ekhoni_kinun_trial_site" element={<Home />} />
          <Route path="/our-shops" element={<Shops />} />
          <Route path="/shop/:shop_name/:owner_username" element={<SingleShop />} />
          <Route path="/shop/:shop_name/:owner_username/:product_slug" element={<ProductDetails />} />
          <Route path="/see-products" element={<AllProduct />} />
          <Route path="/search-result/:product_slug" element={<SearchedProducts />} />
          <Route path="/searched-result/:product_name" element={<SearchedActionProducts />} />
          <Route path="/product-details/:product_slug" element={<ProductDetailsPageTwo />} />
          <Route path="/cart" element={<Protected Cmp={Cart} />} />
          <Route path="/check-out" element={<Protected Cmp={CheckOut} />} />
          <Route path="/profile" element={<UserProtected Cmp ={UserProfile} />} />
          <Route path="/edit-profile" element={<UserProtected Cmp ={EditUserProfile} />} />
          <Route path="/your-orders" element={<UserProtected Cmp ={OrdersPage} />} />
          <Route path="/your-saved-addresses" element={<UserProtected Cmp ={AddressList} />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register-as-shop-owner" element={<VendorRegister />} />
          <Route path="/login-as-shop-owner" element={<VendorLogin />} />

          {/* Vendor Protected Routes */}
          <Route path="/shop-owner/dashboard" element={<Vendor_Protected Cmp={Dashboard} />} />
          <Route path="/shop-owner/category" element={<Vendor_Protected Cmp={Category_Management_page} />} />
          <Route path="/shop-owner/product" element={<Vendor_Protected Cmp={ProductManagementPage} />} />
          <Route path="/shop-owner/orders" element={<Vendor_Protected Cmp={Orders} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
