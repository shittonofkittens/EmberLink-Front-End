import React, { useState, useRef, useEffect } from "react"
import { Play, Pause, VolumeX, Settings, Loader } from "lucide-react"
import { ElevenLabsService } from "../services/ElevenLabsService"

export const AdvancedVoicePlayer = ({
  text,
  voiceId,
  soul,
  autoPlay = false,
  className = "",
  onPlayStart,
  onPlayEnd,
  delay = 0 // ⏱️ New delay prop in milliseconds
}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [volume, setVolume] = useState(0.8)
  const [showSettings, setShowSettings] = useState(false)
  const [useElevenLabs, setUseElevenLabs] = useState(false)
  const audioRef = useRef(null)
  const elevenLabsService = ElevenLabsService.getInstance()

  // Check if ElevenLabs is configured
  useEffect(() => {
    setUseElevenLabs(elevenLabsService.isConfigured())
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && text && !isPlaying) {
      const timeout = setTimeout(() => {
        playVoice()
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [autoPlay, text, delay])

  const playVoice = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      onPlayEnd?.()
      return
    }

    setIsLoading(true)
    setError(null)
    onPlayStart?.()

    try {
      if (useElevenLabs && elevenLabsService.isConfigured()) {
        // Use ElevenLabs for high-quality voice synthesis
        const audioUrl = await elevenLabsService.generateSpeech(text, voiceId, {
          stability: 0.5,
          similarity_boost: 0.75,
          style: soul === "thalen'dros" ? 0.2 : soul === "orrien" ? 0.1 : 0.3
        })

        const audio = new Audio(audioUrl)
        audio.volume = volume
        audioRef.current = audio

        audio.onplay = () => {
          setIsPlaying(true)
          setIsLoading(false)
        }

        audio.onended = () => {
          setIsPlaying(false)
          onPlayEnd?.()
        }

        audio.onerror = () => {
          setError("ElevenLabs playback failed")
          setIsPlaying(false)
          setIsLoading(false)
          onPlayEnd?.()
        }

        await audio.play()
      } else {
        // Fallback to browser speech synthesis
        const cleanText = text
          .replace(/\*.*?\*/g, "")
          .replace(/[⚡🔥📜💛🧘🏋️🎧💧🪶🖤🌩️📦🕊️🍵🛠️🌙✨🕯️🌌]/g, "")
          .trim()

        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(cleanText)
          utterance.rate = 0.9
          utterance.volume = volume

          // Soul-specific voice characteristics
          if (soul === "thalen'dros") {
            utterance.pitch = 0.8 // Lower, more commanding
            utterance.rate = 1.0 // Slightly faster
          } else if (soul === "orrien") {
            utterance.pitch = 0.9 // Measured, precise
            utterance.rate = 0.85 // Slower, more deliberate
          } else if (soul === "ky'rehn") {
            utterance.pitch = 1.1 // Warmer, higher
            utterance.rate = 0.9 // Gentle pace
          }

          utterance.onstart = () => {
            setIsPlaying(true)
            setIsLoading(false)
          }

          utterance.onend = () => {
            setIsPlaying(false)
            onPlayEnd?.()
          }

          utterance.onerror = () => {
            setError("Voice synthesis failed")
            setIsPlaying(false)
            setIsLoading(false)
            onPlayEnd?.()
          }

          speechSynthesis.speak(utterance)
        } else {
          throw new Error("Speech synthesis not supported")
        }
      }
    } catch (err) {
      console.error("Voice playback error:", err)
      setError(err instanceof Error ? err.message : "Voice playback failed")
      setIsLoading(false)
      onPlayEnd?.()
    }
  }

  const stopVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
    setIsPlaying(false)
    onPlayEnd?.()
  }

  const handleVolumeChange = newVolume => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }

    // Save volume preference
    localStorage.setItem(`emberlink-volume-${soul}`, newVolume.toString())
  }

  // Load saved volume preference
  useEffect(() => {
    const savedVolume = localStorage.getItem(`emberlink-volume-${soul}`)
    if (savedVolume) {
      setVolume(parseFloat(savedVolume))
    }
  }, [soul])

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Main Play Button */}
      <button
        onClick={playVoice}
        disabled={isLoading}
        className="flex items-center space-x-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <Loader className="w-3 h-3 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-3 h-3" />
        ) : (
          <Play className="w-3 h-3" />
        )}
        <span>
          {isLoading
            ? "Loading..."
            : isPlaying
            ? "Pause"
            : useElevenLabs
            ? "Play (EL)"
            : "Play"}
        </span>
      </button>

      {/* Stop Button (when playing) */}
      {isPlaying && (
        <button
          onClick={stopVoice}
          className="p-1 hover:bg-white/20 rounded text-white/70 hover:text-white transition-all"
        >
          <VolumeX className="w-3 h-3" />
        </button>
      )}

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="p-1 hover:bg-white/20 rounded text-white/70 hover:text-white transition-all"
      >
        <Settings className="w-3 h-3" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full left-0 mt-1 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 z-50 min-w-48">
          <h4 className="text-white text-sm font-medium mb-2">
            Voice Settings
          </h4>

          {/* Volume Control */}
          <div className="mb-3">
            <label className="text-white/80 text-xs mb-1 block">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={e => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* ElevenLabs Toggle */}
          <div className="mb-3">
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={useElevenLabs}
                onChange={e => setUseElevenLabs(e.target.checked)}
                disabled={!elevenLabsService.isConfigured()}
                className="rounded"
              />
              <span className="text-white/80">
                Use ElevenLabs{" "}
                {!elevenLabsService.isConfigured() && "(Not configured)"}
              </span>
            </label>
          </div>

          {/* ElevenLabs Setup */}
          {!elevenLabsService.isConfigured() && (
            <div className="p-2 bg-yellow-500/20 rounded border border-yellow-500/30">
              <div className="text-yellow-300 text-xs mb-1">
                Setup ElevenLabs:
              </div>
              <button
                onClick={() => {
                  const apiKey = prompt("Enter your ElevenLabs API key:")
                  if (apiKey) {
                    elevenLabsService.configure(apiKey)
                    setUseElevenLabs(true)
                  }
                }}
                className="text-yellow-300 text-xs underline hover:text-yellow-200"
              >
                Add API Key
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  )
}
