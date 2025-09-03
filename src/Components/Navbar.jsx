import React, { useState } from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Get role and name from localStorage
  const role = localStorage.getItem("role"); // 'admin' or 'user'
  const name = localStorage.getItem("name") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  // Admin navigation
  const handleAdminHomeClick = () => navigate("/admin/home");
  const handleAdminStatusClick = () => navigate("/admin/status");

  // User navigation
  const handleUserHomeClick = () => navigate("/user/home");
  const handleUserBookingsClick = () => navigate("/user/previousBooking");

  return (
    <nav className="navbar">
      {/* Logo */}
      <img className="logo" src="/BookNGo.png" alt="BookNGo Logo" />

      {/* Hamburger toggle (only on mobile) */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {role === "admin" ? (
          <>
            <span onClick={handleAdminHomeClick}>Home</span>
            <span onClick={handleAdminStatusClick}>Status</span>
            <span>Hi {name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : role === "user" ? (
          <>
            <span onClick={handleUserHomeClick}>Home</span>
            <span onClick={handleUserBookingsClick}>Previous Bookings</span>
            <span>Hi {name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span onClick={() => navigate("/login")}>Login</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
