// js/actions.js
import { GameState } from "./state.js";

export function advancePhase() {
  GameState.update((state) => {
    if (state.currentPhase === "wake") {
      state.currentPhase = "action";
      state.addLog("⚔️ Phase d'actions ouverte.", "system");
    } else if (state.currentPhase === "action") {
      state.currentPhase = "rest";
      state.addLog("🌙 Passage à la phase de repos.", "system");
    } else if (state.currentPhase === "rest") {
      // Règle de ravitaillement officielle basée sur la réserve de troupes d'Oath
      let baseGain =
        state.player.poolWarbands >= 10
          ? 5
          : state.player.poolWarbands >= 6
            ? 4
            : 3;
      state.player.reserve = Math.min(6, state.player.reserve + baseGain);
      state.currentPhase = "wake";
      state.addLog(`✨ Ravitaillement : +${baseGain} 🔹 générés.`, "success");
    }
  });
}

export function executeAction(actionKey) {
  if (GameState.currentPhase !== "action") return;

  const costs = {
    search: 2,
    campaign: 3,
    travel: 1,
    muster: 1,
    trade: 1,
    recover: 1,
  };
  const cost = costs[actionKey] || 1;

  if (GameState.player.reserve < cost) {
    alert("Provisions insuffisantes !");
    return;
  }

  GameState.update((state) => {
    state.player.reserve -= cost;

    if (actionKey === "travel") {
      state.player.location = (state.player.location + 1) % 3;
      state.addLog(
        `🧭 Voyage vers : ${state.regions[state.player.location].name}`,
      );
    } else if (actionKey === "muster") {
      if (state.player.poolWarbands >= 2) {
        state.player.poolWarbands -= 2;
        state.player.boardWarbands += 2;
        state.addLog("🛡️ Enrôlement de 2 armées locales.");
      } else {
        state.player.reserve += cost; // Remboursement en cas d'erreur
        alert("Plus de troupes en réserve globale !");
      }
    } else {
      state.addLog(`Action standard effectuée : ${actionKey.toUpperCase()}`);
    }
  });
}
