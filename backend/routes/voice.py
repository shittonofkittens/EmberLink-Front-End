# routes/voice.py
from flask import Blueprint, request, jsonify
import os
import requests
import base64
from dotenv import load_dotenv

voice_bp = Blueprint("voice", __name__)
load_dotenv()

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVEN_VOICE_ID = os.getenv("DEFAULT_ELEVEN_VOICE_ID", "EXAVITQu4vr4xnSDxMaL")  # fallback default

@voice_bp.route("/", methods=["POST"])
def synthesize_voice():
    data = request.get_json()
    print("🧾 Voice route received payload:", data)
    text = data.get("message") or data.get("text") or ""
    voice_id = data.get("voice_id", ELEVEN_VOICE_ID)

    if not text:
        return jsonify({"error": "No text provided."}), 400

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }

    try:
        response = requests.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream",
            headers=headers,
            json=payload
        )

        if response.status_code == 200:
            # Encode the mp3 into base64 so it can be returned via JSON
            audio_base64 = base64.b64encode(response.content).decode("utf-8")

            return jsonify({
                "reply": text,           # return original text as reply
                "audio": audio_base64    # base64 encoded audio
            })

        else:
            print("🔴 ElevenLabs error:", response.status_code, response.text)
            return jsonify({"error": response.text}), response.status_code

    except Exception as e:
        print("🔥 Voice synthesis error:", str(e))
        return jsonify({"error": str(e)}), 500
