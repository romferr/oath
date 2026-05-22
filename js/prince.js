// js/prince.js

import { GameState, pushLog } from "./state.js";
import { BotTraits } from "./database.js";

export class PrinceEngine {
  static executeTurn() {
    pushLog(
      "🤖 [MINDMAP] Déclenchement de l'arbre décisionnel du Prince Mécanique.",
      "prince",
    );

    // Étape 1 : Lecture du jeton de trait actif
    const activeTrait = BotTraits[GameState.prince.trait];
    pushLog(
      `⚙️ Mode opératoire actif : ${activeTrait.icon} ${activeTrait.name}.`,
      "prince",
    );

    // Étape 2 : Résolution de la mindmap (Organigramme principal de l'image)
    let actionsLeft = GameState.prince.majorActionsCount;

    while (actionsLeft > 0) {
      pushLog(
        `[Action Majeure ${actionsLeft}] Analyse des priorités du Royaume...`,
        "prince",
      );

      if (this.checkBannerPrecedence()) {
        this.resolveBannerTarget();
      } else if (this.checkVisionThreat()) {
        this.resolveVisionTarget();
      } else {
        this.resolveDefaultExpansion(activeTrait);
      }

      actionsLeft--;
    }

    // Étape 3 : Phase de maintenance (Bas de la fiche de règle 2)
    this.maintenancePhase();
  }

  static checkBannerPrecedence() {
    // La mindmap indique : "Le joueur possède-t-il la Bannière de Suzeraineté ou du Peuple ?"
    // Simulation de la règle physique :
    return !GameState.prince.banners.includes("Bannière de la Suzeraineté");
  }

  static checkVisionThreat() {
    // Organigramme branche de droite : "Une Vision est-elle jouée et réalisable ?"
    return GameState.turn >= 5;
  }

  static resolveBannerTarget() {
    pushLog(
      "⚔️ [MINDMAP ➔ BRANCH 1] Priorité Absolue : Récupérer la Bannière. Cible désignée : Site du détenteur de la Bannière.",
      "prince",
    );
    // Logique de déplacement de la garnison du Prince vers le site du joueur
    const playerLoc = GameState.player.location;
    GameState.regions[playerLoc].garrison += 2;
    GameState.prince.warbandsPool -= 2;
    pushLog(
      `🤖 Le Prince déplace 2 armées vers ${GameState.regions[playerLoc].name} pour contester le site.`,
      "prince",
    );
  }

  static resolveVisionTarget() {
    pushLog(
      "🔮 [MINDMAP ➔ BRANCH 2] Menace de Vision détectée. Le Prince lance une purge de la cour.",
      "prince",
    );
    GameState.prince.threatLevel = Math.min(
      6,
      GameState.prince.threatLevel + 1,
    );
  }

  static resolveDefaultExpansion(trait) {
    // Branche par défaut modulée par les tokens de comportement
    if (trait.id === "t_01") {
      // Agressif
      pushLog(
        "⚔️ [TRAIT ACTION] Tempérament Agressif : Le Prince lève des armées sur son site principal.",
        "prince",
      );
      GameState.regions[0].garrison += 3;
      GameState.prince.warbandsPool -= 3;
    } else {
      pushLog(
        "🏰 [TRAIT ACTION] Mode standard : Consolidation des cartes de la Cour.",
        "prince",
      );
    }
  }

  static maintenancePhase() {
    // Règles issues de botrules_front_2.jpg : "Rest Phase : Gain de faveur selon la position sur la piste"
    const favorGained = GameState.prince.threatLevel >= 4 ? 2 : 1;
    pushLog(
      `🔄 [MAINTENANCE] Repos de l'automate. Le Prince récupère +${favorGained} jeton(s) de ressource.`,
      "prince",
    );
  }
}
