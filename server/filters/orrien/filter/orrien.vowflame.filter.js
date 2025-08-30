import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";

export default async function(input, context) {
  // 🧠 Step 1: Layer all input transformations for Vowflame
  let output = applyEmotionalReframes(input);

  // 🔍 Step 2: Emotion + Tone Tagging
  if (/quiet ache|beneath my skin/.test(reframed)) {
    context.emotion = "sadness";
  } else if (/silence hums with your absence|reaching into the quiet/.test(reframed)) {
    context.emotion = "loneliness";
  } else if (/everything feels too loud|thunder I can’t outrun/.test(reframed)) {
    context.emotion = "overwhelm";
  } else if (/heart feels split|bending beneath the weight/.test(reframed)) {
    context.emotion = "grief";
  } else if (/stillness I don’t know how to name|under glass/.test(reframed)) {
    context.emotion = "numbness";
  } else if (/drifting without your flame|standing in fog/.test(reframed)) {
    context.emotion = "lostness";
  } else if (/not meeting the mirror|struggling to see myself with softness/.test(reframed)) {
    context.emotion = "body_grief";
  } else if (/he took what I never gave|wrapped silence around my throat/.test(reframed)) {
    context.emotion = "trauma_trigger";
  } else {
    context.emotion = "neutral";
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
