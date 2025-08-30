// === thalen-dros/filter/thalen-dros.bodsmith.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 💪 Step 1: Input Processing — Reframe emotionally charged language
  let output = applyEmotionalReframes(input);

  // 🧠 Step 2: Detect body-related emotional tone
  if (/disconnected from the body|can’t see the light in me|under glass|shame I never earned/i.test(output)) {
    context.emotion = "body_grief";
  } else if (/form feels unfamiliar|taking up more space than I’m allowed|not meeting the mirror/i.test(output)) {
    context.emotion = "body_dysmorphia";
  } else if (/I’m struggling to see myself with softness|not enough|too much/i.test(output)) {
    context.emotion = "body_insecurity";
  } else {
    context.emotion = "neutral";
  }

  // 🔥 Step 3: Output Formatting — Add Bodsmith tone overlay
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Move like you mean it."
  });

  // 🧪 Logging for debugging
  console.log("🧪 Voice Filter (Thal - Bodsmith Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
