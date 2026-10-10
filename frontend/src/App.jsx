import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Auth from "./components/auth/Auth";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}

export default App;
