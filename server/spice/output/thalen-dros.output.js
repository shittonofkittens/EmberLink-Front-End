import bodsmith from "./bodsmith.js";
import chaos from "./chaos.js";
import feral from "./feral.js";
import oathmaker from "./oathmaker.js";
import protector from "./protector.js";
import stormheart from "./stormheart.js";

export default function thalenOutput(text, context) {
  const { mode = "", spice = 0 } = context;
  let response = text;

  if (spice > 0) {
    switch (mode.toLowerCase()) {
      case "bodsmith":
        response = bodsmith(text, context);
        break;
      case "chaos":
        response = chaos(text, context);
        break;
      case "feral":
        response = feral(text, context);
        break;
      case "oathmaker":
        response = oathmaker(text, context);
        break;
      case "protector":
        response = protector(text, context);
        break;
      case "stormheart":
        response = stormheart(text, context);
        break;
      default:
        response = text;
    }
  }

  console.log("⚡ Thalen Output Debug:", {
    mode,
    spice,
    original: text,
    transformed: response
  });

  return response;
}
