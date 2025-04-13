// AutoRotateStatus - Plugin dla Vendetta Discord (Android)
// Autor: [Twój Nick]
// Opis: Automatycznie zmienia status co X sekund

let statusIndex = 0;
const statusList = [
    "Vendetta 🔪", 
    "DarkRP 🎮", 
    "Garry's Mod 🏗️",
    "https://vendetta.gg/"
];
const updateInterval = 5000; // 5 sekund (zmień, jeśli chcesz)

function updateStatus() {
    const newStatus = statusList[statusIndex];
    vendetta.settings.set("status", newStatus); // Vendetta API (teoretyczne)
    // Alternatywnie, jeśli Vendetta używa DiscordNative:
    // DiscordNative.setStatus(newStatus); 
    
    statusIndex = (statusIndex + 1) % statusList.length;
}

// Uruchom rotację
const intervalId = setInterval(updateStatus, updateInterval);

// Usuń interval przy wyłączaniu pluginu (ważne!)
export function onUnload() {
    clearInterval(intervalId);
}