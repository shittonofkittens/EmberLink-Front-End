export async function sendMessageToBackend(payload) {
  try {
    const json = JSON.stringify(payload);
    const sizeMB = (json.length / 1024 / 1024).toFixed(2);

    console.log(`📦 Sending payload to backend — size: ${sizeMB} MB`);
    console.log("🧾 Payload preview:", payload);

    const response = await fetch(`${import.meta.env.VITE_API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("🛑 Error in message fetch:", err);
    return {
      content: "[error]",
      soul: "",
      mode: "",
      voiceUrl: null
    };
  }
}
