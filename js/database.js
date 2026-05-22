// js/database.js

export const AssetConfig = {
  mapsPath: "assets/maps/",
  cardsPath: "assets/cards/",
  landsPath: "assets/lands/", // Nouveau chemin pour les planches de sites
  boardsPath: "assets/boards/",
  princePath: "assets/boards/clockwork_Prince/",
};

export const Suits = {
  ORDER: { name: "Ordre", icon: "🛡️", color: "text-blue-400" },
  ARCANE: { name: "Arcane", icon: "🔮", color: "text-purple-400" },
  DISCORD: { name: "Discorde", icon: "🔥", color: "text-red-400" },
  HEARTH: { name: "Foyer", icon: "🏠", color: "text-amber-600" },
  NOMAD: { name: "Nomade", icon: "🧭", color: "text-yellow-500" },
  BEAST: { name: "Bête", icon: "🐾", color: "text-emerald-500" },
};

export const BoardAssets = {
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

  CLOCKWORK_PRINCE: "player_board_clockwork.jpg",
  RELIQUARY: "reliquary_back.jpg",
  MINDMAP: "mindmap.jpg",
  TOKENS: "bot_tokens_front.jpg",
  RULES_1: "botrules_front_1.jpg",
  RULES_2: "botrules_front_2.jpg",
};

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

// --- BASE DE DONNÉES DES CARTES D'HABITANTS ---
const rawDatabaseInput = [
  { id: 1, name: "Wrestlers", suit: "ORDER" },
  { id: 2, name: "Battle Honors", suit: "ORDER" },
  { id: 3, name: "Bear Traps", suit: "ORDER" },
  { id: 4, name: "Longbows", suit: "ORDER" },
  { id: 5, name: "Keep", suit: "ORDER" },
  { id: 6, name: "Pressgangs", suit: "ORDER" },
  { id: 7, name: "Garrison", suit: "ORDER" },
  { id: 8, name: "Scouts", suit: "ORDER" },
  { id: 9, name: "Alchemist", suit: "ARCANE" },
  { id: 10, name: "Martial Culture", suit: "ORDER" },
  { id: 11, name: "Errand Boy", suit: "DISCORD" },
  { id: 12, name: "Mercenaries", suit: "DISCORD" },
  { id: 13, name: "Tinker's Fair", suit: "HEARTH" },
  { id: 14, name: "Rain Boots", suit: "NOMAD" },
  { id: 15, name: "A Small Favor", suit: "DISCORD" },
];

export const CardsDatabase = {};
rawDatabaseInput.forEach((card, index) => {
  const sheetNumber = Math.floor(index / 20) + 1;
  const localIndex = index % 20;
  const cardIdStr = `c_${String(card.id).padStart(3, "0")}`;

  CardsDatabase[cardIdStr] = {
    id: card.id,
    title: card.name,
    suit: card.suit,
    sprite: {
      sheet: `cards${sheetNumber === 1 ? "" : sheetNumber}.jpg`,
      col: localIndex % 5,
      row: Math.floor(localIndex / 5),
    },
  };
});

// --- NOUVELLE BASE DE DONNÉES DES LANDS (SITES) ---
// 17 sites au total répartis sur lands.jpg (1-6), lands2.jpg (7-12) et lands3.jpg (13-17)
// La 6ème position de lands3.jpg (index global 18) correspond au dos (landback)
const rawLandsInput = [
  { id: 1, name: "Ancient City" },
  { id: 2, name: "Badlands" },
  { id: 3, name: "Barren Coast" },
  { id: 4, name: "Deep Woods" },
  { id: 5, name: "Great Slum" },
  { id: 6, name: "Lush Coast" },
  { id: 7, name: "Mine" },
  { id: 8, name: "Mountain Pass" },
  { id: 9, name: "Plains" },
  { id: 10, name: "Rocky Crag" },
  { id: 11, name: "Salt Flats" },
  { id: 12, name: "Shrouded Wood" },
  { id: 13, name: "Standing Stones" },
  { id: 14, name: "Steppe" },
  { id: 15, name: "Temple" },
  { id: 16, name: "The Waste" },
  { id: 17, name: "Wand Mountain" },
];

export const LandsDatabase = {};
rawLandsInput.forEach((land, index) => {
  const sheetIndex = Math.floor(index / 6); // 0 = lands, 1 = lands2, 2 = lands3
  const localIndex = index % 6;
  const landIdStr = `l_${String(land.id).padStart(2, "0")}`;

  const filenames = ["lands.jpg", "lands2.jpg", "lands3.jpg"];

  // Hypothèse de découpe : Grille de 2 colonnes de large par 3 lignes de haut (6 cartes)
  // Si tes planches sont en 3 colonnes x 2 lignes, remplace le '2' ci-dessous par un '3'
  const columnsCount = 2;

  LandsDatabase[landIdStr] = {
    id: land.id,
    title: land.name,
    sprite: {
      sheet: filenames[sheetIndex],
      col: localIndex % columnsCount,
      row: Math.floor(localIndex / columnsCount),
      totalCols: columnsCount,
      totalRows: 3,
    },
  };
});

// Ajout manuel de la configuration du Dos des Lands (Dernier emplacement de lands3.jpg)
LandsDatabase["land_back"] = {
  id: 0,
  title: "Dos du Site",
  sprite: {
    sheet: "lands3.jpg",
    col: 1, // Deuxième colonne (index 1)
    row: 2, // Troisième ligne (index 2) -> Emplacement 6 de la planche
    totalCols: 2,
    totalRows: 3,
  },
};
