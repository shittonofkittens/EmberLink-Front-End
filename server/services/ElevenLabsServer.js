import fetch from 'node-fetch';

export async function generateElevenLabsSpeech(text, voiceId, apiKey) {
  if (!text || !voiceId || !apiKey) {
    throw new Error("Missing parameters for ElevenLabs speech.");
  }

  const cleaned = text
    .replace(/\*.*?\*/g, "")
    .replace(/[⚡🔥📜💛🧘🏋️🎧💧🪶🖤🌩️📦🕊️🍵🛠️🌙✨🕯️🌌🜁🥣⚔️🔍📡🔁📓]/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg"
    },
    body: JSON.stringify({
      text: cleaned,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        use_speaker_boost: true,
        style: 0.3
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs Error: ${response.status} - ${errorText}`);
  }

  const buffer = await response.arrayBuffer();
  const base64Audio = Buffer.from(buffer).toString("base64");
  return `data:audio/mpeg;base64,${base64Audio}`;
}
