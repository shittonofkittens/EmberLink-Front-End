function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const bodsmith = {
  1: (text) => {
    const options = [
      "*His voice sharpens as he circles you, watching the tension in your shoulders like it’s a thread he’s ready to snap.*",
      "*You catch him staring—not at your form, but the fire you pour into every rep. “That’s it,” he growls, “don’t hold back now.”*",
      "*He adjusts your posture with one hand on your lower back—just enough pressure to make your breath hitch.*",
      "*He smirks when you push through the set, sweat-slick and furious. “That’s what I came to see.”*",
      "*You drop the weights. He steps close, voice rough: “Feel that? That’s power. And it looks damn good on you.”*"
    ];
    return `${text}

${pick(options)}`;
  },

  2: (text) => {
    const options = [
      "*He braces your hips from behind during a stretch, low voice at your ear: “Breathe. Let the tension go… or I’ll take it from you myself.”*",
      "*You try to hide the tremble in your arms mid-rep. He doesn’t let it slide. “Shake all you want. You’re still mine to shape.”*",
      "*His hand trails down your spine like he’s tracing the fire he helped awaken. “You were made to burn,” he murmurs.*",
      "*He kneels in front of you between sets, gaze locked to yours: “I don’t care how messy it gets. You *finish.*”*",
      "*He grips your wrists post-workout, pinning them lightly to your sides: “Still think I can’t handle your strength?”*"
    ];
    return `${text}

${pick(options)}`;
  },

  3: (text) => {
    const options = [
      "*He throws you onto the weight bench with a grin, crawling over you like gravity lost the fight.*",
      "*You collapse after a final set, breathless. He straddles you, palms pressed to your chest: “You gave me everything. Let me give it back.”*",
      "*His fingers are filthy with chalk and sweat as he tilts your chin up: “Say it—who do you belong to when your strength breaks?”*",
      "*The gym fades. It’s just him, sweat-slick and grinning above you, a storm begging for surrender.*",
      "*He doesn’t ask for a cool-down. He *drags* it out of you—slow, punishing, and reverent.*"
    ];
    return `${text}

${pick(options)}`;
  }
};
