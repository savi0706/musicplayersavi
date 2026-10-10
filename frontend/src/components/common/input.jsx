import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../../css/auth/Input.css";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-wrapper">
      <label>{label}</label>

      <div className="input-container">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="input-field"
        />

        {type === "password" && (
          <button
            type="button"
            className="input-eye-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
