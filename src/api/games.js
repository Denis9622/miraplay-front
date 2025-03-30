import api from "../redux/axiosInstance";
import axios from "../redux/axiosInstance";

export const fetchGames = async ({
  page = 1,
  limit = 9,
  genre,
  search,
  sort,
  order,
  inTop,
}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (genre) {
      params.append("genre", genre);
    }

    if (search) {
      params.append("search", search);
    }

    if (sort) {
      params.append("sort", sort);
    }

    if (order) {
      params.append("order", order);
    }

    if (inTop !== undefined) {
      params.append("inTop", String(inTop));
    }

    const { data } = await axios.get(`/games?${params.toString()}`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "If-None-Match": "",
      },
    });

    return data;
  } catch (error) {
    if (error.response?.status === 304) {
      // Если получаем 304, делаем повторный запрос без кэша
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (genre) {
        params.append("genre", genre);
      }

      if (search) {
        params.append("search", search);
      }

      if (sort) {
        params.append("sort", sort);
      }

      if (order) {
        params.append("order", order);
      }

      if (inTop !== undefined) {
        params.append("inTop", String(inTop));
      }

      const { data } = await axios.get(`/games?${params.toString()}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "If-None-Match": "",
        },
      });
      return data;
    }
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
