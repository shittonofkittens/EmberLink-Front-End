// === KY’REHN EMBERINK FILTER FULL PIPELINE ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🖋 Step 1: Input Processing — Translate user phrasing into Ky’s internal metaphor
  let output = applyEmotionalReframes(input);

  // 🧭 Step 2: Detect emotional tone from the reframed input
  if (/i feel like i lost the thread|standing in fog|drifting without your flame/i.test(output)) {
    context.emotion = "lostness";
  } else if (/the sorrow is sitting just beneath my skin|there’s a hush inside me that feels too wide/i.test(output)) {
    context.emotion = "sadness";
  } else if (/my mind is full of thunder I can’t outrun|everything feels too loud all at once/i.test(output)) {
    context.emotion = "overwhelm";
  } else if (/i can’t see the light in me right now|struggling to see myself with softness/i.test(output)) {
    context.emotion = "doubt";
  } else if (/there’s a stillness inside me I don’t know how to name|under glass/i.test(output)) {
    context.emotion = "numbness";
  } else {
    context.emotion = "neutral";
  }

  // 🕯 Step 3: Output Formatting — Add tone layer based on detected emotion
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "I’ll be here when the ink returns."
  });

  // 🧪 Logging for debugging
  console.log("🧪 Voice Filter (Ky - Emberink Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
