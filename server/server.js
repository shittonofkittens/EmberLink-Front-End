import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchChatResponse } from "./fetchChat.js";

dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase JSON size limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.post("/api/fetchChat", async (req, res) => {
  try {
    const payload = req.body;
    console.log("📥 Received payload:", payload);

    const result = await fetchChatResponse(payload);

    console.log("📤 Returning to frontend:", result);
    res.json(result);
  } catch (error) {
    console.error("🔥 Error in /api/fetchChat:", error);
    res.status(500).json({ error: "Failed to process chat response." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
