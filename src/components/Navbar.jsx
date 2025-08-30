import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Auto-update when user logs in or out
  useEffect(() => {
    const handleUserChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userLoggedIn", handleUserChange);
    window.addEventListener("storage", handleUserChange); // reacts to changes in other tabs

    return () => {
      window.removeEventListener("userLoggedIn", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        CryptoTrade
      </Link>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu Links */}
      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/trade"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Trade
        </Link>

        {user ? (
          <>
            <Link
              to="/profile"
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="signup-btn"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
