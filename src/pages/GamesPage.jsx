import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchGames, addGame, updateGame, deleteGame } from "../api/games";
import { GAME_GENRES_ARRAY } from "../constants/gameGenres";
import GameCard from "../components/GameCard/GameCard";
import GameInfoPopUp from "../components/GameInfoPopUp/GameInfoPopUp";
import GameModal from "../components/GameModal/GameModal";
import GameNotification from "../components/GameNotification/GameNotification";
import { socketService } from "../api/socket";
import css from "./gamesPage.module.css";

const ITEMS_PER_PAGE = 9;

export default function GamesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGameInfoOpen, setIsGameInfoOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games", currentPage, selectedGenre, searchQuery],
    queryFn: () =>
      fetchGames({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        genre: selectedGenre,
        search: searchQuery || undefined,
      }),
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
  });

  const games = response?.data?.games || [];
  const totalPages = response?.data?.totalPages || 0;

  const addGameMutation = useMutation({
    mutationFn: addGame,
    onSuccess: (newGame) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      // Если это локальная игра, отправляем уведомление
      if (newGame.isLocalGame) {
        socketService.socket?.emit("newLocalGame", {
          game: newGame,
          message: `Додано нову локальну гру: "${newGame.commonGameName}"`,
        });
      }
      setIsModalOpen(false);
      setSelectedGame(null);
    },
  });

  const updateGameMutation = useMutation({
    mutationFn: updateGame,
    onSuccess: (updatedGame) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      // Если игра добавлена в топ, отправляем уведомление
      if (updatedGame.inTop) {
        socketService.socket?.emit("popularGame", {
          game: updatedGame,
          message: `Игра "${updatedGame.commonGameName}" стала популярной!`,
        });
      }
      setIsModalOpen(false);
      setSelectedGame(null);
    },
  });

  const deleteGameMutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  useEffect(() => {
    // Инициализируем WebSocket соединение
    socketService.connect();

    // Подписываемся на события WebSocket
    socketService.subscribe("newGame", (data) => {
      console.log("🎮 [SOCKET] Получено событие newGame:", data);
      // Принудительно обновляем данные
      queryClient.invalidateQueries({
        queryKey: ["games"],
        exact: true,
        refetchType: "active",
      });
      setNotification({
        message: data.message,
        type: "newGame",
      });
    });

    socketService.subscribe("popularGame", (data) => {
      console.log("🎮 [SOCKET] Получено событие popularGame:", data);
      // Принудительно обновляем данные
      queryClient.invalidateQueries({
        queryKey: ["games"],
        exact: true,
        refetchType: "active",
      });
      setNotification({
        message: `🎯 ${data.game.commonGameName} тепер у топі!`,
        type: "popularGame",
      });
    });

    socketService.subscribe("newLocalGame", (data) => {
      console.log("🎮 [SOCKET] Получено событие newLocalGame:", data);
      // Принудительно обновляем данные
      queryClient.invalidateQueries({
        queryKey: ["games"],
        exact: true,
        refetchType: "active",
      });
      setNotification({
        message: `🎮 ${data.message}`,
        type: "newLocalGame",
      });
    });

    // Очистка подписок при размонтировании компонента
    return () => {
      socketService.unsubscribe("newGame");
      socketService.unsubscribe("popularGame");
      socketService.unsubscribe("newLocalGame");
      socketService.disconnect();
    };
  }, [queryClient]);

  const handleOpenModal = (game = null) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const handleSubmit = async (formData) => {
    if (selectedGame) {
      await updateGameMutation.mutateAsync({
        id: selectedGame._id,
        ...formData,
      });
    } else {
      await addGameMutation.mutateAsync(formData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю гру?")) {
      await deleteGameMutation.mutateAsync(id);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePlayClick = () => {
    if (!isAuthenticated) {
      navigate("/");
    }
    // Здесь можно добавить логику для запуска игры
  };

  const handleDetailsClick = (game) => {
    setSelectedGame(game);
    setIsGameInfoOpen(true);
  };

  const handleGameInfoClose = () => {
    setIsGameInfoOpen(false);
    setSelectedGame(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  if (error) {
    return <div className={css.error}>Помилка завантаження ігор</div>;
  }

  const showLoadMore = currentPage < totalPages;

  return (
    <div className={css.gamesPage}>
      {notification && (
        <GameNotification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
      <div className={css.header}>
        <h1>Ігри</h1>
        <button
          className={css.openModalButton}
          onClick={() => handleOpenModal()}
        >
          Додати гру
        </button>
      </div>

      <div className={css.filters}>
        <div className={css.searchContainer}>
          <input
            type="text"
            placeholder="Пошук ігор..."
            value={searchQuery}
            onChange={handleSearch}
            className={css.searchInput}
          />
        </div>
        <div className={css.filterContainer}>
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className={css.filterSelect}
          >
            {GAME_GENRES_ARRAY.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className={css.loading}>Завантаження...</div>
      ) : (
        <>
          <div className={css.gamesGrid}>
            {games.map((game) => (
              <GameCard
                key={game._id}
                game={game}
                onPlayClick={handlePlayClick}
                onDetailsClick={handleDetailsClick}
                onEdit={() => handleOpenModal(game)}
                onDelete={() => handleDelete(game._id)}
              />
            ))}
          </div>

          {showLoadMore && (
            <button className={css.loadMoreButton} onClick={handleLoadMore}>
              Показати ще
            </button>
          )}
        </>
      )}

      {isModalOpen && (
        <GameModal
          isOpen={isModalOpen}
          game={selectedGame}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isLoading={addGameMutation.isPending || updateGameMutation.isPending}
          genres={GAME_GENRES_ARRAY}
        />
      )}

      {isGameInfoOpen && selectedGame && (
        <GameInfoPopUp
          game={selectedGame}
          onClose={handleGameInfoClose}
          onAuthClick={() => navigate("/")}
        />
      )}
    </div>
  );
}
