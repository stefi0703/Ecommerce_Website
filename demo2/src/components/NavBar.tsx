import React, { useState, useEffect } from "react";
import "./NavBar.css";
import hackademyLogo from "./logo-color.png";
import helpIcon from "./help.png";
import Cart from "./Cart";
import Favorite from "./Favorite";
import { ProductData } from "./Product";

interface NavBarProps {
  cartCount: number;
  favoriteCount: number;
  cartProducts: ProductData[];
  favoriteProducts: ProductData[];
  onDeleteProduct: (productId: number, quantity: number) => void;
  onUpdateProductQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFavorite: (productId: number) => void;
  setSelectedCategory: (category: string) => void;
  onToggleResigilate: () => void;
  onToggleDiscount: () => void;
  onToggleRating: () => void;
  setSearchQuery: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  cartCount,
  favoriteCount,
  cartProducts,
  favoriteProducts,
  onDeleteProduct,
  onUpdateProductQuantity,
  onRemoveFavorite,
  setSelectedCategory,
  onToggleResigilate,
  onToggleDiscount,
  onToggleRating,
  setSearchQuery,
}) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [isResigilateActive] = useState(false);
  const [isDiscountsActive] = useState(false);
  const [isRatingActive] = useState(false);

  // Inside the useEffect hook where you fetch products
  useEffect(() => {
    // Fetch all products from the API
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setAllProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleResigilateClick = () => {
    onToggleResigilate();
  };

  const handleSortByDiscount = () => {
    onToggleDiscount(); // New prop function to be provided by parent
  };

  const handleSortByRating = () => {
    onToggleRating(); // New prop function to be provided by parent
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSearchQuery(event.target.value); // Update the global search state
  };

  const categories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  return (
    <>
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <img src={hackademyLogo} alt="HACKADEMY" />
        </a>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Searching anything?"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="navbar-icons">
          <a href="/favorites" className="navbar-icon-link cart0">
            <span className="icon-text">Favorite</span>
            <Favorite
              favoriteCount={favoriteCount}
              favoriteProducts={favoriteProducts}
              onRemoveFavorite={onRemoveFavorite}
            />
          </a>
          <a href="/help" className="navbar-icon-link cart0">
            <span className="icon-text">Help</span>
            <img src={helpIcon} alt="Help" />
          </a>
          <a href="/cart" className="navbar-icon-link cart0">
            <span className="icon-text">Cart</span>
            <Cart
              cartCount={cartCount}
              cartProducts={cartProducts}
              onDeleteProduct={onDeleteProduct}
              onUpdateProductQuantity={onUpdateProductQuantity}
            />
          </a>
        </div>
      </nav>
      <nav className="sub-navbar">
        <div className="nav-button" onMouseEnter={() => setShowDropdown(true)}>
          Products
          {showDropdown && (
            <div
              className="dropdown"
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div
                className="dropdown-item"
                onClick={() => handleCategoryClick("")}
              >
                All Categories
              </div>
              {categories.map((category) => (
                <div
                  className="dropdown-item"
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={isDiscountsActive ? "nav-button active" : "nav-button"}
          onClick={handleSortByDiscount}
        >
          Discounts
        </div>
        <div
          className={isRatingActive ? "nav-button active" : "nav-button"}
          onClick={handleSortByRating}
        >
          Rating
        </div>
        <div
          onClick={handleResigilateClick}
          className={isResigilateActive ? "nav-button active" : "nav-button"}
        >
          Resealed
        </div>
      </nav>
    </>
  );
};

export default NavBar;
