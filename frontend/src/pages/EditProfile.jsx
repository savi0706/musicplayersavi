import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CiUser, CiCamera } from "react-icons/ci";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { setUser } from "../redux/authSlice";
import { openAuthModal } from "../redux/uiSlice";
import "../css/auth/EditProfile.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarData, setAvatarData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar || "");
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatarData(reader.result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Name cannot be empty");
      return;
    }

    if (!trimmedEmail) {
      setError("Email cannot be empty");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    const authToken = token || localStorage.getItem("token");
    if (!authToken) {
      setError("You must be logged in to update your profile");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

      const payload = {
        name: trimmedName,
        email: trimmedEmail,
      };

      if (avatarData) {
        payload.avatar = avatarData;
      }

      const res = await axios.put(`${baseUrl}/api/auth/edit-profile`, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.data?.user) {
        dispatch(setUser({ user: res.data.user }));
        setSuccess("Profile updated successfully!");
        setAvatarData("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated && !token) {
    return (
      <div className="min-h-screen bg-[#0d0714] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#160c24] border border-white/10 rounded-2xl p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Authentication Required</h2>
          <p className="text-gray-300 text-sm mb-6">
            Please log in to your account to view and edit your profile.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-purple-500/30"
              onClick={() => {
                navigate("/");
                dispatch(openAuthModal("login"));
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0714] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#160c24] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <AiOutlineArrowLeft size={16} />
          <span>Back to Music Player</span>
        </button>

        <div className="editprofile-wrapper">
          <h1 className="editprofile-title">Edit Profile</h1>
          <p>Update your display name, email, or avatar picture.</p>

          <form className="editprofile-form" onSubmit={handleSubmit}>
            {/* Avatar container */}
            <div className="profile-image-container">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={name || "Avatar"}
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">
                  <CiUser size={48} />
                </div>
              )}

              <label
                htmlFor="avatar-upload-input"
                className="image-upload-icon"
                title="Change Avatar"
              >
                <CiCamera size={18} color="#ffffff" />
                <input
                  id="avatar-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            {error && <div className="editprofile-error">{error}</div>}

            {success && (
              <div className="px-4 py-3 rounded-xl text-sm font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/40">
                {success}
              </div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-name" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Full Name
              </label>
              <input
                id="edit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-email" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Email Address
              </label>
              <input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Password Reset Navigation */}
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-gray-400">Need to change your password?</span>
              <Link
                to="/forgot-password"
                className="text-purple-400 hover:text-purple-300 font-semibold underline"
              >
                Reset password
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="editprofile-actions">
              <button
                type="button"
                className="editprofile-btn-cancel"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="editprofile-btn-submit"
                disabled={loading}
              >
                <span>{loading ? "Saving Changes..." : "Save Profile"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
