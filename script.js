// 1. CONFIGURATION: Side Views (Edge Clicks)
const config = {
    "frameworkA.html": {
        default: "frameworkA.html",
        top: "aup.html",
        bottom: "adown.html",
        left: "aleft.html",
        right: "aright.html"
    },
    "frameworkB.html": {
        default: "frameworkB.html",
        top: "bup.html",
        bottom: "bdown.html",
        left: "bleft.html",
        right: "bright.html"
    },
    "frameworkC.html": {
        default: "frameworkC.html",
        top: "cup.html",
        bottom: "cdown.html",
        left: "cleft.html",
        right: "cright.html"
    },
    "frameworkD.html": {
        default: "frameworkD.html",
        top: "dup.html",
        bottom: "ddown.html"
    }
};

// 2. CONFIGURATION: Keyboard Navigation (WASD/Interaction)
const allMaps = {
    "frameworkA.html": { 'a': 'frameworkB.html' },
    "frameworkB.html": { 'w': 'frameworkC.html', 's': 'frameworkA.html' },
    "frameworkC.html": { 's': 'frameworkB.html', 'a': 'frameworkD.html' },
    "frameworkD.html": { 's': 'frameworkC.html', 'i': 'i1.html' },
    "i1.html": { 'e': 'frameworkA.html', 'i': 'i2.html' },
    "i2.html": { 'e': 'frameworkA.html', 'i': 'i3.html' },
    "i3.html": { 'e': 'frameworkA.html' }
};

// State track karne ke liye variable
let activeSide = null;

// --- EDGE CLICK FUNCTION ---
function rotateIframe(side) {
    const frame = document.getElementById('myIframe');
    if (!frame) return;

    let currentPath = frame.getAttribute('src') || "";
    let currentFile = currentPath.split('/').pop().split('?')[0];

    if (activeSide) {
        // Agar pehle se side view mein hai toh default par wapas jao
        frame.src = activeSide.parent;
        activeSide = null;
    } else {
        // Naye side view par jao
        const data = config[currentFile];
        if (data && data[side]) {
            activeSide = { side: side, parent: currentFile };
            frame.src = data[side];
        }
    }
    
    // Smooth transition effect
    frame.style.opacity = "0.7";
    setTimeout(() => { frame.style.opacity = "1"; }, 200);
}

// --- KEYBOARD NAVIGATION ENGINE ---
window.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase();
    const iframe = document.getElementById('myIframe');
    if (!iframe) return;

    let currentPath = iframe.getAttribute('src') || "";
    let currentFile = decodeURIComponent(currentPath.split('/').pop().split('?')[0]);

    const activeMap = allMaps[currentFile];

    if (activeMap && activeMap[keyPressed]) {
        activeSide = null; // Map change hone par side view reset karein
        const baseSrc = activeMap[keyPressed];
        
        iframe.src = baseSrc;
        
        // Console log for debugging
        console.log(`Moving from ${currentFile} to ${baseSrc} via '${keyPressed}'`);
    }
});