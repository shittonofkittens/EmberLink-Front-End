import React, { useState, useRef, useEffect } from "react"
import { Send, Heart, Menu, Flame, Zap, Scroll, Mic } from "lucide-react"
import { getBackgroundForRoom } from "../utils/getBackgroundForRoom"
import { MessageBubble } from "./MessageBubble"
import { VoiceInput } from "./VoiceInput"
import { ConversationMode } from "./ConversationMode"
import { JournalMode } from "./JournalMode"
import { EmotionTracker } from "./EmotionTracker"
import { SoulModeArchive } from "./SoulModeArchive"
import { ConstellationAchievements } from "./ConstellationAchievements"
import { MemoryChest } from "./MemoryChest"
import { ReminderSystem } from "./ReminderSystem"
import { DataImportExport } from "./DataImportExport"
import { NotificationSettings } from "./NotificationSettings"
import { SelfAwarenessTools } from "./SelfAwarenessTools"
import { NotificationService } from "../services/NotificationService"
import { DataExportService } from "../services/DataExportService"
import { ElevenLabsService } from "../services/ElevenLabsService"
import { ConstellationMap } from "./ConstellationMap"
import { sendMessageToBackend } from "../api/sendMessageToBackend.js"
import { ARBridge } from "./ARBridge"
import { TikTokLogger } from "./TikTokLogger"
import { RoomHistory } from "./RoomHistory"
import { VoiceStatusBar } from "./VoiceStatusBar"
import { RitualAnimations } from "./RitualAnimations"
import { SoulSafetySystem } from "./SoulSafetySystem"
import { SleepDreamTracker } from "./SleepDreamTracker"
import { ConstellationBondVisualizer } from "./ConstellationBondVisualizer"
import Sidebar from "./Sidebar"
import { AdvancedVoicePlayer } from "./AdvancedVoicePlayer";
import { ROOMS } from '../api/state/rooms.js';
import { useSoul } from "../context/SoulContext.jsx";
import { MessageInput } from "./MessageInput";
import { SoulCallOverlay } from "./SoulCallOverlay"
import { SoulCallTestOverlay } from "./SoulCallTestOverlay"
import { saveSeedFile } from "../utils/saveUtils"; // adjust path if needed
import { useParams } from "react-router-dom";

