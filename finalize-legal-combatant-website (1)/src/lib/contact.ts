export const ownerEmail = "legalcombatant001@gmail.com";

// 08112824612 in Nigerian international format, as required by wa.me and the Cloud API.
export const ownerWhatsAppNumber = "2348112824612";
export const ownerWhatsAppDisplay = "0811 282 4612";

export function getWhatsAppUrl(reference?: string, summary?: string) {
  const text = reference
    ? `Hi Legal Combatants, I submitted a profile or inquiry. My reference is ${reference}.${summary ? ` ${summary.trim().slice(0, 450)}` : ""}`
    : "Hi Legal Combatants, I'd like to build my corner. How do I get started?";

  return `https://wa.me/${ownerWhatsAppNumber}?text=${encodeURIComponent(text)}`;
}
