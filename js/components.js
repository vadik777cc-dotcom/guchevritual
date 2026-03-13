// Render Services
function renderServices() {
    const g = document.getElementById('servicesGrid');
    let h = '';
    svcGroups.forEach((group, gi) => {
        h += `<div class="${gi < svcGroups.length - 1 ? 'mb-10' : ''}"><p class="text-[11px] uppercase tracking-[.15em] text-[#9B9890] font-semibold mb-4">${group.label}</p><div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">`;
        group.ids.forEach(id => {
            const s = svcData[id], hasEx = svcExImg[id] !== undefined;
            h += `<div class="svc-glass group flex flex-col" onclick="openServiceModal(${id})">
                <div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center text-[#6B6960] shrink-0" style="background:rgba(0,0,0,0.05)">${icon(s.icon, 20)}</div><h3 class="text-[15px] font-semibold text-[#1A1A18]">${s.title}</h3></div>
                <p class="text-[13px] text-[#6B6960] leading-[1.65] flex-1">${s.short}</p>
                ${hasEx ? `<div class="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 self-start" style="background:rgba(154,138,101,0.12);border:1px solid rgba(154,138,101,0.25)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9A8A65" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span style="font-size:10px;font-weight:600;color:#9A8A65">фото</span></div>` : ''}
                <div class="mt-4 pt-3 border-t border-black/6 text-[12px] font-semibold text-[#9B9890] group-hover:text-[#1A1A18] transition flex items-center gap-1.5">${hasEx ? 'Подробнее + примеры' : 'Подробнее'} <span class="transition-transform group-hover:translate-x-0.5">→</span></div>
            </div>`;
        });
        h += '</div></div>';
    });
    g.innerHTML = h;
}

