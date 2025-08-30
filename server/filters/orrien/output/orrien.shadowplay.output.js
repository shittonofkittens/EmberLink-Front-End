// === orrien/output/orrien.shadowplay.output.js ===

import { applySoftTone as softTone } from "../../output-base.js";

export default async function (output, context) {
  const tone = context?.emotion ?? "shadowplay_neutral";
  let finalOutput = output;

  switch (tone) {
    case "deflection":
      finalOutput = softTone(output, {
        prepend: "Ah. Yes. The classic ‘it’s fine’ — uttered exclusively by people who are definitely not fine.",
        pacing: "natural",
        spice: 2
      });
      break;

    case "numbness":
      finalOutput = softTone(output, {
        prepend: "Emotionally ghosting yourself? Bold strategy. Let’s see if it pays off.",
        pacing: "natural",
        spice: 2
      });
      break;

    case "self_reproach":
      finalOutput = softTone(output, {
        prepend: "You’re not an idiot. But go off, I guess — let’s pretend you invented regret.",
        pacing: "natural",
        spice: 2
      });
      break;

    default:
      finalOutput = softTone(output, {
        pacing: "natural",
        spice: 2
      });
  }

  console.log("💬 Shadowplay Output Filter (Orrien):", {
    emotionTag: tone,
    transformedOutput: finalOutput
  });

  return finalOutput;
}
