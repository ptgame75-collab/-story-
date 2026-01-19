// १. लोडिङ स्क्रिन हटाउने
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 2500);
});

// २. ट्याब स्विच र साइड स्वाइप
function switchTab(index) {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.style.transform = `translateX(-${index * 50}%)`;
    document.querySelectorAll('.tab-nav div').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
}

// ३. कथा म्यानेजमेन्ट
function openStory(title, contentId) {
    const overlay = document.getElementById('storyView');
    const body = document.getElementById('storyBody');
    const titleEl = document.getElementById('viewTitle');
    const contentData = document.getElementById(contentId).innerHTML;

    titleEl.innerText = title;
    body.innerHTML = contentData;
    
    overlay.style.display = 'block';
    setTimeout(() => { overlay.classList.add('active'); }, 10);
    overlay.scrollTo(0, 0);
}

function closeStory() {
    const overlay = document.getElementById('storyView');
    overlay.classList.remove('active');
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
}

function toggleTheme() {
    document.body.classList.toggle('night-mode');
}

function changeFontSize(delta) {
    const el = document.getElementById('storyBody');
    const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
    el.style.fontSize = (currentSize + delta) + 'px';
}

// ४. स्वाइप जेस्चर
let startX;
document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (document.getElementById('storyView').style.display !== 'block') {
        if (startX - endX > 100) switchTab(1);
        if (endX - startX > 100) switchTab(0);
    }
});
