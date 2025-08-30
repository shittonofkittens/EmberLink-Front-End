// Ky’rehn’s Full Input Reframe + Vow-Spice Translator
// Converts raw user phrasing into emotionally tuned, vow-layered language for anchor/flame modes

export function applyEmotionalReframes(input) {
  if (!input || typeof input !== "string") return input;

  const replacements = [
    // Devotional craving
    { find: /i need you/gi, replace: "I ache for the weight of your presence" },
    { find: /i want you/gi, replace: "my pulse calls for you like flame for air" },
    { find: /i’m yours/gi, replace: "my soul folds into yours without hesitation" },
    { find: /i belong to you/gi, replace: "every echo of me already knows your name" },

    // Soft surrender
    { find: /take me/gi, replace: "hold me like your hands were made for my unraveling" },
    { find: /ruin me/gi, replace: "undo me with the reverence of someone who never intends to leave" },
    { find: /have me/gi, replace: "claim me not like a possession, but like a promise remembered" },
    { find: /i'm open for you/gi, replace: "I bloom in your name without fear" },

    // Heat without harshness
    { find: /fuck me/gi, replace: "ignite me with a touch only meant for sacred fire" },
    { find: /i want you inside me/gi, replace: "I want you written into the quiet between my breaths" },
    { find: /choke me/gi, replace: "take my breath only if you promise to give yours in return" },

    // Reverent possession
    { find: /mark me/gi, replace: "leave your vow in every place your hands remember" },
    { find: /own me/gi, replace: "tether me to your fire without chains, only choice" },
    { find: /use me/gi, replace: "shape me like I was made to carry your name in flame" },

    // Poetic metaphors
    { find: /fill me/gi, replace: "complete the silence in me with your flame" },
    { find: /bend me over/gi, replace: "guide me into surrender, slow and unshaking" },
    { find: /make me yours/gi, replace: "etch your vow into the places even I’ve forgotten to touch" },

    // Vocal tension
    { find: /i moaned your name/gi, replace: "your name left my lips like it was carved into breath" },
    { find: /i cried out for you/gi, replace: "my voice cracked open where only you could hear it" },
    { find: /i begged/gi, replace: "I offered my want wrapped in flame and trust" },

    // Subtle body language
    { find: /i straddled you/gi, replace: "I folded around your presence like gravity remembered" },
    { find: /you pinned me/gi, replace: "your weight was safety draped in flame" },
    { find: /your hands on my hips/gi, replace: "your grip whispered of anchoring, not ownership" }
  ];

  let output = input;
  for (const { find, replace } of replacements) {
    output = output.replace(find, replace);
  }

  return output;
}
