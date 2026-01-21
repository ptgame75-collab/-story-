window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    }, 2500);
});

function switchTab(index) {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.style.transform = `translateX(-${index * 50}%)`;
    document.querySelectorAll('.tab-nav div').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
}

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

// Side Swipe Feature
let startX;
document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    const storyView = document.getElementById('storyView');
    if (storyView && storyView.style.display !== 'block') {
        if (startX - endX > 100) switchTab(1);
        if (endX - startX > 100) switchTab(0);
    }
});

function speakStory() {
    const btn = document.getElementById('voiceBtn');
    
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        btn.innerHTML = "▶️";
        return;
    }

    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        btn.innerHTML = "⏸️";
        return;
    }

    const storyBody = document.getElementById('storyBody');
    if (!storyBody) return;
    
    const storyText = storyBody.innerText;
    const speech = new SpeechSynthesisUtterance(storyText);

    const isHindi = /[\u0900-\u097F]/.test(storyText);
    
    if (isHindi) {
        speech.lang = 'hi-IN';
        speech.rate = 0.9;
    } else {
        speech.lang = 'ne-NP'; 
        speech.rate = 0.85;
        speech.pitch = 1.1;
    }

    speech.onend = () => { btn.innerHTML = "▶️"; };

    window.speechSynthesis.speak(speech);
    btn.innerHTML = "⏸️";
}
