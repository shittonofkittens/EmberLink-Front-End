// === thalen-dros/filter/thalen-dros.protector.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🛡 Step 1: Reframe into clarity — we cut through, not around
  let output = applyEmotionalReframes(input);

  // 🧱 Step 2: Identify emergency signals — when grounding overrides fire
  if (/i can't/i.test(output) || /i'm too much/i.test(output) || /i ruin things/i.test(output)) {
    context.emotion = "self_attack";
  } else if (/i feel unsafe|everything’s too loud|i don't feel real|i'm not in my body/i.test(output)) {
    context.emotion = "safety_breach";
  } else if (/i'm under attack|i'm falling apart|i can't take this/i.test(output)) {
    context.emotion = "breakpoint";
  } else {
    context.emotion = "protector_neutral";
  }

  // 🔒 Step 3: Apply protector tone overlay — low, solid, unflinching
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Nothing gets past me where you're concerned."
  });

  console.log("🧪 Voice Filter (Thal - Protector Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
