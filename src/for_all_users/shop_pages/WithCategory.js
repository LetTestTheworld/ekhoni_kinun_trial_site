import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

function WithCategory(props) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('all');
    const param = useParams();
    console.log(param)
    useEffect(() => {
        setCountProducts(props.products)
        setProducts(props.products)
        setCategories(props.categories)
        
    },[props.products])
    // products.find(product => product.product_slug === slug);

    function filterProducts(filter) {
        if (filter === 'all') {
            setProducts(props.products);
            setSearchParams({ products: "all-products"})
            setActiveCategory('all');
        } else if (filter) {
            const filteredProducts = props.products.filter(product => product.product_category  === filter);
            const paramCategory = categories.find(category => category.id === filter);
            setProducts(filteredProducts);
            setSearchParams({ category: paramCategory.category_slug });
            setActiveCategory(paramCategory.category_slug);
        }else{
            setProducts(props.products);
        }
    }
    return (
        <>
            <div className="container mb-5" style={{marginTop: '100px'}}>
                <div className="row">
                    {/* Category Sidebar  */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm mb-4 category-sidebar">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0">Categories</h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    <div className={`category-item ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => filterProducts('all')} data-category="all">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span><i className="fas fa-th-large me-2"></i> All Products</span>
                                            <span className="badge rounded-pill">{countProducts.length}</span>
                                        </div>
                                    </div>
                                     {
                                        categories.map((category) => (
                                            <div className={`category-item ${activeCategory === category.category_slug ? 'active' : ''}`} onClick={() => filterProducts(category.id)} data-category="electronics">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>{category.category_name}</span>
                                                    <span className="badge rounded-pill">{countProducts.filter(product => product.product_category === category.id).length}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {/* <div className="category-item" data-category="fashion">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span><i className="fas fa-tshirt me-2"></i> Fashion</span>
                                            <span className="badge rounded-pill">36</span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Section  */}
                    <div className="col-lg-9">
                        {/* Products Header  */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                            <div className="mb-3 mb-md-0">
                                <h2 className="mb-1">All Products</h2>
                                <p className="text-muted mb-0">Showing <span id="showingCount">1-12</span> of <span id="totalCount">128</span> products</p>
                            </div>
                            {/* <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <label for="sortSelect" className="form-label mb-0">Sort by:</label>
                                </div>
                                <select className="form-select" id="sortSelect" style={{width:"200px"}}>
                                    <option selected>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest Arrivals</option>
                                    <option>Highest Rated</option>
                                    <option>Most Popular</option>
                                </select>
                            </div> */}
                        </div>

                        {/* Product Grid  */}
                        <div className="row g-4">
                            {/* Product Card 1  */}
                            {
                                products.map((product) => (
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="product-card card border-0 shadow-sm h-100">
                                            <div className="badge bg-success position-absolute m-2">New</div>
                                            <div className="product-thumb position-relative overflow-hidden">
                                                <img src={'http://127.0.0.1:8000/uploads/'+ product.product_image} className="card-img-top"
                                                    alt="Product Image" />
                                                <div
                                                    className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                                                    {/* <button className="btn btn-outline-light rounded-circle me-2 quick-view"
                                                        data-bs-toggle="tooltip" title="Quick View">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist"
                                                        data-bs-toggle="tooltip" title="Add to Wishlist">
                                                        <i className="fas fa-heart"></i>
                                                    </button> */}
                                                    <button className="btn btn-outline-light rounded-circle add-to-cart"
                                                        data-bs-toggle="tooltip" title="Add to Cart">
                                                        <i className="fas fa-shopping-cart"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                {/* <div className="vendor-info d-flex align-items-center mb-2">
                                                    <img src="https://via.placeholder.com/30x30" alt="Vendor"
                                                        className="rounded-circle me-2" />
                                                    <small className="text-muted">TechHub</small>
                                                </div> */}
                                                <h5 className="product-title mb-1"><Link to={`/shop/${param.shop_name}/${param.owner_username}/${product.product_slug}`}
                                                    className="text-dark text-decoration-none">{product.product_name}</Link>
                                                </h5>
                                                {/* <div className="product-rating mb-2">
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star-half-alt text-warning"></i>
                                                    <small className="text-muted ms-1">(42)</small>
                                                </div> */}
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="product-price">
                                                        <span className="text-primary fw-bold">{product.product_price} Tk.</span>
                                                        {/* <span
                                                            className="text-decoration-line-through text-muted small ms-2">$129.99</span> */}
                                                    </div>
                                                    <div className="product-stock small">
                                                        <span className="text-success">{product.product_stock_quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        {/* Pagination  */}
                        <nav aria-label="Product pagination" className="mt-5">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <span className="page-link">...</span>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">8</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithCategory