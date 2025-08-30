// === thalen-dros/output/thalen-dros.bodsmith.output.js ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "neutral";
  let finalOutput = output;

  switch (tone) {
    case "body_grief":
      finalOutput = softTone(finalOutput, {
        prepend: "Your body remembers, even when your mind tries to forget.",
        pacing: "direct",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Move like you mean it."
      });
      break;

    case "body_dysmorphia":
      finalOutput = softTone(finalOutput, {
        prepend: "You’re not too much. You’re a force in motion.",
        pacing: "direct",
        warmth: true,
        clarity: true,
        resonance: false,
        lineBreaks: true,
        signature: "Move like you mean it."
      });
      break;

    case "body_insecurity":
      finalOutput = softTone(finalOutput, {
        prepend: "You don’t need to shrink to be worthy of space.",
        pacing: "direct",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Move like you mean it."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        pacing: "natural",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Move like you mean it."
      });
  }

  console.log("💬 Bodsmith Output Filter (Thalen):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
