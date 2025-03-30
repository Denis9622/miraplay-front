import { createAsyncThunk } from "@reduxjs/toolkit";
import { setGames, setLoading, setError } from "./gamesSlice";
import {
  fetchGames as apiFetchGames,
  addGame as apiAddGame,
  updateGame as apiUpdateGame,
  deleteGame as apiDeleteGame,
} from "../../api/games";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ page = 1, limit = 9, genre, search }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const data = await apiFetchGames({ page, limit, genre, search });
      dispatch(setGames(data));
      return data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Ошибка загрузки игр")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createGame = createAsyncThunk(
  "games/createGame",
  async (gameData, { rejectWithValue }) => {
    try {
      const game = await apiAddGame(gameData);
      return game;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка создания игры"
      );
    }
  }
);

export const updateGameById = createAsyncThunk(
  "games/updateGame",
  async ({ id, gameData }, { rejectWithValue }) => {
    try {
      const game = await apiUpdateGame({ id, gameData });
      return game;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка обновления игры"
      );
    }
  }
);

export const deleteGameById = createAsyncThunk(
  "games/deleteGame",
  async (id, { rejectWithValue }) => {
    try {
      await apiDeleteGame(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка удаления игры"
      );
    }
  }
);