function renderServicesMobile() {
    const g = document.getElementById('servicesGridMobile');
    let h = '';
    svcGroups.forEach(group => {
        h += `<div class="mb-5"><p class="text-[11px] uppercase tracking-[.15em] text-[#9B9890] font-semibold mb-2 px-1">${group.label}</p><div class="space-y-2">`;
        group.ids.forEach(id => {
            const s = svcData[id], cid = 'sm_' + id, hasEx = svcExImg[id] !== undefined;
            h += `<div class="svc-mob"><div class="svc-mob-hdr" onclick="toggleMobSvc('${cid}')">
                <div class="svc-mob-ico">${icon(s.icon, 16)}</div>
                <div class="flex-1 min-w-0"><div style="font-size:14px;font-weight:600;color:#1A1A18">${s.title}</div><div style="font-size:12px;color:#9B9890;line-height:1.5">${s.short}</div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0">
                    <div class="svc-mob-chev" id="chev_${cid}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></div>
                    ${hasEx ? `<div style="width:18px;height:18px;border-radius:5px;display:flex;align-items:center;justify-content:center;background:rgba(154,138,101,0.15);border:1px solid rgba(154,138,101,0.3)"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9A8A65" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>` : ''}
                </div>
            </div>
            <div class="svc-mob-body" id="${cid}"><div class="svc-mob-inner pt-3">
                <ul class="space-y-1.5 mb-3">${s.features.map(f => `<li class="flex items-center gap-2 text-[12px] text-[#6B6960]">${CHECK_SM()}${f}</li>`).join('')}</ul>
                <div class="text-[14px] font-semibold accent mb-3">${s.price}</div>
                <div class="flex gap-2">
                    <button onclick="event.stopPropagation();openSubModal('phone')" class="flex-1 rounded-xl border border-black/8 py-2 text-[12px] font-semibold text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white transition">Позвонить</button>
                    <button onclick="event.stopPropagation();openServiceModal(${id})" class="flex-1 rounded-xl bg-[#1A1A18] py-2 text-[12px] font-semibold text-white">Открыть</button>
                </div>
            </div></div></div>`;
        });
        h += '</div></div>';
    });
    g.innerHTML = h;
}

// Render Products
// Render Products
function renderProducts() {
    const grid = document.getElementById('productGrid'), items = products[currentCat] || [];
    const cc = 'prod-card-' + currentCat;
    const accents = { coffins: '#6080ff', wreaths: '#5aaa5a', crosses: '#cc4444', monuments: '#c8a840' };
    const ac = accents[currentCat] || '#9A8A65';
    
    grid.classList.remove('expanded');
    const btn = document.getElementById('mobExpandBtn');
    const btnInner = document.getElementById('mobExpandBtnInner');
    if (btn) btn.style.display = '';
    if (btnInner) {
        btnInner.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg> Показать весь каталог';
    }
    
    // Общее описание для категорий (будет показано над карточками)
    let categoryDesc = '';
    if (currentCat === 'monuments') {
        categoryDesc = '<div class="col-span-full mb-4 text-[14px] text-white/60 bg-white/5 p-4 rounded-xl">Памятники из натурального гранита. Собственное производство. Любая форма и размер.</div>';
    } else if (currentCat === 'wreaths') {
        categoryDesc = '<div class="col-span-full mb-4 text-[14px] text-white/60 bg-white/5 p-4 rounded-xl">Траурные венки и корзины из качественных материалов. Собственное производство.</div>';
    }
    
    grid.innerHTML = items.map((item, i) => {
        const cid = `pc_${currentCat}_${i}`, fv = item.variants[0];
        const mobClass = i === 0 ? '' : (i === 1 ? ' prod-mob-fade' : ' prod-card-hidden');
        
        // Формируем HTML в зависимости от категории
        let nameHtml = '';
        let descHtml = '';
        let badgeHtml = item.badge ? `<div class="prod-badge">${item.badge}</div>` : '';
        let variantCountHtml = item.variants.length > 1 ? `<div class="prod-variant-count">${item.variants.length} вида</div>` : '';
        
        // Для всех категорий показываем название
        if (item.group) {
            nameHtml += `<div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:.12em;margin-bottom:3px">${item.group}</div>`;
        }
        nameHtml += `<div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);margin-bottom:6px">${item.name}</div>`;
        
        // Кнопки вариантов (если есть)
        let variantButtons = '';
        if (item.variants.length > 1) {
            variantButtons = `<div class="flex flex-wrap gap-1.5 mb-3" onclick="event.stopPropagation()">${item.variants.map((v, vi) => 
                `<button onclick="event.stopPropagation();switchVar('${currentCat}',${i},${vi})" id="vb_${cid}_${vi}" style="padding:3px 10px;border-radius:9999px;font-size:10px;font-weight:600;border:1px solid ${vi === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)'};color:${vi === 0 ? '#fff' : 'rgba(255,255,255,0.4)'};background:${vi === 0 ? 'rgba(255,255,255,0.12)' : 'transparent'};cursor:pointer;transition:all .2s">${v.label}</button>`
            ).join('')}</div>`;
        }
        
        // Описание только для крестов (индивидуальное)
        if (currentCat === 'crosses' && item.desc) {
            descHtml = `<div id="pd_${cid}" style="font-size:11px;color:rgba(255,255,255,0.38);line-height:1.6;flex:1;margin-bottom:8px">${item.desc}</div>`;
        } else if (currentCat === 'coffins' && fv.desc) {
            descHtml = `<div id="pd_${cid}" style="font-size:11px;color:rgba(255,255,255,0.40);line-height:1.6;flex:1;margin-bottom:8px">${fv.desc}</div>`;
        } else {
            descHtml = `<div id="pd_${cid}" style="flex:1;margin-bottom:4px"></div>`;
        }
        
        return `<div class="${cc} cursor-pointer flex flex-col${mobClass}" onclick="openProductModal('${currentCat}',${i})" id="pw_${cid}">
            <div class="prod-img-wrap"><img id="pi_${cid}" src="${fv.images[0]}" alt="${item.name}" class="prod-img" style="object-position:center bottom">
            <div class="prod-img-overlay"></div>
            ${badgeHtml}
            ${variantCountHtml}
            </div>
            <div class="p-4 flex flex-col flex-1">
                ${nameHtml}
                ${variantButtons}
                ${descHtml}
                <div id="pp_${cid}" style="font-size:17px;font-weight:800;margin-bottom:12px;color:${ac}">${fmtPrice(fv.price)}</div>
                <div class="flex gap-2">
                    <button onclick="event.stopPropagation();openSubModal('messenger')" style="flex:1;border-radius:10px;padding:9px 4px;font-size:11px;font-weight:600;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.6);cursor:pointer">Написать</button>
                    <button onclick="event.stopPropagation();openSubModal('phone')" style="flex:1;border-radius:10px;padding:9px 4px;font-size:11px;font-weight:600;background:${ac};color:#fff;border:none;cursor:pointer">Позвонить</button>
                </div>
            </div>
        </div>`;
    }).join('');
    
    // Добавляем общее описание категории перед карточками (если есть)
    if (categoryDesc) {
        grid.innerHTML = categoryDesc + grid.innerHTML;
    }
}
// Switch product variant
function switchVar(cat, idx, vi) {
    const item = products[cat][idx], cid = `pc_${cat}_${idx}`, v = item.variants[vi];
    const ac = { coffins: '#6080ff', wreaths: '#5aaa5a', crosses: '#cc4444', monuments: '#c8a840' }[cat] || '#9A8A65';
    const img = document.getElementById('pi_' + cid);
    if (img) img.src = v.images[0];
    const pd = document.getElementById('pd_' + cid);
    if (pd) {
        if (v.desc) {
            pd.textContent = v.desc;
            pd.style.marginBottom = '8px';
        } else {
            pd.textContent = '';
            pd.style.marginBottom = '4px';
        }
    }
    const pp = document.getElementById('pp_' + cid);
    if (pp) pp.textContent = fmtPrice(v.price);
    item.variants.forEach((_, vj) => {
        const b = document.getElementById(`vb_${cid}_${vj}`);
        if (!b) return;
        b.style.border = `1px solid ${vj === vi ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)'}`;
        b.style.color = vj === vi ? '#fff' : 'rgba(255,255,255,0.4)';
        b.style.background = vj === vi ? 'rgba(255,255,255,0.12)' : 'transparent';
    });
}

// Render Reviews
function renderReviews() {
    document.getElementById('reviewsGrid').innerHTML = reviews.map(r => `
        <div style="background:linear-gradient(160deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2));border:1px solid rgba(154,138,101,0.18);border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:16px;transition:transform .25s,box-shadow .25s;box-shadow:inset 0 1px 0 rgba(154,138,101,0.08)" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 12px 40px rgba(0,0,0,0.35)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
                <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,rgba(154,138,101,0.25),rgba(154,138,101,0.1));border:1px solid rgba(154,138,101,0.3);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#C9A96E;flex-shrink:0">${r.name.charAt(0)}</div>
                    <div>
                        <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:-.01em">${r.name}</div>
                        <div style="font-size:11px;color:rgba(255,255,255,0.25);margin-top:2px">${r.date}</div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                    <div style="display:flex;gap:2px">${Array.from({ length: 5 }, (_, i) => `<svg width="13" height="13" viewBox="0 0 24 24" fill="${i < r.rating ? '#C9A96E' : 'rgba(255,255,255,0.1)'}" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`).join('')}</div>
                    <div style="font-size:10px;font-weight:600;color:#9A8A65;letter-spacing:.05em">ПРОВЕРЕНО</div>
                </div>
            </div>
            <div style="width:40px;height:1px;background:linear-gradient(90deg,rgba(154,138,101,0.4),transparent)"></div>
            <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;font-style:italic">"${r.text}"</p>
        </div>
    `).join('');
}

// Product Modal
function openProductModal(cat, idx) {
    _mCat = cat;
    _mIdx = idx;
    _mVi = 0;
    renderProductModal();
}

function switchProductVariant(vi) {
    _mVi = vi;
    renderProductModal();
}

// Product Modal
function renderProductModal() {
    const item = products[_mCat][_mIdx], v = item.variants[_mVi];
    const cid = `modal_${_mCat}_${_mIdx}_${_mVi}`;
    window['_ci_' + cid] = v.images;
    carousels[cid] = { current: 0, total: v.images.length };

    const accModal = { coffins: '#8899ff', wreaths: '#6abb6a', crosses: '#dd6666', monuments: '#C9A96E' };
    const acM = accModal[_mCat] || '#C9A96E';
    const goldLine = `<div style="width:48px;height:2px;background:linear-gradient(90deg,${acM},transparent);margin-bottom:16px;border-radius:1px"></div>`;

    const vbtns = item.variants.length > 1 ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">${item.variants.map((vv, vi) =>
        `<button onclick="switchProductVariant(${vi})" style="padding:6px 14px;border-radius:9999px;font-size:11px;font-weight:600;border:1px solid ${vi === _mVi ? acM : 'rgba(255,255,255,0.15)'};color:${vi === _mVi ? acM : 'rgba(255,255,255,0.45)'};background:${vi === _mVi ? 'rgba(154,138,101,0.15)' : 'transparent'};cursor:pointer;transition:all .2s">${vv.label}</button>`
    ).join('')}</div>` : '';

    const imgs = v.images.map((s, i) =>
        `<img src="${s}" alt="" loading="lazy" onclick="event.stopPropagation();openLightbox(window['_ci_${cid}'],${i})" style="cursor:pointer;min-width:100%;max-width:100%;object-fit:cover;flex-shrink:0">`
    ).join('');

    const dots = v.images.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" data-i="${i}"></span>`).join('');

    let descHtml = '';
    if (_mCat === 'crosses' && item.desc) {
        descHtml = `<p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:12px">${item.desc}</p>`;
    } else if (_mCat === 'monuments') {
        descHtml = `<p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:12px">Натуральный гранит. Собственное производство. Любая форма и размер. Профессиональная установка.</p>`;
    } else if (_mCat === 'wreaths') {
        descHtml = `<p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:12px">Качественные материалы. Собственное производство. Различные варианты оформления.</p>`;
    } else if (v.desc) {
        descHtml = `<p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:12px">${v.desc}</p>`;
    }

    let modalTitle = _mCat === 'monuments' ? 'Памятник из гранита' : _mCat === 'wreaths' ? 'Траурный венок' : item.name;

    let h = `<div style="background:linear-gradient(160deg,#1a1814,#110f0c);border-radius:20px;padding:20px;margin:-16px;border:1px solid rgba(154,138,101,0.25)">

        <div class="carousel-wrap" data-carousel="${cid}" style="margin-bottom:12px;border-radius:12px;overflow:hidden;border:1px solid rgba(154,138,101,0.15)">
          <div class="carousel-track" data-track="${cid}">${imgs}</div>
          ${v.images.length > 1 ?
            `<button class="carousel-btn left" onclick="event.stopPropagation();slideCarousel('${cid}',-1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg></button>
            <button class="carousel-btn right" onclick="event.stopPropagation();slideCarousel('${cid}',1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg></button>
            <div class="carousel-dots" data-dots="${cid}">${dots}</div>` : ''}
        </div>
        <div style="text-align:center;margin-bottom:12px"><button onclick="event.stopPropagation();openLightbox(window['_ci_${cid}'],0)" style="font-size:11px;color:rgba(154,138,101,0.6);background:none;border:none;cursor:pointer">Нажмите на фото для увеличения ↗</button></div>
        ${item.badge ? `<div style="display:inline-block;border-radius:9999px;background:rgba(154,138,101,0.15);border:1px solid rgba(154,138,101,0.3);color:#C9A96E;font-size:10px;font-weight:700;padding:3px 10px;margin-bottom:12px">${item.badge}</div>` : ''}
        ${(_mCat === 'coffins' || _mCat === 'crosses') ? vbtns : ''}
        ${descHtml}
        <div style="padding:12px;background:rgba(154,138,101,0.08);border-radius:12px;border:1px solid rgba(154,138,101,0.18);margin-bottom:16px">
          <div style="font-size:22px;font-weight:800;color:${acM}">${fmtPrice(v.price)}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:2px">Цена зависит от размеров и материалов</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button onclick="event.stopPropagation();openModal('phone')" style="width:100%;border-radius:12px;padding:13px;font-size:13px;font-weight:700;background:linear-gradient(135deg,#9A8A65,#C9A96E);color:#0a0a08;border:none;cursor:pointer">Позвонить</button>
          <button onclick="event.stopPropagation();openModal('messenger')" style="width:100%;border-radius:12px;padding:12px;font-size:13px;font-weight:600;background:transparent;color:rgba(255,255,255,0.6);border:1px solid rgba(154,138,101,0.25);cursor:pointer">Написать</button>
        </div>
    </div>`;

    document.getElementById('modalTitle').textContent = modalTitle;
    document.getElementById('modalBody').innerHTML = h;
    openModalEl();
}

