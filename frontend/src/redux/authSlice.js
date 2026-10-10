import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },

    setUser: (state, action) => {
      state.user = {
        ...(action.payload.user || action.payload),
        favourites:
          action.payload.user?.favourites || action.payload?.favourites || [],
      };

      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    addFavourite: (state, action) => {
      if (!state.user) return;

      if (!state.user.favourites) {
        state.user.favourites = [];
      }

      const song = action.payload;

      const exists = state.user.favourites.some(
        (s) => String(s.id) === String(song.id)
      );

      if (!exists) {
        state.user.favourites.push(song);
      }
    },

    removeFavourite: (state, action) => {
      if (!state.user?.favourites) return;

      const targetId = String(action.payload);
      state.user.favourites = state.user.favourites.filter(
        (s) => String(s.id) !== targetId
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  logout,
  addFavourite,
  removeFavourite,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;

