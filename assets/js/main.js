// ==========================================================================
// EXCELLENT SERVICES - MAIN JAVASCRIPT CONTROLLER
// Interactive features, Search engine, Quote estimator, Lightbox
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCounters();
  initScopeSearch();
  initQuoteCalculator();
  initClientMarquee();
  initLightbox();
  initWorkflowToggle();
});

// 1. Sticky Navigation & Mobile Drawer
function initNavbar() {
  const header = document.getElementById("main-header");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileClose = document.getElementById("mobile-menu-close");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("shadow-xl", "py-2");
      header?.classList.remove("py-4");
    } else {
      header?.classList.remove("shadow-xl", "py-2");
      header?.classList.add("py-4");
    }
  });

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // Close mobile drawer when clicking links
  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.add("translate-x-full");
    });
  });
}

// 2. Animated Stats Counters
function initCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute("data-target") || "0", 10);
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = targetVal / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetVal) {
            target.textContent = targetVal.toLocaleString();
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(current).toLocaleString();
          }
        }, stepTime);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

// 3. Interactive Scope Finder & Filter
function initScopeSearch() {
  const container = document.getElementById("scope-results-grid");
  const searchInput = document.getElementById("scope-search-input");
  const filterBtns = document.querySelectorAll(".scope-filter-btn");
  const countBadge = document.getElementById("scope-count-badge");
  const data = window.CALIBRATION_DATA || (typeof CALIBRATION_DATA !== "undefined" ? CALIBRATION_DATA : []);

  if (!container || !data || data.length === 0) return;

  let activeCategory = "all";
  let searchQuery = "";

  function renderCards() {
    const filtered = data.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category.toLowerCase() === activeCategory.toLowerCase();
      const textToSearch = `${item.name} ${item.scope} ${item.tags.join(" ")} ${item.standard}`.toLowerCase();
      const matchesSearch = !searchQuery || textToSearch.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Instruments Found`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h4 class="text-xl font-bold text-slate-900 mb-2">No Matching Instruments in Filter</h4>
          <p class="text-slate-500 mb-6 max-w-md mx-auto">We calibrate hundreds of customized measuring parameters. Contact our laboratory directly for custom calibration scopes.</p>
          <a href="https://wa.me/919314501796?text=Hi%20Excellent%20Services,%20I%20am%20looking%20for%20calibration%20of:" target="_blank" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-600/20">
            <span>Inquire Custom Instrument on WhatsApp</span>
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="bg-white laser-scanner rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/90 hover:border-sky-400 hover:shadow-xl transition-all duration-300 group shadow-sm">
        <div class="relative h-48 overflow-hidden bg-slate-100">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='assets/images/equipment/351628842computerized-universal-testing-machine.jpg'" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white shadow-sm">
              ${item.category}
            </span>
          </div>
          ${item.onsite ? `
            <div class="absolute bottom-3 left-3">
              <span class="px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-lg bg-emerald-500 text-white shadow flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> On-Site Available
              </span>
            </div>
          ` : ''}
        </div>
        
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">${item.name}</h3>
            <p class="text-xs text-slate-500 mb-4 line-clamp-2">${item.method}</p>
            
            <div class="space-y-2 mb-6 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 font-mono">
              <div class="flex justify-between items-center text-slate-700">
                <span class="text-slate-500">Range:</span>
                <span class="text-sky-700 font-bold text-right">${item.range}</span>
              </div>
              <div class="flex justify-between items-center text-slate-700">
                <span class="text-slate-500">Uncertainty:</span>
                <span class="text-emerald-700 font-bold text-right">${item.uncertainty}</span>
              </div>
              <div class="flex justify-between items-center text-slate-700">
                <span class="text-slate-500">Standard:</span>
                <span class="text-amber-700 font-bold text-right">${item.standard}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button onclick="openQuoteModalWithItem('${item.name}')" class="flex-1 text-center py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition duration-200 shadow-md shadow-blue-500/15">
              Request Calibration
            </button>
            <a href="https://wa.me/919314501796?text=Hello%20Excellent%20Services,%20I%20would%20like%20to%20inquire%20about%20calibration%20for:%20${encodeURIComponent(item.name)}" target="_blank" class="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 transition" title="Quick WhatsApp Quote">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.242-.039.378.29.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/></svg>
            </a>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Bind search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCards();
    });
  }

  // Bind category filters
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active", "bg-blue-600", "text-white"));
      btn.classList.add("active", "bg-blue-600", "text-white");
      activeCategory = btn.getAttribute("data-category") || "all";
      renderCards();
    });
  });

  renderCards();
}

// 4. Interactive Quote Calculator
function initQuoteCalculator() {
  const form = document.getElementById("quote-calc-form");
  if (!form) return;

  const typeSelect = document.getElementById("calc-service-type");
  const countInput = document.getElementById("calc-instrument-count");
  const urgencySelect = document.getElementById("calc-urgency");
  const estimateBox = document.getElementById("calc-estimate-result");
  const waBtn = document.getElementById("calc-whatsapp-btn");

  function updateEstimate() {
    const serviceType = typeSelect?.value || "in-lab";
    const count = parseInt(countInput?.value || "1", 10);
    const urgency = urgencySelect?.value || "standard";

    let leadTime = "3 to 4 Working Days";
    if (urgency === "express") {
      leadTime = "24 to 48 Hours Priority";
    }
    if (serviceType === "on-site") {
      leadTime = "Scheduled On-Site Slot (1-2 Days)";
    }

    if (estimateBox) {
      estimateBox.innerHTML = `
        <div class="text-xs text-slate-500 font-medium">Estimated Turnaround</div>
        <div class="text-base font-bold text-blue-700">${leadTime}</div>
        <div class="text-[11px] text-slate-600 mt-1">NABL Traceable calibration for ${count} instrument(s)</div>
      `;
    }

    if (waBtn) {
      const msg = `Hello Excellent Services, I need a quotation for Calibration:%0A- Service Type: ${serviceType.toUpperCase()}%0A- Quantity: ${count} instruments%0A- Urgency: ${urgency.toUpperCase()}%0APlease share your scope & pricing.`;
      waBtn.href = `https://wa.me/919314501796?text=${msg}`;
    }
  }

  typeSelect?.addEventListener("change", updateEstimate);
  countInput?.addEventListener("input", updateEstimate);
  urgencySelect?.addEventListener("change", updateEstimate);

  updateEstimate();
}

