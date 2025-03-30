import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addGame, updateGame } from "../../redux/games/gamesOperations";
import styles from "./GameModal.module.css";

const GameModal = ({ isOpen, onClose, game = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: game ? game.name : "",
    genre: game ? game.genre : "",
    description: game ? game.description : "",
    title: game ? game.title : "",
  });

  useEffect(() => {
    if (game) {
      setFormData(game);
    }
  }, [game]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (game) {
        await dispatch(updateGame({ id: game._id, gameData: formData }));
      } else {
        await dispatch(addGame(formData));
      }
      onClose();
    } catch (error) {
      console.error("Error saving game:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg className={styles.iconx}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <h2>{game ? "Edit Game" : "Add a new game"}</h2>
        <form className={styles.form}>
          <div className={styles.leftColumn}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.inputtext}
            />
            <input
              type="text"
              name="name"
              placeholder="Game Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.inputtext}
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.rightColumn}>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton} onClick={handleSubmit}>
            {game ? "Save" : "Add"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
