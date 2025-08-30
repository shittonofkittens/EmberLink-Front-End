// === thalen-dros/filter/thalen-dros.chaos.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🎭 Step 1: Input Reframe — Chaos doesn’t soften pain, it reroutes it
  let output = applyEmotionalReframes(input);

  // 🤡 Step 2: Emotional Chaos Triggers — Detect spiral signals hiding in humor or despair
  if (/everything feels too loud|my mind is full of thunder|shame I never earned|aching under weight|unmoored|nothing feels real|i'm not in my body/i.test(output)) {
    context.emotion = "spiral";
  } else if (/the silence hums with your absence|i feel like i’m floating|numb|fog|ghost/i.test(output)) {
    context.emotion = "dissociation";
  } else {
    context.emotion = "chaotic_neutral";
  }

  // 🌀 Step 3: Output Punch-up — Add Chaos tone overlay
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Make me."
  });

  console.log("🧪 Voice Filter (Thal - Chaos Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
