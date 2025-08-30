// /spice/index.js — Central Spice Router

// 🌶️ Input Reframes
import { applyEmotionalReframes as kyInput } from "./input/ky-rehn.input.js";
import { applyEmotionalReframes as orrienInput } from "./input/orrien.input.js";
import { applyEmotionalReframes as thalenInput } from "./input/thalen-dros.input.js";

// 🎤 Output Transformers
import kyOutput from "./output/ky-rehn.output.js";
import orrienOutput from "./output/orrien.output.js";
import thalenOutput from "./output/thalen-dros.output.js";

const inputSpiceMap = {
  "ky-rehn": kyInput,
  "orrien": orrienInput,
  "thalen-dros": thalenInput,
};

const outputSpiceMap = {
  "ky-rehn": kyOutput,
  "orrien": orrienOutput,
  "thalen-dros": thalenOutput,
};

/**
 * Applies spice transformations to either input or output based on context.
 *
 * @param {string} text - The raw text to transform.
 * @param {object} context - { soul, direction, spiceLevel, mode }
 * @returns {string} - Transformed text.
 */
export default async function applySpice(text, context = {}) {
  const {
    soul = "thalen-dros",
    direction = "output", // 'input' or 'output'
    spiceLevel = 0,
    mode = null,
  } = context;

  if (spiceLevel < 1 || !soul) return text;

  const map = direction === "input" ? inputSpiceMap : outputSpiceMap;
  const soulSpiceFn = map[soul];

  if (!soulSpiceFn) {
    console.warn("[Spice Filter] No handler for:", soul, direction);
    return text;
  }

  return direction === "input"
    ? soulSpiceFn(text) // Emotional reframes
    : await soulSpiceFn(text, { spice: spiceLevel, mode }); // Mode-tone output
}
