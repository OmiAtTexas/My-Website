// Go Back button functionality
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // replace with your portfolio URL if different
});



// ---------- TIMELINE ENTRIES ----------
const entries = [
    { date: "07.28.2006", desc: "Entered the World :-)", link: "" },
    { date: "2007 - 2024", desc: "LIFE HAPPEND :D", link: "" },
    { date: "01.08.2026", desc: "added timeline feature to my website rather than writing in dairies :D", link: "" },
    { date: "01.09.2026", desc: "Working on REST API Project (Go Lang) and Learning DBMS", link: "" },

    // adding my entries here.

];

const container = document.getElementById("timeline");

// ---------- STATIC ENTRIES ----------
entries.slice(0, -1).forEach(item => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";

    if (item.date) {
        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = item.date;
        entryDiv.appendChild(dateSpan);
    }

    const descSpan = document.createElement(item.link ? "a" : "span");
    descSpan.className = "desc";
    if (item.link) {
        descSpan.href = item.link;
        descSpan.target = "_blank";
    }
    descSpan.textContent = item.desc;
    entryDiv.appendChild(descSpan);

    container.appendChild(entryDiv);
});

// ---------- LAST ENTRY WITH CONTINUOUS TYPING ----------
const latest = entries[entries.length - 1];
const latestDiv = document.createElement("div");
latestDiv.className = "entry";

const latestDateSpan = document.createElement("span");
latestDateSpan.className = "date";
latestDiv.appendChild(latestDateSpan);

const latestDescSpan = document.createElement(latest.link ? "a" : "span");
latestDescSpan.className = "desc";
if (latest.link) {
    latestDescSpan.href = latest.link;
    latestDescSpan.target = "_blank";
}
latestDiv.appendChild(latestDescSpan);
container.appendChild(latestDiv);

// Typing effect variables
let textToType = (latest.date ? latest.date + "\n" : "") + latest.desc;
let charIndex = 0;
let typingForward = true;

function typeLatestContinuous() {
    if (typingForward) {
        if (charIndex < textToType.length) {
            const char = textToType.charAt(charIndex);
            if (charIndex < (latest.date ? latest.date.length + 1 : 0)) {
                latestDateSpan.textContent += char;
            } else {
                latestDescSpan.textContent += char;
            }
            charIndex++;
            setTimeout(typeLatestContinuous, 50);
        } else {
            typingForward = false;
            setTimeout(typeLatestContinuous, 5000);
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
            if (charIndex < (latest.date ? latest.date.length + 1 : 0)) {
                latestDateSpan.textContent = latest.date ? latest.date.slice(0, charIndex) : '';
            } else {
                latestDescSpan.textContent = textToType.slice(latest.date ? latest.date.length + 1 : 0, charIndex);
            }
            setTimeout(typeLatestContinuous, 30);
        } else {
            typingForward = true;
            setTimeout(typeLatestContinuous, 5000);
        }
    }
}
typeLatestContinuous();

window.addEventListener('load', () => {
    const latestDiv = document.querySelector('#timeline .entry:last-child');
    if (latestDiv) {
        latestDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// ---------- OM'S STANDARD TIME ----------
function updateTime() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Chicago' // change to your timezone
    };
    document.getElementById('time').textContent = now.toLocaleTimeString('en-US', options);
}
setInterval(updateTime, 1000);
updateTime();
