// DOM Elements
const heroEl = document.getElementById('hero');
const mobBar = document.getElementById('mobileBottomBar');
const navSecs = ['services', 'monuments', 'reviews'];

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Render initial content
    renderServices();
    renderServicesMobile();
    filterCat('coffins');
    renderReviews();

    // Static check lists
    document.getElementById('mon-checks-1').innerHTML = checks(['Натуральный гранит', 'Собственное производство', 'Гарантия по договору', 'Только профессионалы']);
    document.getElementById('mon-checks-2').innerHTML = checks(['Бесплатный выезд', 'Согласование проекта', 'Профессиональный монтаж', 'Долгосрочная гарантия']);
    document.getElementById('repat-checks').innerHTML = checks(['Возвращение тела', 'Возвращение праха', 'Санитарные нормы', 'Юридическая поддержка', 'Авиаперевозка', 'Наземный транспорт']);
    document.getElementById('feat-art-list').innerHTML = checksLi(['Гравировка ЧПУ + ручная доработка', 'Цветное фото под стеклом', 'Ретушь и реставрация фото', 'Эпитафии и орнаменты'], '#9A8A65');
    document.getElementById('feat-relief-list').innerHTML = checksLi(['Алмазные инструменты ЧПУ', 'Барельефы и скульптуры', 'Ручная финишная обработка', 'Индивидуальный дизайн'], '#5ab0c8');
    document.getElementById('feat-3d-list').innerHTML = checksLi(['Визуализация до изготовления', 'Моделирование комплексов', 'Полное соответствие проекту', 'Согласование с клиентом'], '#a070d8');

    // Hero stats
    document.getElementById('hero-stats-desktop').innerHTML = `
        <div class="rounded-2xl p-5 text-center" style="background:linear-gradient(135deg,#1A1A18,#2a2a28);border:1.5px solid rgba(154,138,101,0.4);box-shadow:0 8px 32px rgba(0,0,0,0.35);min-width:128px">
            <div class="text-[42px] font-black leading-none gold">20<span style="color:#9A8A65;font-size:32px">+</span></div>
            <div class="text-[10px] font-bold uppercase tracking-[.2em] text-white/60 mt-1">лет опыта</div>
            <div class="w-8 h-0.5 mx-auto mt-2 rounded" style="background:linear-gradient(90deg,transparent,#9A8A65,transparent)"></div>
            <div class="text-[9px] text-white/30 mt-1.5 tracking-widest">Евро Ритуал</div>
        </div>
        <div class="frost-dark rounded-2xl p-4 text-center" style="min-width:128px"><div class="text-2xl font-bold text-white">24/7</div><div class="text-[11px] text-white/50 mt-1">без выходных</div></div>
        <div class="frost-dark rounded-2xl p-4 text-center" style="min-width:128px"><div class="text-2xl font-bold text-white">500+</div><div class="text-[11px] text-white/50 mt-1">памятников</div></div>
        <div class="frost-dark rounded-2xl p-4 text-center" style="min-width:128px"><div class="text-2xl font-bold text-white">100%</div><div class="text-[11px] text-white/50 mt-1">гарантия</div></div>
    `;

    document.getElementById('hero-mobile-content').innerHTML = `
        <div class="hero-glow-mob inline-flex items-center gap-2 rounded-full glow-island px-4 py-2 text-[12px] text-white/90 mb-6" style="background:rgba(154,138,101,0.15);border:1px solid rgba(154,138,101,0.3)">
            <span class="w-2 h-2 rounded-full bg-[#9A8A65] animate-pulse shadow-[0_0_8px_rgba(154,138,101,0.8)]"></span>Круглосуточно · +373 779 54 044
        </div>
        <h1 class="hero-title-mob font-black leading-[1.0] tracking-tight mb-5" style="font-size:clamp(34px,10vw,56px)">
            <span class="text-white block">Ритуальные</span><span class="block" style="color:rgba(255,255,255,0.32)">услуги</span>
        </h1>
        <p class="hero-desc-mob font-light leading-[1.5] mb-7 max-w-[280px]" style="font-size:clamp(14px,3.8vw,17px);color:rgba(255,255,255,0.60)">
            Рыбница и всё Приднестровье.<br><span style="color:rgba(255,255,255,0.88);font-weight:500">20 лет. Работаем 24/7.</span>
        </p>
        <div class="flex flex-col items-center gap-3" style="width:min(260px,80vw)">
            <div class="hero-btns-mob flex gap-3 w-full">
                <button onclick="openModal('phone')" class="hero-btn-call flex-1 text-center" style="font-size:13px;padding:13px 0">📞 Позвонить</button>
                <button onclick="openModal('messenger')" class="hero-btn-msg flex-1 text-center" style="font-size:13px;padding:13px 0">✉️ Написать</button>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=г.+Рыбница,+ул.+Ленина,+50" target="_blank" class="frost-dark w-full rounded-2xl py-3 px-4 flex items-center justify-center gap-2 transition hover:bg-white/15">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span class="text-[11px] text-white/45 font-medium">г. Рыбница, ул. Ленина, 50</span>
            </a>
        </div>
        <div class="hero-stats-mob grid grid-cols-2 gap-3 mt-6" style="width:min(260px,80vw)">
            <div class="stat-pad rounded-2xl p-4 text-center" style="background:linear-gradient(135deg,#1A1A18,#2a2a28);border:1.5px solid rgba(154,138,101,0.4)">
                <div class="stat-num text-[28px] font-black leading-none gold">20<span style="color:#9A8A65;font-size:20px">+</span></div>
                <div class="text-[9px] font-bold uppercase tracking-[.15em] text-white/60 mt-1">лет опыта</div>
            </div>
            <div class="stat-pad frost-dark rounded-2xl p-4 text-center"><div class="stat-num text-[28px] font-black text-white leading-none">24/7</div><div class="text-[10px] text-white/45 mt-1.5">без выходных</div></div>
            <div class="stat-pad frost-dark rounded-2xl p-4 text-center"><div class="stat-num text-[28px] font-black text-white leading-none">500+</div><div class="text-[10px] text-white/45 mt-1.5">памятников</div></div>
            <div class="stat-pad frost-dark rounded-2xl p-4 text-center"><div class="stat-num text-[28px] font-black text-white leading-none">100%</div><div class="text-[10px] text-white/45 mt-1.5">гарантия</div></div>
        </div>
    `;

    // Carousels
    window._cimg_feat3d = ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80'];
    carousels['feat-3d'] = { current: 0, total: 3 };

    window._cimg_monument_install = ['assets/pam1.jpg', 'assets/pam2.jpg', 'assets/pam3.jpg'];
    carousels['monument-install'] = { current: 0, total: 3 };
    
    updateMobBar();
});

