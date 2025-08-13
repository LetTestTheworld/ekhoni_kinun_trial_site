document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');

    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', function () {
            adminSidebar.classList.toggle('show');
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 15000, 18000, 14000, 16000, 19000, 22000],
                        backgroundColor: 'rgba(108, 99, 255, 0.1)',
                        borderColor: 'rgba(108, 99, 255, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'],
                    datasets: [{
                        data: [35, 25, 20, 10, 10],
                        backgroundColor: [
                            'rgba(108, 99, 255, 0.8)',
                            'rgba(40, 167, 69, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(220, 53, 69, 0.8)',
                            'rgba(23, 162, 184, 0.8)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    }

    // Vendor approval/rejection functionality
    document.querySelectorAll('.approve-vendor').forEach(button => {
        button.addEventListener('click', function () {
            const vendorId = this.getAttribute('data-vendor-id');
            // In a real app, you would make an AJAX call here
            console.log(`Approving vendor ${vendorId}`);
            this.closest('tr').querySelector('.badge').className = 'badge bg-success';
            this.closest('tr').querySelector('.badge').textContent = 'Approved';
        });
    });

    document.querySelectorAll('.reject-vendor').forEach(button => {
        button.addEventListener('click', function () {
            const vendorId = this.getAttribute('data-vendor-id');
            // In a real app, you would make an AJAX call here
            console.log(`Rejecting vendor ${vendorId}`);
            this.closest('tr').querySelector('.badge').className = 'badge bg-danger';
            this.closest('tr').querySelector('.badge').textContent = 'Rejected';
        });
    });

    // Image preview functionality
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function () {
            const previewContainer = this.closest('.file-upload').nextElementSibling;
            if (previewContainer && previewContainer.classList.contains('preview-images')) {
                previewContainer.innerHTML = '';

                if (this.files) {
                    Array.from(this.files).forEach(file => {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.className = 'rounded-2';
                            img.style.width = '80px';
                            img.style.height = '80px';
                            img.style.objectFit = 'cover';
                            previewContainer.appendChild(img);
                        }
                        reader.readAsDataURL(file);
                    });
                }
            }
        });
    });

    // Tab functionality for settings page
    const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-bs-target');
            document.querySelectorAll('.list-group-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');

            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            document.querySelector(target).classList.add('show', 'active');
        });
    });
});