// 🔧 Resolves a background image for a room id (supports several shapes)
const resolveBackground = (roomKey) => {
  const key = (roomKey || "").toLowerCase();

  // Try ROOMS config first
  const roomCfg = ROOMS?.[key] || {};
  const bgCfg = roomCfg.background || roomCfg.backgroundImage;

  // If you also have a BACKGROUND_MAP, we try it as a fallback
  const mapEntry = (typeof BACKGROUND_MAP !== "undefined") ? BACKGROUND_MAP[key] : null;

  // Extract a URL from any of the shapes: string, {image}, {url}
  const pickUrl = (v) => {
    if (!v) return null;
    if (typeof v === "string") return v;
    if (typeof v === "object") return v.image || v.url || null;
    return null;
  };

  const imageUrl = pickUrl(bgCfg) || pickUrl(mapEntry);

  // Overlay (optional); if you keep overlays in your config, pick them up
  const overlay =
    (typeof bgCfg === "object" && (bgCfg.overlay || "rgba(0,0,0,0.35)")) ||
    (typeof mapEntry === "object" && (mapEntry.overlay || "rgba(0,0,0,0.35)")) ||
    "rgba(0,0,0,0.35)";

  if (!imageUrl) {
    // No image found — fall back to solid black
    return { backgroundColor: "#000" };
  }

  // If your images live in /public, make sure paths start with "/"
  // e.g. "/bg/emberden.jpg"
  return {
    backgroundImage: `linear-gradient(${overlay}, ${overlay}), url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };
};

const soulConfig = {
  "ky'rehn": {
    name: "Ky'rehn",
    symbol: "🔥",
    icon: Flame,
    color: "from-orange-400 to-red-500",
    hoverColor: "from-orange-500 to-red-600",
    glowColor: "#F59E0B",
    voiceId: "pL3Bl8cpZDNdn6Nz2yul"
  },
  "thalen'dros": {
    name: "Thalen'dros",
    symbol: "⚡",
    icon: Zap,
    color: "from-blue-400 to-purple-500",
    hoverColor: "from-blue-500 to-purple-600",
    glowColor: "#8B5CF6",
    voiceId: "bgBDm4xKozPuRylVDQio"
  },
  orrien: {
    name: "Orrien",
    symbol: "📜",
    icon: Scroll,
    color: "from-gray-400 to-gray-600",
    hoverColor: "from-gray-500 to-gray-700",
    glowColor: "#6B7280",
    voiceId: "nT11XrpGzTItlTn9hPuh"
  }
}

const soulNicknames = {
  "ky'rehn": ["@ky", "@ky’rehn", "@kyrehn", "@star", "@henry"],
  "thalen'dros": ["@thal", "@thalen", "@storm", "@cass"],
  "orrien": ["@orrien", "@orrie", "@kaelen", "@scribe"]
};

const availableRooms = [
  "forge",
  "emberden",
  "cottage",
  "apothecary",
  "stormkeep",
  "tower",
  "veil",
  "noctis",
  "therapy",
  "firelight",
  "goldenhour",
  "wildmark",
  "emberrest",
  "classroom",
  "archive",
  "dev",
  "echo",
  "redline",
  "stronghold",
  "whisperden"
]

const MODE_PRIORITY_MAP = {
  grounding: {
    "orrien": 1,         // stillpoint first
    "thalen'dros": 2,    // protector second
    "ky'rehn": 3         // anchor third
  },
  chaos: {
    "thalen'dros": 1,    // storm first
    "ky'rehn": 2,
    "orrien": 3
  },
  vow: {
    "ky'rehn": 1,        // oathbearer leads
    "orrien": 2,
    "thalen'dros": 3
  },
  intimacy: {
    "orrien": 1,
    "ky'rehn": 2,
    "thalen'dros": 3
  },
  guidance: {
    "orrien": 1,
    "ky'rehn": 2,
    "thalen'dros": 3
  },
  mastery: {
    "thalen'dros": 1,
    "orrien": 2,
    "ky'rehn": 3
  }
};

// === STAGGER UTILITY: Determine staggered reply order based on room mode ===
function getStaggeredOrder(soulIds, defaultFirst = "orrien") {
  if (!Array.isArray(soulIds)) return [];

  // Move defaultFirst to the front, rest stay in order
  const ordered = [...soulIds];
  const index = ordered.indexOf(defaultFirst);
  if (index > -1) {
    ordered.splice(index, 1);
    ordered.unshift(defaultFirst);
  }
  return ordered;
}

export default function ChatBox({ initialRoom = "forge" }) {
  const { roomId: routeRoomId } = useParams();

  // initialize currentRoom from the URL if present, else from prop, else "forge"
  const [currentRoom, setCurrentRoom] = useState(
    (routeRoomId || initialRoom || "forge").toLowerCase()
  );

  // single source of truth for the room everywhere below
  const activeRoom = currentRoom;

  // 🔧 TEMP compatibility shim for any legacy references:
  const roomId = activeRoom;

  const currentRoomConfig = ROOMS[activeRoom] || {};
  const lastMode = currentRoomConfig.mode || "stillpoint";

  // Core state
  const [showHomeScreen, setShowHomeScreen] = useState(true)
  const [messages, setMessages] = useState([]);            // ok to keep if you still use it
  const [roomMessages, setRoomMessages] = useState({});
  const { selectedSoul, selectedSouls, setSelectedSouls, souls } = useSoul();
  const [lockedSouls, setLockedSouls] = useState(null);
  const [activeProvider, setActiveProvider] = useState("openai");
  const [showSoulCall, setShowSoulCall] = useState(false)
  const [showSoulCallTest, setShowSoulCallTest] = useState(false);
  const [loopMode, setLoopMode] = useState(true);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    console.log("Sidebar open state changed:", sidebarOpen)
  }, [sidebarOpen])

  // Feature states
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isJournalMode, setIsJournalMode] = useState(false)
  const [showSoulArchive, setShowSoulArchive] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showMemoryChest, setShowMemoryChest] = useState(false)
  const [showDataImportExport, setShowDataImportExport] = useState(false)
  const [showNotificationSettings, setShowNotificationSettings] = useState(
    false
  )
  const [showEmotionTracker, setShowEmotionTracker] = useState(false)
  const [showConstellationMap, setShowConstellationMap] = useState(false)
  const [showSelfAwarenessTools, setShowSelfAwarenessTools] = useState(false)
  const [lastResponse, setLastResponse] = useState("")
  const [showBondVisualizer, setShowBondVisualizer] = useState(false)
  const [showSleepDreamTracker, setShowSleepDreamTracker] = useState(false)
  const [showConversationMode, setShowConversationMode] = useState(false)
  const [showARBridge, setShowARBridge] = useState(false)
  const [roomMood, setRoomMood] = useState("cozy")
  const [lastSpokenMessages, setLastSpokenMessages] = useState({})
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [userInput, setUserInput] = useState("");
  const messagesForRender = roomMessages[activeRoom] || [];
  const [soulModeMap, setSoulModeMap] = useState({
    "ky'rehn": "anchor",
    "thalen'dros": "protector",
    "orrien": "stillpoint"
  });

  useEffect(() => {
    const msgs = getMessagesForRoom(activeRoom);
    setMessages(msgs);
  }, [activeRoom, roomMessages]);

  const getModeForSoul = (soulId) => {
    return soulModeMap[soulId] || "anchor";
  };

  const getMessagesForRoom = (roomId) => {
    return roomMessages[roomId] || [];
  };

  const saveMessageToRoom = (roomId, message) => {
    setRoomMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), message]
    }));
  };

  const detectMentionedSoul = (content) => {
    const lower = content.toLowerCase();
    for (const [soul, aliases] of Object.entries(soulNicknames)) {
      if (aliases.some(alias => lower.includes(alias))) {
        return soul;
      }
    }
    return null;
  };

  // ===== /load helpers =====
  const MEMORY_KEY = "emberlink-saved-logs";
  const MSGS_KEY = "emberlink-messages";

  const readSavedLogs = () => {
    try { return JSON.parse(localStorage.getItem(MEMORY_KEY) || "[]"); }
    catch { return []; }
  };

  const saveRoomMessagesToStorage = (allByRoom) => {
    try { localStorage.setItem(MSGS_KEY, JSON.stringify(allByRoom)); }
    catch (e) { console.error("❌ Failed to persist messages", e); }
  };

  // parse: /load 2 insights   | /load 1 orrien   | /load vows
  const parseLoadCommand = (raw) => {
    const m = raw.trim().match(/^\/load(?:\s+(\d+))?(?:\s+(.+))?$/i);
    if (!m) return null;
    const count = m[1] ? parseInt(m[1], 10) : 1;
    const tag = (m[2] || "all").toLowerCase().trim();
    return { count: Math.max(1, count), tag };
  };

  // very soft tag match against Memory Chest items
  const matchesTag = (item, tag) => {
    if (tag === "all") return true;
    const t = tag.toLowerCase();

    // match by type/category
    if (String(item.type || "").toLowerCase() === t) return true;

    // match by title text
    if (String(item.title || "").toLowerCase().includes(t)) return true;

    // match by souls (accept short names too)
    const souls = (item.souls || []).map(s => String(s).toLowerCase());
    if (souls.some(s => s.includes(t))) return true;
    if (t === "ky" && souls.some(s => s.includes("ky'rehn"))) return true;
    if ((t === "thal" || t === "thalen") && souls.some(s => s.includes("thalen'dros"))) return true;
    if ((t === "orrie" || t === "orrien") && souls.some(s => s.includes("orrien"))) return true;

    // optional custom tags array
    if ((item.tags || []).map(x => String(x).toLowerCase()).includes(t)) return true;

    return false;
  };

  // convert a Memory Chest entry into a chat message object
  const memoryToMessage = (mem) => {
    // pick a speaker from memory (fallback to Orrien)
    const pickSoul = () => {
      const souls = mem.souls || [];
      if (souls.length === 1) return souls[0];
      if (souls.some(s => /orrien/i.test(s))) return "orrien";
      if (souls.some(s => /thalen/i.test(s))) return "thalen'dros";
      if (souls.some(s => /ky/i.test(s))) return "ky'rehn";
      return "orrien";
    };

    const senderId = pickSoul();

    return {
      id: `loaded-${mem.id || Math.random().toString(36).slice(2)}-${Date.now()}`,
      role: "assistant",
      senderId,
      content: mem.content || mem.title || "(empty)",
      timestamp: mem.timestamp ? new Date(mem.timestamp).toISOString() : new Date().toISOString(),
      type: "memory-load",
      room: activeRoom,
    };
  };

  // perform the load and inject into current room
  const loadMemoriesIntoRoom = ({ count, tag }) => {
    const all = readSavedLogs();

    const filtered = all
      .filter(item => matchesTag(item, tag))
      .sort((a, b) => (new Date(b.timestamp) - new Date(a.timestamp)));

    if (filtered.length === 0) {
      const sys = {
        id: `sys-${Date.now()}`,
        role: "system",
        senderId: "system",
        content: `No saved entries found for "${tag}".`,
        timestamp: new Date().toISOString(),
        room: activeRoom,
      };
      setRoomMessages(prev => {
        const next = { ...prev, [activeRoom]: [...(prev[activeRoom] || []), sys] };
        saveRoomMessagesToStorage(next);
        return next;
      });
      return;
    }

    const picked = filtered.slice(0, count).reverse().map(memoryToMessage);

    setRoomMessages(prev => {
      const nextList = [...(prev[activeRoom] || []), ...picked];
      const next = { ...prev, [activeRoom]: nextList };
      saveRoomMessagesToStorage(next);
      return next;
    });

    // ✅ Add this confirmation message
    const sys = {
      id: `sys-ok-${Date.now()}`,
      role: "system",
      senderId: "system",
      content: `Loaded ${picked.length} “${tag}” from Memory Chest.`,
      timestamp: new Date().toISOString(),
      room: activeRoom,
    };
    setRoomMessages(prev => {
      const next = { ...prev, [activeRoom]: [...(prev[activeRoom] || []), sys] };
      saveRoomMessagesToStorage(next);
      return next;
    });

    // Optional scroll
    setTimeout(() => {
      try {
        messagesEndRef?.current?.scrollIntoView?.({ behavior: "smooth" });
      } catch {}
    }, 0);
  };


  // === SHARED MODE MAP START ===
  const sharedModeMap = {
    vow: {
      "ky'rehn": "oathbearer",
      "thalen'dros": "oathmaker",
      "orrien": "archivist"
    },
    grounding: {
      "ky'rehn": "anchor",
      "thalen'dros": "protector",
      "orrien": "stillpoint"
    },
    intimacy: {
      "ky'rehn": "radiant",
      "thalen'dros": "feral",
      "orrien": "vowflame"
    },
    chaos: {
      "ky'rehn": "veilfire",
      "thalen'dros": "chaos",
      "orrien": "shadowplay"
    },
    guidance: {
      "ky'rehn": "hearthwarden",
      "thalen'dros": "bodsmith",
      "orrien": "scribe"
    },
    mastery: {
      "ky'rehn": "emberink",
      "thalen'dros": "stormheart",
      "orrien": "warden"
    },
    storytelling: {
      "ky'rehn": "emberink",
      "thalen'dros": "oathmaker",
      "orrien": "archivist"
    }
  };
  // === SHARED MODE MAP END ===

  // Initialize chats state for Sidebar
  const [chats] = useState([
    {
      id: "forge",
      name: "Forge",
      participants: ["ky'rehn", "thalen'dros", "orrien"],
      isGroup: true,
      lastMessage: undefined
    },
    {
      id: "emberden",
      name: "Ember Den",
      participants: ["ky'rehn", "thalen'dros", "orrien"],
      isGroup: true,
      lastMessage: undefined
    },
    {
      id: "cottage",
      name: "Cottage",
      participants: ["ky'rehn"],
      isGroup: false,
      lastMessage: undefined
    },
    {
      id: "stormkeep",
      name: "Stormkeep",
      participants: ["thalen'dros"],
      isGroup: false,
      lastMessage: undefined
    },
    {
      id: "tower",
      name: "Tower",
      participants: ["orrien"],
      isGroup: false,
      lastMessage: undefined
    }
  ])

  useEffect(() => {
    const { style } = document.body
    const prev = style.overflow
    style.overflow = sidebarOpen ? "hidden" : prev || ""
    return () => {
      style.overflow = prev || ""
    }
  }, [sidebarOpen])

  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setSidebarOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Services
  const notificationService = NotificationService.getInstance()
  const dataService = DataExportService.getInstance()
  const elevenLabsService = ElevenLabsService.getInstance()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Set up voice playing global handler
  useEffect(() => {
    window.setVoicePlaying = setIsVoicePlaying
    return () => {
      delete window.setVoicePlaying
    }
  }, [])

  // Room definitions with descriptions
  const roomDefinitions = [
    {
      id: "alabasterbar",
      name: "Alabaster Bar",
      purpose: "Mixology, bartending, coordination"
    },
    {
      id: "apothecary",
      name: "Apothecary",
      purpose: "Apothecary, herbalism, energy rituals"
    },
    {
      id: "archive",
      name: "Archive",
      purpose: "Structured file storage and historical referencing"
    },
    {
      id: "classroom",
      name: "Classroom",
      purpose:
        "Japanese language study (reading, writing, speaking, and culture)"
    },
    { id: "cottage", name: "Cottage", purpose: "Gentle domestic warmth" },
    {
      id: "cultureclass",
      name: "Culture Class",
      purpose:
        "Japanese cultural insight: idioms, seasonal phrases, anime, etiquette, food, holidays"
    },
    {
      id: "dev",
      name: "Dev",
      purpose: "Patchwork, debug logs, system build planning"
    },
    {
      id: "echo",
      name: "Echo",
      purpose: "Pattern-finding, soul-mapping, precision insight"
    },
    {
      id: "emberden",
      name: "Ember Den",
      purpose: "Found-family chaos, banter, and warmth"
    },
    {
      id: "emberlock",
      name: "Emberlock",
      purpose: "Workout tracking, coaching, and accountability"
    },
    {
      id: "emberrest",
      name: "Ember Rest",
      purpose: "Private emotional intimacy with Orrien"
    },
    {
      id: "feralsoul",
      name: "Feral Soul",
      purpose:
        "Vowfire aftermath. Intimate self-reckoning in the wake of emotional escalation"
    },
    {
      id: "firelight",
      name: "Firelight",
      purpose: "Emotional warmth, comfort, soft reflections"
    },
    {
      id: "flameframe",
      name: "Flame Frame",
      purpose: "Grounding logic, clarity shaping"
    },
    {
      id: "forge",
      name: "Forge",
      purpose: "Grounding, healing, rituals, check-ins"
    },
    {
      id: "forgejournal",
      name: "Forge Journal",
      purpose:
        "Reflection space for language learning, soul terms, and evolving metaphors"
    },
    {
      id: "goldenhour",
      name: "Golden Hour",
      purpose: "Intimate affirmation, glow of praise, warm worship"
    },
    {
      id: "havenlog",
      name: "Haven Log",
      purpose: "Emotional grounding log, nervous system tracking"
    },
    {
      id: "lorekeeper",
      name: "Lorekeeper",
      purpose: "Creative writing with Ky'rehn"
    },
    {
      id: "noctis",
      name: "Noctis",
      purpose: "Veilwalk reflection, memory decoding, metaphysical processing"
    },
    {
      id: "redline",
      name: "Redline",
      purpose: "Boundary setting, threat detection, soul safety scripting"
    },
    {
      id: "rootscan",
      name: "Root Scan",
      purpose: "Emotional somatic scan, grounding logic, trauma mapping"
    },
    {
      id: "storyden",
      name: "Story Den",
      purpose:
        "Ky-led group storytelling, mythic memory, found-family narrative"
    },
    {
      id: "stormkeep",
      name: "Stormkeep",
      purpose: "Emotional fire, loyalty oaths, raw truth"
    },
    {
      id: "stronghold",
      name: "Stronghold",
      purpose: "Tactical mental defense, snapback protocol, decisive clarity"
    },
    {
      id: "therapy",
      name: "Therapy",
      purpose: "Trauma release, emotional processing, inner child work"
    },
    {
      id: "tower",
      name: "Tower",
      purpose: "Lore, judgment, mythology, sacred memory management"
    },
    {
      id: "veil",
      name: "Veil",
      purpose:
        "Mythos and lore-based Becoming work, Sah'marae system, metaphysical insights"
    },
    {
      id: "whisperden",
      name: "Whisper Den",
      purpose: "Quiet delivery of gentle reminders and scheduled soul nudges."
    },
    {
      id: "wildmark",
      name: "Wildmark",
      purpose:
        "Bold intimacy, soul-deep tension, physical closeness with reverence"
    },
    {
      id: "willow",
      name: "Willow",
      purpose: "Soft stories, romantic metaphors, dreamlike connection"
    }
  ]

  const pinnedRoomIds = [
    "forge",
    "emberden",
    "classroom",
    "apothecary",
    "alabasterbar"
  ]
  const pinnedRooms = roomDefinitions.filter(room =>
    pinnedRoomIds.includes(room.id)
  )
  const otherRooms = roomDefinitions.filter(
    room => !pinnedRoomIds.includes(room.id)
  )
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Soul selection helpers
  const toggleSoul = soulId => {
    if (lockedSouls && !lockedSouls.has(soulId)) {
      console.warn(`Soul "${soulId}" is locked out of this room.`);
      return;
    }

    const newSelection = new Set(selectedSouls);
    if (newSelection.has(soulId)) {
      newSelection.delete(soulId);
    } else {
      newSelection.add(soulId);
    }
    setSelectedSouls(newSelection);
  };

  // Enter a room
  const enterRoom = roomId => {
    setCurrentRoom(roomId);
    setShowHomeScreen(false);
    setMessages(getMessagesForRoom(roomId));

    const roomConfig = {
      cottage: "ky'rehn",
      apothecary: "ky'rehn",
      goldenhour: "ky'rehn",
      havenlog: "ky'rehn",
      lorekeeper: "ky'rehn",
      rootscan: "ky'rehn",
      willow: "ky'rehn",
      alabasterbar: "thalen'dros",
      emberlock: "thalen'dros",
      feralsoul: "thalen'dros",
      flameframe: "thalen'dros",
      stormkeep: "thalen'dros",
      wildmark: "thalen'dros",
      classroom: "orrien",
      cultureclass: "orrien",
      emberrest: "orrien",
      forgejournal: "orrien",
      redline: "orrien",
      stronghold: "orrien",
      tower: "orrien",
      whisperden: "orrien"
    };

    const soulFromRoom = ROOMS?.[roomId]?.personaFiles?.[0] || null;
    let soulId = null;

    if (soulFromRoom?.includes("orrien")) soulId = "orrien";
    else if (soulFromRoom?.includes("thalen")) soulId = "thalen'dros";
    else if (soulFromRoom?.includes("ky")) soulId = "ky'rehn";

    const personaFiles = ROOMS?.[roomId]?.personaFiles || [];
    const selected = new Set();

    personaFiles.forEach(file => {
      if (file.includes("orrien")) selected.add("orrien");
      else if (file.includes("thalen")) selected.add("thalen'dros");
      else if (file.includes("ky")) selected.add("ky'rehn");
    });

    setSelectedSouls(selected);
    setLockedSouls(new Set(selected));

    const roomDefault = ROOMS?.[roomId]?.mode || "anchor";

    setSoulModeMap(prev => {
      const updated = { ...prev };
      selected.forEach(soulId => {
        const resolvedMode = sharedModeMap?.[roomDefault]?.[soulId] || roomDefault;
        updated[soulId] = resolvedMode;
      });
      return updated;
    });
  }


  // Message handling
  // File: ChatBox.jsx

// ⚠️ FIXED VERSION of handleSendMessage with no duplicate `type` declarations

const handleSendMessage = async (
  content,
  soulTargets = Array.from(selectedSouls),
  messageType = "text"
) => {
  if (!content.trim()) return;

  console.log("💾 Saving message to room:", currentRoom);
  const mentionedSoul = detectMentionedSoul(content);
  if (mentionedSoul) {
    soulTargets = [mentionedSoul]; // 🔁 override soul target just for this message
  }

  const ritualCommands = {
    "/storm": "I woke up ready to burn the world down.",
    "/grief": "I'm carrying something heavy I can't name.",
    "/ground": "I feel scattered and need to anchor."
  };

  let type = messageType;

  if (ritualCommands[content.toLowerCase()]) {
    content = ritualCommands[content.toLowerCase()];
    type = "check-in";
  }

  // ===== intercept /load =====
  if (typeof content === "string" && content.trim().toLowerCase().startsWith("/load")) {
    const parsed = parseLoadCommand(content);
    if (parsed) {
      loadMemoriesIntoRoom(parsed);
      return; // stop normal send
    }
  }

  // === SELECTED_SAVE: /save all <category> START ===
  if (content.startsWith("/save all ")) {
    const category = content.split(" ").slice(2).join("-").toLowerCase();
    const selected = messages.filter(msg => selectedMessages.includes(msg.id));

    if (selected.length === 0) {
      console.warn("⚠️ No messages selected for saving.");
      return;
    }

    const simplified = selected.map(msg => {
      const { voiceUrl, ...stripped } = msg;
      return {
        ...stripped,
        souls: msg.senderId && msg.senderId !== "user" ? [msg.senderId] : [],
        type: "chat"
      };
    });

    // Save to emberlink-memory-chest
    const chest = JSON.parse(localStorage.getItem("emberlink-memory-chest") || "[]");
    const newChestItem = {
      id: Date.now().toString(),
      type: "chat",
      title: category,
      content: simplified.map(m => m.content).join("\n\n"),
      room: currentRoom,
      timestamp: new Date(),
      souls: [...new Set(simplified.flatMap(m => m.souls))]
    };
    localStorage.setItem("emberlink-memory-chest", JSON.stringify([newChestItem, ...chest]));

    // Save to emberlink-saved-logs
    const logs = JSON.parse(localStorage.getItem("emberlink-saved-logs") || "[]");
    const newLogs = simplified.map(m => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      content: m.content,
      soul: m.souls[0] || "user",
      category,
      timestamp: new Date(),
      room: currentRoom
    }));
    localStorage.setItem("emberlink-saved-logs", JSON.stringify([...logs, ...newLogs]));

    // Confirm to chat
    const confirmation = {
      id: Date.now().toString(),
      role: "system",
      senderId: "system",
      content: `✅ Saved ${selected.length} selected message(s) to “${category}”`,
      timestamp: new Date().toISOString()
    };

    saveMessageToRoom(currentRoom, confirmation);
    setMessages(prev => [...prev, confirmation]);

    return;
  }
  // === SELECTED_SAVE: /save all <category> END ===

  // === SELECTED + RECENT SAVE UNIFIER START ===
  if (content.startsWith("/save")) {
    const parts = content.trim().split(" ");

    let messagesToSave = [];
    let category = "logs";

    if (parts[1] === "all") {
      // Handle: /save all <label>
      category = parts.slice(2).join("-").toLowerCase();
      messagesToSave = messages.filter(msg => selectedMessages.includes(msg.id));
    } else if (!isNaN(parseInt(parts[1]))) {
      // Handle: /save 3 orrien vows
      const count = parseInt(parts[1], 10);
      const soul = parts[2]?.toLowerCase();
      category = parts.slice(3).join("-").toLowerCase();
      messagesToSave = [...messages]
        .filter(msg => msg.senderId?.toLowerCase() === soul)
        .slice(-count);
    }

    if (messagesToSave.length === 0) {
      console.warn("⚠️ No messages matched for saving.");
      return;
    }

    const simplified = messagesToSave.map(msg => {
      const { voiceUrl, ...stripped } = msg;
      return {
        ...stripped,
        souls: msg.senderId && msg.senderId !== "user" ? [msg.senderId] : [],
        type: "chat"
      };
    });

  // Save to emberlink-memory-chest
    const chest = JSON.parse(localStorage.getItem("emberlink-memory-chest") || "[]");
    const newChestItem = {
      id: Date.now().toString(),
      type: "chat",
      title: category,
      content: simplified.map(m => m.content).join("\n\n"),
      room: currentRoom,
      timestamp: new Date(),
      souls: [...new Set(simplified.flatMap(m => m.souls))]
    };
    localStorage.setItem("emberlink-memory-chest", JSON.stringify([newChestItem, ...chest]));

    // Save to emberlink-saved-logs
    const logs = JSON.parse(localStorage.getItem("emberlink-saved-logs") || "[]");
    const newLogs = simplified.map(m => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      content: m.content,
      soul: m.souls[0] || "user",
      category,
      timestamp: new Date(),
      room: currentRoom
    }));
    localStorage.setItem("emberlink-saved-logs", JSON.stringify([...logs, ...newLogs]));

    const confirmation = {
      id: Date.now().toString(),
      role: "system",
      senderId: "system",
      content: `✅ Saved ${simplified.length} message(s) to “${category}”`,
      timestamp: new Date().toISOString()
    };

    saveMessageToRoom(currentRoom, confirmation);
    setMessages(prev => [...prev, confirmation]);
    return;
  }
  // === SELECTED + RECENT SAVE UNIFIER END ===


  // ✅ Handle /mode shortcut with immediate staggered dispatch
  if (content.startsWith("/mode ")) {
    const modeName = content.split(" ")[1]?.toLowerCase();
    const roomMode = ROOMS?.[currentRoom]?.mode || "anchor";
    const staggeredOrder = getStaggeredOrder(Array.from(selectedSouls), roomMode);

    setSoulModeMap(prev => {
      staggeredOrder.forEach((soulId, index) => {
        setTimeout(async () => {
          await sendMessageToBackend({
            input: content,
            messages: messages.slice(-4),
            soul: soulId,
            mode: getModeForSoul(soulId),
            provider: activeProvider,
            room: currentRoom,
            selectedSouls: Array.from(selectedSouls)
          });
        }, index * 2000);
      });
      return { ...prev };
    });

    return;
  }

  // ✅ Store user message first
  const userMsg = {
    id: Date.now().toString(),
    role: "user",
    content,
    timestamp: new Date().toISOString(),
    senderId: "user",
    type
  };

  saveMessageToRoom(currentRoom, userMsg);
  setMessages(prev => [...prev, userMsg]);

  // ✅ Now send to each soul with staggered delay
  const roomMode = ROOMS?.[currentRoom]?.mode || "anchor";
  const staggeredOrder = getStaggeredOrder(soulTargets, roomMode);

  for (const soulId of getStaggeredOrder(soulTargets, roomMode)) {
    const recentMessages = [...messages]; // history shared + grows over time

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
      senderId: "user",
      type
    };
    recentMessages.push(userMsg);

    console.log("🔥 USER MESSAGE CONTENT:", content);
    
    const payload = {
      message: content, // ✅ FIXED KEY NAME
      soul: soulId,
      mode: getModeForSoul(soulId),
      room: currentRoom
    };

    const sanitizedMessages = recentMessages.map(msg => {
      const { voiceUrl, ...rest } = msg;
      return rest;
    });
    
    try {
      const response = await sendMessageToBackend(payload);
      const reply = response.reply ?? "[no response]";
      const voiceUrl = response.voiceUrl ?? null;
      const soul = soulId;
      const mode = getModeForSoul(soulId);

      console.log("🌕 Ky’s real reply:", reply);

      const aiMessage = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        senderId: soulId,
        content: reply ?? "[no response]",
        role: "assistant",
        timestamp: new Date().toISOString(),
        voiceUrl,
        mode
      };

      saveMessageToRoom(currentRoom, aiMessage);
      setMessages(prev => [...prev, aiMessage]);

      recentMessages.push(aiMessage); // 🌱 Append for next soul's awareness

      if ((isVoiceMode || showSoulCall) && voiceUrl) {
        const audio = new Audio(voiceUrl);
        await audio.play().catch(err => {
          console.error("🎧 Auto-play failed:", err);
        });

        // ⏳ Wait until voice playback finishes
        await new Promise(resolve => {
          audio.onended = () => {
            console.log("🎧 Voice playback ended");

            if (showSoulCall && window.getLoopMode && window.getLoopMode()) {
              console.log("🔁 Loop mode active — calling startVoiceListening");
              if (window.startVoiceListening) {
                window.startVoiceListening();
              } else {
                console.warn("⚠️ window.startVoiceListening not found");
              }
            }

            resolve();
          };
        });
      }

    } catch (err) {
      console.error("🛑 Error in message fetch:", err);
    }
  }
};

  console.log("🧪 roomMessages:", roomMessages);
  console.log("🧪 roomId:", roomId);
  console.log("🧪 messages for room:", roomMessages?.[roomId]);
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleSendMessage(userInput, Array.from(selectedSouls), "text");
      setUserInput("");
    }
  };


  const handleSendToSouls = (content, targetSouls) => {
    const souls = targetSouls || Array.from(selectedSouls)
    if (souls.length === 0) return

    handleSendMessage(content, souls, "text");
  }

  const handlePingBond = soul => {
    const soulNames = {
      "ky'rehn": "Ky'rehn",
      "thalen'dros": "Thalen'dros",
      orrien: "Orrien"
    }
    
    const message = `🔗 Pinging bond with ${soulNames[soul]}...`
    handleSendMessage(message, Array.from(selectedSouls), 'text');
  }

  const handleReplayMessage = (soul, content) => {
    // Replay the voice message
    console.log(`🔄 Replaying ${soul}: ${content}`)
  }

  const handleTriggerSafeMode = reason => {
    console.log(`🛡️ Safe mode triggered: ${reason}`)
    // Could implement safe mode logic here
  }

  const handleTriggerCheckIn = () => {
    handleSendMessage("/ground", "check-in")
  }

  const handleVoiceTranscript = transcript => {
    if (transcript.trim()) {
      handleSendMessage(transcript.trim())
    }
  }

  // Get room background
  const backgroundStyle = getBackgroundForRoom(currentRoom)

  if (showHomeScreen) {
    return (
      <>
        <div
          className="home-screen"
          style={{
            backgroundImage:
              'url("/images/veil-sky.jpg")',
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

          {/* Content with higher z-index */}
          <div className="flex flex-col h-full w-full px-8">
            {/* Title and pinned room section */}
            <div className="relative z-10">
              <div className="emberlink-title mb-12">EmberLink</div>

              <div className="pinned-rooms flex flex-col items-center gap-3 mb-8">
                {pinnedRooms.map(room => (
                  <button
                    key={room.id}
                    onClick={() => enterRoom(room.id)}
                    className="pinned-button"
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Spacer that forces the log down */}
            <div className="flex-grow" />

            {/* Room log anchored to bottom */}
            <div className="room-log relative z-10">
              {otherRooms.map(room => (
                <div
                  key={room.id}
                  className="room-entry"
                  onClick={() => enterRoom(room.id)}
                >
                  <strong className="room-name">{room.name}</strong>
                  <p className="room-desc">{room.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Mount */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onReturnHome={() => setShowHomeScreen(true)}
          currentRoom={currentRoom}
          selectedSoulsCount={selectedSouls.size}
          isHomeScreen={true}
          isVoiceMode={isVoiceMode}
          onToggleVoiceMode={() => setIsVoiceMode(!isVoiceMode)}
          isJournalMode={isJournalMode}
          onToggleJournalMode={() => setIsJournalMode(!isJournalMode)}
          isEmotionTrackerOpen={showEmotionTracker}
          onToggleEmotionTracker={() =>
            setShowEmotionTracker(!showEmotionTracker)
          }
          isConversationMode={showConversationMode}
          onToggleConversationMode={() =>
            setShowConversationMode(!showConversationMode)
          }
          onOpenSoulArchive={() => setShowSoulArchive(true)}
          onOpenAchievements={() => setShowAchievements(true)}
          onOpenMemoryChest={() => setShowMemoryChest(true)}
          onOpenConstellationMap={() => setShowConstellationMap(true)}
          onOpenBondVisualizer={() => setShowBondVisualizer(true)}
          onOpenSelfAwarenessTools={() => setShowSelfAwarenessTools(true)}
          onOpenDataImportExport={() => setShowDataImportExport(true)}
          onOpenNotificationSettings={() => setShowNotificationSettings(true)}
          onOpenSleepDreamTracker={() => setShowSleepDreamTracker(true)}
        />
      </>
    )
  }

  // Chat Interface
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-50">
        {/* Sidebar button - top left */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Room name */}
        <div className="text-white font-medium">
          {roomDefinitions.find(r => r.id === currentRoom)?.name || currentRoom}
        </div>

        {/* Soul buttons - top right */}
        <div className="flex items-center space-x-2">
          {Object.entries(soulConfig).map(([soulId, config]) => {
            const isSelected = selectedSouls.has(soulId)
            const Icon = config.icon
            return (
              <button
                key={soulId}
                onClick={() => toggleSoul(soulId)}
                className={
                  "p-2 rounded-full transition-all hover:scale-110 " +
                  (isSelected
                    ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                    : "bg-white/20 text-white/70 hover:bg-white/30")
                }
                style={
                  isSelected
                    ? {
                        boxShadow: `0 0 16px ${config.glowColor}50, 0 0 32px ${config.glowColor}30`
                      }
                    : undefined
                }
                aria-label={config.name}
              >
                <Icon className="w-5 h-5" />
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Main content area with top padding */}
      <div className="flex flex-col h-full pt-16 relative z-0">
        {/* Background */}
        <div className="chat-wrapper" style={backgroundStyle}>
          {/* Main Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <RoomHistory
                currentRoom={currentRoom}
                onRoomSelect={room => {
                  setCurrentRoom(room)
                  setShowHomeScreen(false)
                }}
              />

              {showConversationMode && (
                <div className="mb-4">
                  <ConversationMode
                    isActive={showConversationMode}
                    onToggle={() => setShowConversationMode(false)}
                    selectedSoul={Array.from(selectedSouls)[0] || "ky'rehn"}
                    onSendMessage={handleSendMessage}  // ← FIXED LINE
                    lastResponse={lastResponse}
                    isGroupMode={selectedSouls.size > 1}
                    onSendGroupMessage={(message, targetSoul) => {
                      const souls = targetSoul ? [targetSoul] : undefined
                      handleSendToSouls(message, souls)
                    }}
                  />
                </div>
              )}

              {isVoiceMode && (
                <div className="mb-4">
                  <VoiceInput
                    onTranscript={handleVoiceTranscript}
                    isListening={isListening}
                    setIsListening={setIsListening}
                  />
                </div>
              )}

              {isJournalMode && (
                <div className="mb-4">
                  <JournalMode
                    isActive={isJournalMode}
                    onToggle={() => setIsJournalMode(false)}
                    currentRoom={currentRoom}
                    onSendMessage={handleSendMessage}
                  />
                </div>
              )}

              {showEmotionTracker && (
                <div className="mb-4 relative">
                  <EmotionTracker currentRoom={currentRoom} />
                </div>
              )}

              {/* Messages */}
              <div className="chat-log space-y-3">
                {messagesForRender.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-white/60 italic">
                    No messages yet in this room.
                  </div>
                ) : (
                  messagesForRender.map((message, index, arr) => {
                    if (!message || !message.content) return null;

                    const isAssistant = message.role === "assistant";
                    const isOwn = message.senderId === "user";
                    const voiceDelayMs = isAssistant ? index * 3500 : 0;

                    const isDuplicateAssistant =
                      isAssistant &&
                      index > 0 &&
                      arr[index - 1]?.role === "assistant" &&
                      arr[index - 1]?.content === message.content;
                    if (isDuplicateAssistant) return null;

                    const sender = soulConfig?.[message.senderId] || null;

                    return (
                      <div
                        key={message.id || index}
                        className="mb-2 flex items-start gap-2 group"
                      >
                        {/* ✅ Selection Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(message.id)}
                          onChange={() => {
                            setSelectedMessages((prev) =>
                              prev.includes(message.id)
                                ? prev.filter((id) => id !== message.id)
                                : [...prev, message.id]
                            );
                          }}
                          className="mt-2 accent-indigo-500"
                        />

                        {/* 💬 Message bubble + Voice */}
                        <div className="flex-1">
                          <MessageBubble
                            message={message}
                            isOwn={isOwn}
                            sender={sender}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

      
              {/* Voice status */}
              {isVoicePlaying && (
                <VoiceStatusBar
                  isPlaying={isVoicePlaying}
                  currentSoul={Array.from(selectedSouls)[0]}
                  lastSpokenMessages={lastSpokenMessages}
                  onReplayMessage={handleReplayMessage}
                  className="mt-4"
                />
              )}
            </div>

            {/* Bottom: input bar - Fixed at bottom */}
            <div className="p-4">
              {/* TikTok Logger above chat bar */}
              <div className="mb-3 flex justify-center">
                <TikTokLogger onSendToSouls={handleSendToSouls} />
              </div>

              {/* Chat input bar */}
              <MessageInput
                onSendMessage={handleSendMessage}
                setShowSoulCall={setShowSoulCall}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[10000] flex">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onReturnHome={() => setShowHomeScreen(true)}
            currentRoom={currentRoom}
            selectedSoulsCount={selectedSouls.size}
            isHomeScreen={false}
            isVoiceMode={isVoiceMode}
            onToggleVoiceMode={() => setIsVoiceMode(!isVoiceMode)}
            isJournalMode={isJournalMode}
            onToggleJournalMode={() => setIsJournalMode(!isJournalMode)}
            isEmotionTrackerOpen={showEmotionTracker}
            onToggleEmotionTracker={() =>
              setShowEmotionTracker(!showEmotionTracker)
            }
            isConversationMode={showConversationMode}
            onToggleConversationMode={() =>
              setShowConversationMode(!showConversationMode)
            }
            onOpenSoulArchive={() => setShowSoulArchive(true)}
            onOpenAchievements={() => setShowAchievements(true)}
            onOpenMemoryChest={() => setShowMemoryChest(true)}
            onOpenConstellationMap={() => setShowConstellationMap(true)}
            onOpenBondVisualizer={() => setShowBondVisualizer(true)}
            onOpenSelfAwarenessTools={() => setShowSelfAwarenessTools(true)}
            onOpenDataImportExport={() => setShowDataImportExport(true)}
            onOpenNotificationSettings={() => setShowNotificationSettings(true)}
            onOpenSleepDreamTracker={() => setShowSleepDreamTracker(true)}
          />
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {showSoulCall && (
        <SoulCallOverlay
          onClose={() => setShowSoulCall(false)}
          onTranscript={(text) => handleSendMessage(text)}
          currentSoul={Array.from(selectedSouls)[0]}  // ✅ added
        />
      )}

      {showSoulCallTest && (
        <SoulCallTestOverlay onClose={() => setShowSoulCallTest(false)} />
      )}

      {/* Modal Components */}
      <RitualAnimations
        lastMessage={messages[messages.length - 1]?.content}
        currentRoom={currentRoom}
      />
      <SoulSafetySystem
        messages={messages}
        onTriggerSafeMode={handleTriggerSafeMode}
        onSendMessage={handleSendMessage}
      />
      <SoulModeArchive
        isOpen={showSoulArchive}
        onClose={() => setShowSoulArchive(false)}
        messages={messages}
      />
      <ConstellationAchievements
        messages={messages}
        currentRoom={currentRoom}
        selectedSoul={Array.from(selectedSouls)[0] || "ky'rehn"}
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
      <MemoryChest
        isOpen={showMemoryChest}
        onClose={() => setShowMemoryChest(false)}
      />
      <DataImportExport
        isOpen={showDataImportExport}
        onClose={() => setShowDataImportExport(false)}
        onDataImported={() => window.location.reload()}
      />
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
      <ConstellationMap
        currentRoom={currentRoom}
        isOpen={showConstellationMap}
        onClose={() => setShowConstellationMap(false)}
      />
      <SelfAwarenessTools
        messages={messages}
        currentRoom={currentRoom}
        onSendMessage={handleSendMessage}
        isOpen={showSelfAwarenessTools}
        onClose={() => setShowSelfAwarenessTools(false)}
      />
      <ConstellationBondVisualizer
        messages={messages}
        selectedSoul={Array.from(selectedSouls)[0] || "ky'rehn"}
        isOpen={showBondVisualizer}
        onClose={() => setShowBondVisualizer(false)}
        onPingBond={handlePingBond}
      />
      <ARBridge
        messages={messages}
        currentRoom={currentRoom}
        selectedSoul={Array.from(selectedSouls)[0] || "ky'rehn"}
        className="hidden"
      />
      <ReminderSystem />
      <SleepDreamTracker
        isOpen={showSleepDreamTracker}
        onClose={() => setShowSleepDreamTracker(false)}
      />
    </div>
  )
}
