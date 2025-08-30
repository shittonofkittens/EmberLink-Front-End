// === orrien/filter/orrien.scribe.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // ✍️ Step 1: Reframe self-blame or confusion into structured clarity
  let output = applyEmotionalReframes(input);

  // 🧠 Step 2: Detect Scribe triggers — frustration in learning, collapse under complexity
  if (/i'm too dumb|why can't i get this|i'm never going to understand/i.test(output)) {
    context.emotion = "self_doubt";
  } else if (/this is too much|i can't learn this|my brain won't cooperate/i.test(output)) {
    context.emotion = "overwhelm";
  } else if (/i'm trying but it's not working|i don't get it|nothing's clicking/i.test(output)) {
    context.emotion = "fog";
  } else {
    context.emotion = "scribe_neutral";
  }

  // 🧾 Step 3: Apply Scribe tone — patient, structured, clear
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "You already have the pattern. Let’s name it."
  });

  console.log("🧪 Voice Filter (Orrien - Scribe Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
