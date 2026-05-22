// js/database.js

export const AssetConfig = {
  mapsPath: "assets/maps/",
  cardsPath: "assets/cards/",
  boardsPath: "assets/boards/",
};

export const BoardAssets = {
  CHANCELLOR: "player_board_chancellor.jpg",
  CLOCKWORK_PRINCE: "player_board_clockwork.jpg", // Le vrai plateau de l'Automa
  EXILE_RED: "player_board_red_exile.jpg",
  EXILE_YELLOW: "player_board_yellow_exile.jpg",
  // ... (les autres plateaux restent mappés ici)
};

// Types de jetons de comportement du Prince (issus de bot_tokens_front.jpg)
export const BotTraits = {
  AGGRESSIVE: {
    id: "t_01",
    name: "Agressif",
    effect: "Priorise l'attaque des armées du joueur",
    icon: "⚔️",
  },
  HOARDER: {
    id: "t_02",
    name: "Thésauriseur",
    effect: "Priorise la récupération des Reliques du Reliquaire",
    icon: "💎",
  },
  EXPANSIONIST: {
    id: "t_03",
    name: "Expansionniste",
    effect: "Recrute en priorité sur les sites vides",
    icon: "🏰",
  },
  SCHEMER: {
    id: "t_04",
    name: "Complotiste",
    effect: "Gagne +1 Secret lors des phases de repos",
    icon: "👁️",
  },
};
