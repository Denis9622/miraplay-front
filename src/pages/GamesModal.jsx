import { useState, useEffect } from "react";
import styles from "./gamesModal.module.css";

const GamesModal = ({ game, onClose, onSubmit, isLoading, genres }) => {
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
        alert("Будь ласка, заповніть всі обов'язкові поля");
        return;
      }

      // Валидация формата даты
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formData.releaseDate)) {
        alert("Дата релізу має бути у форматі DD.MM.YYYY");
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
        isLocalGame: formData.isLocalGame,
      };

      // Вызываем onSubmit из пропсов
      await onSubmit(gameDataToSend);
    } catch (error) {
      console.error("Помилка оновлення гри:", error);
      if (error.response) {
        console.error("Відповідь сервера:", error.response.data);
        alert(
          error.response.data.message || "Сталася помилка при збереженні гри"
        );
      } else {
        alert("Сталася помилка при збереженні гри");
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
        <h2>{game ? "Редагувати гру" : "Додати нову гру"}</h2>
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
                <option key={genre.value} value={genre.value}>
                  {genre.label}
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
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="inTop"
                  checked={formData.inTop}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                В топі
              </label>
            </div>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isLocalGame"
                  checked={formData.isLocalGame}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                Локальна гра
              </label>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <textarea
              name="gameDescription"
              placeholder="Описание игры"
              value={formData.gameDescription}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.primaryButton}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Збереження..." : game ? "Зберегти" : "Додати"}
          </button>
          <button type="button" onClick={onClose} disabled={isLoading}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesModal;
