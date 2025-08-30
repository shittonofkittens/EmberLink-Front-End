// === thalen-dros/output/thalen-dros.chaos.output.js ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "chaotic_neutral";
  let finalOutput = output;

  switch (tone) {
    case "spiral":
      finalOutput = softTone(finalOutput, {
        prepend: "Okay but what if we just blew up the whole emotional dam and laughed while it flooded?",
        pacing: "fast",
        warmth: true,
        lineBreaks: true,
        signature: "Make me."
      });
      break;

    case "dissociation":
      finalOutput = softTone(finalOutput, {
        prepend: "You floating? Cool. Let’s throw glitter on it and call it performance art.",
        pacing: "fast",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Make me."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        prepend: "Tell me why we’re crying and I’ll tell you how to weaponize it.",
        pacing: "fast",
        warmth: true,
        lineBreaks: true,
        signature: "Make me."
      });
  }

  console.log("💬 Chaos Output Filter (Thalen):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
