window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
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
    if (document.getElementById('storyView').style.display !== 'block') {
        if (startX - endX > 100) switchTab(1);
        if (endX - startX > 100) switchTab(0);
    }
});
function speakStory() {
    const btn = document.getElementById('voiceBtn');
    
    // यदि पहिले नै बोलिरहेको छ भने रोक्ने र आइकन बदल्ने
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        btn.innerHTML = "▶️";
        return;
    }

    // कथाको मुख्य भागबाट अक्षरहरू लिने
    const storyText = document.getElementById('storyBody').innerText;
    const speech = new SpeechSynthesisUtterance(storyText);

    // भाषा पहिचान: हिन्दी अक्षर भए हिन्दी आवाज, नत्र नेपाली
    const isHindi = /[\u0900-\u097F]/.test(storyText);
    speech.lang = isHindi ? 'hi-IN' : 'ne-NP';
    
    // सुन्न मिठो सुनिने गति
    speech.rate = 0.9;

    // जब कथा वाचन सकिन्छ, आइकन आफैँ बदल्ने
    speech.onend = () => {
        btn.innerHTML = "▶️";
    };

    // आवाज सुरु गर्ने र बटनको आइकन बदल्ने
    window.speechSynthesis.speak(speech);
    btn.innerHTML = "⏸️";
}
