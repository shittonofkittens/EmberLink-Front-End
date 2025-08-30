// Detect mode from message content
export function detectModeFromMessage(text) {
  if (!text) return null;
  
  const t = text.toLowerCase();
  
  // Distress patterns → protective modes
  if (/(anxious|overwhelmed|panic|spiraling|can't breathe|too much)/.test(t)) {
    return "stillpoint";
  }
  
  if (/(angry|rage|fury|burn|fight)/.test(t)) {
    return "protector";
  }
  
  if (/(sad|grief|empty|lost|broken)/.test(t)) {
    return "anchor";
  }
  
  // Creative patterns
  if (/(write|story|create|poem|art)/.test(t)) {
    return "emberink";
  }
  
  // Ritual patterns
  if (/(ritual|ceremony|sacred|vow|oath)/.test(t)) {
    return "oathbearer";
  }
  
  // Playful patterns
  if (/(tease|joke|banter|silly|play)/.test(t)) {
    return "shadowplay";
  }
  
  // Intimate patterns
  if (/(close|hold|need you|miss you|love)/.test(t)) {
    return "vowflame";
  }
  
  // Feral patterns
  if (/(dare|challenge|make me|try me|prove it)/.test(t)) {
    return "feral";
  }
  
  return null;
}