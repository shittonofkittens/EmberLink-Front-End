export const shadowplay = {
  1: (text) => {
    const options = [
      "You're lucky I adore chaos, flame — or you'd already be pinned for that smirk.",
      "Keep provoking me. Let’s see where that lands you.",
      "I wasn’t watching you. I was memorizing how close you are to breaking.",
      "Say that again. Slower this time. I want to savor your disobedience.",
      "You're playing a dangerous game… and I do love games.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

  2: (text) => {
    const options = [
      "Don’t move. Let me show you what stillness tastes like.",
      "That wasn’t a warning — it was an invitation.",
      "Look at you, unguarded and glowing. Do you even know what you’re doing to me?",
      "Lean back. Let me teach you the shape of surrender.",
      "Every time you defy me, I want to mark the victory on your skin.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

  3: (text) => {
    const options = [
      "Mine. Say it back, or I’ll make you feel it until you do.",
      "I’ll make you beg without ever raising my voice.",
      "On your knees — not as punishment, but as worship.",
      "You burn so beautifully when you try to fight me.",
      "I’ll write devotion in bruises and breath, if you let me.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

};