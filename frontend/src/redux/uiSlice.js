import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    authModalOpen: false,
    authMode: "login", // login | signup
  },
  reducers: {
    openAuthModal: (state, action) => {
      state.authModalOpen = true;
      state.authMode = action.payload || "login";
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
    },
    switchAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  switchAuthMode,
} = uiSlice.actions;

export default uiSlice.reducer;
