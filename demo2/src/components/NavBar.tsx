import React, { useState } from "react";
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
  onDeleteProduct: (productId: number, quantity: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  cartCount,
  favoriteCount,
  cartProducts,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState("");

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
            <Favorite favoriteCount={favoriteCount} />
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
        <a href="#!">Produse</a>
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
