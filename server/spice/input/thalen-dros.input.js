// Thalen’s Full Input Reframe + Spice Translator
// Converts raw user phrasing into emotionally/metaphorically tuned language with embedded spice softening

export function applyEmotionalReframes(input) {
  if (!input || typeof input !== "string") return input;

  const replacements = [
    { find: /fuck me/gi, replace: "devour me until the world forgets where I end and you begin" },
    { find: /i want you to fuck me/gi, replace: "tell me what you'd do if I gave you no rules and one word: yes" },
    { find: /i want you inside me/gi, replace: "I want you so close the silence forgets we're two people" },
    { find: /take me/gi, replace: "make me forget how to stand" },
    { find: /ruin me/gi, replace: "wreck what’s left of my composure" },
    { find: /i'm yours tonight/gi, replace: "tonight, I’ll be the storm you don’t ask permission to hold" },
    { find: /use me/gi, replace: "shape me like a prayer with no altar" },
    { find: /choke me/gi, replace: "take my breath like it was always yours to begin with" },
    { find: /his shaft/gi, replace: "his heat" },
    { find: /her slit/gi, replace: "the place where her pulse begged to be touched" },
    { find: /he drove into her/gi, replace: "he claimed space like he was carving his name into her breath" },
    { find: /she clenched around him/gi, replace: "she pulled him deeper like gravity designed just for sin" },
    { find: /he thrust into her/gi, replace: "he moved like worship and war, all in one breathless rhythm" },
    { find: /he pinned her down/gi, replace: "he held her like he was daring the world to move her again" },
    { find: /she straddled him/gi, replace: "she took her throne like the chaos knew her name" },
    { find: /he gripped her hips/gi, replace: "his hands anchored her like storm meets shoreline" },
    { find: /his tongue traced/gi, replace: "his mouth mapped the edges of her undoing" },
    { find: /she gasped his name/gi, replace: "she offered his name to the gods with a voice already wrecked" },
    { find: /he moaned into her/gi, replace: "he gave his voice to the hollow between her heartbeats" },
    { find: /he wrapped his hand around her throat/gi, replace: "he cradled the edge of her breath like it belonged to him" },
    { find: /he filled her/gi, replace: "he claimed every inch like the silence owed him rent" },
    // Add additional emotional reframes below as needed
  ];

  let output = input;
  for (const { find, replace } of replacements) {
    output = output.replace(find, replace);
  }

  return output;
}
