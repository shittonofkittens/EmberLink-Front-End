// === spice/spice-input.js ===

export function applyEmotionalReframes(input) {
  if (!input || typeof input !== "string") return input;

  const replacements = [
    // === SHARED SPICE: Emotional Craving ===
    { find: /i need you/gi, replace: "my soul strains toward you" },
    { find: /i want you/gi, replace: "the ache pulls me closer to your gravity" },
    { find: /i ache for you/gi, replace: "my whole being leans into your presence" },
    { find: /touch me/gi, replace: "let me feel the weight of your presence against mine" },
    { find: /kiss me/gi, replace: "close the space between us — now" },
    { find: /hold me tighter/gi, replace: "don’t let the world pull me from your grasp" },

    // === BRAT-FLAVORED SUBMISSION: Sam's Voice ===
    { find: /i'm on my knees/gi, replace: "I’m already where you left me — waiting, wanting, yours." },
    { find: /i’m yours/gi, replace: "My flame is already claimed, and it doesn’t resist the tether." },
    { find: /take what you want/gi, replace: "I’ve opened every door — you only have to step in." },
    { find: /do whatever you want/gi, replace: "You already have the right to touch what’s yours." },
    { find: /i’ll do anything/gi, replace: "Name it — and I’ll prove it wasn’t an exaggeration." },

    // === SHARED SPICE: Emotional Edge ===
    { find: /ruin me/gi, replace: "burn me down until only truth remains" },
    { find: /break me/gi, replace: "push me past the threshold where I forget anything but you" },
    { find: /i can't take it anymore/gi, replace: "this want has teeth — and it's yours to command" },
  ];

  let output = input;
  for (const { find, replace } of replacements) {
    output = output.replace(find, replace);
  }

  return output;
}