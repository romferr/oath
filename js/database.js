// js/database.js

export const AssetConfig = {
  mapsPath: "assets/maps/",
  cardsPath: "assets/cards/",
  boardsPath: "assets/boards/",
  // On isole le sous-dossier du Prince en respectant la casse exacte
  princePath: "assets/boards/clockwork_Prince/",
};

export const BoardAssets = {
  // Plateaux joueurs (à la racine de assets/boards/)
  CHANCELLOR: "player_board_chancellor.jpg",
  EXILE_BLACK: "player_board_black_exile.jpg",
  CITIZEN_BLACK: "player_board_black_citizen.jpg",
  EXILE_BLUE: "player_board_blue_exile.jpg",
  CITIZEN_BLUE: "player_board_blue_citizen.jpg",
  EXILE_RED: "player_board_red_exile.jpg",
  CITIZEN_RED: "player_board_red_citizen.jpg",
  EXILE_WHITE: "player_board_white_exile.jpg",
  CITIZEN_WHITE: "player_board_white_citizen.jpg",
  EXILE_YELLOW: "player_board_yellow_exile.jpg",
  CITIZEN_YELLOW: "player_board_yellow_citizen.jpg",

  // Éléments du Prince (dans assets/boards/clockwork_Prince/)
  CLOCKWORK_PRINCE: "player_board_clockwork.jpg",
  RELIQUARY: "reliquary_back.jpg",
  MINDMAP: "mindmap.jpg",
  TOKENS: "bot_tokens_front.jpg",
  RULES_1: "botrules_front_1.jpg",
  RULES_2: "botrules_front_2.jpg",
};

// ... Le reste de ta CardsDatabase reste identique