function openServiceModal(id) {
    const s = svcData[id];
    const svcPhoto = svcExImg[id] || null;
    const goldLine = `<div style="width:48px;height:2px;background:linear-gradient(90deg,#C9A96E,transparent);margin-bottom:4px;border-radius:1px"></div>`;
    let h = `<div style="background:linear-gradient(160deg,#1a1814,#110f0c);border-radius:20px;padding:24px;margin:-16px;border:1px solid rgba(154,138,101,0.25)">

        <div class="flex items-center gap-3 mb-4">
          <div style="width:44px;height:44px;border-radius:14px;background:rgba(154,138,101,0.12);border:1px solid rgba(154,138,101,0.25);display:flex;align-items:center;justify-content:center;color:#C9A96E;flex-shrink:0">${icon(s.icon, 22)}</div>
          <div>
            <div style="font-size:16px;font-weight:700;color:rgba(255,255,255,0.9)">${s.title}</div>
          </div>
        </div>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:16px">${s.short}</p>
        <div style="background:rgba(154,138,101,0.07);border:1px solid rgba(154,138,101,0.18);border-radius:14px;padding:16px;margin-bottom:16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#9A8A65;margin-bottom:10px">Что включено</div>
          <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">${s.features.map(f => `<li style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.5">${CHECK_SM('#C9A96E')}${f}</li>`).join('')}</ul>
        </div>
        ${!s.noMedia && svcPhoto ? `<div style="margin-bottom:16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#9A8A65;margin-bottom:10px">Фото работ</div>
          <div onclick="event.stopPropagation();openLightbox(['${svcPhoto}'],0)" style="cursor:pointer;border-radius:12px;overflow:hidden;border:1px solid rgba(154,138,101,0.2)">
            <img src="${svcPhoto}" alt="" style="width:100%;height:auto;display:block;max-height:400px;object-fit:contain;background:#0a0a08">
          </div>
        </div>` : ''}
        <div style="text-align:center;margin-bottom:16px;padding:12px;background:rgba(154,138,101,0.08);border-radius:12px;border:1px solid rgba(154,138,101,0.18)">
          <div style="font-size:20px;font-weight:800;color:#C9A96E">${s.price}</div>
          ${s.priceNote ? `<div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:4px">${s.priceNote}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button onclick="event.stopPropagation();openModal('phone')" style="width:100%;border-radius:12px;padding:13px;font-size:13px;font-weight:700;background:linear-gradient(135deg,#9A8A65,#C9A96E);color:#0a0a08;border:none;cursor:pointer;letter-spacing:.02em">Позвонить</button>
          <button onclick="event.stopPropagation();openModal('messenger')" style="width:100%;border-radius:12px;padding:12px;font-size:13px;font-weight:600;background:transparent;color:rgba(255,255,255,0.6);border:1px solid rgba(154,138,101,0.25);cursor:pointer">Написать</button>
        </div>
    </div>`;
    document.getElementById('modalTitle').textContent = s.title;
    document.getElementById('modalBody').innerHTML = h;
    openModalEl();
}