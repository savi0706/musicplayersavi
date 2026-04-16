import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import Login from "./Login";
import Signup from "./Signup";
import {
  closeAuthModal,
  switchAuthMode,
} from "../../redux/uiSlice";

import "../../css/auth/Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const { authModalOpen, authMode } = useSelector(
    (state) => state.ui
  );

  if (!authModalOpen) return null;

  return (
    <Modal onClose={() => dispatch(closeAuthModal())}>
      {authMode === "login" ? (
        <>
          <Login />

          {/* 🔥 LOGIN → SIGNUP BUTTON */}
          <div className="auth-footer">
            <span>Don’t have an account?</span>
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => dispatch(switchAuthMode("signup"))}
            >
              Create account
            </button>
          </div>
        </>
      ) : (
        <>
          <Signup />

          {/* 🔥 SIGNUP → LOGIN BUTTON */}
          <div className="auth-footer">
            <span>Already have an account?</span>
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => dispatch(switchAuthMode("login"))}
            >
              Login
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Auth;

