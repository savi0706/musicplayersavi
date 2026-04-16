import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSettings } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";

import { logout } from "../../redux/authSlice";
import { openAuthModal } from "../../redux/uiSlice";

import logo from "../../assets/wsa-logo.jpg";
import "../../css/sidemenu/SideMenu.css";

const SideMenu = ({ setView, view }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const getNavBtnClass = (item) =>
    `sidemenu-nav-btn ${view === item ? "active" : ""}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <aside className="sidemenu-root">
      {/* Logo */}
      <div className="sidemenu-header">
        <img src={logo} alt="wsa-logo" className="sidemenu-logo-img" />
        <h2 className="sidemenu-logo-title">Synthesia</h2>
      </div>

      {/* Navigation */}
      <nav className="sidemenu-nav">
        <ul className="sidemenu-nav-list">
          <li>
            <button
              className={getNavBtnClass("home")}
              onClick={() => setView("home")}
            >
              <AiOutlineHome size={18} />
              <span>Home</span>
            </button>
          </li>

          <li>
            <button
              className={getNavBtnClass("search")}
              onClick={() => setView("search")}
            >
              <AiOutlineSearch size={18} />
              <span>Search</span>
            </button>
          </li>

          <li>
            <button
              className={getNavBtnClass("favourite")}
              onClick={() => setView("favourite")}
            >
              <AiOutlineHeart size={18} />
              <span>Favourite</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex-1" />

      {/* Profile Section */}
      <div className="sidemenu-profile-row">
        <div className="profile-placeholder">
          <CiUser size={30} />
        </div>

        <div className="sidemenu-username-wrapper">
          {isAuthenticated ? (
            <>
              <div className="sidemenu-username">
                {user?.name || "User"}
              </div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => dispatch(openAuthModal("login"))}
            >
              Login / Signup
            </button>
          )}
        </div>

        <button className="sidemenu-settings-btn">
          <IoIosSettings size={20} />
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
