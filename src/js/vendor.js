document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Open modal
    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                document.getElementById(modalId).classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Close modal
    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }
    
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
    }
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });
    
    // Image preview for uploads
    const imageInputs = document.querySelectorAll('input[type="file"][accept="image/*"]');
    
    imageInputs.forEach(input => {
        input.addEventListener('change', function() {
            const previewContainer = this.closest('.image-upload')?.querySelector('.image-preview') || 
                                  this.closest('.logo-upload')?.querySelector('.upload-preview img');
            
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    if (previewContainer.classList?.contains('image-preview')) {
                        previewContainer.innerHTML = '';
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        previewContainer.appendChild(img);
                    } else {
                        previewContainer.src = e.target.result;
                    }
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Status select change
    const statusSelects = document.querySelectorAll('.status-select');
    
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            this.className = 'status-select ' + this.value;
        });
    });
    
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    
    if (addProductBtn && productModal) {
        addProductBtn.addEventListener('click', function() {
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Edit avatar button
    const editAvatarBtn = document.querySelector('.edit-avatar');
    const logoModal = document.getElementById('logoModal');
    
    if (editAvatarBtn && logoModal) {
        editAvatarBtn.addEventListener('click', function() {
            logoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Form submission
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to the server
            alert('Form submitted successfully!');
            
            // If it's a modal form, close the modal after submission
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// vendor.js - Add this code to your existing vendor.js file

document.addEventListener('DOMContentLoaded', function() {
    // Category Management Modal Handling
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoryModal = document.getElementById('categoryModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Open Add Category Modal
    if (addCategoryBtn && categoryModal) {
        addCategoryBtn.addEventListener('click', function() {
            categoryModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    // Close Modal (works for all modals with close-modal class)
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.active');
            if (openModal) {
                openModal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        }
    });
    
    // Edit Category Buttons
    const editCategoryBtns = document.querySelectorAll('.action-btn.edit');
    editCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you would populate the modal with existing category data here
            categoryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Change modal title for edit mode
            const modalTitle = categoryModal.querySelector('.modal-header h3');
            if (modalTitle) {
                modalTitle.textContent = 'Edit Category';
            }
        });
    });
    
    // Form Submission Handling
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would handle the form submission (AJAX or regular form post)
            // For demo purposes, we'll just close the modal
            categoryModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Show success message (you would need to add this element to your HTML)
            showAlert('Category saved successfully!', 'success');
        });
    }
    
    // Helper function to show alerts (add this to your existing JS)
    function showAlert(message, type = 'success') {
        // Create alert element if it doesn't exist
        let alertBox = document.querySelector('.alert-container');
        if (!alertBox) {
            alertBox = document.createElement('div');
            alertBox.className = 'alert-container';
            document.body.appendChild(alertBox);
        }
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alertBox.appendChild(alert);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.remove();
            if (alertBox && alertBox.children.length === 0) {
                alertBox.remove();
            }
        }, 3000);
    }
});


// Settings Page Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Image preview for logo upload
    const logoInput = document.getElementById('shop-logo');
    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('logo-preview');
                    if (preview) {
                        preview.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Shipping rate modal
    const addRateBtn = document.querySelector('.card-header .btn-primary');
    if (addRateBtn) {
        addRateBtn.addEventListener('click', function() {
            document.getElementById('shippingRateModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Business hours toggle
    const hourToggles = document.querySelectorAll('.hours-toggle input');
    hourToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const timeInputs = this.closest('.hours-row').querySelector('.time-inputs');
            if (timeInputs) {
                timeInputs.style.opacity = this.checked ? '1' : '0.5';
                timeInputs.querySelectorAll('input').forEach(input => {
                    input.disabled = !this.checked;
                });
            }
        });
    });
});