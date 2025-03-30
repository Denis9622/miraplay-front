import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../../api/games";
import styles from "./GamesSection.module.css";

const GamesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedSystem, setSelectedSystem] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: response = { games: [], totalPages: 0 }, isLoading } = useQuery(
    {
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
    }
  );

  const games = response?.games || [];

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

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div id="gamesSection" className={styles.gamesSection}>
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск игр..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterContainer}>
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className={styles.filterSelect}
          >
            <option value="all">Все жанры</option>
            <option value="ACTION">Action</option>
            <option value="RPG">RPG</option>
            <option value="RACING">Racing</option>
            <option value="SPORTS">Sports</option>
          </select>
          <select
            value={selectedSystem}
            onChange={handleSystemChange}
            className={styles.filterSelect}
          >
            <option value="all">Все платформы</option>
            <option value="WINDOWS">Windows</option>
            <option value="MAC">Mac</option>
          </select>
        </div>
      </div>

      <div className={styles.gamesGrid}>
        {games.map((game) => (
          <div key={game._id} className={styles.gameCard}>
            <img
              src={game.gameImage}
              alt={game.title}
              className={styles.gameImage}
            />
            <div className={styles.gameInfo}>
              <h3 className={styles.gameTitle}>{game.title}</h3>
              <p className={styles.gameGenre}>{game.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesSection;
