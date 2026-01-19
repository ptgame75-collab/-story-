function switchTab(index) {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.style.transform = `translateX(-${index * 100}vw)`;
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
    overlay.scrollTo(0, 0); // कथा खोल्दा सधैं माथिबाट खुल्नेछ
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
    const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    el.style.fontSize = (parseFloat(style) + delta) + 'px';
}
