// Global variables
let currentCurrency = 'RUB';
let currentCat = 'coffins';
let carousels = {};
let lbImgs = [];
let lbIdx = 0;
let _mCat = '', _mIdx = 0, _mVi = 0;

// Category styles
const catSt = { coffins: 'cat-coffins', wreaths: 'cat-wreaths', crosses: 'cat-crosses', monuments: 'cat-monuments' };
const fvIds = ['art-video', 'relief-video', 'modeling-photos'];

// Format price
function fmtPrice(p) {
    return 'от ' + Math.round(p * rates[currentCurrency]).toLocaleString('ru-RU') + ' ' + syms[currentCurrency];
}

// Generate checks HTML
function checks(items, color = '#9A8A65', size = '14') {
    return items.map(f => `<div class="flex items-center gap-2 text-[13px] text-white/55">${CHECK_SVG_GOLD(color)}${f}</div>`).join('');
}

function checksLi(items, color = '#9A8A65') {
    return items.map(f => `<li class="flex items-center gap-2 text-[12px] text-white/45">${CHECK_SM(color)}${f}</li>`).join('');
}

// Video slot
function videoSlot(label) {
    return `<div class="video-slot" onclick="event.stopPropagation();openLightboxVideo()"><div class="video-slot-inner"><div class="play-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="8,5 20,12 8,19"/></svg></div><div class="vid-label">${label || 'Видео'}</div></div></div>`;
}

// Carousel functions
function slideCarousel(id, dir) {
    const c = carousels[id];
    if (!c) return;
    c.current = (c.current + dir + c.total) % c.total;
    const t = document.querySelector(`[data-track="${id}"]`);
    if (t) t.style.transform = `translateX(-${c.current * 100}%)`;
    document.querySelectorAll(`[data-dots="${id}"] span`).forEach((d, i) => d.classList.toggle('active', i === c.current));
}

