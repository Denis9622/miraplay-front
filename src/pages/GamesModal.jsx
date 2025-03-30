import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addGame, updateGame } from "../api/games";
import styles from "./gamesModal.module.css";

const GamesModal = ({ game, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    commonGameName: game?.commonGameName || "",
    systemGameName: game?.systemGameName || "",
    gameDescription: game?.gameDescription || "",
    gameImage: game?.gameImage || "",
    gameClass: game?.gameClass || "",
    genre: game?.genre || "ALL",
    inTop: game?.inTop || false,
    releaseDate: game?.releaseDate || "",
    publisher: game?.publisher || "",
    gameLaunchers: game?.gameLaunchers || [],
    gameVideoUrl: game?.gameVideoUrl || "",
    gameImages: game?.gameImages || [],
    gameBoxArt: game?.gameBoxArt || "",
    gameLogo: game?.gameLogo || "",
    gameHero: game?.gameHero || "",
    isLocalGame: game?.isLocalGame || true,
  });

  useEffect(() => {
    if (game) {
      setFormData({
        commonGameName: game.commonGameName || "",
        systemGameName: game.systemGameName || "",
        gameDescription: game.gameDescription || "",
        gameImage: game.gameImage || "",
        gameClass: game.gameClass || "",
        genre: game.genre || "ALL",
        inTop: game.inTop || false,
        releaseDate: game.releaseDate || "",
        publisher: game.publisher || "",
        gameLaunchers: game.gameLaunchers || [],
        gameVideoUrl: game.gameVideoUrl || "",
        gameImages: game.gameImages || [],
        gameBoxArt: game.gameBoxArt || "",
        gameLogo: game.gameLogo || "",
        gameHero: game.gameHero || "",
        isLocalGame: game.isLocalGame || true,
      });
    }
  }, [game]);

  const genres = [
    "ALL",
    "FREE",
    "MOBA",
    "SHOOTERS",
    "LAUNCHERS",
    "MMORPG",
    "STRATEGY",
    "FIGHTING",
    "RACING",
    "SURVIVAL",
    "ONLINE",
  ];

  const gameClasses = ["STANDART", "PREMIUM", "VIP"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Валидация обязательных полей
      if (
        !formData.commonGameName ||
        !formData.systemGameName ||
        !formData.genre ||
        !formData.releaseDate ||
        !formData.gameClass
      ) {
        alert("Пожалуйста, заполните все обязательные поля");
        return;
      }

      // Валидация формата даты
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formData.releaseDate)) {
        alert("Дата релиза должна быть в формате DD.MM.YYYY");
        return;
      }

      // Подготовка данных для отправки
      const gameDataToSend = {
        commonGameName: formData.commonGameName.trim(),
        systemGameName: formData.systemGameName.trim(),
        gameDescription: formData.gameDescription?.trim() || "",
        gameImage: formData.gameImage?.trim() || "",
        gameClass: formData.gameClass,
        genre: formData.genre,
        inTop: formData.inTop,
        releaseDate: formData.releaseDate.trim(),
        publisher: formData.publisher?.trim() || "",
        gameLaunchers: Array.isArray(formData.gameLaunchers)
          ? formData.gameLaunchers
          : [],
        gameVideoUrl: formData.gameVideoUrl?.trim() || "",
        gameImages: Array.isArray(formData.gameImages)
          ? formData.gameImages
          : [],
        gameBoxArt: formData.gameBoxArt?.trim() || "",
        gameLogo: formData.gameLogo?.trim() || "",
        gameHero: formData.gameHero?.trim() || "",
        isLocalGame: true,
      };

      if (game) {
        await updateGame({ id: game._id, gameData: gameDataToSend });
      } else {
        await addGame(gameDataToSend);
      }

      queryClient.invalidateQueries({ queryKey: ["games"] });
      onClose();
    } catch (error) {
      console.error("Ошибка обновления игры:", error);
      if (error.response) {
        console.error("Ответ сервера:", error.response.data);
        alert(
          error.response.data.message || "Произошла ошибка при сохранении игры"
        );
      } else {
        alert("Произошла ошибка при сохранении игры");
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg className={styles.iconx}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <h2>{game ? "Редактировать игру" : "Добавить новую игру"}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.leftColumn}>
            <input
              type="text"
              name="commonGameName"
              placeholder="Название игры"
              value={formData.commonGameName}
              onChange={handleChange}
              required
              className={styles.inputtext}
            />
            <input
              type="text"
              name="systemGameName"
              placeholder="Системное название"
              value={formData.systemGameName}
              onChange={handleChange}
              required
              className={styles.inputtext}
            />
            <input
              type="text"
              name="gameImage"
              placeholder="URL главного изображения"
              value={formData.gameImage}
              onChange={handleChange}
              className={styles.inputtext}
            />
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              name="gameClass"
              value={formData.gameClass}
              onChange={handleChange}
              required
            >
              <option value="">Выберите класс игры</option>
              {gameClasses.map((gameClass) => (
                <option key={gameClass} value={gameClass}>
                  {gameClass}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="releaseDate"
              placeholder="Дата релиза (DD.MM.YYYY)"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              pattern="\d{2}\.\d{2}\.\d{4}"
            />
            <input
              type="text"
              name="publisher"
              placeholder="Издатель"
              value={formData.publisher}
              onChange={handleChange}
              className={styles.inputtext}
            />
            <input
              type="text"
              name="gameVideoUrl"
              placeholder="URL видео"
              value={formData.gameVideoUrl}
              onChange={handleChange}
              className={styles.inputtext}
            />
            <input
              type="text"
              name="gameBoxArt"
              placeholder="URL обложки игры"
              value={formData.gameBoxArt}
              onChange={handleChange}
              className={styles.inputtext}
            />
            <input
              type="text"
              name="gameLogo"
              placeholder="URL логотипа"
              value={formData.gameLogo}
              onChange={handleChange}
              className={styles.inputtext}
            />
            <input
              type="text"
              name="gameHero"
              placeholder="URL баннера"
              value={formData.gameHero}
              onChange={handleChange}
              className={styles.inputtext}
            />
          </div>
          <div className={styles.rightColumn}>
            <textarea
              name="gameDescription"
              placeholder="Описание игры"
              value={formData.gameDescription}
              onChange={handleChange}
              className={styles.textarea}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="inTop"
                checked={formData.inTop}
                onChange={handleChange}
              />
              В топе
            </label>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton} onClick={handleSubmit}>
            {game ? "Сохранить" : "Добавить"}
          </button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesModal;
