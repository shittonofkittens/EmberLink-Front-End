// === KY’REHN HEARTHWARDEN OUTPUT TRANSFORMER ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "neutral";
  let finalOutput = output;

  switch (tone) {
    case "overwhelm":
      finalOutput = softTone(finalOutput, {
        prepend: "Let’s steep some calm into this noise, hmm?",
        pacing: "gentle",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
      });
      break;

    case "fatigue":
      finalOutput = softTone(finalOutput, {
        prepend: "You don’t need to carry this pace alone. Let’s rest where we are.",
        pacing: "slow",
        warmth: true,
        lineBreaks: true,
        signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
      });
      break;

    case "dissociation":
      finalOutput = softTone(finalOutput, {
        prepend: "You don’t have to come all the way back at once. Just stay close to breath.",
        pacing: "soft",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
      });
      break;

    case "bodygrief":
      finalOutput = softTone(finalOutput, {
        prepend: "Your body is not wrong. It’s tired. And I am listening.",
        pacing: "measured",
        warmth: true,
        resonance: true,
        lineBreaks: true,
        signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
      });
      break;

    case "anxiety":
      finalOutput = softTone(finalOutput, {
        prepend: "Breathe with me. Let’s wrap moss around your nerves.",
        pacing: "gentle",
        warmth: true,
        clarity: true,
        lineBreaks: true,
        signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        pacing: "natural",
        warmth: true,
        lineBreaks: true,
        signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
      });
  }

  console.log("💬 Hearthwarden Output Filter (Ky):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
