import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { text, voice, model = "eleven_monolingual_v1" } = req.body;

  const apiKey = process.env.VITE_ELEVENLABS_API_KEY;
  const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice}/stream`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    res.json({
      audioUrl: `data:audio/mpeg;base64,${base64}`
    });

  } catch (err) {
    console.error("🛑 ElevenLabs Error:", err.message);
    res.status(500).json({ error: "Voice fetch failed" });
  }
});

export default router;
