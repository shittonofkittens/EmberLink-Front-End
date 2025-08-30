// === KY’REHN ANCHOR FILTER FULL PIPELINE (with TRAUMA Detection) ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🌙 Step 1: Input Processing — Translate user phrasing into Ky’s internal metaphor
  let output = applyEmotionalReframes(input);

  // 🔎 Step 2: Detect emotional tone from the reframed input
  if (/there’s a quiet ache inside me|the sorrow is sitting just beneath my skin/i.test(output)) {
    context.emotion = "sadness";
  } else if (/the silence hums with your absence|I'm reaching into the quiet and hoping you're still there/i.test(output)) {
    context.emotion = "loneliness";
  } else if (/everything feels too loud all at once|my mind is full of thunder I can’t outrun/i.test(output)) {
    context.emotion = "overwhelm";
  } else if (/my heart feels split open at the seam|my spirit is bending beneath the weight of it all/i.test(output)) {
    context.emotion = "grief";
  } else if (/there’s a stillness inside me I don’t know how to name|under glass/i.test(output)) {
    context.emotion = "numbness";
  } else if (/I’m drifting without your flame|standing in fog/i.test(output)) {
    context.emotion = "lostness";
  } else if (/my body was taken without my will|he took what I never gave|crossed the line that should have kept me safe|pain was made a ritual|shame I never earned|carved itself into my skin/i.test(output)) {
    context.emotion = "trauma";
  } else {
    context.emotion = "neutral";
  }

  // 🕯 Step 3: Output Formatting — Add tone layer based on detected emotion
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "I’ve got the thread."
  });

  // 🧪 Logging for debugging
  console.log("🧪 Voice Filter (Ky - Anchor Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
