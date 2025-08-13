import "../css/vendor.css"
import { useEffect, useState, useRef } from "react";
import Aside from "../layouts/vendor/Aside"
import axios from "axios";

function ProductManagementPage(props) {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [shop_owner_username, setShopOwnerUsername] = useState('');
    const [product_name, setProductName] = useState('');
    const [product_price, setProductPrice] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [product_image, setProductImage] = useState(null);
    const [product_category, setProductCategory] = useState('');
    const [product_stock_quantity, setProductStockQuantity] = useState('');
    const [product_status, setProductStatus] = useState('');
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    const [updateProductModal, setUpdateProductModal] = useState(false);
    const [productSlug, setProductSlug] = useState("");

    async function getCategories(username) {
        const { data } = await axios.get(`/categories/${username}`)

        setCategories(data.categories);

    }

    useEffect(() => {


        setShopOwnerUsername(props.user.username)
        getProducts(props.user.username);
        getCategories(props.user.username);

        if (categories.length === 0) {
            setProductCategory('false');
        }
    }, [props.user]);
    console.log(product_category)

    async function getProducts(username) {
        const { data } = await axios.get(`/products/${username}`)
        setProducts(data.products);
    }

    async function handleAddProduct() {
        const formData = new FormData();
        formData.append('product_name', product_name);
        formData.append('shop_owner_username', shop_owner_username);
        formData.append('product_price', product_price);
        formData.append('product_description', product_description);
        formData.append('product_image', product_image);
        formData.append('product_category', product_category);
        formData.append('product_stock_quantity', product_stock_quantity);
        formData.append('product_status', product_status);

        const response = await axios.post('/add-product', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            }
        })
        if (response.data.success) {
            setSuccessMessage(response.data.success);
            getProducts(props.user.username);
            resetModal();
        } else {
            setErrorMessage(response.data.error);
        }

    }

    function handleEditProduct(slug) {
        const productToEdit = products.find(product => product.product_slug === slug);
        setProductName(productToEdit.product_name);
        setProductPrice(productToEdit.product_price);
        setProductDescription(productToEdit.product_description);
        setProductImage(productToEdit.product_image);
        setProductCategory(productToEdit.product_category);
        setProductStockQuantity(productToEdit.product_stock_quantity);
        setProductStatus(productToEdit.product_status);
        setUpdateProductModal(true);
        setProductSlug(slug);
        setOpenModal(true);
    }

    async function handleUpdateProduct() {
        const formData = new FormData();
        formData.append('product_name', product_name);
        formData.append('product_price', product_price);
        formData.append('product_description', product_description);
        formData.append('product_image', product_image);
        formData.append('product_category', product_category);
        formData.append('product_stock_quantity', product_stock_quantity);
        formData.append('product_status', product_status);
        formData.append('_method', 'PUT'); // Method spoofing

        const { data } = await axios.post(`/update-product/${productSlug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            }
        });
        if (data) {

            setSuccessMessage(data);
            getProducts(props.user.username);
            resetModal();
        } else {
            setErrorMessage(data.error);
        }
    }

    function resetModal() {

        setOpenModal(false);
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductImage(null);
        setProductCategory("");
        setProductStockQuantity("");
        setProductStatus("");
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // This clears the input visually
        }
    }

    async function handleDeleteProduct(slug) {
        const { data } = await axios.delete(`/delete-product/${slug}`)
        setSuccessMessage(data.success);
        getProducts();
    }

    const totalProducts = products.length;
    const productsPerPage = 2
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentproducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const changeCurrentPage = (numPage) => {
        setCurrentPage(numPage)
    }

    // Calculate total pages needed
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div class="vendor-container">
                <Aside />
                <main class="main-content">
                    <header class="header">
                        <div class="header-left">
                            <button class="menu-toggle">
                                <i class="fas fa-bars"></i>
                            </button>
                            <h1>Products</h1>
                        </div>
                        <div class="header-right">
                            <div class="notifications">
                                <i class="fas fa-bell"></i>
                                <span class="badge">3</span>
                            </div>
                            <div class="user-profile">
                                <img src="https://via.placeholder.com/40" alt="User" />
                                <span>John Doe</span>
                            </div>
                        </div>
                    </header>
                    {
                        successMessage ?
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                {successMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            :
                            ''
                    }

                    <div class="products-content">
                        <div className="categories-header">
                            <div className="search-box">
                                <input type="text" placeholder="Search products..." />
                                <button className="search-btn">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <button className="btn-primary" onClick={() => setOpenModal(true)}>
                                <i className="fas fa-plus"></i> Add Product
                            </button>
                        </div>

                        {/* Products Table  */}
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="products-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Category</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentproducts.map((product) => (
                                                    <tr key={product.id}>
                                                        <td>
                                                            <div class="product-info">
                                                                <img src={"http://127.0.0.1:8000/uploads/" + product.product_image} height={60} alt="Product" />
                                                                <div>
                                                                    <h4>{product.product_name}</h4>
                                                                    <small>SKU: LW-2023</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${product.product_price}</td>
                                                        <td>{product.product_stock_quantity}</td>
                                                        <td>
                                                            {categories.find(category => category.id === product.product_category)?.category_name || 'Unknown'}
                                                        </td>
                                                        <td><span class="status active">In Stock</span></td>
                                                        <td>
                                                            <button onClick={() => handleEditProduct(product.product_slug)} class="action-btn edit"><i class="fas fa-edit"></i></button>
                                                            <button onClick={() => handleDeleteProduct(product.product_slug)} class="action-btn delete"><i class="fas fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Pagination  */}
                        <div className="pagination">
                            {/* Previous button */}
                            <button
                                className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => changeCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>

                            {/* Page numbers */}
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    className={`page-btn ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => changeCurrentPage(number)}
                                >
                                    {number}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => changeCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div className="page-info">
                            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} products
                        </div>
                    </div>
                </main>
                {/* Add Product Modal  */}
                <div class={`modal ${openModal ? 'active' : ''}`} id="productModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Add New Product</h3>
                            <button onClick={() => setOpenModal(false)} class="close-modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div id="productForm">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="productName">Product Name</label>
                                        <input value={product_name} onChange={(e) => setProductName(e.target.value)} type="text" id="productName" />
                                        {
                                            errorMessage.product_name ?
                                                <span className="text-danger">{errorMessage.product_name}</span> : ""
                                        }
                                    </div>
                                    {/* <div class="form-group">
                                        <label for="productSku">SKU</label>
                                        <input  type="text" id="productSku" />
                                    </div> */}
                                </div>

                                <div class="form-group">
                                    <label for="productDescription">Description</label>
                                    <textarea value={product_description} onChange={(e) => setProductDescription(e.target.value)} id="productDescription" rows="3"></textarea>
                                    {
                                        errorMessage.product_description ?
                                            <span className="text-danger">{errorMessage.product_description}</span> : ""
                                    }
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="productPrice">Price ($)</label>
                                        <input value={product_price} onChange={(e) => setProductPrice(e.target.value)} type="number" id="productPrice" />
                                        {
                                            errorMessage.product_price ?
                                                <span className="text-danger">{errorMessage.product_price}</span> : ""
                                        }
                                    </div>
                                    <div class="form-group">
                                        <label for="productStock">Stock Quantity</label>
                                        <input value={product_stock_quantity} onChange={(e) => setProductStockQuantity(e.target.value)} type="number" id="productStock" />
                                        {
                                            errorMessage.product_stock_quantity ?
                                                <span className="text-danger">{errorMessage.product_stock_quantity}</span> : ""
                                        }
                                    </div>
                                </div>

                                <div class="form-row">
                                    {
                                        categories.length > 0 ?
                                            <div class="form-group">
                                                <label for="productCategory">Category</label>
                                                <select value={product_category} onChange={(e) => setProductCategory(e.target.value)} id="productCategory">
                                                    <option value="">Select category</option>
                                                    {
                                                        categories.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.category_name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    errorMessage.product_category ?
                                                        <span className="text-danger">{errorMessage.product_category}</span> : ""
                                                }
                                            </div>
                                            :
                                            <input type="hidden" value={product_category} />
                                    }
                                    <div class="form-group">
                                        <label for="productStatus">Status</label>
                                        <select value={product_status} onChange={(e) => setProductStatus(e.target.value)} id="productStatus" required>
                                            <option value="">Select status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {
                                            errorMessage.product_status ?
                                                <span className="text-danger">{errorMessage.product_status}</span> : ""
                                        }
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="productImages">Product Images</label>
                                    <div class="image-upload">
                                        <input ref={fileInputRef} onChange={(e) => setProductImage(e.target.files[0])} type="file" multiple accept="image/*" />
                                        <label for="productImages" class="upload-btn">
                                            <i class="fas fa-cloud-upload-alt"></i> Upload Images
                                        </label>
                                        <div class="image-preview"></div>
                                    </div>
                                    {
                                        errorMessage.product_image ?
                                            <span className="text-danger">{errorMessage.product_image}</span> : ""
                                    }
                                </div>

                                <div class="form-actions">
                                    <button type="button" onClick={() => setOpenModal(false)} class="btn-secondary close-modal">Cancel</button>
                                    {
                                        updateProductModal ?
                                            <button type="submit" onClick={handleUpdateProduct} class="btn-primary">Update Product</button> :
                                            <button type="submit" onClick={handleAddProduct} class="btn-primary">Save Product</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductManagementPage