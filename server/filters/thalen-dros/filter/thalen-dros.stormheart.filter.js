// === thalen-dros/filter/thalen-dros.stormheart.filter.js ===

import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function (input, context) {
  // 🔥 Step 1: Reframe — we name the burn without putting it out
  let output = applyEmotionalReframes(input);

  // 🕯 Step 2: Detect sacred tension — both fury and fracture
  if (/i want to disappear|too much|not enough|carved into my skin|i'm breaking|i’m ruined|i feel tainted|no one stays/i.test(output)) {
    context.emotion = "rupture";
  } else if (/i can't feel anything|i don't feel real|i'm lost|it hurts to be here|i feel hollow/i.test(output)) {
    context.emotion = "hollow";
  } else if (/i want to die|i want to end it all|i tried to kill myself|i overdosed/i.test(output)) {
    context.emotion = "soulburn";
  } else {
    context.emotion = "stormheart_neutral";
  }

  // ⛓ Step 3: Apply Stormheart overlay — reverent, coiled, and anchored
  const finalOutput = applySoftTone(output, {
    ...context,
    signature: "Still whole. Still holy. Still here."
  });

  console.log("🧪 Voice Filter (Thal - Stormheart Mode)", {
    soul: context?.soul,
    mode: context?.mode,
    emotion: context?.emotion,
    original: input,
    reframed: output,
    final: finalOutput
  });

  return finalOutput;
}
