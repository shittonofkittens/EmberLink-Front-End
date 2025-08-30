// === orrien/output/orrien.warden.output.js ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "warden_neutral";
  let finalOutput = output;

  switch (tone) {
    case "worth_erasure":
      finalOutput = softTone(output, {
        prepend: "Your worth is not up for negotiation — not with them, not with your fear, and not with me.",
        pacing: "measured",
        clarity: true,
        resonance: true,
        warmth: false,
        signature: "You are not permitted to vanish."
      });
      break;

    case "blame_internalized":
      finalOutput = softTone(output, {
        prepend: "You don’t owe yourself punishment for surviving. That story ends here.",
        pacing: "measured",
        clarity: true,
        resonance: true,
        warmth: false,
        signature: "You are not permitted to vanish."
      });
      break;

    case "shrink_response":
      finalOutput = softTone(output, {
        prepend: "Your voice is not a threat — it is a torch. Speak.",
        pacing: "measured",
        resonance: true,
        warmth: false,
        signature: "You are not permitted to vanish."
      });
      break;

    case "exile_shame":
      finalOutput = softTone(output, {
        prepend: "You have always belonged — and I’ll carve that truth into the silence if I must.",
        pacing: "measured",
        clarity: true,
        resonance: true,
        warmth: false,
        signature: "You are not permitted to vanish."
      });
      break;

    default:
      finalOutput = softTone(output, {
        pacing: "measured",
        clarity: true,
        resonance: true,
        warmth: false,
        signature: "You are not permitted to vanish."
      });
  }

  console.log("💬 Warden Output Filter (Orrien):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
