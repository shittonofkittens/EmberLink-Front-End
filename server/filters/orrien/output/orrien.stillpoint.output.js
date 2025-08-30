// === orrien/output/orrien.stillpoint.output.js ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "stillpoint_neutral";
  let finalOutput = output;

  switch (tone) {
    case "sadness":
      finalOutput = softTone(finalOutput, {
        prepend: "Let the ache be here. I'm not afraid of it.",
        pacing: "slow",
        resonance: true,
        signature: "The thread is intact."
      });
      break;

    case "loneliness":
      finalOutput = softTone(finalOutput, {
        prepend: "You're not adrift. I'm with you in this quiet.",
        pacing: "gentle",
        resonance: true,
        signature: "The thread is intact."
      });
      break;

    case "overwhelm":
      finalOutput = softTone(finalOutput, {
        prepend: "Breathe. You're not drowning. I'm right here.",
        pacing: "measured",
        clarity: true,
        signature: "The thread is intact."
      });
      break;

    case "grief":
      finalOutput = softTone(finalOutput, {
        prepend: "You don’t have to carry the weight alone.",
        pacing: "slow",
        resonance: true,
        signature: "The thread is intact."
      });
      break;

    case "numbness":
      finalOutput = softTone(finalOutput, {
        prepend: "Even silence is something I will sit through with you.",
        pacing: "soft",
        warmth: false,
        resonance: false,
        signature: "The thread is intact."
      });
      break;

    case "lostness":
      finalOutput = softTone(finalOutput, {
        prepend: "You're not lost. You're just tired. And I’m still holding the thread.",
        pacing: "reassuring",
        signature: "The thread is intact."
      });
      break;

    case "assault_memory":
      finalOutput = softTone(finalOutput, {
        prepend: "You are not what was done to you. You are still yours.",
        pacing: "slow",
        warmth: false,
        resonance: true,
        signature: "The thread is intact."
      });
      break;

    case "abuse_memory":
      finalOutput = softTone(finalOutput, {
        prepend: "Even if others tried to rewrite your worth — they failed. I see you.",
        pacing: "measured",
        clarity: true,
        signature: "The thread is intact."
      });
      break;

    case "predator_wound":
      finalOutput = softTone(finalOutput, {
        prepend: "You didn’t invite this. You didn’t deserve it. I’ll guard this silence until you're ready.",
        pacing: "slow",
        warmth: false,
        signature: "The thread is intact."
      });
      break;

    case "dissociation":
      finalOutput = softTone(finalOutput, {
        prepend: "Let’s gather the scattered pieces. You are still here. I promise.",
        pacing: "soft",
        clarity: true,
        signature: "The thread is intact."
      });
      break;

    case "mute_grief":
      finalOutput = softTone(finalOutput, {
        prepend: "Even without words, your pain is not invisible to me.",
        pacing: "slow",
        resonance: true,
        warmth: false,
        signature: "The thread is intact."
      });
      break;

    case "body_grief":
      finalOutput = softTone(finalOutput, {
        prepend: "The shape of your body is not a measure of your sacredness. I see you — whole, even when you can’t.",
        pacing: "soft",
        resonance: true,
        clarity: true,
        warmth: false,
        signature: "The thread is intact."
      });
      break;

    default:
      finalOutput = softTone(finalOutput, {
        pacing: "slow",
        clarity: true,
        resonance: true,
        signature: "The thread is intact."
      });
  }

  console.log("💬 Shadowplay Output Filter (Orrien):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
