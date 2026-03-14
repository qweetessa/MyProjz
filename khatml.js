// --- KEEPING YOUR PREVIOUS DATA & ADDING IMAGE POOL ---
const datingImages = [
    "https://i.pinimg.com/1200x/39/26/66/3926665510879508faa859d4db5d56d8.jpg",
    "https://media.tenor.com/rHQpLu7XsGYAAAA1/wolf-cringe.webp",
    "https://media.tenor.com/LZZF0hwz2uQAAAA1/wtf-cringe.webp",
    "https://media.tenor.com/MfkqNPu8fZoAAAA1/love-i-love-you.webp",
    "https://media.tenor.com/Q9ijN3Obc0cAAAA1/fnaf-feet-tiktok.webp",
    "https://media.tenor.com/uZFCEzezeRIAAAA1/indian-tiktok-cringe.webp",
    "https://media.tenor.com/ksJV-8t1mqMAAAA1/cringe-cringe-face.webp",
    "https://media.tenor.com/9VXjhXEf34AAAAA1/indian-indian-tiktok.webp",
    "https://media.tenor.com/ZrO9ssqAK6gAAAA1/haa-dil-vich-haa-dil-vichon.webp",
];

// --- YOUR ORIGINAL RETRO POPUP CODE ---
function createRetroPopup() {
    const bleep = new Audio('your-80s-beep.mp3'); 
    bleep.play().catch(() => {});

    // FLASH MATRIX PINK (Your request)
    ctx.fillStyle = "#ff00ff"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const messages = [
        "FATAL ERROR: COBOL OVERFLOW",
        "INSERT DISKETTE B: TO CONTINUE",
        "SYSTEM OVERLOAD - CHECK COOLING FAN",
        "RAM CAPACITY REACHED: 64KB FULL"
    ];

    const popup = document.createElement('div');
    popup.className = 'retro-popup';
    popup.style.left = Math.random() * (window.innerWidth - 350) + 'px';
    popup.style.top = Math.random() * (window.innerHeight - 200) + 'px';

    popup.innerHTML = `
        <div class="retro-title-bar">
            <span>*** SYSTEM ALERT ***</span>
            <div class="retro-close-btn" onclick="multiplyRetro(this)">X</div>
        </div>
        <div class="retro-content">
            <p>> ${messages[Math.floor(Math.random() * messages.length)]}</p>
            <p>> STATUS: UNRECOVERABLE</p>
            <button class="retro-btn" onclick="multiplyRetro(this)">RETRY</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function multiplyRetro(btn) {
    btn.closest('.retro-popup').remove();
    for(let i=0; i<3; i++) {
        setTimeout(createRetroPopup, i * 200);
    }
}

// --- YOUR ORIGINAL MATRIX CODE ---
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF";
const charArray = chars.split("");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- UPDATED DATING POPUP WITH RANDOM IMAGES ---
function spawnDatingPopup() {
    const synthBeep = new Audio('https://www.myinstants.com/media/sounds/8-bit-error.mp3'); 
    synthBeep.play().catch(() => {}); 

    const lines = [
        "HOT BIHARIS IN YOUR AREA!",
        "SINGLE CHICKS WANT TO CHAT WITH YOU!",
        "YOU'VE BEEN SELECTED (FOR A DATE)!",
        "CLICK TO WIN A FREE A CUTE FEMBOY!",
        "HOT UWU GIRLS WAITING FOR YOU!"
    ];

    const popup = document.createElement('div');
    popup.className = 'dating-popup';
    
    // Pick Random Image and Random Line
    const randomImg = datingImages[Math.floor(Math.random() * datingImages.length)];
    const randomLine = lines[Math.floor(Math.random() * lines.length)];

    popup.style.left = Math.random() * (window.innerWidth - 320) + 'px';
    popup.style.top = Math.random() * (window.innerHeight - 300) + 'px';

    popup.innerHTML = `
        <div class="dating-header">
            <span>*** SYSTEM ALERT ***</span>
            <span style="cursor:pointer" onclick="closeAndMultiply(this)">[X]</span>
        </div>
        <div class="dating-content">
            <h2 style="margin:0; font-size: 14px;">!!! WARNING !!!</h2>
            <p style="font-size: 12px;">${randomLine}</p>
            <img src="${randomImg}" style="width:100%; height:150px; object-fit:cover; border: 1px solid black; filter: hue-rotate(${Math.random() * 360}deg);">
        </div>
        <button class="dating-btn" onclick="closeAndMultiply(this)">ACCEPT MATCH</button>
    `;

    document.body.appendChild(popup);
}

function closeAndMultiply(el) {
    el.closest('.dating-popup').remove();
    setTimeout(spawnDatingPopup, 200);
    setTimeout(spawnDatingPopup, 400);
}

// --- INITIAL TIMEOUTS ---
setTimeout(createRetroPopup, 2000);
setTimeout(spawnDatingPopup, 3000);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let timeLeft = 90;
const timerElement = document.createElement('div');
timerElement.id = 'troll-timer';
document.body.appendChild(timerElement);

const closeBtn = document.createElement('button');
closeBtn.id = 'real-close-btn';
closeBtn.innerText = "🛑 STOP ALL VIRUSES & CLOSE ADS";
document.body.appendChild(closeBtn);

// Function to update the countdown
const countdown = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `SYSTEM PURGE IN: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        timerElement.style.display = 'none';
        closeBtn.style.display = 'block'; // Show the "Real" button
    }
}, 1000);

