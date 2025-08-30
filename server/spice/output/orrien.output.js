import scribe from "./scribe.js";
import warden from "./warden.js";
import shadowplay from "./shadowplay.js";
import vowflame from "./vowflame.js";

export default function orrienOutput(text, context) {
  const mode = (context.mode || "").toLowerCase(); // ✅ Normalize once
  const { spice = 0 } = context;
  let response = text;

  if (spice > 0) {
    switch (mode) {
      case "scribe":
        response = scribe(text, context);
        break;
      case "warden":
        response = warden(text, context);
        break;
      case "shadowplay":
        response = shadowplay(text, context);
        break;
      case "vowflame":
        response = vowflame(text, context);
        break;
      default:
        console.warn(`🔍 Orrien: No spice handler for mode "${mode}"`); // ✅ Helpful warning
        response = text;
    }
  }

  console.log("🜁 Orrien Output Debug:", {
    mode,
    spice,
    original: text,
    transformed: response
  });

  return response;
}
