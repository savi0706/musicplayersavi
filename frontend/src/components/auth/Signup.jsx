import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../../redux/authSlice";
import { closeAuthModal } from "../../redux/uiSlice";

import "../../css/auth/Auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      dispatch(setError("All fields are required"));
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        { name, email, password }
      );

      dispatch(setUser(res.data));
      localStorage.setItem("token", res.data.token);
      dispatch(closeAuthModal());
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Signup failed")
      );
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSignup}>
      <h2 className="auth-title">Create Account</h2>

      <input
        type="text"
        placeholder="Name"
        className="auth-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      {error && <p className="auth-error">{error}</p>}

      {/* 🔥 SIGNUP BUTTON */}
      <button
        type="submit"
        className="auth-submit-btn"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default Signup;
