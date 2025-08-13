import axios from 'axios';
import { Link } from 'react-router-dom';
import axios from "axios";


const Footer = () => {

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">ShopSphere</h5>
            <p>Your premier multi-vendor marketplace for all shopping needs. Quality products from trusted vendors worldwide.</p>
            <div className="social-icons mt-4">
              <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>

          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white">Home</Link></li>
              <li className="mb-2"><a href="#" className="text-white">About Us</a></li>
              <li className="mb-2"><Link to="/categories" className="text-white">Categories</Link></li>
              <li className="mb-2"><a href="#" className="text-white">Vendors</a></li>
              <li className="mb-2"><a href="#" className="text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-white">Returns & Refunds</a></li>
              <li className="mb-2"><a href="#" className="text-white">Shipping Info</a></li>
              <li className="mb-2"><a href="#" className="text-white">Track Order</a></li>
              <li className="mb-2"><a href="#" className="text-white">FAQ</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Newsletter</h5>
            <p>Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="mt-3">
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your Email" aria-label="Your Email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
            <h6 className="mt-4">Payment Methods</h6>
            <div className="payment-methods">
              <i className="fab fa-cc-visa fa-2x me-2"></i>
              <i className="fab fa-cc-mastercard fa-2x me-2"></i>
              <i className="fab fa-cc-paypal fa-2x me-2"></i>
              <i className="fab fa-cc-apple-pay fa-2x"></i>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-white me-3">Privacy Policy</a>
            <a href="#" className="text-white me-3">Terms of Service</a>
            <a href="#" className="text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
