import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css"; // Import CSS for responsive styling

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="navbar-logo">
         QuiqFlow
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
