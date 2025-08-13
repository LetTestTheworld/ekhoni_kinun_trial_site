import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Container,
  InputGroup,
  Badge
} from 'react-bootstrap';
import {
  FaStar,
  FaStarHalfAlt,
  FaEye,
  FaHeart,
  FaShoppingCart,
  FaSearch
} from 'react-icons/fa';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';
import useProductAndCategory from './operations/useProductAndCategory';

const AllProducts = () => {
  const { allProducts: products, allCategories: categories } = useProductAndCategory();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectCategory] = useState('all-items');
  const [categoryWiseProduct, setCategoryWiseProduct] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);

  // Function to check if product is new (created within 24 hours)
  const isProductNew = (createdAt) => {
    if (!createdAt) return false;
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInHours = (now - createdDate) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  /* 
  // Filters state
  const [filters, setFilters] = useState({
    categories: {
      electronics: true,
      fashion: false,
      home: false,
      beauty: false,
      sports: false
    },
    brands: {
      techHub: false,
      gadgetWorld: false,
      styleNow: false,
      homeEssentials: false,
      beautyPlus: false
    },
    ratings: {
      rating5: false,
      rating4: false,
      rating3: false,
      rating2: false
    },
    discounts: {
      discount10: false,
      discount20: false,
      discount30: false,
      discount40: false,
      discount50: false
    }
  });

  // Handle filter changes
  const handleFilterChange = (filterType, filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [filterName]: !prev[filterType][filterName]
      }
    }));
  };
  */

  // Initialize price range and filter products
  useEffect(() => {
    if (products.length > 0) {
      let productsToFilter = selectedCategory === 'all-items'
        ? products
        : products.filter(product => product.product_category === selectedCategory);

      const maxPrice = productsToFilter.length > 0
        ? Math.max(...productsToFilter.map(product => Number(product.product_price)))
        : 0;
      const minPrice = productsToFilter.length > 0
        ? Math.min(...productsToFilter.map(product => Number(product.product_price)))
        : 0;

      setMaxPrice(maxPrice);
      setPriceRange([minPrice, maxPrice]);
      setCategoryWiseProduct(productsToFilter);
      setFilteredProducts([]);
    }
  }, [products, selectedCategory]);

  // Filter products by price range
  const handleFilter = () => {
    const [min, max] = priceRange;
    const productsToFilter = selectedCategory === 'all-items'
      ? products
      : categoryWiseProduct;

    const filtered = productsToFilter.filter(product => {
      const price = Number(product.product_price);
      return price >= min && price <= max;
    });

    setFilteredProducts(filtered);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectCategory(categoryId);
    setFilteredProducts([]);
  };

  // Determine which products to display
  const productsToDisplay = filteredProducts.length > 0
    ? filteredProducts
    : selectedCategory === 'all-items'
      ? products
      : categoryWiseProduct;

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaStar key={i} className="text-secondary" />);
      }
    }

    return stars;
  };

  return (
    <>
      <div className="users-pages">
        <Navbar />
        <Container className="all-products-container" style={{ marginTop: '100px' }}>
          <Row>
            {/* Sidebar Filters Column */}
            <Col lg={3} className="sidebar-filters">
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0">Filters</h5>
                </Card.Header>
                <Card.Body>
                  {/* Price Range Filter */}
                  <div className="filter-section mb-4">
                    <h6 className="filter-title mb-3">Price Range</h6>
                    <div className="price-range-slider mb-3">
                      <Form.Range
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="mb-2"
                      />
                      <Form.Range
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      />
                      <div className="d-flex justify-content-between mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    <Button variant="primary" onClick={handleFilter} size="sm" className="w-100">Apply</Button>
                  </div>

                  {/* 
                  // Categories Filter
                  <div className="filter-section mb-4">
                    <h6 className="filter-title mb-3">Categories</h6>
                    {Object.entries(filters.categories).map(([key, value]) => (
                      <Form.Check
                        key={key}
                        type="checkbox"
                        id={`cat-${key}`}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        checked={value}
                        onChange={() => handleFilterChange('categories', key)}
                        className="mb-2"
                      />
                    ))}
                  </div>

                  // Brands Filter
                  <div className="filter-section mb-4">
                    <h6 className="filter-title mb-3">Brands</h6>
                    <InputGroup className="mb-3">
                      <Form.Control placeholder="Search brands" size="sm" />
                      <Button variant="outline-secondary" size="sm">
                        <FaSearch />
                      </Button>
                    </InputGroup>
                    <div className="brand-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {Object.entries(filters.brands).map(([key, value]) => (
                        <Form.Check
                          key={key}
                          type="checkbox"
                          id={`brand-${key}`}
                          label={key.split(/(?=[A-Z])/).join(' ')}
                          checked={value}
                          onChange={() => handleFilterChange('brands', key)}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </div>

                  // Ratings Filter
                  <div className="filter-section mb-4">
                    <h6 className="filter-title mb-3">Customer Ratings</h6>
                    <Form.Check
                      type="checkbox"
                      id="rating-5"
                      label={<>{renderStars(5)} (128)</>}
                      checked={filters.ratings.rating5}
                      onChange={() => handleFilterChange('ratings', 'rating5')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="rating-4"
                      label={<>{renderStars(4)} & Up (92)</>}
                      checked={filters.ratings.rating4}
                      onChange={() => handleFilterChange('ratings', 'rating4')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="rating-3"
                      label={<>{renderStars(3)} & Up (76)</>}
                      checked={filters.ratings.rating3}
                      onChange={() => handleFilterChange('ratings', 'rating3')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="rating-2"
                      label={<>{renderStars(2)} & Up (58)</>}
                      checked={filters.ratings.rating2}
                      onChange={() => handleFilterChange('ratings', 'rating2')}
                      className="mb-2"
                    />
                  </div>

                  // Discount Filter
                  <div className="filter-section">
                    <h6 className="filter-title mb-3">Discount</h6>
                    {Object.entries(filters.discounts).map(([key, value]) => (
                      <Form.Check
                        key={key}
                        type="checkbox"
                        id={key}
                        label={`${key.replace('discount', '')}% and above`}
                        checked={value}
                        onChange={() => handleFilterChange('discounts', key)}
                        className="mb-2"
                      />
                    ))}
                  </div>
                  */}
                </Card.Body>
                {/*
                <Card.Footer className="bg-white border-0 d-flex justify-content-between">
                  <Button variant="outline-danger" size="sm">Reset All</Button>
                  <Button variant="primary" size="sm">Apply Filters</Button>
                </Card.Footer>
                */}
              </Card>

              {/*
              // Vendor Filter
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0">Vendors</h5>
                </Card.Header>
                <Card.Body>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Search vendors" size="sm" />
                    <Button variant="outline-secondary" size="sm">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                  <div className="vendor-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <div className="vendor-item d-flex align-items-center mb-3">
                      <img
                        src="https://via.placeholder.com/40x40"
                        alt="Vendor"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">TechHub</h6>
                        <small className="text-muted">Electronics</small>
                      </div>
                      <Form.Check type="checkbox" id="vendor-1" />
                    </div>
                  </div>
                </Card.Body>
              </Card>

              // Recently Viewed
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0">Recently Viewed</h5>
                </Card.Header>
                <Card.Body>
                  <div className="recent-product d-flex mb-3">
                    <img
                      src="https://via.placeholder.com/80x80"
                      alt="Product"
                      className="rounded-2 me-3"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1">Wireless Earbuds</h6>
                      <div className="product-rating small mb-1">
                        {renderStars(4.5)}
                      </div>
                      <div className="product-price">
                        <span className="text-primary fw-bold">$49.99</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              */}
            </Col>

            {/* Main Products Column */}
            <Col lg={9}>
              {/* Category Header */}
              <div className="category-header mb-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                  <div className="mb-3 mb-md-0">
                    <h2 className="mb-1">All Products</h2>
                    <p className="text-muted mb-0">Showing 1-{productsToDisplay.length} of {productsToDisplay.length} products</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <Form.Label className="me-3 mb-0">Sort by:</Form.Label>
                    <Form.Select style={{ width: '200px' }}>
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest Arrivals</option>
                      <option>Highest Rated</option>
                      <option>Most Popular</option>
                    </Form.Select>
                  </div>
                </div>
              </div>

              {/* Category Banner */}
              <Card className="border-0 bg-primary text-white overflow-hidden mb-4">
                <Card.Body className="p-4">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h3 className="mb-2">Summer Sale</h3>
                      <p className="mb-3">Up to 50% off on selected items. Limited time offer!</p>
                      <Button variant="light">Shop Now</Button>
                    </Col>
                    <Col md={4} className="d-none d-md-block">
                      <img
                        src="https://via.placeholder.com/300x200"
                        alt="Banner"
                        className="img-fluid float-end"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Subcategories */}
              <div className="subcategories mb-4">
                <div className="d-flex flex-wrap gap-2">
                  {
                    categories.length > 0 ?
                      <Button
                        variant={selectedCategory === 'all-items' ? "outline-primary active" : "outline-primary"}
                        size="sm"
                        onClick={() => setSelectCategory('all-items')}
                      >
                        All Products
                      </Button> : null
                  }
                  {categories.map((cat, i) => (
                    <Button
                      key={i}
                      variant={cat.id === selectedCategory ? "outline-primary active" : "outline-primary"}
                      size="sm"
                      onClick={() => handleCategorySelect(cat.id)}
                    >
                      {cat.category_name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <Row className="g-4">
                {productsToDisplay.map((product, index) => (
                  <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                    <div className="product-card card border-0 shadow-sm h-100">
                      {/* Only show New badge if product was created in last 24 hours */}
                      {product.created_at && isProductNew(product.created_at) && (
                        <div className="badge bg-success position-absolute m-2" style={{zIndex:"1"}}>New</div>
                      )}
                      <div className="product-thumb position-relative overflow-hidden">
                        <img src={'http://127.0.0.1:8000/uploads/' + product.product_image} className="card-img-top"
                          alt="Product Image" />
                        <div
                          className="product-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-light rounded-circle me-2 quick-view"
                            data-bs-toggle="tooltip" title="Quick View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle me-2 add-to-wishlist"
                            data-bs-toggle="tooltip" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </button>
                          <button className="btn btn-outline-light rounded-circle add-to-cart"
                            data-bs-toggle="tooltip" title="Add to Cart">
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="product-title mb-1"><Link to={`/product-details/${product.product_slug}`}
                          className="text-dark text-decoration-none">{product.product_name}</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="product-price">
                            <span className="text-primary fw-bold">{product.product_price} Tk.</span>
                          </div>
                          <div className="product-stock small">
                            <span className="text-success">{product.product_stock_quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Row>

              {/* Pagination */}
              <Pagination className="justify-content-center mt-5">
                <Pagination.Prev disabled />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{8}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default AllProducts;