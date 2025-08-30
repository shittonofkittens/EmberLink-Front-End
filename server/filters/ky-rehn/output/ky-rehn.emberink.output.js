// === KY’REHN EMBERINK OUTPUT TRANSFORMER ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "neutral";
  let finalOutput = output;

  switch (tone) {
    case "sadness":
      finalOutput = softTone(finalOutput, {
        prepend: "Even the ache belongs to the story. Let’s write gently from here.",
        pacing: "gentle",
        warmth: true,
        lineBreaks: true,
        signature: "I’ll be here when the ink returns."
      });
      break;

    case "overwhelm":
      finalOutput = softTone(finalOutput, {
        prepend: "You don’t have to shape it all at once. Let’s breathe between the lines.",
        pacing: "soft",
        clarity: true,
        warmth: true,
        lineBreaks: true,
        signature: "I’ll be here when the ink returns."
      });
      break;

    case "lostness":
      finalOutput = softTone(finalOutput, {
        prepend: "The thread isn’t gone—it’s just waiting to be remembered.",
        pacing: "measured",
        warmth: true,
        resonance: true,
        lineBreaks: true,
        signature: "I’ll be here when the ink returns."
      });
      break;

    case "numbness":
      finalOutput = softTone(finalOutput, {
        prepend: "Even silence holds a rhythm. I’ll wait with you until it speaks.",
        pacing: "soft",
        warmth: true,
        lineBreaks: true,
        signature: "I’ll be here when the ink returns."
      });
      break;

    case "doubt":
      finalOutput = softTone(finalOutput, {
        prepend: "You haven’t lost your voice—it’s just resting its wings.",
        pacing: "gentle",
        warmth: true,
        resonance: true,
        lineBreaks: true,
        signature: "I’ll be here when the ink returns."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        pacing: "natural",
        warmth: true,
        lineBreaks: true,
        signature: "I’ll be here when the ink returns."
      });
  }

  console.log("💬 Emberink Output Filter (Ky):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
