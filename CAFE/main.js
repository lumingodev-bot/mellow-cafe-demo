// ---- Edit this ----
const CONFIG = { whatsapp: "260970000000" }; // country code + number, no "+" or spaces

const root = document.documentElement;
const menuEl = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-toggle-button');
const themeBtn = document.querySelector('.theme-toggle-button');

// MENU
const setMenu = open => {
    menuEl.classList.toggle('active', open);
    menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', open);
};
menuBtn.addEventListener('click', () => setMenu(!menuEl.classList.contains('active')));
document.addEventListener('click', e => {
    if (e.target.closest('.list-link') && menuEl.contains(e.target)) setMenu(false);
    else if (!menuEl.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// THEME (saved choice wins, otherwise follows the device)
const syncTheme = () => themeBtn.setAttribute('aria-pressed', root.classList.contains('dark-theme'));
syncTheme();
themeBtn.addEventListener('click', () => {
    const dark = root.classList.toggle('dark-theme');
    try { dark ? localStorage.setItem('darkTheme', 'active') : localStorage.setItem('darkTheme', 'off'); } catch (e) {}
    syncTheme();
});

// IMAGES: hide or remove broken images so the layout still looks intentional
document.querySelectorAll('img[data-fallback]').forEach(img => {
    const fail = () => img.dataset.fallback === 'remove'
        ? (img.parentElement.classList.contains('inline-image') ? img.parentElement : img.parentElement).remove()
        : (img.style.display = 'none');
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener('error', fail);
});

// WHATSAPP + CONTACT FORM
document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hi, I'd like a website for my business.")}`;
    a.target = '_blank'; a.rel = 'noopener';
});
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const text = `Hi, I'm ${f.name.value} (${f.email.value}). ${f.message.value}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    f.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

// SCROLL REVEAL (skipped if the library fails to load or the visitor prefers less motion)
if (window.ScrollReveal && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sr = ScrollReveal({ distance: '40px', duration: 1000, easing: 'cubic-bezier(.2,.7,.2,1)' });
    sr.reveal('.main-title', { origin: 'top' });
    sr.reveal('.hero-sub, .hero-actions', { origin: 'bottom', delay: 300 });
    sr.reveal('.scroll-reveal-left', { origin: 'right' });
    sr.reveal('.scroll-reveal-right', { origin: 'left' });
    sr.reveal('.tech-stack-item', { interval: 200 });
    sr.reveal('.section-title', { origin: 'top' });
    sr.reveal('.portfolio-card', { interval: 250 });
    sr.reveal('.large-button-container', { delay: 200 });
    sr.reveal('.form-container', { origin: 'top' });
}
