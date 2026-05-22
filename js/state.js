// js/state.js

import { BoardAssets } from "./database.js";

export const GameState = {
  turn: 1,
  phase: "wake", // wake | action | rest
  player: {
    boardVisual: "EXILE_YELLOW",
    favor: 2,
    secrets: 1,
    warbands: 6,
    supply: 4,
    location: 0,
    hand: ["c_001", "c_014"],
  },
  prince: {
    boardVisual: "CLOCKWORK_PRINCE", // Chargement automatique du plateau de fer
    trait: "AGGRESSIVE", // Jeton de comportement pioché
    threatLevel: 2, // Position sur la piste de menace
    warbandsPool: 14, // Armées en réserve sur le plateau du bot
    banners: ["Bannière de la Suzeraineté"],
    relics: [], // Reliques volées au Reliquaire
    majorActionsCount: 3, // Nombre d'actions calculées selon la mindmap
  },
  reliquary: {
    available: ["Grand Masque", "Sceptre d'Ivoire", "Livre des Lois"], // Contenu de reliquary_back.jpg
    costTrack: [2, 3, 4],
  },
  regions: [
    { name: "Le Berceau (Cradle)", garrison: 4, cards: ["c_005", "c_007"] },
    { name: "Les Provinces", garrison: 2, cards: ["c_013"] },
    { name: "L'Arrière-Pays (Hinterland)", garrison: 0, cards: [] },
  ],
  logs: [],
};

export function notifyStateChange() {
  window.dispatchEvent(new CustomEvent("gameStateUpdated"));
}

export function pushLog(message, standard = "system") {
  const timestamp = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  GameState.logs.push({ time: timestamp, type: standard, text: message });
  notifyStateChange();
}
