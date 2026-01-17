// १. लोडर हटाउने (३ सेकेन्ड पछि)
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').classList.add('hidden'), 500);
    }, 2500);
});

function loadApp() {
    const hList = document.getElementById('hindiList');
    const nList = document.getElementById('nepaliList');
    hList.innerHTML = ''; nList.innerHTML = '';

    storyLibrary.forEach(s => {
        const card = `
            <div class="story-card">
                <div class="story-title">${s.title}</div>
                <button class="read-btn-small" onclick="openStory('${s.id}')">Read</button>
            </div>`;
        if(s.lang === 'hi') hList.innerHTML += card;
        else nList.innerHTML += card;
    });
}

function openStory(id) {
    const s = storyLibrary.find(x => x.id === id);
    const body = document.getElementById('readerBody');
    const mode = document.getElementById('reader-mode');
    
    document.getElementById('reading-title').innerText = s.title;
    body.innerHTML = `
        <h1>${s.title}</h1>
        <p>${s.content.replace(/\n/g, '</p><p>')}</p>
        <div class="author-name">लेखक: ${s.author}</div>
        <div class="green-summary">${s.summary}</div>
        <div style="text-align:center; padding: 20px; color:#999;">♡︎ अन्त ♡︎</div>
    `;

    mode.classList.remove('hidden');
    setTimeout(() => mode.classList.add('active'), 10); // सानो एनिमेसन ट्रान्जिसन
}

function closeReader() {
    const mode = document.getElementById('reader-mode');
    mode.classList.remove('active');
    setTimeout(() => mode.classList.add('hidden'), 400);
}

function switchTab(n) {
    document.getElementById('mainSlider').style.transform = `translateX(-${n * 100}vw)`;
    document.getElementById('tabH').classList.toggle('active', n === 0);
    document.getElementById('tabN').classList.toggle('active', n === 1);
}

function toggleTheme() {
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
}

loadApp();
