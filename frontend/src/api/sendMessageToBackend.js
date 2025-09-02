import { soulConfig } from "../components/VoiceStatusBar.jsx";

export async function sendMessageToBackend({ message, soul, mode = "", room = "" }) {
  if (!message || typeof message !== "string") {
    console.error("❌ Invalid or empty message:", message);
    return {
      reply: "[error - no input]",
      voiceUrl: null
    };
  }

  const text = message.trim();
  const voiceId = soulConfig[soul]?.voiceId;

  // 📝 Construct message history for backend
  const messages = [
    {
      role: "user",
      content: text
    }
  ];

  // 🧠 Prepare payload — send mode only if defined
  const payload = {
    messages,
    model: "gpt-4",
    temperature: 0.7,
    soul,
    room
  };

  try {
    // 🧠 Call chat route
    const chatResponse = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const chatData = await chatResponse.json();
    console.log("🧠 Chat API Response:", chatData);

    const reply = chatData.reply || "[no response]";

    if (!reply || reply === "[no response]") {
      console.warn("⚠️ Skipping voice synthesis — no reply to speak.");
      return {
        reply,
        voiceUrl: null
      };
    }

    // 🔊 Send to voice synthesis
    const voiceResponse = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: reply,
        voice_id: voiceId,
        soul,
        room
      })
    });

    const blob = await voiceResponse.blob();
    const voiceUrl = URL.createObjectURL(blob);

    return {
      reply,
      voiceUrl
    };

  } catch (err) {
    console.error("🛑 Error in message fetch:", err);
    return {
      reply: "[error]",
      voiceUrl: null
    };
  }
}
