import Aside from "../layouts/vendor/Aside"
import "../css/vendor.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Category_Management_page(props) {
    const [modal, openModal] = useState(false);
    const [category_name, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [shop_owner_username, setShopOwnerUsername] = useState('');
    const [categories, setCategories] = useState([]);
    const [category_slug, setCategorySlug] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function addCategory() {
        const { data } = await axios.post('/add-category', {
            category_name, status, shop_owner_username
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })

        if (data.success) {
            setSuccessMessage(data.success);
            getCategories(props.user.username);
            openModal(false);
            resetModal();
        } else {
            setErrorMessage(data.error);
        }
    }

    async function getCategories(username) {
        const { data } = await axios.get(`/categories/${username}`)

        setCategories(data.categories);

    }

    useEffect(() => {

        setShopOwnerUsername(props.user.username)
        getCategories(props.user.username);

    }, [props.user]);

    function editCategory(slug) {
        console.log(slug);

        const categoryToEdit = categories.find(category => category.category_slug === slug);
        setCategory(categoryToEdit.category_name);
        setStatus(categoryToEdit.status);
        setIsEditing(true);
        setCategorySlug(slug);
        openModal(true);
    }

    function updateCategory() {
        axios.put(`/update-category/${category_slug}`, {
            category_name, status
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        getCategories(props.user.username);
        openModal(false);
        resetModal();
    }

    function deleteCategory(slug) {
        axios.delete(`/delete-category/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        getCategories();
    }

    function resetModal() {
        openModal(false);
        setCategory("");
        setStatus("active");
        setCategorySlug('');
        setIsEditing(false);
    }

    const totalCategories = categories.length;
    const categoriesPerPage = 2
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastCategory = currentPage * categoriesPerPage
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
    const currentcategories = categories.slice(indexOfFirstCategory, indexOfLastCategory)

    const changeCurrentPage = (numPage) => {
        setCurrentPage(numPage)
    }

    // Calculate total pages needed
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="vendor-container">
                <Aside />
                {/* Main Content  */}
                <main className="main-content">
                    <header className="header">
                        <div className="header-left">
                            <button className="menu-toggle">
                                <i className="fas fa-bars"></i>
                            </button>
                            <h1>Categories</h1>
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
                    {
                        successMessage ?
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                {successMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            :
                            ''
                    }
                    <div className="categories-content">
                        <div className="categories-header">
                            <div className="search-box">
                                <input type="text" placeholder="Search categories..." />
                                <button className="search-btn">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <button className="btn-primary" onClick={() => openModal(true)}>
                                <i className="fas fa-plus"></i> Add Category
                            </button>
                        </div>

                        {/* Categories Table  */}
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="categories-table">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Products</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentcategories.map((category) => (
                                                <tr key={category.id}>
                                                    <td>
                                                        <div>
                                                            <h4>{category.category_name}</h4>
                                                            {/* <small>Main Category</small> */}
                                                        </div>
                                                    </td>
                                                    <td>128</td>
                                                    <td><span className={`status ${category.status === 'active' ? 'active' : 'inactive'}`}>{category.status}</span></td>
                                                    <td>{category.created_at.split('T')[0]}</td>
                                                    <td>
                                                        <button onClick={() => editCategory(category.category_slug)} className="action-btn edit"><i className="fas fa-edit"></i></button>
                                                        <button onClick={() => deleteCategory(category.category_slug)} className="action-btn delete"><i className="fas fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))}
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
                            Showing {indexOfFirstCategory + 1}-{Math.min(indexOfLastCategory, totalCategories)} of {totalCategories} Categories
                        </div>
                    </div>
                </main>

                {/* Add Category Modal  */}
                <div className={`modal ${modal ? 'active' : ''}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add New Category</h3>
                            <button onClick={resetModal} className="close-modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-group">
                                    <label for="categoryName">Category Name</label>
                                    <input value={category_name} onChange={(e) => setCategory(e.target.value)} type="text" id="categoryName" />
                                    {
                                        errorMessage.category_name ?
                                            <span className="text-danger">{errorMessage.category_name}</span> : ''
                                    }
                                </div>

                                <div className="form-group">
                                    <label for="categoryStatus">Status</label>
                                    <select id="categoryStatus" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="active" >Active</option>
                                        {/* <option value="active" {status === 'active' ? selected : ''}>Active</option> */}
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button type="button" onClick={resetModal} className="btn-secondary close-modal">Cancel</button>
                                    {
                                        isEditing ?
                                            <button type="submit" onClick={updateCategory} className="btn-primary">Update Category</button> :
                                            <button type="submit" onClick={addCategory} className="btn-primary">Save Category</button>
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

export default Category_Management_page