import api from "../redux/axiosInstance";

export const fetchGames = async ({ genre = "ALL", page = 1, limit = 9 }) => {
  try {
    const response = await api.get("/games", {
      params: { genre, page, limit },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Ошибка получения игр:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addGame = async (gameData) => {
  try {
    const response = await api.post("/games", gameData);
    return response.data.data.game;
  } catch (error) {
    console.error(
      "Ошибка добавления игры:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateGame = async ({ id, gameData }) => {
  try {
    const response = await api.patch(`/games/${id}`, gameData);
    return response.data.data.game;
  } catch (error) {
    console.error(
      "Ошибка обновления игры:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteGame = async (gameId) => {
  try {
    await api.delete(`/games/${gameId}`);
    return gameId;
  } catch (error) {
    console.error(
      "Ошибка удаления игры:",
      error.response?.data || error.message
    );
    throw error;
  }
};
