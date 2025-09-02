import React, { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";

export const VoiceInput = ({
  onTranscript,
  isListening,
  setIsListening,
  className = "",
  triggerRef
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  // === TOGGLE FUNCTION ===
  console.log("🎛️ [toggleListening] isListening:", isListening);
  console.log("🎛️ [toggleListening] recognitionRef.current:", recognitionRef.current);
  const toggleListening = () => {
  console.log("🎛️ [toggleListening] isListening:", isListening);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("❌ Speech recognition not supported");
    return;
  }

  // 🔁 Always recreate the instance fresh
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    console.log("🎙️ Mic started");
  };

  recognition.onresult = (event) => {
    let finalTranscript = "";
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const phrase = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += phrase;
      } else {
        interimTranscript += phrase;
      }
    }

    setTranscript(interimTranscript);

    if (finalTranscript) {
      console.log("📝 Final voice input:", finalTranscript);

      const MAX_LENGTH = 1000;
      const trimmed = finalTranscript.slice(0, MAX_LENGTH);
      const corrected = trimmed
        .replace(/\bKy\b/gi, "Ky'rehn")
        .replace(/\bKai\b/gi, "Ky'rehn")
        .replace(/\bOrie\b/gi, "Orrien")
        .replace(/\bOri\b/gi, "Orrien")
        .replace(/\bThallen\b/gi, "Thalen’dros")
        .replace(/\bFalon\b/gi, "Thalen’dros")
        .replace(/\bTalon\b/gi, "Thalen’dros")
        .replace(/\bThal\b/gi, "Thalen’dros")
        .replace(/\bTahl\b/gi, "Thalen’dros")
        .replace(/\bTholl\b/gi, "Thalen’dros")
        .replace(/\bPal\b/gi, "Thalen’dros");

      setTimeout(() => {
        onTranscript(corrected);
        setTranscript("");
        setIsListening(false);
        recognition.stop();
      }, 1000);
    }
  };

  recognition.onerror = (event) => {
    console.error("❌ Voice error:", event.error);
    setIsListening(false);
  };

  recognition.onend = () => {
    console.log("🎙️ Mic ended");
    setIsListening(false);
  };

  recognitionRef.current = recognition;

  if (isListening) {
    recognition.stop();
    setIsListening(false);
  } else {
    recognition.start();
    setIsListening(true);
  }
};

  // === REGISTER TOGGLE WITH EXTERNAL REF ===
  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = toggleListening;
      console.log("🪝 toggleListening attached to triggerRef");
    }
  }, [triggerRef, isListening]);

  // === GLOBAL START LISTENING FOR LOOP MODE ===
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startVoiceListening = () => {
        console.log("🔁 window.startVoiceListening triggered");
        toggleListening();
      };
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.startVoiceListening;
      }
    };
  }, [toggleListening]);

  if (!isSupported) {
    return (
      <div className={`text-white/50 text-xs ${className}`}>
        Voice input not supported in this browser
      </div>
    );
  }

  // === UI RENDER ===
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={toggleListening}
        className={`p-3 rounded-full transition-all transform hover:scale-105 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        }`}
      >
        {isListening ? (
          <Square className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-white" />
        )}
      </button>

      {transcript && (
        <div className="flex-1 px-3 py-2 bg-white/20 rounded-lg text-white text-sm">
          <span className="text-white/70">Listening: </span>
          {transcript}
        </div>
      )}

      {isListening && (
        <div className="text-white/70 text-xs animate-pulse">
          🎙️ Listening...
        </div>
      )}
    </div>
  );
};
