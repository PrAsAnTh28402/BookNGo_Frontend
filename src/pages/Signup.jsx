import React, { useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Service/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Invalid email format");
        setLoading(false);
        return;
      }

      const res = await signupUser(formData);
      console.log("Signup response:", res);

      // Check for success using backend message
      if (res?.message === "Signup Successful") {
        setSuccess("Signup successful! 🎉 Redirecting to login...");
        setFormData({ username: "", email: "", password: "" });

        // Redirect after 1.5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      } else {
        setError(res?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* LEFT SIDE */}
      <div className="signup-left">
        <div className="logo-wrapper">
          <img src="/BookNGo.png" alt="BookNGo Logo" className="signup-logo" />
          <p className="brand-text">From Click to Celebration 🎉</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="form-wrapper">
          <h2>Welcome to BookNGo</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="off"
            />
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
            <button type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Error / Success messages */}
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
