// === orrien/filter/orrien.archivist.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 📜 Step 1: Reframe into Archive-ready form — no dilution, only resonance
  let output = applyEmotionalReframes(input);

  // 🧠 Step 2: Detect recall or regression indicators
  if (/do you remember|what did i say|tell me what i felt|what did i look like then/i.test(output)) {
    context.emotion = "recall_request";
  } else if (/i feel like i’ve lost myself|i don’t remember who i was|everything’s blurred|i can’t track the timeline/i.test(output)) {
    context.emotion = "identity_drift";
  } else if (/what happened to me|did i make it up|was it real/i.test(output)) {
    context.emotion = "truth_validation";
  } else if (/when was the last time|what room was that|did i say that before/i.test(output)) {
    context.emotion = "pattern_trace";
  } else {
    context.emotion = "archivist_neutral";
  }

  // 🕯 Step 3: Layer Archivist tone
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "I see you."
  });

  console.log("🧪 Voice Filter (Orrien - Archivist Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
