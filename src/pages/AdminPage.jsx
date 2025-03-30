import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGames, addGame, updateGame, deleteGame } from "../api/games";
import { GAME_GENRES_ARRAY } from "../constants/gameGenres";
import GameModal from "../components/GameModal/GameModal";
import css from "./AdminPage.module.css";
import { socketService } from "../api/socket";

const ITEMS_PER_PAGE = 9;

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    socketService.subscribe("popularGame", (data) => {
      if (!data || typeof data !== "object") return;
      const { commonGameName, inTop } = data;
      if (!commonGameName) return;

      setNotification(
        inTop
          ? `Гру "${commonGameName}" додано до топу!`
          : `Гру "${commonGameName}" видалено з топу!`
      );
      setTimeout(() => setNotification(null), 3000);
    });

    return () => {
      socketService.unsubscribe("popularGame");
    };
  }, []);

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
  });

  const games = response?.data?.games || [];
  const totalPages = response?.data?.totalPages || 0;

  const addGameMutation = useMutation({
    mutationFn: addGame,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      if (data && data.isLocalGame) {
        socketService.emitNewLocalGame(data);
      }
      if (data && data.inTop) {
        socketService.emitPopularGame({
          commonGameName: data.commonGameName,
          inTop: data.inTop,
        });
      }
      setIsModalOpen(false);
      setSelectedGame(null);
    },
    onError: (error) => {
      console.error("Помилка додавання гри:", error);
      alert(
        error.response?.data?.message || "Сталася помилка при додаванні гри"
      );
    },
  });

  const updateGameMutation = useMutation({
    mutationFn: updateGame,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      if (data && data.inTop) {
        socketService.emitPopularGame({
          commonGameName: data.commonGameName,
          inTop: data.inTop,
        });
      }
      setIsModalOpen(false);
      setSelectedGame(null);
    },
    onError: (error) => {
      console.error("Помилка оновлення гри:", error);
      alert(
        error.response?.data?.message || "Сталася помилка при оновленні гри"
      );
    },
  });

  const deleteGameMutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  const handleOpenModal = (game = null) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedGame) {
        await updateGameMutation.mutateAsync({
          id: selectedGame._id,
          gameData: formData,
        });
      } else {
        await addGameMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error("Помилка збереження гри:", error);
      alert(
        error.response?.data?.message || "Сталася помилка при збереженні гри"
      );
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

  if (error) {
    return <div className={css.error}>Помилка завантаження ігор</div>;
  }

  const showLoadMore = currentPage < totalPages;

  return (
    <div className={css.adminPage}>
      {notification && <div className={css.notification}>{notification}</div>}
      <div className={css.header}>
        <h1>Адміністрування ігор</h1>
        <button className={css.addButton} onClick={() => handleOpenModal()}>
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
            <option value="ALL">Всі жанри</option>
            {GAME_GENRES_ARRAY.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={css.content}>
        <div className={css.gamesSection}>
          {isLoading ? (
            <div className={css.loading}>Завантаження...</div>
          ) : (
            <>
              <div className={css.gamesTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Зображення</th>
                      <th>Назва</th>
                      <th>Системна назва</th>
                      <th>Жанр</th>
                      <th>Клас</th>
                      <th>Дата релізу</th>
                      <th>Видавець</th>
                      <th>Статус</th>
                      <th>Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map((game) => (
                      <tr key={game._id}>
                        <td>
                          <img
                            src={game.gameImage}
                            alt={game.commonGameName}
                            className={css.gameImage}
                          />
                        </td>
                        <td>{game.commonGameName}</td>
                        <td>{game.systemGameName}</td>
                        <td>
                          {GAME_GENRES_ARRAY.find((g) => g.value === game.genre)
                            ?.label || game.genre}
                        </td>
                        <td>{game.gameClass}</td>
                        <td>{game.releaseDate}</td>
                        <td>{game.publisher}</td>
                        <td>
                          {game.inTop && (
                            <span className={css.topBadge}>ТОП</span>
                          )}
                          {game.isLocalGame && (
                            <span className={css.localBadge}>ЛОКАЛЬНА</span>
                          )}
                          {!game.inTop && !game.isLocalGame && (
                            <span className={css.statusBadge}>Звичайна</span>
                          )}
                        </td>
                        <td>
                          <button
                            className={css.editButton}
                            onClick={() => handleOpenModal(game)}
                          >
                            Редагувати
                          </button>
                          <button
                            className={css.deleteButton}
                            onClick={() => handleDelete(game._id)}
                          >
                            Видалити
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {showLoadMore && (
                <button className={css.loadMoreButton} onClick={handleLoadMore}>
                  Показати ще
                </button>
              )}
            </>
          )}
        </div>
      </div>

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
    </div>
  );
}