// 5. Client Marquee Generator
function initClientMarquee() {
  const marqueeInner = document.getElementById("client-marquee-track");
  const logos = window.CLIENT_LOGOS || (typeof CLIENT_LOGOS !== "undefined" ? CLIENT_LOGOS : []);
  if (!marqueeInner || !logos || logos.length === 0) return;

  const renderItem = (c) => `
    <div class="flex-shrink-0 mx-4 sm:mx-6 flex flex-col items-center justify-center group">
      <div class="w-36 h-20 bg-white rounded-2xl p-2.5 flex items-center justify-center border-2 border-white/40 hover:border-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-500/10 hover:scale-105">
        <img src="${c.logo}" alt="${c.name}" class="max-h-14 max-w-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <span class="hidden text-xs font-bold text-slate-900 text-center">${c.name}</span>
      </div>
      <span class="text-xs text-slate-200 font-semibold mt-2 text-center drop-shadow">${c.name}</span>
    </div>
  `;

  // Duplicate for smooth seamless loop
  const html = logos.map(renderItem).join("");
  marqueeInner.innerHTML = `<div class="marquee-content">${html}</div><div class="marquee-content" aria-hidden="true">${html}</div>`;
}

// 6. Interactive Workflow Toggle (On-Site vs In-Lab)
function initWorkflowToggle() {
  const btnOnsite = document.getElementById("wf-btn-onsite");
  const btnLab = document.getElementById("wf-btn-lab");
  const viewOnsite = document.getElementById("wf-view-onsite");
  const viewLab = document.getElementById("wf-view-lab");

  if (!btnOnsite || !btnLab || !viewOnsite || !viewLab) return;

  btnOnsite.addEventListener("click", () => {
    btnOnsite.classList.add("bg-cyan-500", "text-navy-dark", "shadow-lg", "shadow-cyan-500/30");
    btnOnsite.classList.remove("text-slate-400");
    btnLab.classList.remove("bg-cyan-500", "text-navy-dark", "shadow-lg", "shadow-cyan-500/30");
    btnLab.classList.add("text-slate-400");

    viewOnsite.classList.remove("hidden");
    viewLab.classList.add("hidden");
  });

  btnLab.addEventListener("click", () => {
    btnLab.classList.add("bg-cyan-500", "text-navy-dark", "shadow-lg", "shadow-cyan-500/30");
    btnLab.classList.remove("text-slate-400");
    btnOnsite.classList.remove("bg-cyan-500", "text-navy-dark", "shadow-lg", "shadow-cyan-500/30");
    btnOnsite.classList.add("text-slate-400");

    viewLab.classList.remove("hidden");
    viewOnsite.classList.add("hidden");
  });
}

// 7. Lightbox and Modal
function initLightbox() {
  const modal = document.getElementById("media-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalClose = document.getElementById("modal-close");

  if (!modal) return;

  window.openMediaModal = function(src, title) {
    if (modalImg) modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title || "Laboratory Document / Equipment";
    modal.classList.remove("hidden");
  };

  modalClose?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Quote modal trigger
  window.openQuoteModalWithItem = function(itemName) {
    const quoteModal = document.getElementById("quote-modal");
    const itemInput = document.getElementById("quote-modal-item");
    if (itemInput) itemInput.value = itemName;
    if (quoteModal) quoteModal.classList.remove("hidden");
  };

  const quoteModalClose = document.getElementById("quote-modal-close");
  const quoteModal = document.getElementById("quote-modal");
  quoteModalClose?.addEventListener("click", () => quoteModal?.classList.add("hidden"));
  quoteModal?.addEventListener("click", (e) => {
    if (e.target === quoteModal) quoteModal.classList.add("hidden");
  });
}
