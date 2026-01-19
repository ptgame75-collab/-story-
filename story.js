// लोडिङ स्क्रिन म्यानेजमेन्ट
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 2500);
});

// ट्याब स्विच र एनिमेसन
function switchTab(index) {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.style.transform = `translateX(-${index * 50}%)`;
    document.querySelectorAll('.tab-nav div').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
}

// कथा खोल्ने र बन्द गर्ने
function openStory(title, contentId) {
    const overlay = document.getElementById('storyView');
    const body = document.getElementById('storyBody');
    const titleEl = document.getElementById('viewTitle');
    const contentData = document.getElementById(contentId).innerHTML;

    titleEl.innerText = title;
    body.innerHTML = contentData;
    
    overlay.style.display = 'block';
    setTimeout(() => { overlay.classList.add('active'); }, 10);
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

// Side Swipe Feature (ट्याब फेर्नको लागि)
let startX;
document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    // यदि कथा खुलिसकेको छैन भने मात्र स्वाइप गर्ने
    if (document.getElementById('storyView').style.display !== 'block') {
        if (startX - endX > 100) switchTab(1); // Left Swipe
        if (endX - startX > 100) switchTab(0); // Right Swipe
    }
});