// Scroll handlers
function updateMobBar() {
    if (window.innerWidth >= 1024) return;
    mobBar.classList.toggle('hidden-bar', window.scrollY <= (heroEl.offsetTop + heroEl.offsetHeight - 100));
}

function updateNav() {
    const sy = window.scrollY + 120;
    let active = '';
    navSecs.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= sy) active = id;
    });
    document.querySelectorAll('.nav-track').forEach(p => p.classList.toggle('active', p.dataset.section === active));
}

// Event listeners
window.addEventListener('scroll', () => {
    const h = document.getElementById('mainHeader'), mob = window.innerWidth < 1024;
    if (window.scrollY > 50) {
        h.classList.add('header-scrolled');
        if (mob) {
            const ni = document.querySelector('.nav-island-mob');
            if (ni) ni.classList.add('scrolled');
            document.querySelectorAll('.nav-pill-mob').forEach(p => p.classList.add('scrolled-pill'));
        }
    } else {
        h.classList.remove('header-scrolled');
        if (mob) {
            const ni = document.querySelector('.nav-island-mob');
            if (ni) ni.classList.remove('scrolled');
            document.querySelectorAll('.nav-pill-mob').forEach(p => p.classList.remove('scrolled-pill'));
        }
    }
    updateNav();
    updateMobBar();
});

document.addEventListener('click', e => {
    const p = document.getElementById('phonePopup');
    if (p && !p.parentElement.contains(e.target)) p.classList.add('hidden');
});

document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
            e.preventDefault();
        } else if (e.key === 'ArrowRight' && lbImgs.length > 1) {
            slideLightbox(1);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft' && lbImgs.length > 1) {
            slideLightbox(-1);
            e.preventDefault();
        }
        return;
    }
    const sm = document.getElementById('globalSubModal');
    if (e.key === 'Escape' && sm && sm.style.display === 'flex') {
        closeSubModal();
        e.preventDefault();
        return;
    }
    const m = document.getElementById('modalOverlay');
    if (e.key === 'Escape' && m && !m.classList.contains('hidden')) {
        closeModal();
        e.preventDefault();
    }
});