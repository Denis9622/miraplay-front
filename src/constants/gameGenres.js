export const GAME_GENRES = {
  ALL: "Всі",
  FREE: "БЕЗКОШТОВНО",
  MOBA: "MOBA",
  SHOOTERS: "ШУТЕРИ",
  LAUNCHERS: "ЛАУНЧЕРИ",
  MMORPG: "MMORPG",
  STRATEGY: "СТРАТЕГІЇ",
  FIGHTING: "ФАЙТИНГИ",
  RACING: "ГОНКИ",
  SURVIVAL: "ВИЖИВАННЯ",
  ONLINE: "ОНЛАЙН",
};

export const GAME_GENRES_ARRAY = Object.entries(GAME_GENRES).map(
  ([value, label]) => ({
    value,
    label,
  })
);
