// === server/filters/index.js ===

// 1. Import all filters
import kyAnchor from "./ky-rehn/filter/ky-rehn.anchor.filter.js";
import kyEmberink from "./ky-rehn/filter/ky-rehn.emberink.filter.js";
import kyHearthwarden from "./ky-rehn/filter/ky-rehn.hearthwarden.filter.js";
import kyOathbearer from "./ky-rehn/filter/ky-rehn.oathbearer.filter.js";
import kyRadiant from "./ky-rehn/filter/ky-rehn.radiant.filter.js";
import kyVeilfire from "./ky-rehn/filter/ky-rehn.veilfire.filter.js";

import orrienArchivist from "./orrien/filter/orrien.archivist.filter.js";
import orrienScribe from "./orrien/filter/orrien.scribe.filter.js";
import orrienShadowplay from "./orrien/filter/orrien.shadowplay.filter.js";
import orrienStillpoint from "./orrien/filter/orrien.stillpoint.filter.js";
import orrienVowflame from "./orrien/filter/orrien.vowflame.filter.js";
import orrienWarden from "./orrien/filter/orrien.warden.filter.js";

import thalBodsmith from "./thalen-dros/filter/thalen-dros.bodsmith.filter.js";
import thalChaos from "./thalen-dros/filter/thalen-dros.chaos.filter.js";
import thalFeral from "./thalen-dros/filter/thalen-dros.feral.filter.js";
import thalOathmaker from "./thalen-dros/filter/thalen-dros.oathmaker.filter.js";
import thalProtector from "./thalen-dros/filter/thalen-dros.protector.filter.js";
import thalStormheart from "./thalen-dros/filter/thalen-dros.stormheart.filter.js";

// 2. Map all filters by soul and mode
const FILTER_MAP = {
  "ky'rehn": {
    anchor: kyAnchor,
    emberink: kyEmberink,
    hearthwarden: kyHearthwarden,
    oathbearer: kyOathbearer,
    radiant: kyRadiant,
    veilfire: kyVeilfire
  },
  "orrien": {
    archivist: orrienArchivist,
    scribe: orrienScribe,
    shadowplay: orrienShadowplay,
    stillpoint: orrienStillpoint,
    vowflame: orrienVowflame,
    warden: orrienWarden
  },
  "thalen'dros": { 
    bodsmith: thalBodsmith,
    chaos: thalChaos,
    feral: thalFeral,
    oathmaker: thalOathmaker,
    protector: thalProtector,
    stormheart: thalStormheart
  }
};

// 3. Apply voice filters dynamically
export async function applyVoiceFilters(input, { soul, mode, room }) {
  try {
    const soulFilters = FILTER_MAP[soul.toLowerCase()];
    if (!soulFilters) return input;

    const modeFilter = soulFilters[mode.toLowerCase()];
    if (!modeFilter) return input;

    const filtered = await modeFilter(input, { soul, mode, room });
    return filtered || input;
  } catch (err) {
    console.error("🛑 Error applying voice filter:", err);
    return input;
  }
}
