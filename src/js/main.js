import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* ===== CSS IMPORTS ===== */
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'nouislider/dist/nouislider.css';
// import './css/vendor.css';


/* ===== JS IMPORTS ===== */
import { Tooltip, Dropdown } from 'bootstrap'; // Import specific Bootstrap components
import noUiSlider from 'nouislider';

/* ===== GLOBAL VARIABLES ===== */
// Make Bootstrap and noUiSlider available globally if needed
if (typeof window !== 'undefined') {
  window.bootstrap = { Tooltip, Dropdown };
  window.noUiSlider = noUiSlider;
}

/* ===== CUSTOM CONFIRMATION DIALOG ===== */
class ConfirmationDialog extends React.Component {
  render() {
    return (
      <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
            </div>
            <div className="modal-body">
              <p>{this.props.message}</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={this.props.onCancel}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={this.props.onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const customConfirm = (message) => {
  return new Promise((resolve) => {
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);

    const handleConfirm = () => {
      ReactDOM.unmountComponentAtNode(modalContainer);
      document.body.removeChild(modalContainer);
      resolve(true);
    };

    const handleCancel = () => {
      ReactDOM.unmountComponentAtNode(modalContainer);
      document.body.removeChild(modalContainer);
      resolve(false);
    };

    ReactDOM.createRoot(modalContainer).render(
      <ConfirmationDialog 
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  });
};

/* ===== INITIALIZATION FUNCTIONS ===== */
const initializeComponents = () => {
  // Initialize tooltips
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new Tooltip(el);
  });

  // Initialize dropdowns
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    new Dropdown(dropdown);
    
    dropdown.addEventListener('show.bs.dropdown', function() {
      const menu = this.querySelector('.dropdown-menu');
      if (menu) {
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
      }
    });
    
    dropdown.addEventListener('shown.bs.dropdown', function() {
      const menu = this.querySelector('.dropdown-menu');
      if (menu) {
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
        menu.style.transition = 'all 0.3s ease';
      }
    });
  });

  // Initialize price slider
  const priceSlider = document.getElementById('priceSlider');
  if (priceSlider) {
    noUiSlider.create(priceSlider, {
      start: [0, 500],
      connect: true,
      range: {
        'min': 0,
        'max': 500
      },
      step: 10
    });
  }

  // Replace all confirm dialogs
  document.querySelectorAll('[onclick*="confirm("]').forEach(el => {
    const originalOnClick = el.onclick;
    el.onclick = async (e) => {
      e.preventDefault();
      const shouldProceed = await customConfirm('Are you sure?');
      if (shouldProceed && originalOnClick) {
        originalOnClick.call(el, e);
      }
    };
  });
};

/* ===== EVENT LISTENERS ===== */
const setupEventListeners = () => {
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // Search functionality
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  
  if (searchBtn && searchInput) {
    const performSearch = () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `search-results.html?query=${encodeURIComponent(searchTerm)}`;
      }
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
};

/* ===== MAIN INITIALIZATION ===== */
const initApp = () => {
  initializeComponents();
  setupEventListeners();
};

// Initialize when DOM is loaded
if (document.readyState !== 'loading') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