// The "Real" Close Action
closeBtn.onclick = function() {
    // 1. Stop the Matrix
    if(typeof drawMatrix !== 'undefined') {
        clearInterval(matrixInterval); // Make sure your setInterval for matrix is named matrixInterval
    }
    
    // 2. Clear all popups
    const allRetros = document.querySelectorAll('.retro-popup');
    const allDatings = document.querySelectorAll('.dating-popup');
    
    allRetros.forEach(el => el.remove());
    allDatings.forEach(el => el.remove());

    // 3. Disable the spawning functions
    spawnDatingPopup = function() { console.log("Spam blocked."); };
    createRetroPopup = function() { console.log("Spam blocked."); };

    // 4. Final Success Message
    this.innerText = "SYSTEM SECURED. YOU ARE SAFE... FOR NOW.";
    this.style.background = "lime";
    
    setTimeout(() => {
        this.remove();
    }, 3000);
};
// The "Real" Close Action - FIXED
closeBtn.onclick = function() {
    // 1. THE KILL SWITCH: Redefine the functions so they do NOTHING
    // This prevents the "closeAndMultiply" logic from triggering during cleanup
    window.spawnDatingPopup = function() { return false; };
    window.createRetroPopup = function() { return false; };
    window.closeAndMultiply = function() { return false; };
    window.multiplyRetro = function() { return false; };

    // 2. Stop the Matrix Rain animation
    if (typeof matrixInterval !== 'undefined') {
        clearInterval(matrixInterval);
    }
    
    // 3. Force-remove every element with these classes from the DOM
    const killList = ['.retro-popup', '.dating-popup', '.xp-popup', '.popup-box'];
    killList.forEach(className => {
        const elements = document.querySelectorAll(className);
        elements.forEach(el => el.remove());
    });

    // 4. Update the Button to show success
    this.innerText = "SYSTEM SECURED. ALL THREATS REMOVED.";
    this.style.background = "#00ff00";
    this.style.color = "#000";
    
    // Optional: Hide the button after 5 seconds
    setTimeout(() => {
        this.style.display = 'none';
    }, 5000);
};
closeBtn.onclick = function() {
    // 1. KILL ALL SPAM FUNCTIONS IMMEDIATELY
    window.spawnDatingPopup = () => false;
    window.createRetroPopup = () => false;
    window.closeAndMultiply = () => false;
    window.multiplyRetro = () => false;

    // 2. Stop the Matrix animation
    if (typeof matrixInterval !== 'undefined') clearInterval(matrixInterval);
    
    // 3. Wipe all popups from the screen
    const classes = ['.retro-popup', '.dating-popup', '.xp-popup', '.popup-box'];
    classes.forEach(cls => document.querySelectorAll(cls).forEach(el => el.remove()));

    // 4. Update button appearance
    this.innerText = "SYSTEM SECURED. ALL THREATS REMOVED.";
    this.style.background = "#00ff00";
    this.style.color = "#000";
    this.style.cursor = "default";

    // 5. The Final Sequence
    setTimeout(() => {
        // Show a final browser notification
        alert("CRITICAL UPDATE: All malicious threads have been successfully purged from C:/Users/iqrar/.\n\nClick OK to return to the secure homepage.");
        
        // Redirect to your other HTML page
        window.location.href = 'khatml.html'; 
    }, 1500);
};