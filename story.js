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

// १. रङ्ग र सन्देशको समस्या समाधान (Line 19-31 सुधारिएको)
function openStory(title, contentId) {
    const overlay = document.getElementById('storyView');
    const body = document.getElementById('storyBody');
    const titleEl = document.getElementById('viewTitle');
    const contentData = document.getElementById(contentId).innerHTML;

    titleEl.innerText = title;
    body.innerHTML = contentData;

    // कथाको मर्म अनुसार सन्देश र रङ्ग
    let message = "";
    let msgColor = "";

    switch(contentId) {
        case 'contentN1': message = "सिन्दुरको चिहान"; msgColor = "#FF0000"; break; // सिन्दुर रातो
        case 'contentN2': message = "एकलव्य प्रेम"; msgColor = "#007BFF"; break; // नीलो
        case 'contentN3': message = "त्यागको मूर्ति"; msgColor = "#28A745"; break; // हरियो
        case 'contentH1': message = "अमर सुहाग"; msgColor = "#B22222"; break; // गाढा रातो
        case 'contentH2': message = "टुटा हुआ भरोसा"; msgColor = "#4A4A4A"; break; // खरानी
        case 'contentN4': message = "पवित्र बिछोड"; msgColor = "#4B0082"; break;// गाढा बैजनी
    }

    const victoryElement = document.querySelector('.victory-msg');
    if (victoryElement) {
        victoryElement.innerText = message;
        victoryElement.style.color = msgColor;
    }

    // नयाँ कथा खोल्दा पुरानो अडियो बन्द गर्ने
    window.speechSynthesis.cancel(); 
    document.getElementById('voiceBtn').innerHTML = "▶️";

    overlay.style.display = 'block';
    setTimeout(() => { overlay.classList.add('active'); }, 10);
    overlay.scrollTo(0, 0);
}

function closeStory() {
    window.speechSynthesis.cancel(); // ब्याक जाँदा अडियो बन्द गर्ने
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

// २. अडियो प्ले/पज समस्याको पूर्ण समाधान (Line 61 पछि सुधारिएको)
function speakStory() {
    const btn = document.getElementById('voiceBtn');
    
    // यदि बोलिरहेको छ र पज गरिएको छैन भने - पज गर्ने
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        btn.innerHTML = "▶️";
        return;
    }
    
    // यदि पज गरिएको छ भने - फेरि सुरु (Resume) गर्ने
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        btn.innerHTML = "⏸️";
        return;
    }

    // नयाँ सिरैबाट सुरु गर्ने भाग
    const storyBody = document.getElementById('storyBody');
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

    speech.onend = () => { 
        btn.innerHTML = "▶️"; 
        window.speechSynthesis.cancel(); // सफा गर्ने ताकि अर्को पटक समस्या नआओस्
    };

    window.speechSynthesis.speak(speech);
    btn.innerHTML = "⏸️";
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
