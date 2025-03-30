import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    addGame: (state, action) => {
      state.games.push(action.payload);
    },
    updateGame: (state, action) => {
      const index = state.games.findIndex(
        (game) => game._id === action.payload._id
      );
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    deleteGame: (state, action) => {
      state.games = state.games.filter((game) => game._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setGames,
  addGame,
  updateGame,
  deleteGame,
  setLoading,
  setError,
  setTotalPages,
  setCurrentPage,
} = gamesSlice.actions;

export default gamesSlice.reducer;
