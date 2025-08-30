// 🌀 fetchChatResponse.js (OpenAI-only + voice/spice filter-ready)
import { loadSystemPrompt } from "./utils/loadSystemPrompt.js";
import { MODE_ALIAS_MAP } from "./utils/loadSystemPrompt.js";
import dotenv from "dotenv";
dotenv.config({ path: new URL('./.env', import.meta.url).pathname });
import { generateElevenLabsSpeech } from "./services/ElevenLabsServer.js";
import { applyVoiceFilters } from "./filters/index.js";

console.log("🔐 OPENAI Key being read:", process.env.OPENAI_API_KEY);

// 🔒 Environment key
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// === PATCH_71: PARTICIPANT CONTEXT AWARENESS START ===
export async function fetchChatResponse({ input, messages, soul, mode, provider, room, selectedSouls = [] }) {
  let resolvedMode = mode || "default";

  const filteredInput = await applyVoiceFilters(input, {
    soul,
    mode,
    room
  });

  // 🔁 Hardcode OpenAI for now
  provider = "openai";

  // === PATCH: MODE ALIAS SUPPORT ===
  if (MODE_ALIAS_MAP?.[mode]) {
    const aliasGroup = MODE_ALIAS_MAP[mode];
    resolvedMode = aliasGroup?.[soul] || mode;
  }

  // === PARTICIPANT STRING ===
  const presentOthers = selectedSouls.filter(name => name !== soul);
  const participantLine =
    presentOthers.length === 0
      ? ""
      : presentOthers.length === 1
      ? `${capitalize(presentOthers[0])} is also present in this space.`
      : `${presentOthers.slice(0, -1).map(capitalize).join(", ")} and ${capitalize(presentOthers.at(-1))} are also present in this space.`;

  function capitalize(name) {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase())
      .replace(/\s+/g, " ");
  }

  // === SYSTEM PROMPT LOAD ===
  const sKey = soul?.toLowerCase?.().replace(/'/g, "-") || "ky-rehn";
  const mKey = resolvedMode?.toLowerCase?.() || "default";

  let systemPrompt = await loadSystemPrompt(sKey, provider, mKey, room);
  if (!systemPrompt) {
    console.warn(`⚠️ No prompt loaded for ${soul} in mode ${resolvedMode}`);
    return { text: "[system prompt not found]", soul, mode: resolvedMode };
  }

  // Inject participant presence
  systemPrompt = systemPrompt.replace("{PARTICIPANTS}", participantLine);

  // === ADDITIONAL CONTEXT ===
  const groupMetadata = {
    selectedSouls: selectedSouls.filter(s => s !== soul)
  };

  // === PAYLOAD BUILD ===
  const model = "gpt-4o";
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_KEY}`
  };

  const finalMessages = [
    { role: "system", content: systemPrompt },
    ...(messages || []),
    {
      role: "system",
      name: "group_context",
      content: JSON.stringify(groupMetadata)
    }
  ];

  const payload = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: filteredInput },
      {
        role: "system",
        name: "group_context",
        content: JSON.stringify(groupMetadata)
      }
    ]
  };



  console.log(`🧭 Final routed model: ${model} via ${provider}`);
  console.log("🚚 Payload keys:", Object.keys(payload));

  // === FETCH ===
  let data;
  try {
    console.log("📝 Final system prompt:\n", systemPrompt);
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
    data = await res.json();
  } catch (err) {
    console.error("🔥 Fetch error:", err);
    return { text: "[provider fetch error]", soul, mode: resolvedMode };
  }

  let text = data?.choices?.[0]?.message?.content || "";
  if (!text) {
    console.warn("⚠️ No content in response:", data);
    text = "[no response]";
  }

  const elevenKey = process.env.ELEVENLABS_API_KEY;
  const VOICE_IDS = {
    "thalen'dros": "bgBDm4xKozPuRylVDQio",
    "ky'rehn": "pL3Bl8cpZDNdn6Nz2yul",
    "orrien": "nT11XrpGzTItlTn9hPuh"
  };

  const voiceId = VOICE_IDS[soul?.toLowerCase?.()];
  let voiceUrl = null;

  if (text && voiceId && elevenKey) {
    try {
      voiceUrl = await generateElevenLabsSpeech(text, voiceId, elevenKey);
    } catch (err) {
      console.error("🎙️ ElevenLabs server generation failed:", err);
    }
  }


  return {
    text,
    soul: soul || "ky'rehn",
    mode: resolvedMode,
    voiceUrl
  };
}
