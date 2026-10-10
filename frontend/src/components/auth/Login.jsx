import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../../redux/authSlice";
import { closeAuthModal } from "../../redux/uiSlice";

import "../../css/auth/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(setError("All fields are required"));
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password }
      );

      dispatch(setUser(res.data));
      localStorage.setItem("token", res.data.token);
      dispatch(closeAuthModal());
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Login failed")
      );
    }
  };

  const handleForgotPassword = () => {
    dispatch(closeAuthModal());
    navigate("/forgot-password");
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2 className="auth-title">Welcome Back</h2>

      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-6px" }}>
        <button
          type="button"
          onClick={handleForgotPassword}
          style={{
            background: "none",
            border: "none",
            color: "#a855f7",
            fontSize: "13px",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          Forgot password?
        </button>
      </div>

      {error && <p className="auth-error">{error}</p>}

      {/* 🔥 LOGIN BUTTON */}
      <button
        type="submit"
        className="auth-submit-btn"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
