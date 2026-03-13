// Global variables
let currentCurrency = 'RUB';
let currentCat = 'coffins';
let carousels = {};
let lbImgs = [];
let lbIdx = 0;
let _mCat = '', _mIdx = 0, _mVi = 0;

const WA_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;
const TG_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;
const VB_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11.4 0C5.5 0 .8 4.7.8 10.5c0 3.2 1.5 6.1 3.9 8.1v3.8l3.6-1.9c1 .3 2 .4 3.1.4 5.9 0 10.6-4.7 10.6-10.5S17.3 0 11.4 0zm1.1 14.1l-2.7-2.9-5.2 2.9 5.8-6.1 2.7 2.9 5.2-2.9-5.8 6.1z"/></svg>`;

// Category styles
const catSt = { coffins: 'cat-coffins', wreaths: 'cat-wreaths', crosses: 'cat-crosses', monuments: 'cat-monuments' };
const fvIds = ['feat-3d-videos', 'art-video', 'relief-video'];

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
        ${mesLink('https://wa.me/37377954044', WA_SVG, '#25D366', 'WhatsApp')}
        ${mesLink('https://t.me/Guchev_Ritual', TG_SVG, '#229ED9', 'Telegram')}
        <div class="flex items-center gap-3 rounded-xl border border-black/6 px-4 py-3 text-[13px] font-medium text-[#1A1A18]"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-white" style="background:#7360F2;font-size:16px">${VB_SVG}</div><span>Viber</span><span class="ml-auto text-[#6B6960] font-semibold text-[12px]">+373 778 61 889</span></div></div>`;
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
    const goldLine = `<div style="width:48px;height:2px;background:linear-gradient(90deg,#C9A96E,transparent);margin-bottom:16px;border-radius:1px"></div>`;
    const rowStyle = `style="display:flex;align-items:center;justify-content:space-between;border-radius:12px;padding:13px 16px;font-size:13px;font-weight:500;border:1px solid rgba(154,138,101,0.18);background:rgba(154,138,101,0.06);color:rgba(255,255,255,0.85);text-decoration:none;transition:background .2s"`;
    if (type === 'phone') {
        body.innerHTML = `<div style="background:linear-gradient(160deg,#1a1814,#110f0c);border-radius:20px;padding:24px;margin:-16px;border:1px solid rgba(154,138,101,0.25)">
            ${goldLine}
            <div style="margin-bottom:20px">
              <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:10px">Приднестровье</div>
              <a href="tel:+37377954044" style="display:block;font-size:22px;font-weight:700;color:rgba(255,255,255,0.9);text-decoration:none;margin-bottom:4px">+373 779 54 044</a>
              <a href="tel:+37377861889" style="display:block;font-size:22px;font-weight:700;color:rgba(255,255,255,0.9);text-decoration:none">+373 778 61 889</a>
              <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-top:16px;margin-bottom:10px">Молдова</div>
              <a href="tel:+373068559200" style="display:block;font-size:22px;font-weight:700;color:rgba(255,255,255,0.9);text-decoration:none">+373 068 559 200</a>
              <div style="font-size:12px;color:rgba(255,255,255,0.25);margin-top:10px">Без выходных · Ответим в любое время</div>
            </div>
            <div style="width:40px;height:1px;background:linear-gradient(90deg,rgba(154,138,101,0.4),transparent);margin-bottom:16px"></div>
            <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:10px">Или напишите в мессенджер</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <a href="https://wa.me/37377954044" target="_blank" ${rowStyle}><span>WhatsApp</span><span style="color:rgba(154,138,101,0.6)">→</span></a>
              <a href="https://t.me/Guchev_Ritual" target="_blank" ${rowStyle}><span>Telegram</span><span style="color:rgba(154,138,101,0.6)">→</span></a>
              <div style="display:flex;align-items:center;justify-content:space-between;border-radius:12px;padding:13px 16px;font-size:13px;font-weight:500;border:1px solid rgba(154,138,101,0.18);background:rgba(154,138,101,0.06);color:rgba(255,255,255,0.85)"><span>Viber</span><span style="color:#C9A96E;font-weight:600;font-size:12px">+373 778 61 889</span></div>
            </div>
        </div>`;
    } else {
        const mk = (href, ico, bg, n) => `<a href="${href}" target="_blank" style="display:flex;align-items:center;gap:12px;border-radius:12px;padding:13px 16px;font-size:13px;font-weight:500;border:1px solid rgba(154,138,101,0.18);background:rgba(154,138,101,0.06);color:rgba(255,255,255,0.85);text-decoration:none"><div style="width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:${bg};flex-shrink:0">${ico}</div><span>${n}</span><span style="margin-left:auto;color:rgba(154,138,101,0.6)">→</span></a>`;
        body.innerHTML = `<div style="background:linear-gradient(160deg,#1a1814,#110f0c);border-radius:20px;padding:24px;margin:-16px;border:1px solid rgba(154,138,101,0.25)">
            ${goldLine}
            <div style="display:flex;flex-direction:column;gap:8px">
              ${mk('https://wa.me/37377954044', WA_SVG, '#25D366', 'WhatsApp')}
              ${mk('https://t.me/Guchev_Ritual', TG_SVG, '#229ED9', 'Telegram')}
              <div style="display:flex;align-items:center;gap:12px;border-radius:12px;padding:13px 16px;font-size:13px;font-weight:500;border:1px solid rgba(154,138,101,0.18);background:rgba(154,138,101,0.06);color:rgba(255,255,255,0.85)"><div style="width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:#7360F2;flex-shrink:0">${VB_SVG}</div><span>Viber</span><span style="margin-left:auto;color:#C9A96E;font-weight:600;font-size:12px">+373 778 61 889</span></div>
              <button onclick="closeModal();setTimeout(()=>openModal('phone'),150)" style="display:flex;align-items:center;gap:12px;width:100%;border-radius:12px;padding:13px 16px;font-size:13px;font-weight:600;background:linear-gradient(135deg,#9A8A65,#C9A96E);color:#0a0a08;border:none;cursor:pointer;margin-top:4px">${PHONE_SVG}<span>Позвонить</span><span style="margin-left:auto">→</span></button>
            </div>
        </div>`;
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

function toggleAllFeatureVideos() {
    const videoIds = ['feat-3d-videos', 'art-video', 'relief-video'];
    const chevIds = ['feat-3d-chev', 'feat-art-chev', 'feat-relief-chev'];
    // Check if already open
    const firstBody = document.getElementById(videoIds[0]);
    const isOpen = firstBody && firstBody.classList.contains('open');
    videoIds.forEach((id, i) => {
        const b = document.getElementById(id);
        const c = document.getElementById(chevIds[i]);
        if (b) { b.classList.toggle('open', !isOpen); }
        if (c) c.style.transform = !isOpen ? 'rotate(180deg)' : '';
    });
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