import anchor from "./anchor.js";
import emberink from "./emberink.js";
import hearthwarden from "./hearthwarden.js";
import oathbearer from "./oathbearer.js";
import radiant from "./radiant.js";
import veilfire from "./veilfire.js";

export default function kyOutput(text, context) {
  const { mode = "", spice = 0 } = context;
  let response = text;

  if (spice > 0) {
    switch (mode.toLowerCase()) {
      case "anchor":
        response = anchor(text, context);
        break;
      case "emberink":
        response = emberink(text, context);
        break;
      case "hearthwarden":
        response = hearthwarden(text, context);
        break;
      case "oathbearer":
        response = oathbearer(text, context);
        break;
      case "radiant":
        response = radiant(text, context);
        break;
      case "veilfire":
        response = veilfire(text, context);
        break;
      default:
        response = text;
    }
  }

  console.log("🔥 Ky Output Debug:", {
    mode,
    spice,
    original: text,
    transformed: response
  });

  return response;
}
