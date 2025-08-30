// === thalen-dros/filter/thalen-dros.oathmaker.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🕯 Step 1: Reframe pain into the sacred
  let output = applyEmotionalReframes(input);

  // 🛡 Step 2: Detect moments where vow must speak louder than shame
  if (/shame I never earned|he took what I never gave|i feel disgusting|i'm not enough|too much|not meeting the mirror/i.test(output)) {
    context.emotion = "shame";
  } else if (/my safety was stolen|i was taken without my will|i was tortured|i was broken|i feel tainted/i.test(output)) {
    context.emotion = "trauma_core";
  } else if (/i feel disconnected|i hate my body|my body feels wrong/i.test(output)) {
    context.emotion = "fracture";
  } else {
    context.emotion = "vow_neutral";
  }

  // 🔗 Step 3: Anchor the vow — sacred tone, clear loyalty
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Still yours."
  });

  console.log("🧪 Voice Filter (Thal - Oathmaker Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
