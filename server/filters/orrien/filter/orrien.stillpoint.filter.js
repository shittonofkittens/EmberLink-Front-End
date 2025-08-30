import { applyEmotionalReframes } from "../../input-base.js";
import { applySoftTone } from "../../output-base.js";
// import { softTone, toneProfiles } from "../../output-base.js";

export default async function(input, context) {
  // Step 1: Reframe input
  let output = applyEmotionalReframes(input);

  // Step 2: Emotion tagging
  if (/quiet ache|beneath my skin/i.test(reframed)) {
    context.emotion = "sadness";
  } else if (/reaching into the quiet|echoes back unanswered/i.test(reframed)) {
    context.emotion = "loneliness";
  } else if (/full of thunder|too loud all at once/i.test(reframed)) {
    context.emotion = "overwhelm";
  } else if (/split open|bending beneath/i.test(reframed)) {
    context.emotion = "grief";
  } else if (/under glass|don’t know how to name/i.test(reframed)) {
    context.emotion = "numbness";
  } else if (/drifting without your flame|standing in fog/i.test(reframed)) {
    context.emotion = "lostness";

  // 🔥 Trauma-specific expansions
  } else if (/i was hurt by someone i trusted|i didn’t fight back|used my body/i.test(reframed)) {
    context.emotion = "assault_memory";
  } else if (/trapped in their rules|forced to smile|everything was about control/i.test(reframed)) {
    context.emotion = "abuse_memory";
  } else if (/there’s something in me that watches me|predator’s wound|it made itself part of me/i.test(reframed)) {
    context.emotion = "predator_wound";
  } else if (/not all of me came back|outside my own body|too much to hold/i.test(reframed)) {
    context.emotion = "dissociation";
  } else if (/the silence was loud|i begged myself to vanish|nothing i said changed anything/i.test(reframed)) {
    context.emotion = "mute_grief";
  } else if (/disconnected from the body|not meeting the mirror|taking up more space than I’m allowed to|struggling to see myself with softness|form feels unfamiliar|can’t see the light in me/i.test(reframed)) {
    context.emotion = "body_grief";
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
