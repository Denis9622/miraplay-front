import PropTypes from "prop-types";
import { GAME_GENRES } from "../../constants/gameGenres";
import css from "./GameInfoPopUp.module.css";

const GameInfoPopUp = ({ game, onClose, onAuthClick }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={css.content}>
          <div className={css.header}>
            <img
              src={game.gameImage}
              alt={game.commonGameName}
              className={css.gameImage}
            />
            <div className={css.titleContainer}>
              <h2>{game.commonGameName}</h2>
              <p className={css.genre}>{GAME_GENRES[game.genre]}</p>
            </div>
          </div>

          <div className={css.details}>
            <div className={css.section}>
              <h3>Опис</h3>
              <p>{game.gameDescription}</p>
            </div>

            <div className={css.section}>
              <h3>Інформація</h3>
              <ul className={css.infoList}>
                <li>
                  <span>Системна назва:</span> {game.systemGameName}
                </li>
                <li>
                  <span>Клас:</span> {game.gameClass}
                </li>
                <li>
                  <span>Дата релізу:</span> {game.releaseDate}
                </li>
                <li>
                  <span>Видавець:</span> {game.publisher}
                </li>
              </ul>
            </div>

            {game.gameLaunchers && game.gameLaunchers.length > 0 && (
              <div className={css.section}>
                <h3>Лаунчери</h3>
                <ul className={css.launchersList}>
                  {game.gameLaunchers.map((launcher, index) => (
                    <li key={index}>{launcher}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={css.actions}>
            <button className={css.playButton} onClick={onAuthClick}>
              Грати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

GameInfoPopUp.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    commonGameName: PropTypes.string.isRequired,
    systemGameName: PropTypes.string.isRequired,
    gameDescription: PropTypes.string,
    gameImage: PropTypes.string,
    genre: PropTypes.oneOf(Object.keys(GAME_GENRES)).isRequired,
    gameClass: PropTypes.string,
    releaseDate: PropTypes.string,
    publisher: PropTypes.string,
    gameLaunchers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onAuthClick: PropTypes.func.isRequired,
};

export default GameInfoPopUp;
