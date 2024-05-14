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
  onRemoveFavorite: (productId: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  cartCount,
  favoriteCount,
  cartProducts,
  favoriteProducts,
  onDeleteProduct,
  onRemoveFavorite,
}) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    // Fetch all products from the API
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setAllProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDropdownHover = () => {
    setShowDropdown(true);
  };

  const handleDropdownLeave = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // Check if the mouse is not over the dropdown
    if (
      !event.relatedTarget ||
      !(event.relatedTarget as HTMLElement).closest(".dropdown")
    ) {
      setShowDropdown(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowDropdown(false);
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
            onChange={(e) => setSearch(e.target.value)}
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
            />
          </a>
        </div>
      </nav>
      <nav className="sub-navbar">
        <a
          href="/"
          className="navbar-brand"
          onMouseEnter={handleDropdownHover}
          onMouseLeave={handleDropdownLeave}
        >
          Produse
          {showDropdown && (
            <div className="dropdown">
              <a href="#!" onClick={() => handleCategoryClick("")}>
                All Categories
              </a>
              {categories.map((category) => (
                <a
                  href="#!"
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </a>
              ))}
            </div>
          )}
        </a>
        <a href="#!">Genius Deals</a>
        <a href="#!">Genius</a>
        <a href="#!">Rabla</a>
        <a href="#!">Cardul cu milioane de idei</a>
        <a href="#!">Resigilate</a>
        <a href="#!">Ofertele eMAG</a>
      </nav>
    </>
  );
};

export default NavBar;
