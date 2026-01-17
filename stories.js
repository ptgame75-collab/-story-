// लोडर हटाउने
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 2000);
    loadStories();
};

function loadStories() {
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
    const mode = document.getElementById('reader-mode');
    document.getElementById('readerBody').innerHTML = `
        <h2 style="margin-top:0;">${s.title}</h2>
        <div style="white-space: pre-wrap;">${s.content}</div>
        <div class="author-txt">लेखक: ${s.author}</div>
        <div class="msg-txt">${s.summary}</div>
        <br><center>--- अन्त ---</center>
    `;
    mode.style.display = 'block';
    setTimeout(() => mode.classList.add('active'), 10);
}

function closeReader() {
    const mode = document.getElementById('reader-mode');
    mode.classList.remove('active');
    setTimeout(() => mode.style.display = 'none', 300);
}

function switchTab(n) {
    document.getElementById('mainSlider').style.transform = `translateX(-${n * 100}vw)`;
    document.getElementById('tabH').classList.toggle('active', n === 0);
    document.getElementById('tabN').classList.toggle('active', n === 1);
}

function toggleTheme() {
    const body = document.body;
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
}

function searchStory() {
    const q = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.story-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
    });
}