// Lightbox functions
function openLightbox(imgs, i) {
    lbImgs = imgs;
    lbIdx = i || 0;
    renderLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openLightboxVideo() {
    const lb = document.getElementById('lightbox');
    lb.innerHTML = `<button class="lb-close" onclick="event.stopPropagation();closeLightbox()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button><div class="lb-vid"><div class="play-icon" style="width:72px;height:72px"><svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="8,5 20,12 8,19"/></svg></div></div><div class="lb-counter">Видео будет добавлено</div>`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
    if (!document.getElementById('modalOverlay').classList.contains('hidden')) document.body.style.overflow = 'hidden';
}

function renderLightbox() {
    const lb = document.getElementById('lightbox');
    let h = `<button class="lb-close" onclick="event.stopPropagation();closeLightbox()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`;
    if (lbImgs.length > 1) h += `<button class="lb-nav lb-prev" onclick="event.stopPropagation();slideLightbox(-1)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg></button><button class="lb-nav lb-next" onclick="event.stopPropagation();slideLightbox(1)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg></button>`;
    h += `<img src="${lbImgs[lbIdx]}" alt="" class="lb-img" onclick="event.stopPropagation()"><div class="lb-counter">${lbIdx + 1} / ${lbImgs.length}</div>`;
    lb.innerHTML = h;
}

function slideLightbox(dir) {
    lbIdx = (lbIdx + dir + lbImgs.length) % lbImgs.length;
    renderLightbox();
}

// Modal functions
function openModalEl() {
    const o = document.getElementById('modalOverlay');
    o.classList.remove('hidden');
    o.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const o = document.getElementById('modalOverlay');
    o.classList.add('hidden');
    o.classList.remove('flex');
    document.body.style.overflow = '';
}

// Sub-modal functions
function openSubModal(type) {
    const content = document.getElementById('globalSubModalContent');
    if (type === 'phone') {
        content.innerHTML = `<div class="text-[15px] font-semibold text-[#1A1A18] mb-4 pr-8">Позвонить</div><div class="space-y-3">
            <div><div class="text-[11px] uppercase tracking-wider text-[#9B9890] font-semibold mb-1">Приднестровье</div><a href="tel:+37377954044" class="block text-lg font-semibold text-[#1A1A18]">+373 779 54 044</a><a href="tel:+37377861889" class="block text-lg font-semibold text-[#1A1A18] mt-1">+373 778 61 889</a></div>
            <div><div class="text-[11px] uppercase tracking-wider text-[#9B9890] font-semibold mb-1">Молдова</div><a href="tel:+373068559200" class="block text-lg font-semibold text-[#1A1A18]">+373 068 559 200</a></div></div>`;
    } else {
        const mesLink = (href, ico, bg, name) => `<a href="${href}" target="_blank" class="flex items-center gap-3 rounded-xl border border-black/6 px-4 py-3 text-[13px] font-medium text-[#1A1A18] hover:bg-black/3 transition" onclick="closeSubModal()"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-white" style="background:${bg};font-size:16px">${ico}</div><span>${name}</span><span class="ml-auto text-[#9B9890]">→</span></a>`;
        content.innerHTML = `<div class="text-[15px] font-semibold text-[#1A1A18] mb-4 pr-8">Написать</div><div class="space-y-2">
            ${mesLink('https://wa.me/37377861889', '💬', '#25D366', 'WhatsApp')}
            ${mesLink('https://t.me/guchevgranit', '✈️', '#229ED9', 'Telegram')}
            ${mesLink('viber://chat?number=%2B37377954044', '📱', '#7360F2', 'Viber')}</div>`;
    }
    const m = document.getElementById('globalSubModal');
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeSubModal() {
    const m = document.getElementById('globalSubModal');
    m.style.display = 'none';
    document.body.style.overflow = '';
}

// Main modal open
function openModal(type) {
    const title = document.getElementById('modalTitle'), body = document.getElementById('modalBody');
    if (type === 'phone') {
        title.textContent = 'Свяжитесь с нами';
        body.innerHTML = `<div class="space-y-4"><div class="rounded-xl bg-black/3 p-5">
            <div class="text-[11px] uppercase tracking-wider text-[#9B9890] font-semibold mb-2">Приднестровье</div>
            <a href="tel:+37377954044" class="block text-xl font-semibold text-[#1A1A18] hover:text-[#6B6960] transition">+373 779 54 044</a>
            <a href="tel:+37377861889" class="block text-xl font-semibold text-[#1A1A18] hover:text-[#6B6960] transition mt-2">+373 778 61 889</a>
            <div class="text-[11px] uppercase tracking-wider text-[#9B9890] font-semibold mb-2 mt-4">Молдова</div>
            <a href="tel:+373068559200" class="block text-xl font-semibold text-[#1A1A18] hover:text-[#6B6960] transition">+373 068 559 200</a>
            <div class="text-[12px] text-[#9B9890] mt-3 leading-[1.6]">Без выходных · Ответим в любое время</div></div>
            <div class="space-y-1.5"><div class="text-[11px] uppercase tracking-wider text-[#9B9890] font-semibold mb-1">Или напишите в мессенджер</div>
            <a href="https://wa.me/37377861889" target="_blank" class="flex items-center justify-between rounded-xl border border-black/6 px-4 py-3 text-[13px] font-medium text-[#1A1A18] hover:bg-black/3 transition"><span>WhatsApp</span><span class="text-[#9B9890]">→</span></a>
            <a href="https://t.me/guchevgranit" target="_blank" class="flex items-center justify-between rounded-xl border border-black/6 px-4 py-3 text-[13px] font-medium text-[#1A1A18] hover:bg-black/3 transition"><span>Telegram</span><span class="text-[#9B9890]">→</span></a>
            <a href="viber://chat?number=%2B37377954044" class="flex items-center justify-between rounded-xl border border-black/6 px-4 py-3 text-[13px] font-medium text-[#1A1A18] hover:bg-black/3 transition"><span>Viber</span><span class="text-[#9B9890]">→</span></a></div></div>`;
    } else {
        title.textContent = 'Написать нам';
        const mk = (href, ico, bg, n) => `<a href="${href}" target="_blank" class="flex items-center gap-3 rounded-xl border border-black/6 px-4 py-3 text-[13px] font-medium text-[#1A1A18] hover:bg-black/3 transition"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-white" style="background:${bg};font-size:16px">${ico}</div><span>${n}</span><span class="ml-auto text-[#9B9890]">→</span></a>`;
        body.innerHTML = `<div class="space-y-2">
            ${mk('https://wa.me/37377861889', '💬', '#25D366', 'WhatsApp')}
            ${mk('https://t.me/guchevgranit', '✈️', '#229ED9', 'Telegram')}
            ${mk('viber://chat?number=%2B37377954044', '📱', '#7360F2', 'Viber')}
            <button onclick="closeModal();setTimeout(()=>openModal('phone'),150)" class="flex w-full items-center gap-3 rounded-xl bg-[#1A1A18] text-white px-4 py-3 text-[13px] font-medium hover:bg-[#333] transition">${PHONE_SVG}<span>Позвонить</span><span class="ml-auto text-white/40">→</span></button></div>`;
    }
    openModalEl();
}

// Toggle functions
function toggleMobSvc(id) {
    const b = document.getElementById(id), c = document.getElementById('chev_' + id);
    if (!b) return;
    const o = b.classList.toggle('open');
    if (c) c.classList.toggle('open', o);
}

function toggleSection(bodyId, chevId) {
    const b = document.getElementById(bodyId), c = document.getElementById(chevId);
    const o = b.classList.toggle('open');
    if (c) c.style.transform = o ? 'rotate(180deg)' : '';
}

function toggleFeatureVideo(id) {
    fvIds.forEach(vid => {
        if (vid !== id) {
            const b = document.getElementById(vid), c = document.getElementById(vid + '-chev');
            if (b && b.classList.contains('open')) {
                b.classList.remove('open');
                if (c) c.style.transform = '';
            }
        }
    });
    const b = document.getElementById(id), c = document.getElementById(id + '-chev');
    const o = b.classList.toggle('open');
    if (c) c.style.transform = o ? 'rotate(180deg)' : '';
}

function togglePhonePopup() {
    document.getElementById('phonePopup').classList.toggle('hidden');
}

// Navigation functions
function goToMonumentsTab() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => filterCat('monuments'), 500);
}

function expandMobProducts() {
    const grid = document.getElementById('productGrid');
    const cards = Array.from(grid.children);
    cards.forEach(c => {
        c.classList.remove('prod-card-hidden', 'prod-mob-fade');
    });
    const btn = document.getElementById('mobExpandBtn');
    if (btn) btn.style.display = 'none';
}

// Currency and category functions
function setCurrency(c) {
    currentCurrency = c;
    document.querySelectorAll('.curr-btn').forEach(b => {
        b.className = b.dataset.c === c ?
            'flex-1 text-center curr-btn rounded-lg lg:rounded-full px-3 py-1.5 lg:py-1 text-[11px] font-semibold bg-white text-[#1A1A18]' :
            'flex-1 text-center curr-btn rounded-lg lg:rounded-full px-3 py-1.5 lg:py-1 text-[11px] font-semibold text-white/50';
    });
    renderProducts();
}

function filterCat(cat) {
    currentCat = cat;
    document.querySelectorAll('.cat-btn').forEach(b => {
        const c = b.dataset.cat;
        b.className = `cat-btn ${catSt[c]}${c === cat ? ' active-cat' : ''} rounded-2xl p-5 text-left transition-all duration-300`;
    });
    renderProducts();
}