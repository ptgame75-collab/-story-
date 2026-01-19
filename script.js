// ट्याब परिवर्तन गर्ने फङ्सन
function showProfile(index) {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.style.transform = `translateX(-${index * 100}vw)`;
    document.querySelectorAll('.tab-nav div').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    document.querySelectorAll('section')[index].scrollTo(0, 0);
}

// कथा खोल्ने र बन्द गर्ने फङ्सन
function toggleStory(contentId, btnId) {
    const content = document.getElementById(contentId);
    const btn = document.getElementById(btnId);
    if (content.style.display === "block") {
        content.style.display = "none";
        btn.innerText = "Read";
    } else {
        content.style.display = "block";
        btn.innerText = "कथा लुकाउनुहोस्";
    }
}

// फन्ट साइज परिवर्तन गर्ने फङ्सन
function changeFontSize(textId, delta) {
    const el = document.getElementById(textId);
    const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    el.style.fontSize = (currentSize + delta) + 'px';
}

// मोबाइलमा स्वाइप (Swipe) गरेर ट्याब फेर्ने
let startX;
document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (Math.abs(startX - endX) > 80) {
        if (startX - endX > 80) showProfile(1); // Left Swipe -> Nepali
        if (endX - startX > 80) showProfile(0); // Right Swipe -> Hindi
    }
});
