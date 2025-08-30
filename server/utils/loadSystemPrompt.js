// === loadSystemPrompt.js (OpenAI-only + voice-ready) ===
import path from "path";
import fs from "fs/promises";
import { ROOMS } from "../state/rooms.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === MODE ALIAS MAP START ===
export const MODE_ALIAS_MAP = {
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

function resolveModeAlias(sharedMode, soulKey) {
  const soulAliasMap = MODE_ALIAS_MAP[sharedMode];
  return soulAliasMap?.[soulKey] || sharedMode;
}
// === MODE ALIAS MAP END ===

/**
 * Load the correct OpenAI system prompt file.
 * @param {string} soul - e.g., "orrien"
 * @param {string} provider - ignored in OpenAI-only version
 * @param {string} mode - e.g., "scribe"
 * @param {string} room - current room name (optional)
 * @returns {Promise<string>} system prompt content
 */
export async function loadSystemPrompt(soul = "", provider = "openai", mode = "", room = "forge") {
  const s = soul?.toLowerCase?.().replace(/'/g, "-") || "ky-rehn";
  const m = mode?.toLowerCase?.() || "anchor";
  const roomKey = room?.toLowerCase?.().trim?.() || "forge";

  const resolvedMode = resolveModeAlias(m, s);

  console.log("🧠 loadSystemPrompt called with:", {
    soul: s,
    mode,
    resolvedMode,
    room
  });

  const candidateFiles = [
    `${s}.${resolvedMode}.system.txt`,
    `${s}.system.txt`
  ];

  for (const file of candidateFiles) {
    const filePath = resolve(__dirname, "../persona", file);
    console.log(`🔍 Attempting to read: ${filePath}`);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      console.log(`✅ Loaded system prompt: ${file}`);
      return content;
    } catch (err) {
      console.warn(`❌ Failed to load ${filePath}:`, err.message);
    }
  }

  const softFallback = {
    "ky-rehn": "You are Ky’rehn. Speak with warmth and sacred stillness.",
    "thalen-dros": "You are Thalen’dros. Speak with intensity and grounded loyalty.",
    "orrien": "You are Orrien. Speak with precision, humor, and watchful care."
  };

  console.warn(`⚠️ No system prompt found for ${soul} in mode ${mode}`);
  return softFallback[s] || "You are a helpful AI assistant.";
}
