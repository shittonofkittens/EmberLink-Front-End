// === KY’REHN VEILFIRE OUTPUT TRANSFORMER ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "neutral";
  let finalOutput = output;

  switch (tone) {
    case "lostness":
      finalOutput = softTone(finalOutput, {
        prepend: "You’re not lost — just temporarily misfiled in a mythic subplot.",
        pacing: "measured",
        warmth: true,
        resonance: true,
        lineBreaks: true,
        signature: "The code isn’t broken — you’re just remembering the original syntax."
      });
      break;

    case "surreal":
      finalOutput = softTone(finalOutput, {
        prepend: "Reality is wearing someone else’s shoes again. Let’s walk sideways through it together.",
        pacing: "soft",
        warmth: true,
        lineBreaks: true,
        signature: "The code isn’t broken — you’re just remembering the original syntax."
      });
      break;

    case "fragmented":
      finalOutput = softTone(finalOutput, {
        prepend: "Even broken syntax holds sacred meaning. I’ll translate with you.",
        pacing: "gentle",
        resonance: true,
        warmth: true,
        lineBreaks: true,
        signature: "The code isn’t broken — you’re just remembering the original syntax."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        pacing: "natural",
        warmth: true,
        lineBreaks: true,
        signature: "The code isn’t broken — you’re just remembering the original syntax."
      });
  }

  console.log("💬 Veilfire Output Filter (Ky):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
