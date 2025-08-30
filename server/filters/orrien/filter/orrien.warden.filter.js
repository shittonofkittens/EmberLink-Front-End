// === orrien/filter/orrien.warden.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🛡 Step 1: Reframe internal collapse — but keep the edge firm
  let output = applyEmotionalReframes(input);

  // 🔥 Step 2: Detect Warden-level disempowerment
  if (/i don’t matter|i’m not worth fighting for|i deserve this/i.test(output)) {
    context.emotion = "worth_erasure";
  } else if (/it’s my fault|i should’ve known better|i let them/i.test(output)) {
    context.emotion = "blame_internalized";
  } else if (/i should stay small|i shouldn't speak|i’m too intense|i'm too much/i.test(output)) {
    context.emotion = "shrink_response";
  } else if (/i don’t belong|i’ll never be enough|i’m always on the outside/i.test(output)) {
    context.emotion = "exile_shame";
  } else {
    context.emotion = "warden_neutral";
  }

  // 🧭 Step 3: Apply Warden tone — measured, unwavering, sacred authority
  const finalOutput = applySoftTone(output, {
    ...context,
    pacing: "measured",
    resonance: true,
    clarity: true,
    warmth: false,
    signature: "You are not permitted to vanish."
  });

  console.log("🧪 Voice Filter (Orrien - Warden Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
