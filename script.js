// ३. script.js

// स्प्लास स्क्रिन २ सेकेन्डपछि हटाउने
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app-home').classList.remove('hidden');
        loadStories(); // कथाहरू लोड गर्ने
    }, 2500);
});

// कथाहरू लोड गर्ने फङ्सन
async function loadStories() {
    const response = await fetch('stories.json');
    const stories = await response.json();
    const list = document.getElementById('story-list');
    
    stories.forEach(story => {
        const card = document.title === "ne" ? story.nepali : story.hindi;
        list.innerHTML += `
            <div class="story-card">
                <p style="font-size: 12px; color: gray;">${story.date} • ${story.readTime}</p>
                <h2>${story.title}</h2>
                <button class="open-btn" onclick="openStory('${story.id}')">Open Story</button>
            </div>
        `;
    });
}

// फन्ट साइज परिवर्तन गर्ने
let currentFontSize = 18;
function changeFontSize(delta) {
    currentFontSize += delta;
    document.getElementById('content-area').style.fontSize = currentFontSize + 'px';
}

// थिम परिवर्तन (Day/Night Mode)
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
