import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaHome,
} from "react-icons/fa";
import "../css/header2.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-top">
        {/* Left section */}
        <div className="header-left">
          {/* Hamburger menu for mobile */}
          <div className="hamburger" onClick={toggleMenu}>
            <FaBars className="icon" />
          </div>

          {/* Search icon for mobile */}
          <div className="mobile-search">
            <FaSearch className="icon" />
          </div>
        </div>

        {/* Logo section */}
        <div className="logo">
          <img src="../Aneja-1.png" alt="Aneja mall" />
        </div>

        {/* Right section */}
        <div className="header-right">
          <Link to="/" className="icon-link">
            <FaHome className="icon home-icon" />
          </Link>
          <Link to="/profile" className="icon-link">
            <FaUser className="icon user-icon" />
          </Link>
          <Link to="/liked-products" className="icon-link">
            <FaHeart className="icon wishlist-icon" />
          </Link>
          <Link to="/cart" className="icon-link">
            <div className="cart-icon">
              <FaShoppingCart className="icon" />
              <span className="cart-count">0</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation links */}
      <nav className={`header-bottom ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="home">
          Home
        </Link>
        <Link to="/sale" className="sale">
          SALE
        </Link>
        <Link to="/new-arrivals">New Arrivals</Link>
        <Link to="/sarees">Sarees</Link>
        <Link to="/suits">Suits</Link>
        <Link to="/kurtis">Kurtis</Link>
        <Link to="/trial">Co-Ord Set</Link>
        <Link to="/unstitched-suits">Unstitched Suits</Link>
        <Link to="/lehengas">Lehengas</Link>
        <Link to="/gowns">Gowns</Link>
        <Link to="./loginpage">Login</Link>
        <Link to="/wedding-collection">Wedding Collection</Link>
        <Link to="/bestsellers">Bestsellers</Link>
      </nav>
    </header>
  );
};

export default Header;
