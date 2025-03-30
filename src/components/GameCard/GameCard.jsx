import PropTypes from "prop-types";
import { GAME_GENRES } from "../../constants/gameGenres";
import styles from "./GameCard.module.css";

const GameCard = ({ game, onPlayClick, onDetailsClick }) => {
  return (
    <div className={styles.gameCard}>
      <img
        src={game.gameImage}
        alt={game.commonGameName}
        className={styles.gameImage}
      />
      <div className={styles.bottomSide}>
        <h4 className={styles.title}>{game.commonGameName}</h4>
        <p className={styles.description}>{game.gameDescription}</p>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={() => onPlayClick(game)}>
            Грати
          </button>
          <button className={styles.btn} onClick={() => onDetailsClick(game)}>
            Деталі
          </button>
        </div>
      </div>
      <div className={styles.genre}>
        {game.inTop && <p className={styles.topItem}>TOP</p>}
        <p className={styles.genreItem}>{GAME_GENRES[game.genre]}</p>
      </div>
      {game.genre === "FREE" && (
        <p className={styles.freeItem}>{GAME_GENRES.FREE}</p>
      )}
      {game.gameLaunchers && game.gameLaunchers.length > 0 && (
        <ul className={styles.launchersIconsList}>
         
        </ul>
      )}
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    commonGameName: PropTypes.string.isRequired,
    gameDescription: PropTypes.string,
    gameImage: PropTypes.string,
    genre: PropTypes.oneOf(Object.keys(GAME_GENRES)).isRequired,
    inTop: PropTypes.bool,
    gameLaunchers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
};

export default GameCard;
