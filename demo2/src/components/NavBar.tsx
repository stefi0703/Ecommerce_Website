import React, { useState } from "react";
import "./NavBar.css";
import hackademyLogo from "./logo-color.png";
import favoriteIcon from "./favorite.png"; // Placeholder path for favorite icon
import helpIcon from "./help.png"; // Placeholder path for help icon
import Cart from "./Cart"; // Import Cart component
import Favorite from "./Favorite"; // Import Favorite component

interface NavBarProps {
  cartCount: number; // Pass cartCount as prop
  favoriteCount: number; // Pass favoriteCount as prop
}

const NavBar: React.FC<NavBarProps> = ({ cartCount, favoriteCount }) => {
  const [search, setSearch] = useState("");

  return (
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
          <Cart cartCount={cartCount} />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
