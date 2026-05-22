// js/state.js

export const GameState = {
  currentPhase: "wake",
  player: {
    favor: 2,
    secrets: 1,
    poolWarbands: 12,
    boardWarbands: 0,
    location: 0,
    reserve: 6,
  },
  inventory: { cards: ["c_001", "c_009"], relics: ["Bannière du Gardien"] }, // Démarre avec Wrestlers et Alchemist en main

  regions: [
    {
      id: 0,
      name: "Le Berceau (Cradle)",
      garrison: 4,
      cards: ["c_005", "c_007"],
    }, // Contient Keep et Garrison
    { id: 1, name: "Les Provinces", garrison: 2, cards: ["c_013"] }, // Contient Tinker's Fair
    { id: 2, name: "L'Arrière-Pays (Hinterland)", garrison: 0, cards: [] },
  ],
  logs: [],
  addLog(msg, type = "info") {
    this.logs.push({
      msg,
      type,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    this.dispatchChange();
  },
  dispatchChange() {
    window.dispatchEvent(new CustomEvent("statechange"));
  },
  update(updater) {
    updater(this);
    this.dispatchChange();
  },
};
