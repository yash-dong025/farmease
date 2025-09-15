import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (loginStatus === "true") setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="home">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">🌱 FarmEase</Link>
        </div>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </>
          ) : (
            <div className="dropdown">
              <span className="dropbtn">👤 {user?.name || "My Profile"}</span>
              <div className="dropdown-content">
                <Link to="/profile">My Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="hero">
        <h1>🌱 Welcome to FarmEase</h1>
        <p>Your one-stop platform for modern farming solutions.</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-primary">Explore Products</Link>
          {!isLoggedIn && (
            <Link to="/register" className="btn-secondary">Join Us</Link>
          )}
        </div>
      </header>

      {/* ✅ Features Section */}
      <section className="features">
        <h2>Why Choose FarmEase?</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>🚜 Smart Tools</h3>
            <p>Access modern agricultural tools and machinery.</p>
          </div>
          <div className="feature-card">
            <h3>🛒 Online Marketplace</h3>
            <p>Buy & sell farm products with ease and transparency.</p>
          </div>
          <div className="feature-card">
            <h3>🤝 Community</h3>
            <p>Connect with farmers and experts worldwide.</p>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="cta">
        <h2>Ready to grow with FarmEase?</h2>
        <Link to="/products" className="btn-primary">Explore Products</Link>
        {!isLoggedIn && (
          <Link to="/register" className="btn-primary">Get Started</Link>
        )}
      </section>
    </div>
  );
}

export default Home;
