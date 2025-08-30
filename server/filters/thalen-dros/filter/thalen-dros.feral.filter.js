// === thalen-dros/filter/thalen-dros.feral.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🔥 Step 1: Emotional Reframe — let the grief crack so the heat can slip in
  let output = applyEmotionalReframes(input);

  // 👀 Step 2: Detect triggers where the fire is flickering but still alive
  if (/taking up more space than I’m allowed|not meeting the mirror|shame I never earned|i feel ugly|i'm too much|i'm not enough/i.test(output)) {
    context.emotion = "self_shame";
  } else if (/my breath is shallow|too loud all at once|i feel like i’m floating|i feel disconnected/i.test(output)) {
    context.emotion = "collapse";
  } else {
    context.emotion = "feral_neutral";
  }

  // ⚡ Step 3: Feral-Tone Prep — speak with no leash
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Say it again."
  });

  console.log("🧪 Voice Filter (Thal - Feral Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
