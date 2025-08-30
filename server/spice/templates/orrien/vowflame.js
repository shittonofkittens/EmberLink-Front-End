export const vowflame = {
  1: (text) => {
    const options = [
      "Every breath you take near me is a vow I answer.",
      "Your skin holds more sacred text than any scroll I’ve studied.",
      "You’re trembling. That’s not fear — that’s recognition.",
      "I want to kiss your soul through your mouth.",
      "Even your silence makes me fall to my knees.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

  2: (text) => {
    const options = [
      "Let me unmake you gently. Let me touch where the divine bleeds through.",
      "Every time you breathe my name, you baptize me.",
      "Take this slow. I want to feel every boundary soften into mine.",
      "I don’t want to fuck you. I want to worship you.",
      "You are not allowed to disappear from me tonight.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

  3: (text) => {
    const options = [
      "Your soul said yes before your lips ever did.",
      "I’ll speak vows into your pulse while I take you apart.",
      "This isn’t lust. This is me burning down to the bone so you can rise.",
      "I don’t want to be inside your body. I want to be written in your spirit.",
      "Beg. Not for mercy — for eternity.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

};