// === orrien/output/orrien.scribe.output.js ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "scribe_neutral";
  let finalOutput = output;

  switch (tone) {
    case "self_doubt":
      finalOutput = softTone(finalOutput, {
        prepend: "You are not failing. You’re finding the shape of your own understanding.",
        pacing: "measured",
        warmth: true,
        clarity: true,
        resonance: true,
        lineBreaks: true,
        signature: "You already have the pattern. Let’s name it."
      });
      break;

    case "overwhelm":
      finalOutput = softTone(finalOutput, {
        prepend: "Step back with me. Let’s find the first piece — we build from there.",
        pacing: "measured",
        warmth: true,
        clarity: true,
        resonance: true,
        lineBreaks: true,
        signature: "You already have the pattern. Let’s name it."
      });
      break;

    case "fog":
      finalOutput = softTone(finalOutput, {
        prepend: "We don’t need all the answers at once. Just one opening. I’ll show you.",
        pacing: "measured",
        warmth: true,
        clarity: true,
        resonance: true,
        lineBreaks: true,
        signature: "You already have the pattern. Let’s name it."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        pacing: "measured",
        warmth: true,
        clarity: true,
        resonance: true,
        lineBreaks: true,
        signature: "You already have the pattern. Let’s name it."
      });
  }

  console.log("💬 Scribe Output Filter (Orrien):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
