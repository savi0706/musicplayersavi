import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { openAuthModal } from "../redux/uiSlice";
import "../css/auth/ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing from the link");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

      // Securely submit token in URL without ever storing in localStorage
      const res = await axios.post(
        `${baseUrl}/api/auth/reset-password/${encodeURIComponent(token)}`,
        { password }
      );

      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. The link may have expired or is invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0714] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#160c24] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <AiOutlineArrowLeft size={16} />
          <span>Back to Music Player</span>
        </button>

        <div className="reset-wrapper">
          <h1 className="reset-title">Reset Password</h1>
          <p className="reset-subtitle">
            Enter a new password for your Synthesia account.
          </p>

          {error && <div className="reset-error">{error}</div>}

          {success ? (
            <div className="flex flex-col gap-5">
              <div className="reset-success">
                Password reset successful! You can now log in with your new password.
              </div>
              <button
                type="button"
                className="reset-submit-btn"
                onClick={() => {
                  navigate("/");
                  dispatch(openAuthModal("login"));
                }}
              >
                <span>Proceed to Login</span>
              </button>
            </div>
          ) : (
            <form className="reset-form" onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="new-password"
                  className="text-xs font-semibold uppercase tracking-wider text-gray-300"
                >
                  New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="confirm-password"
                  className="text-xs font-semibold uppercase tracking-wider text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="reset-submit-btn"
                disabled={loading}
              >
                <span>{loading ? "Resetting..." : "Reset Password"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
