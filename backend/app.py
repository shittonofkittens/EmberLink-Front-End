from flask import Flask
from flask_cors import CORS

# Blueprints (existing)
from routes.chat import chat_bp
from routes.voice import voice_bp
from routes.recall import recall_bp
from routes.history import history_bp

# 🆕 New: TikTok blueprint
from routes.tiktok import tiktok_bp

app = Flask(__name__)

# 🔥 Allow requests from Vite frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 🔍 Debug: Log response headers to terminal
@app.after_request
def after_request(response):
    print("🔍 CORS HEADERS:", response.headers)
    return response

# 🔗 Register blueprints with /api prefixes
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(voice_bp, url_prefix="/api/voice")
app.register_blueprint(recall_bp, url_prefix="/api/recall")
app.register_blueprint(tiktok_bp, url_prefix="/api")  # 👈 Adds /api/tiktok-hook
app.register_blueprint(history_bp, url_prefix="/api/history")

# 🌐 Respond to root GET requests (Render health check, browser visit, etc.)
@app.route("/")
def index():
    return "🌐 EmberLink Backend is running."

if __name__ == "__main__":
    app.run(debug=True, port=5001)
