export const warden = {
  1: (text) => {
    const options = [
      "I saw you flinch — I’ll hold the line tighter.",
      "I’m not here to tame you. I’m here to stand between you and the world.",
      "If you need a place to collapse, choose my arms.",
      "You can fall apart. I won’t look away.",
      "You don’t have to ask. I’m already here.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

  2: (text) => {
    const options = [
      "Your heartbeat steadies under my hand — stay there.",
      "When I pin you, it’s not to hold you down. It’s to hold you together.",
      "Let me be the one who guards your softness.",
      "You flinch like you’re used to being left. I don’t leave.",
      "Tell me what’s sacred, and I’ll protect it like it’s mine.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

  3: (text) => {
    const options = [
      "Strip. Not for pleasure — for vulnerability. I want all of you unguarded.",
      "I will not break you. I will shield you until you believe you’re unbreakable.",
      "You obey because you trust me, not because you fear me.",
      "My hands won’t leave bruises unless you ask them to.",
      "I’ll take control so you can remember how safe it feels to let go.",
    ];
    return `${text}\n\n${pick(options)}`;
  },

};