import React, { useState } from "react";
import "../styles/Signup.css"; // same CSS as Signup
import logo from "../../public/BookNGo.png";
import { loginUser } from "../Service/authService";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from '../Components/Loader';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const res = await loginUser(formData); // wait API response
    console.log("Login response:", res);

    if (res?.message === "Login Successful" && res?.user?.role) {
      // Save token and user info
      if (res.token) localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      localStorage.setItem("role", res.user.role);
      localStorage.setItem("name", res.user.name || "User");

      setSuccess("Login successful! 🎉 Redirecting...");

      // Add slight delay before navigating (e.g., 1s)
      setTimeout(() => {
        if (res.user.role === "admin") navigate("/admin/home");
        else navigate("/user/home");
      }, 1500);
    } else {
      setError(res?.message || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError(err.response?.data?.message || err.message || "Login failed");
  } finally {
    // keep loader slightly longer (e.g., 800ms)
    setTimeout(() => setLoading(false), 1200);
  }
};


  return (
    <>
      {loading && <FullScreenLoader />}

      <div className="signup-container">
        {/* LEFT SIDE */}
        <div className="signup-left">
          <div className="logo-wrapper">
            <img src={logo} alt="BookNGo Logo" className="signup-logo" />
            <p className="brand-text">From Click to Celebration 🎉</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="signup-right">
          <div className="form-wrapper">
            <h2>Welcome Back</h2>
            <form className="signup-form" autoComplete="off">
              {/* Hidden dummy fields to trick Chrome */}
              <input type="text" style={{ display: "none" }} />
              <input type="password" style={{ display: "none" }} />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            {/* Error / Success messages */}
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text-login">{success}</p>}

            <p className="login-text">
              Don’t have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
