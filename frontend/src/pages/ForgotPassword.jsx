import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { openAuthModal } from "../redux/uiSlice";
import "../css/auth/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

      // Attempt sending request to backend
      await axios.post(`${baseUrl}/api/auth/forgot-password`, {
        email: trimmedEmail,
      });

      // Security requirement: Regardless of whether backend confirms or not,
      // present a uniform generic message so attacker cannot enumerate existing emails.
      setSubmittedMessage(
        "If an account with that email address exists, password reset instructions have been sent."
      );
    } catch (err) {
      // If backend returns 404 (user not found), do not leak that the email doesn't exist.
      if (err.response?.status === 404) {
        setSubmittedMessage(
          "If an account with that email address exists, password reset instructions have been sent."
        );
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid email address");
      } else {
        setError(
          "Unable to process request at this time. Please check your connection and try again."
        );
      }
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

        <div className="forgot-wrapper">
          <h1 className="forgot-title">Forgot Password</h1>
          <p className="forgot-subtitle">
            Enter your registered email address and we will send you instructions to reset your password.
          </p>

          {error && <div className="forgot-error">{error}</div>}

          {submittedMessage ? (
            <div className="flex flex-col gap-5">
              <div className="forgot-success">{submittedMessage}</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Please check your inbox (and spam folder) for the reset link. The reset link expires in 10 minutes.
              </p>
              <div className="forgot-footer">
                <button
                  type="button"
                  className="forgot-link-btn"
                  onClick={() => {
                    navigate("/");
                    dispatch(openAuthModal("login"));
                  }}
                >
                  Return to Login
                </button>
                <button
                  type="button"
                  className="forgot-link-btn"
                  onClick={() => {
                    setSubmittedMessage(null);
                    setEmail("");
                  }}
                >
                  Try another email
                </button>
              </div>
            </div>
          ) : (
            <form className="forgot-form" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="forgot-email"
                  className="text-xs font-semibold uppercase tracking-wider text-gray-300"
                >
                  Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                className="forgot-submit-btn"
                disabled={loading}
              >
                <span>{loading ? "Sending..." : "Send Reset Instructions"}</span>
              </button>

              <div className="forgot-footer">
                <button
                  type="button"
                  className="forgot-link-btn"
                  onClick={() => {
                    navigate("/");
                    dispatch(openAuthModal("login"));
                  }}
                >
                  Remember password? Log in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
