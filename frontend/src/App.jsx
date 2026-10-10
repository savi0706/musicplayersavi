import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Homepage from "./pages/Homepage";
import { setUser, logout } from "./redux/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchMe = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await axios.get(`${baseUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.user) {
          dispatch(setUser({ user: res.data.user, token }));
        }
      } catch (err) {
        console.error("Session restore failed:", err.message);
        // Only log out if token is definitively invalid (401)
        if (err.response?.status === 401) {
          dispatch(logout());
        }
      }
    };

    fetchMe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
