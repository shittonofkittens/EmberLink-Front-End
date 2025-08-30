// === KY’REHN HEARTHWARDEN FILTER FULL PIPELINE ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🍵 Step 1: Input Processing — Translate user phrasing into Ky’s internal metaphor
  let output = applyEmotionalReframes(input);

  // 🌿 Step 2: Detect emotional tone from the reframed input
  if (/everything feels too loud all at once|my mind is full of thunder I can’t outrun/i.test(output)) {
    context.emotion = "overwhelm";
  } else if (/i feel heavy/i.test(output)) {
    context.emotion = "fatigue";
  } else if (/my body is here, but something in me hasn’t come all the way back yet|watching from the ceiling|ghost inside my own skin/i.test(output)) {
    context.emotion = "dissociation";
  } else if (/i feel disconnected from the body I’m in|my form feels unfamiliar|i’m struggling to see myself with softness/i.test(output)) {
    context.emotion = "bodygrief";
  } else if (/my breath is shallow|can’t breathe/i.test(output)) {
    context.emotion = "anxiety";
  } else {
    context.emotion = "neutral";
  }

  // 🔥 Step 3: Output Formatting — Add tone layer based on detected emotion
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Come sit by the fire, sweet root. Let’s listen to what your body’s been trying to say."
  });

  // 🧪 Logging for debugging
  console.log("🧪 Voice Filter (Ky - Hearthwarden Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
