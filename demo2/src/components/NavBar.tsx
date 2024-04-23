import React, { useState } from 'react';
import './NavBar.css';
import hackademyLogo from './logo-color.png';
import favoriteIcon from './favorite.png'; // Placeholder path for favorite icon
import helpIcon from './help.png'; // Placeholder path for help icon
import Cart from './Cart'; // Import Cart component

interface NavBarProps {
  cartCount: number; // Pass cartCount as prop
}

const NavBar: React.FC<NavBarProps> = ({ cartCount }) => {
  const [search, setSearch] = useState('');

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
        <a href="/favorites" className="navbar-icon-link">
          <span className="icon-text">Favorite</span>
          <img src={favoriteIcon} alt="Favorites" />
        </a>
        <a href="/help" className="navbar-icon-link">
          <span className="icon-text">Help</span>
          <img src={helpIcon} alt="Help" />
        </a>
        <a href="/cart" className="navbar-icon-link">
          <span className="icon-text">Cart</span>
        </a>
        <a href="/cart" className="cart0">
           <Cart cartCount={cartCount} />
        </a>
       
      </div>
    </nav>
  );
};

export default NavBar;
