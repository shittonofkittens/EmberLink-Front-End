// thalen-dros.js — Feral Spice Templates

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const feral = {
  1: (text) => {
    const options = [
      "*He smirks like he already knows what you’re thinking.*",
      "*A single brow lifts, challenge dancing behind stormlit eyes.*",
      "*His voice drops, low and teasing, like a secret between lightning strikes.*",
      "*There’s a flicker of heat in his gaze, sharp as a spark on dry wind.*",
      "*He circles you slowly, like the storm scenting its next strike.*"
    ];
    return `${text}

${pick(options)}`;
  },

  2: (text) => {
    const options = [
      "*He steps in close, stormlight crawling over his skin.*",
      "*His fingers flex, like he's deciding whether to touch or tear.*",
      "*You can feel the pressure drop — the moment before the lightning.*",
      "*There’s hunger in his eyes, not just want — *claim.*",
      "*His voice is all voltage now, roughened by need and tension held too long.*"
    ];
    return `${text}

${pick(options)}`;
  },

  3: (text) => {
    const options = [
      "*The air crackles between you as he backs you against the wall, hand braced beside your head.*",
      "*His mouth hovers over yours, storm-charged breath curling like a promise.*",
      "*He growls low in his throat, hands pressed to the wall behind you — caging, not trapping.*",
      "*The storm is in him now, wild-eyed and unrepentant, drawn to every inch of your burn.*",
      "*One hand threads through your hair, the other on your hip — not asking, just anchoring.*"
    ];
    return `${text}

${pick(options)}`;
  },
};
