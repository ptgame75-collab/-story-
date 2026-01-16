window.onload = () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app-main').classList.remove('hidden');
        renderStories();
    }, 2500);
};

async function renderStories() {
    const res = await fetch('stories.json');
    const data = await res.json();
    const container = document.getElementById('story-container');
    container.innerHTML = data.map(s => `
        <div class="story-card">
            <h3>${s.title}</h3>
            <p>${s.date}</p>
            <button class="open-btn" onclick="viewStory('${s.id}')">Open Story</button>
        </div>
    `).join('');
}

function viewStory(id) {
    document.getElementById('app-main').classList.add('hidden');
    document.getElementById('story-reader').classList.remove('hidden');
    // कथा लोड गर्ने लोजिक यहाँ थप्न सकिन्छ
}

function closeStory() {
    document.getElementById('story-reader').classList.add('hidden');
    document.getElementById('app-main').classList.remove('hidden');
}

document.getElementById('theme-btn').onclick = () => document.body.classList.toggle('dark');
