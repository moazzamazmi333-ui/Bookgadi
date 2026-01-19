if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js?v=2') // v=2 डालने से ब्राउज़र नई फाइल उठाएगा
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.log("SW Error:", err));
}
