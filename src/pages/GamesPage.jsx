import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGames, addGame, updateGame, deleteGame } from "../api/games";
import GamesModal from "./GamesModal";
import css from "./gamesPage.module.css";

export default function GamesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedSystem, setSelectedSystem] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const {
    data: response = { games: [], totalPages: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "games",
      currentPage,
      selectedGenre,
      selectedSystem,
      searchQuery,
    ],
    queryFn: () =>
      fetchGames({
        page: currentPage,
        genre: selectedGenre !== "all" ? selectedGenre : "ALL",
        system: selectedSystem !== "all" ? selectedSystem : undefined,
        search: searchQuery || undefined,
      }),
  });

  const games = response?.games || [];
  const totalPages = response?.totalPages || 0;

  const addGameMutation = useMutation({
    mutationFn: addGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setIsModalOpen(false);
      setSelectedGame(null);
    },
  });

  const updateGameMutation = useMutation({
    mutationFn: updateGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
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
    if (window.confirm("Вы уверены, что хотите удалить эту игру?")) {
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

  const handleSystemChange = (e) => {
    setSelectedSystem(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (error) {
    return <div className={css.error}>Ошибка загрузки игр</div>;
  }

  return (
    <div className={css.gamesPage}>
      <div className={css.header}>
        <h1>Игры</h1>
        <button
          className={css.openModalButton}
          onClick={() => handleOpenModal()}
        >
          Добавить игру
        </button>
      </div>

      <div className={css.filters}>
        <div className={css.searchContainer}>
          <input
            type="text"
            placeholder="Поиск игр..."
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
            <option value="all">Все жанры</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="rpg">RPG</option>
            <option value="strategy">Strategy</option>
            <option value="sports">Sports</option>
            <option value="racing">Racing</option>
            <option value="puzzle">Puzzle</option>
            <option value="shooter">Shooter</option>
            <option value="simulation">Simulation</option>
            <option value="indie">Indie</option>
            <option value="arcade">Arcade</option>
            <option value="platformer">Platformer</option>
            <option value="casual">Casual</option>
            <option value="mmo">MMO</option>
            <option value="educational">Educational</option>
            <option value="card">Card</option>
            <option value="board">Board</option>
            <option value="music">Music</option>
            <option value="trivia">Trivia</option>
            <option value="fighting">Fighting</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="medical">Medical</option>
            <option value="news">News</option>
            <option value="photo-video">Photo & Video</option>
            <option value="productivity">Productivity</option>
            <option value="reference">Reference</option>
            <option value="social-networking">Social Networking</option>
            <option value="travel">Travel</option>
            <option value="utilities">Utilities</option>
            <option value="weather">Weather</option>
          </select>

          <select
            value={selectedSystem}
            onChange={handleSystemChange}
            className={css.filterSelect}
          >
            <option value="all">Все системы</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
            <option value="web">Web</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className={css.loading}>Загрузка...</div>
      ) : (
        <>
          <div className={css.gamesGrid}>
            {games.map((game) => (
              <div key={game._id} className={css.gameCard}>
                <img
                  src={game.gameImage}
                  alt={game.commonGameName}
                  className={css.gameImage}
                />
                <h3>{game.commonGameName}</h3>
                <p className={css.systemName}>{game.systemGameName}</p>
                <p className={css.genre}>{game.genre}</p>
                <p className={css.description}>{game.gameDescription}</p>
                <div className={css.gameInfo}>
                  <p>Дата релиза: {game.releaseDate}</p>
                  <p>Издатель: {game.publisher || "Не указан"}</p>
                  <p>Класс: {game.gameClass}</p>
                  {game.gameLaunchers && (
                    <p>Лаунчеры: {game.gameLaunchers.join(", ")}</p>
                  )}
                </div>
                {!game.gameVideoUrl && (
                  <div className={css.gameActions}>
                    <button
                      className={css.editButton}
                      onClick={() => handleOpenModal(game)}
                    >
                      Редактировать
                    </button>
                    <button
                      className={css.deleteButton}
                      onClick={() => handleDelete(game._id)}
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {currentPage < totalPages && (
            <button className={css.loadMoreButton} onClick={handleLoadMore}>
              Загрузить еще
            </button>
          )}
        </>
      )}

      {isModalOpen && (
        <GamesModal
          game={selectedGame}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isLoading={addGameMutation.isPending || updateGameMutation.isPending}
        />
      )}
    </div>
  );
}
