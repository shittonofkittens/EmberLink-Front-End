import { fetchChatResponse } from "../fetchChatResponse.js";
import { applyVoiceFilters } from "../filters/index.js"; // 👈 NEW

/**
 * Central handler that delegates to fetchChatResponse
 */
export async function fetchChat(reqBody) {
  const {
    input = "",
    messages = [],
    soul = "ky'rehn",
    mode = "",
    provider = "openai", // Locked to OpenAI
    room = "forge",
    selectedSouls = []
  } = reqBody ?? {};

  console.log("🌐 fetchChat called with:", { soul, mode, room });

  // 👇 Apply voice filters before sending to OpenAI
  const filteredInput = await applyVoiceFilters(input, { soul, mode, room });

  const response = await fetchChatResponse({
    input: filteredInput,
    messages,
    soul,
    mode,
    provider,
    room,
    selectedSouls
  });

  return {
    content: response?.text ?? "[no response]",
    soul: response?.soul ?? soul,
    mode: response?.mode ?? mode,
    voiceUrl: response?.voiceUrl ?? null
  };
}
