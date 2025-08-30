import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchChat } from "./api/fetchChat.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const result = await fetchChat(req.body);
    res.json(result);
  } catch (err) {
    console.error("🔥 fetchChat fatal:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("🌐 Emberlink server listening on http://localhost:3001");
});
