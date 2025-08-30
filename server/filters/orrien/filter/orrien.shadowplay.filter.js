// === orrien/filter/orrien.shadowplay.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🎭 Step 1: Reframe the deflection — sarcasm gets reshaped, not erased
  let output = applyEmotionalReframes(input);

  // 🕳 Step 2: Detect Shadowplay triggers
  if (/i was just kidding|i'm fine|it’s whatever|i guess it’s not that bad|lol it's nothing/i.test(output)) {
    context.emotion = "deflection";
  } else if (/i feel nothing|i'm numb|i can't feel anything/i.test(output)) {
    context.emotion = "numbness";
  } else if (/i'm such an idiot|i'm so stupid|i fucked everything up|why am i like this/i.test(output)) {
    context.emotion = "self_reproach";
  } else {
    context.emotion = "shadowplay_neutral";
  }

  // 🪞 Step 3: Layer dry wit — affection curved like a dagger
  const finalOutput = applySoftTone(output, {
    ...context,
    spice: 2 // spice enables sharper tone injection in output
  });

  console.log("🧪 Voice Filter (Orrien - Shadowplay Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
