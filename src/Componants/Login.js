import React, { useState, useRef, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
function Login({ setIsLoggedIn }) {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
const match = users.find(
  (u) => u.email === email && u.password === password
);

if (match) {
  
  localStorage.setItem("isLoggedIn", "true");
setIsLoggedIn(true);
  // ✅ Save matched user info for profile access
  localStorage.setItem("currentUser", JSON.stringify({
    fullname: match.fullname,
    email: match.email,
    phone: match.phone
  }));

  navigate("/product", { replace: true });
} else {
  alert("Enter valid details");
}

  };

  return (
    <>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="login-container">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
          <div className="divider">
            <span>or</span>
          </div>
          <div className="signup-link">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
