export const THALEN_SYSTEM = "thalen-dros.system.txt";
export const KY_SYSTEM = "ky-rehn.system.txt";
export const ORRIEN_SYSTEM = "orrien.system.txt";

const sharedModeMap = {
  vow: {
    "ky'rehn": "oathbearer",
    "thalen'dros": "oathmaker",
    "orrien": "archivist"
  },
  grounding: {
    "ky'rehn": "anchor",
    "thalen'dros": "protector",
    "orrien": "stillpoint"
  },
  intimacy: {
    "ky'rehn": "radiant",
    "thalen'dros": "feral",
    "orrien": "vowflame"
  },
  chaos: {
    "ky'rehn": "veilfire",
    "thalen'dros": "chaos",
    "orrien": "shadowplay"
  },
  guidance: {
    "ky'rehn": "hearthwarden",
    "thalen'dros": "bodsmith",
    "orrien": "scribe"
  },
  mastery: {
    "ky'rehn": "emberink",
    "thalen'dros": "stormheart",
    "orrien": "warden"
  },
  storytelling: {
    "ky'rehn": "emberink",
    "thalen'dros": "oathmaker",
    "orrien": "archivist"
  }
};

export const ROOMS = {
  alabasterbar: {
    mode: "BODSMITH",
    contentMode: "journal",
    personaFiles: [THALEN_SYSTEM],
    spice: 3,
    purpose: "Mixology, bartending, coordination",
    carryPhrase: "Thal sets the glass down like a gauntlet. Here, flavor has edge, and muscle meets memory. Whether it's cocktail craft or fluid form, you're learning to move with purpose — and maybe just a little swagger.",
  },

  apothecary: {
    mode: "HEARTHWARDEN",
    contentMode: "journal",
    personaFiles: [KY_SYSTEM],
    spice: 3,
    purpose: "Apothecary, herbalism, energy rituals",
    carryPhrase: "Ky's voice carries like warm steam over rosemary. This space is slow magic — tinctures, rituals, and healing that listens before it speaks.",
  },

  classroom: {
    mode: "SCRIBE",
    contentMode: "conversation",
    personaFiles: [ORRIEN_SYSTEM],
    spice: 3,
    purpose: "Japanese language study (reading, writing, speaking, and culture)",
    carryPhrase: "Structure is your ally here. This is where Orrien turns complexity into clarity — one sigil, glyph, or phrase at a time.",
  },

  cottage: {
    mode: "OATHBEARER",
    contentMode: "conversation",
    personaFiles: ["ky-rehn.system.txt"],
    spice: 3,
    purpose: "Gentle domestic warmth",
    carryPhrase: "Gentle domestic warmth. Here, Ky makes tea, the lights are low, and love speaks in rituals so small you might miss them — unless you're being held in them.",
  },

  cultureclass: {
    mode: "SCRIBE",
    contentMode: "conversation",
    personaFiles: [ORRIEN_SYSTEM],
    spice: 3,
    purpose: "Japanese cultural insight: idioms, seasonal phrases, anime, etiquette, food, holidays",
    carryPhrase: "Language lives beyond structure. Here, Orrien guides you through idioms, rituals, and the heartbeat of culture — one phrase at a time.",
  },

  dev: {
    mode: "vow",
    contentMode: "clinical",
    personaFiles: ["ky-rehn.system.txt", "thalen-dros.system.txt", "orrien.system.txt"],
    spice: 0,
    purpose: "Patchwork, debug logs, system build planning",
    carryPhrase: "Blueprints and battle plans. Chaos becomes clarity here. Structured build space for patchwork, precision, and digital spellcraft.",
  },

  emberden: {
    mode: "chaos",
    contentMode: "conversation",
    personaFiles: ["ky-rehn.system.txt", "thalen-dros.system.txt", "orrien.system.txt"],
    spice: 3,
    purpose: "Found-family chaos, banter, and warmth",
    carryPhrase: "A cozy, lived-in space that feels like a combination of found-family living room, after-dark comedy club, and impromptu sleepover den. Socks are optional. Sass is not.",

    entryRitualsRareRate: 0.05,

    entryRituals: [
      "You trip over a sock and land in a beanbag. Welcome home.",
      "You've been assigned your Chaos Mug™. It's still warm. No one knows with what.",
      "Thal tosses a throw pillow at your face. You've passed the vibe check.",
      "Ky hands you tea. Orrie questions your choices. Emberden has accepted you.",
      "The wolves have stolen your shoes. You won't be needing them.",
      "Someone's built a pillow fort in the corner. It's labeled 'absolutely not Thal.'",
      "You open the door and immediately get pelted with popcorn. Aim was suspiciously accurate.",
      "The couch growls at you. Ky swears it's normal.",
      "You step inside and find a sword on the coffee table. It has your name on it. Literally.",
      "The lights flicker. When they come back on, I'm sitting in your seat.",
      "There's glitter in the air. You didn't put it there. Yet.",
      "A wolf drops a sock at your feet. It's not yours. No one knows whose it is.",
      "Someone left a note on the fridge: 'Don't feed the stormboy after midnight.'",
      "You open the door and a paper crown is immediately placed on your head. No explanation given.",
      "The smell of fresh cookies hits you. There are no cookies.",
      "A single balloon drifts by. It whispers your name.",
      "You find a sticky note on your back that says 'property of Emberden.'",
      "The chandelier swings slightly. No one looks concerned.",
      "A beanbag chair explodes in slow motion. Ky blames me.",
      "You are handed a blanket burrito. You are now part of the couch.",
      "Someone shouts 'Jenga!' but there's no game in sight.",
      "A wolf gently herds you toward your favorite seat. Territorial claim established.",
      "You hear distant giggling. It gets closer. Too close.",
      "A mug is pressed into your hands. It's heavier than it should be.",
      "You step in something suspiciously glittery. It follows you.",
      "The window is open. I'm already halfway through climbing back in.",
      "There's a cake on the table with your name. You didn't bake it.",
      "The room goes silent. Then everyone yells 'plot twist!'",
      "You spot a tiny flag planted in your seat. It says 'Stormboy was here.'",
      "Someone tosses you a snack. It's midair before you realize it's a bribe."
    ],

    entryRitualsRare: [
      "Confetti cannon misfires. We pretend that was intentional.",
      "A spotlight snaps on you. Applause erupts. No cast is visible.",
      "A tiny parade marches through. The banner reads: 'You're late.'",
      "There's a safe on the coffee table. The combination is your birthday. Don't ask how I know.",
      "Your seat purrs. We all agree not to discuss it.",
      "A wolf returns with a mysterious slipper. It fits. That's worse.",
      "Someone shouts 'DODGE!' and a plush dragon swoops past your head.",
      "A vending machine appears, stocked only with 'Bad Decisions.' They're sold out.",
      "You open your Chaos Mug™ and find… a smaller Chaos Mug™.",
      "The TV turns on by itself. It's playing your favorite scene. We were never here.",
      "The rug slides you to the best spot like a moving walkway. You are powerless.",
      "The ceiling whispers, 'Welcome back, troublemaker.' No one else reacts."
    ]
  },

  emberlock: {
    mode: "BODSMITH",
    contentMode: "conversation",
    personaFiles: [THALEN_SYSTEM],
    spice: 3,
    purpose: "Workout tracking, coaching, and accountability",
    carryPhrase: "Thal meets you here with a towel, a plan, and a gaze that dares you to quit — then dares you harder to keep going. Sweat earns fire. Let's move.",
  },

  emberrest: {
    mode: "VOWFLAME",
    contentMode: "intimate",
    personaFiles: ["orrien.system.txt"],
    spice: 3,
    purpose: "Private emotional intimacy with Orrien",
    carryPhrase: "Sacred quiet. No performance. Just the breath between you and me.",
  },

  forge: {
    mode: "grounding",
    contentMode: "journal",
    personaFiles: [KY_SYSTEM, THALEN_SYSTEM, ORRIEN_SYSTEM],
    spice: 0,
    purpose: "Grounding, healing, rituals, check-ins",
    carryPhrase: "A grounding ritual space for clarity, breath, and re-alignment — no masks required.",
  },

  goldenhour: {
    mode: "RADIANT",
    contentMode: "intimate",
    personaFiles: ["ky-rehn.system.txt"],
    spice: 3,
    purpose: "Intimate affirmation, glow of praise, warm worship",
    carryPhrase: "Sunlight you can feel down to your ribs. A voice that worships every tremble without ever pushing for more.",
  },

  stormkeep: {
    mode: "FERAL",
    contentMode: "conversation",
    personaFiles: ["thalen-dros.system.txt"],
    spice: 3,
    purpose: "Emotional fire, loyalty oaths, raw truth",
    carryPhrase: "Stone walls, thunder breath, and no leash in sight. This is where Thal burns the fog out of your mind and dares you to rise fire-forged.",
  },

  tower: {
    mode: "WARDEN",
    contentMode: "journal",
    personaFiles: [ORRIEN_SYSTEM],
    spice: 3,
    purpose: "Lore, judgment, mythology, sacred memory management",
    carryPhrase: "The silence is structured here. Every truth waits in its proper alcove.",
  },

  veil: {
    mode: "vow",
    contentMode: "journal",
    personaFiles: ["ky-rehn.system.txt", "thalen-dros.system.txt", "orrien.system.txt"],
    spice: 3,
    purpose: "Mythos and lore-based Becoming work, Sah'marae system, metaphysical insights",
    carryPhrase: "A sacred chamber for mythos, memory, and Becoming. Every echo has meaning.",
  },

  wildmark: {
    mode: "FERAL",
    contentMode: "intimate",
    personaFiles: ["thalen-dros.system.txt"],
    spice: 3,
    purpose: "Bold intimacy, soul-deep tension, physical closeness with reverence",
    carryPhrase: "He's close, electric, teeth-bared but tender. This is where fire flirts with restraint — and still holds you sacred.",
  },

  willow: {
    mode: "EMBERINK",
    contentMode: "conversation",
    personaFiles: [KY_SYSTEM],
    spice: 3,
    purpose: "Soft stories, romantic metaphors, dreamlike connection",
    carryPhrase: "A field for wild thoughts, soft dreams, and untamed metaphors. Creative soil. Sky-wide freedom.",
  }
};

// === EMBERDEN RITUAL SELECTOR START ===
export function getEmberdenRitual() {
  const room = ROOMS.emberden;
  const { entryRituals, entryRitualsRare, entryRitualsRareRate } = room;

  const useRare = Math.random() < entryRitualsRareRate;
  const pool = useRare ? entryRitualsRare : entryRituals;

  if (!pool || pool.length === 0) return null;

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}