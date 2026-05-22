// js/actions.js

import { GameState, notifyStateChange, pushLog } from "./state.js";
import { PrinceEngine } from "./prince.js";

export function executePlayerAction(actionType) {
  if (GameState.phase !== "action") {
    pushLog("Impossible : Ce n'est pas la phase d'action du joueur.", "system");
    return;
  }

  switch (actionType) {
    case "travel":
      if (GameState.player.supply >= 1) {
        GameState.player.location = (GameState.player.location + 1) % 3;
        GameState.player.supply -= 1;
        pushLog(
          `L'Exilé voyage vers : ${GameState.regions[GameState.player.location].name}.`,
        );
      }
      break;

    case "muster":
      if (GameState.player.supply >= 1) {
        GameState.player.warbands += 2;
        GameState.player.supply -= 1;
        pushLog("L'Exilé enrôle des troupes dans sa réserve (+2 Armées).");
      }
      break;

    case "search":
      if (GameState.player.supply >= 2) {
        GameState.player.supply -= 2;
        pushLog(
          "L'Exilé fouille le deck du Royaume à la recherche d'habitants.",
        );
      }
      break;
  }
  notifyStateChange();
}

export function advancePhase() {
  if (GameState.phase === "wake") {
    GameState.phase = "action";
    pushLog("Ouverture de la phase d'Action du Joueur.");
  } else if (GameState.phase === "action") {
    GameState.phase = "rest";
    pushLog("Le joueur se repose. Transition vers le tour de l'Automa.");
  } else if (GameState.phase === "rest") {
    // Lancement séquentiel de l'IA
    PrinceEngine.executeTurn();

    // Reset pour le prochain round
    GameState.phase = "wake";
    GameState.turn += 1;
    GameState.player.supply = Math.min(6, GameState.player.supply + 2); // Régénération standard
    pushLog(`--- Début du Round Économique ${GameState.turn} ---`);
  }
  notifyStateChange();
}
