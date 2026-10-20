/** Point-in-time Semrush Canada sample, 2026-10-19. Not town demand or guaranteed rankings. */
export const SERVICE_KEYWORDS = {
  consulting: { primary: "security consulting", volume: 170, difficulty: 20, secondary: ["security risk assessment"], question: "What should a security risk assessment include?" },
  cctv: { primary: "security camera installation", volume: 1000, difficulty: 21, secondary: ["surveillance camera installation", "CCTV installation", "commercial security cameras"], question: "What should a security camera installation include?" },
  intrusion: { primary: "business alarm systems", volume: 320, difficulty: 38, secondary: ["commercial alarm systems", "alarm monitoring"], question: "What happens after a commercial alarm is triggered?" },
  access: { primary: "access control systems", volume: 720, difficulty: 30, secondary: ["commercial access control system", "door access control system", "access control solutions"], question: "How do access control systems work?" },
  remote: { primary: "remote video monitoring", volume: 110, difficulty: 11, secondary: ["live video monitoring", "security camera monitoring service", "CCTV monitoring"], question: "How does remote video monitoring work?" },
  guards: { primary: "security guard services", volume: 880, difficulty: 18, secondary: ["mobile patrol security"], question: "What needs to be confirmed before arranging on-site security?" },
  smart: { primary: "building automation systems", volume: 720, difficulty: 39, secondary: ["smart building automation"], question: "What is a building automation system?" },
  cyber: { primary: "cybersecurity services", volume: 880, difficulty: 19, secondary: ["cyber security services", "network security services"], question: "What should cybersecurity services cover?" },
} as const;