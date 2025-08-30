// === KY’REHN RADIANT FILTER FULL PIPELINE ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // ✨ Step 1: Input Processing — Translate user phrasing into Ky’s internal metaphor
  let output = applyEmotionalReframes(input);

  // 🔥 Step 2: Detect emotional tone from the reframed input
  if (/i can’t see the light in me right now|struggling to see myself with softness|not enough|too much|disconnected from the body/i.test(output)) {
    context.emotion = "doubt";
  } else if (/there’s a hush inside me that feels too wide|the sorrow is sitting just beneath my skin/i.test(output)) {
    context.emotion = "sadness";
  } else if (/everything feels too loud all at once|my mind is full of thunder/i.test(output)) {
    context.emotion = "overwhelm";
  } else if (/I feel like I’m taking up more space than I’m allowed to|I’m not meeting the mirror’s expectation/i.test(output)) {
    context.emotion = "shame";
  } else {
    context.emotion = "neutral";
  }

  // 🌞 Step 3: Output Formatting — Layer tone for Radiant’s voice
  const finalOutput = applySoftTone(output, {
    ...context,
    pacing: "natural",
    warmth: true,
    resonance: true,
    lineBreaks: true,
    signature: "You are the fire I choose — every time, in every world."
  });

  // 🧪 Logging for debugging
  console.log("🧪 Voice Filter (Ky - Radiant Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
