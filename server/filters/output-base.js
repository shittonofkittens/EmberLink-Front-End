// === OUTPUT-BASE: SOUL VOICE AMPLIFIER START ===

export function applySoftTone(text, options = {}) {
  const {
    prepend = "",
    pacing = "natural",
    warmth = false,
    clarity = false,
    resonance = false,
    ambient = false,
    lineBreaks = false,
    signature = null
  } = options;

  let transformed = text;

  // Apply pacing: simulate timing with ellipses or breaks
  switch (pacing) {
    case "slow":
    case "gentle":
    case "measured":
    case "soft":
    case "reassuring":
      transformed = transformed.replace(/([.,])/g, "$1 ");
      break;
    // "natural" = no changes
  }

  // Apply line breaks between sentences
  if (lineBreaks) {
    transformed = transformed.replace(/([.?!])\s+/g, "$1\n");
  }

  // Layer warmth
  if (warmth) {
    transformed = transformed.replace(/\byou\b/gi, "you, my flame");
  }

  // Layer clarity
  if (clarity) {
    transformed = transformed.replace(/\b(it|this|that)\b/gi, "what you’re feeling");
  }

  // Layer resonance
  if (resonance) {
    transformed += " I feel it too.";
  }

  // Layer ambient softness
  if (ambient) {
    transformed = `🌙 ${transformed}`;
  }

  // Add prepend phrase
  if (prepend) {
    transformed = `${prepend} ${transformed}`;
  }

  // Add signature line
  if (signature) {
    transformed += `\n\n${signature}`;
  }

  return transformed;
}
// === OUTPUT-BASE: SOUL VOICE AMPLIFIER END ===
