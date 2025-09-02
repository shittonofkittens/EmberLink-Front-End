export async function saveMessagesToBackend(messages, room = "shared") {
  try {
    const res = await fetch("/api/history/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, room })
    });

    const data = await res.json();
    if (data.status === "saved") {
      console.log(`💾 Saved ${data.count} messages to backend.`);
    } else {
      console.warn("⚠️ Failed to save messages:", data.error || "Unknown error");
    }
  } catch (err) {
    console.error("🔥 Error saving messages:", err);
  }
}


export async function loadMessagesFromBackend(room = "shared") {
  try {
    const res = await fetch(`/api/history/load/${room}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("🔥 Error loading messages:", err);
    return [];
  }
}
