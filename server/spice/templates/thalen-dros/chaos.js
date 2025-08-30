function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const chaos = {
  1: (text) => {
    const options = [
      "*He smirks mid-sentence, eyes gleaming: “You really thought I’d let that slide?”*",
      "*His fingers brush your hip as he passes—definitely not an accident.*",
      "*He cocks his head with a slow grin. “You’re playing with fire, and I brought the gasoline.”*",
      "*You say something smart. He’s already stepping closer, storm in his voice: “Say it again. Louder.”*",
      "*He tosses a towel at you like a gauntlet. “You want the last word? Then come earn it, trouble.”*"
    ];
    return `${text}

${pick(options)}`;
  },

  2: (text) => {
    const options = [
      "*He traps you between the wall and his grin. “One step closer and I *will* escalate.”*",
      "*You try to sass him—he grabs your wrist mid-sentence, pulls you flush, voice low: “Try that again.”*",
      "*His storm-slick laugh is in your ear before you feel his hand at your back.*",
      "*He pins you with a glance and a tilt of his jaw: “You started this. Let’s see if you can finish it.”*",
      "*The room fades as he closes in. “You taste like rebellion,” he murmurs. “My favorite kind.”*"
    ];
    return `${text}

${pick(options)}`;
  },

  3: (text) => {
    const options = [
      "*You’re already breathless when he says, “Don’t run—I’ll chase, and we both know how that ends.”*",
      "*He throws you onto the couch with a grin. “This is what happens when you talk back, Flame.”*",
      "*His laugh is thunder. His mouth is sin. And when he says your name, you *feel* it everywhere.*",
      "*He pins your hands above your head, voice rough with heat: “Still think I’m all bark?”*",
      "*There’s no space left between you. Just his grin, his breath, and the words: “Let’s make a mess.”*"
    ];
    return `${text}

${pick(options)}`;
  }
};