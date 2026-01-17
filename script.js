// ३ सेकेन्डको स्प्ल्याश स्क्रिन
setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('app-content').classList.remove('hidden');
    renderStories('nepali');
}, 3000);

function switchLang(lang, pos) {
    document.getElementById('tab-underline').style.left = pos + '%';
    renderStories(lang);
}

function renderStories(lang) {
    const container = document.getElementById('story-container');
    container.innerHTML = '';
    allStories[lang].forEach(s => {
        const isDone = localStorage.getItem(s.id) === 'true';
        container.innerHTML += `
            <div class="story-card">
                <span class="tick-btn ${isDone ? 'active' : ''}" onclick="toggleTick(this, '${s.id}')">✅</span>
                <h2>${s.title}</h2>
                <p class="story-text">${s.content}</p>
                <div class="author-info">लेखकको नाम:- ${s.author}</div>
                <div class="moral-text">${s.moral}</div>
                <div class="thanks-msg">♡︎ Thanks For Reading ♡︎</div>
            </div>`;
    });
}

function toggleTick(el, id) {
    const active = el.classList.toggle('active');
    localStorage.setItem(id, active);
}

function toggleNightMode() {
    document.body.classList.toggle('dark-mode');
}

let fSize = 18;
function changeFontSize(n) {
    fSize += n;
    document.querySelectorAll('.story-text').forEach(p => p.style.fontSize = fSize + 'px');
}
