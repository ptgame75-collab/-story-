// लोडर हटाउने
setTimeout(() => document.getElementById('loader').style.display = 'none', 2600);

let currentFontSize = 19;

function loadApp() {
    const hList = document.getElementById('hindiList');
    const nList = document.getElementById('nepaliList');
    hList.innerHTML = ''; nList.innerHTML = '';

    storyLibrary.forEach(s => {
        const card = `
            <div class="story-card" onclick="openStory('${s.id}')">
                <button class="read-btn-small">Read</button>
                <div class="story-title"><strong>${s.title}</strong></div>
            </div>`;
        if(s.lang === 'hi') hList.innerHTML += card;
        else nList.innerHTML += card;
    });
}

function openStory(id) {
    const s = storyLibrary.find(x => x.id === id);
    const body = document.getElementById('readerBody');
    const saved = localStorage.getItem('mark-' + id);

    let html = `<h1>${s.title}</h1>`;
    s.content.split('\n').forEach((p, i) => {
        if(!p.trim()) return;
        const mark = (saved == i) ? 'bookmark-line' : '';
        html += `<p class="${mark}" onclick="setMark('${id}', ${i}, this)">${p}</p>`;
    });

    html += `<div class="author-tag">लेखक: ${s.author}</div>
             <div class="green-msg">${s.summary}</div>
             <div class="thanks-msg">♡︎ Thanks For Reading ♡︎</div>`;

    body.innerHTML = html;
    body.style.fontSize = currentFontSize + 'px';
    document.getElementById('reader-mode').style.display = 'flex';
}

function setMark(id, idx, el) {
    document.querySelectorAll('#readerBody p').forEach(p => p.classList.remove('bookmark-line'));
    if(localStorage.getItem('mark-' + id) == idx) {
        localStorage.removeItem('mark-' + id);
    } else {
        localStorage.setItem('mark-' + id, idx);
        el.classList.add('bookmark-line');
    }
}

function closeReader() { document.getElementById('reader-mode').style.display = 'none'; }
function switchTab(n) {
    document.getElementById('mainSlider').style.transform = `translateX(-${n * 100}vw)`;
    document.getElementById('tabH').classList.toggle('active', n === 0);
    document.getElementById('tabN').classList.toggle('active', n === 1);
}
function toggleTheme() {
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
}
function changeFont(n) {
    currentFontSize += n;
    document.getElementById('readerBody').style.fontSize = currentFontSize + 'px';
}
function searchStory() {
    const q = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.story-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
    });
}

window.onload = loadApp;
