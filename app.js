(() => {
  const C = window.TECHBUILD_CONFIG;
  const money = n => new Intl.NumberFormat("en-NG", {style:"currency", currency:"NGN", maximumFractionDigits:0}).format(n);
  const qs = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);

  function header() {
    const el = qs("#site-header");
    if (!el) return;
    el.innerHTML = `
      <header class="site-header">
        <div class="container nav">
          <a class="brand" href="index.html">
            <img src="assets/brand-logo.svg" alt="${C.brandName} logo">
            <span>${C.brandName}</span>
          </a>
          <nav>
            <a href="index.html#packages">Packages</a>
            <a href="index.html#included">What's included</a>
            <a href="index.html#live-demo">Live website</a>
          </nav>
          <a class="nav-cta" href="index.html#packages">Get started</a>
        </div>
      </header>`;
  }

  function footer() {
    const el = qs("#site-footer");
    if (!el) return;
    el.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div><a class="brand footer-brand" href="index.html"><img src="assets/brand-logo.svg" alt=""> <span>${C.brandName}</span></a><p>Premium website builds for modern digital businesses.</p></div>
          <div><strong>Explore</strong><a href="index.html#packages">Packages</a><a href="index.html#included">Features</a><a href="index.html#live-demo">Live website</a></div>
          <div><strong>Support</strong><a target="_blank" rel="noopener" href="${waLink("Hello TechBuild NG, I need help with a website package.")}">WhatsApp support</a><a href="mailto:">Email support</a></div>
        </div>
        <div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${C.brandName}. All rights reserved.</span><span>Professional • Responsive • Payment-ready</span></div>
      </footer>`;
  }

  function waLink(message) {
    return "https://wa.me/" + C.whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(message);
  }

  function chat() {
    const el = qs("#chat-widget");
    if (!el) return;
    el.innerHTML = `
      <div class="chat-wrap">
        <div class="chat-label">Need help?</div>
        <a class="whatsapp-fab" href="${waLink("Hello TechBuild NG, I have a question about your website packages.")}" target="_blank" rel="noopener" aria-label="Chat with TechBuild NG on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.49 0 .15 5.33.15 11.9c0 2.1.55 4.15 1.59 5.96L.05 24l6.28-1.65a11.88 11.88 0 0 0 5.71 1.46h.01c6.56 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.42-8.43ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.73.98 1-3.64-.23-.37a9.86 9.86 0 0 1-1.52-5.27C2.15 6.44 6.59 2 12.05 2c2.65 0 5.14 1.04 7.02 2.93a9.86 9.86 0 0 1 2.91 7.03c0 5.47-4.45 9.84-9.93 9.84Zm5.43-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
        </a>
      </div>`;
  }

  function setupVideo() {
    if (!C.videoVimeoUrl) return;
    const match = C.videoVimeoUrl.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
    if (!match) return;
    const player = `<iframe src="https://player.vimeo.com/video/${match[1]}" title="TechBuild NG website walkthrough" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    ["#hero-video-shell", "#video-shell"].forEach(selector => {
      const shell = qs(selector);
      if (shell) shell.innerHTML = player;
    });
  }


  function renderCatalog() {
    const grid = qs("#product-grid");
    if (!grid) return;
    const entries = Object.values(C.packages);
    const draw = query => {
      const q = String(query || "").trim().toLowerCase();
      const matches = entries.filter(p => [p.title,p.category,p.tag,p.description].join(" ").toLowerCase().includes(q));
      grid.innerHTML = matches.map(p => `
        <article class="product-card" data-product="${p.id}">
          <div class="product-media"><img src="${p.cover}" alt="${p.title} website preview" loading="lazy"><span class="media-badge">${p.tag}</span></div>
          <div class="product-body"><div class="product-kicker">${p.category}</div><h3>${p.title}</h3><p>${p.description}</p>
            <ul class="feature-list">${p.features.slice(0,4).map(f=>`<li>${f}</li>`).join("")}</ul>
            <div class="price-row"><div><span class="old-price">${money(p.oldPrice)}</span><strong>${money(p.price)}</strong><span class="deposit-from">Deposit from ${money(p.minDeposit)}</span></div><span class="save-pill">Save ${money(p.oldPrice-p.price)}</span></div>
            <div class="fixed-price-badge"><span aria-hidden="true">✓</span> FIXED PRICE <span class="fixed-price-separator">·</span> NO BARGAINING</div>
            <div class="sales-count" aria-label="Total sales"><span class="sales-count-label">Total Sales</span><strong>${Number(p.salesCount || 0).toLocaleString("en-NG")}</strong></div>
            <div class="product-actions">
              <button class="btn btn-primary" data-open-product="${p.id}">View package <span>→</span></button>
              <a class="btn btn-demo${p.liveDemoUrl ? "" : " is-placeholder"}" href="${p.liveDemoUrl || "#"}"${p.liveDemoUrl ? ' target="_blank" rel="noopener"' : ' aria-disabled="true" data-live-demo-empty="true"'}>Live Demo <span>↗</span></a>
            </div>
          </div>
        </article>`).join("");
      const count = qs("#catalog-count");
      const empty = qs("#catalog-empty");
      if (count) count.textContent = `${matches.length} website ${matches.length === 1 ? "package" : "packages"}`;
      if (empty) empty.classList.toggle("hidden", matches.length !== 0);
    };
    const search = qs("#product-search");
    if (search) search.addEventListener("input", () => draw(search.value));
    draw("");
  }

  function renderVideoGallery() {
    const gallery = qs("#video-gallery");
    if (!gallery) return;
    const videos = Array.isArray(C.videoShowcase) ? C.videoShowcase : [];
    gallery.innerHTML = videos.map((v, i) => {
      const match = String(v.url || "").match(/(?:vimeo\.com\/(?:video\/)?)((?:\d+))/);
      const embed = match ? `https://player.vimeo.com/video/${match[1]}` : "";
      return `<article class="video-library-card"><div class="video-library-player">${embed ? `<iframe src="${embed}" title="${v.title || `Website product video ${i+1}`}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` : `<div class="video-placeholder"><strong>${v.title || "Website product video"}</strong><span>Add a valid Vimeo URL in config.js to show this video.</span></div>`}</div><div class="video-library-copy"><span class="product-kicker">${v.label || "Website preview"}</span><h3>${v.title || `Website product video ${i+1}`}</h3></div></article>`;
    }).join("");
    if (!videos.length) gallery.innerHTML = `<div class="video-gallery-empty">Add video entries to <code>videoShowcase</code> in config.js to display your uploaded walkthroughs here.</div>`;
  }

  function setupProductModal() {
    const modal = qs("#product-modal");
    const grid = qs("#product-grid");
    if (!modal || !grid || grid.dataset.modalBound === "true") return;
    grid.dataset.modalBound = "true";
    grid.addEventListener("click", event => {
      const btn = event.target.closest("[data-open-product]");
      if (!btn) return;
      const p = C.packages[btn.dataset.openProduct];
      if (!p) return;
      modal.innerHTML = `
        <div class="modal-backdrop" data-close></div>
        <div class="modal-panel">
          <button class="modal-close" data-close aria-label="Close">×</button>
          <span class="eyebrow">${p.tag}</span>
          <img class="modal-cover" src="${p.cover}" alt="${p.title} website preview" loading="lazy">
          <h2>${p.title}</h2>
          <p>${p.detailDescription}</p>
          <div class="modal-price"><span class="old-price">${money(p.oldPrice)}</span><strong>${money(p.price)}</strong><span class="deposit-from">Deposit from ${money(p.minDeposit)}</span></div>
          <div class="fixed-price-badge"><span aria-hidden="true">✓</span> FIXED PRICE <span class="fixed-price-separator">·</span> NO BARGAINING</div>
          <div class="modal-actions"><a class="btn btn-primary" href="product.html?product=${p.id}">View details & checkout →</a></div>
        </div>`;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelectorAll("[data-close]").forEach(x => x.addEventListener("click", close));
    });
    function close() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
  }

  function renderProductDetail() {
    const el = qs("#product-detail");
    if (!el) return;
    const id = C.packages[params.get("product")] ? params.get("product") : "standard";
    const p = C.packages[id];
    const isInvestmentVideo = id === "standard" || id === "custom";
    const previewIds = ["socialmedia", "banking", "loanbanking", "cars", "tracking", "clothing", "stylehub", "celebrity", "truck", "ecommerce"];
    const previewMarkup = !isInvestmentVideo && previewIds.includes(id) ? `
      <section class="preview-gallery-section" aria-labelledby="preview-gallery-title">
        <div class="preview-gallery-heading">
          <span class="eyebrow">VISUAL SHOWCASE</span>
          <h2 id="preview-gallery-title">Explore the ${p.title} design</h2>
          <p>Swipe through the image gallery to explore the website's layout and key screens. Each image opens in a larger view so you can inspect the full screenshot.</p>
        </div>
        <div class="preview-carousel" data-preview-carousel="${id}">
          <div class="preview-track" data-preview-track tabindex="0" aria-label="Website screenshot gallery">
            ${[1,2,3].map((n) => { const previewSrc = id === "stylehub" ? `assets/previews/stylehub-clothing-online-store-${n}.jpg` : `assets/previews/${id}-${n}.jpg`; return `<button class="preview-slide" type="button" data-preview-open="${n}" aria-label="Open website preview image ${n}"><img src="${previewSrc}" alt="${p.title} website preview ${n}" loading="lazy"><span class="preview-image-hint">Tap to view full image <span aria-hidden="true">↗</span></span></button>`; }).join("")}
          </div>
          <div class="preview-controls"><button type="button" class="preview-arrow" data-preview-prev aria-label="Previous preview">←</button><div class="preview-dots" aria-label="Choose preview image">${[1,2,3].map((n) => `<button type="button" class="preview-dot${n===1?' active':''}" data-preview-dot="${n-1}" aria-label="Go to preview ${n}"></button>`).join("")}</div><button type="button" class="preview-arrow" data-preview-next aria-label="Next preview">→</button></div>
        </div>
      </section>
      <div class="preview-lightbox" data-preview-lightbox aria-hidden="true"><div class="preview-lightbox-backdrop" data-preview-close></div><div class="preview-lightbox-panel" role="dialog" aria-modal="true" aria-label="Full-size website preview"><button class="preview-lightbox-close" type="button" data-preview-close aria-label="Close image">×</button><button class="preview-lightbox-arrow prev" type="button" data-lightbox-prev aria-label="Previous image">‹</button><img data-lightbox-image src="" alt="Full-size website preview"><button class="preview-lightbox-arrow next" type="button" data-lightbox-next aria-label="Next image">›</button><div class="preview-lightbox-count" data-lightbox-count>1 / 3</div></div></div>` : "";
    const liveVideoMarkup = isInvestmentVideo ? `
      <div class="investment-video-content">
        <div class="video-feature-card video-feature-card-detail">
          <div class="video-card-top"><span class="video-live-dot"></span><span class="video-card-label">WEBSITE WALKTHROUGH</span><span class="video-card-tag">VIMEO VIDEO</span></div>
          <div class="video-shell" id="detail-video-shell"><div class="video-placeholder"><div class="play">▶</div><strong>Watch the website walkthrough</strong><span>Explore the website package and its key features.</span></div></div>
          <div class="video-card-bottom"><div><strong>Explore the website in action</strong><span>Website pages · Key features · Mobile experience</span></div><span class="video-duration">FULL WALKTHROUGH</span></div>
        </div>
        <h3>Watch the website walkthrough</h3>
        <p>See the website experience and explore the features included with this investment website package.</p>
        <p class="live-question">Want to open the live website?</p>
        <a class="btn btn-primary" target="_blank" rel="noopener" href="${C.liveWebsiteUrl}">Open live website ↗</a>
      </div>` : `${previewMarkup}`;
    el.innerHTML = `
      <div class="detail-grid">
        <div class="detail-media"><img src="${p.cover}" alt="${p.title} website preview" loading="eager"></div>
        <div class="detail-copy">
          <span class="eyebrow">${p.tag}</span><h1>${p.detailTitle}</h1><p class="detail-lead">${p.detailDescription}</p>
          <div class="detail-price"><span class="old-price">${money(p.oldPrice)}</span><strong>${money(p.price)}</strong><span class="save-pill">Save ${money(p.oldPrice-p.price)}</span><span class="deposit-from">Deposit from ${money(p.minDeposit)}</span></div>
          <div class="fixed-price-badge fixed-price-detail"><span aria-hidden="true">✓</span> FIXED PRICE <span class="fixed-price-separator">·</span> NO BARGAINING</div>
          <div class="sales-count sales-count-detail" aria-label="Total sales"><span class="sales-count-label">Total Sales</span><strong>${Number(p.salesCount || 0).toLocaleString("en-NG")}</strong></div>
          <ul class="feature-list feature-large">${p.features.map(f=>`<li>${f}</li>`).join("")}</ul>
          <div class="after-payment"><strong>After payment</strong><p>Send your payment proof through the WhatsApp button so your order can be reviewed and work can get started.</p></div>
          <div class="product-actions product-actions-detail">
            <a class="btn btn-primary btn-large" href="checkout.html?product=${p.id}">View package <span>→</span></a>
            <a class="btn btn-demo btn-large${p.liveDemoUrl ? "" : " is-placeholder"}" href="${p.liveDemoUrl || "#"}"${p.liveDemoUrl ? ' target="_blank" rel="noopener"' : ' aria-disabled="true" data-live-demo-empty="true"'}>Live Demo <span>↗</span></a>
          </div>
        </div>
      </div>
      <div class="preview-guide" aria-hidden="true">
        <span>See the website preview</span><strong>↓</strong>
      </div>
      <div class="details-tabs"><button class="tab active" data-live-tab>${isInvestmentVideo ? "Live website" : "Website previews"}</button></div>
      <div class="live-tab-panel visible" id="live-tab-panel">${isInvestmentVideo ? liveVideoMarkup : previewMarkup}</div>`;

    const tab = qs("[data-live-tab]");
    const panel = qs("#live-tab-panel");
    if (tab && panel) {
      // The preview is intentionally visible by default. There is no separate Details tab.
      tab.addEventListener("click", () => {
        document.querySelectorAll(".details-tabs .tab").forEach(t=>t.classList.remove("active"));
        tab.classList.add("active");
        panel.classList.add("visible");
        panel.scrollIntoView({behavior:"smooth", block:"start"});
      });

      // Keep the existing Vimeo flow for the two investment packages, but load it
      // automatically now that Live website is the only tab.
      if (isInvestmentVideo) {
        const shell = qs("#detail-video-shell");
        if (shell && C.videoVimeoUrl) {
          const m = C.videoVimeoUrl.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
          if (m) shell.innerHTML = `<iframe src="https://player.vimeo.com/video/${m[1]}" title="${p.title} walkthrough" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        }
      }
    }
    if (!isInvestmentVideo && previewIds.includes(id)) setupPreviewGallery(el, id, p.title);
  }

  function setupPreviewGallery(root, productId, productTitle) {
    const carousel = root.querySelector("[data-preview-carousel]");
    const track = carousel?.querySelector("[data-preview-track]");
    const lightbox = root.querySelector("[data-preview-lightbox]");
    if (!carousel || !track || !lightbox) return;
    const slides = Array.from(track.querySelectorAll(".preview-slide"));
    const dots = Array.from(carousel.querySelectorAll("[data-preview-dot]"));
    const image = lightbox.querySelector("[data-lightbox-image]");
    const count = lightbox.querySelector("[data-lightbox-count]");
    let current = 0;
    const imagePath = n => productId === "stylehub" ? `assets/previews/stylehub-clothing-online-store-${n + 1}.jpg` : `assets/previews/${productId}-${n + 1}.jpg`;
    function goTo(index) {
      current = (index + slides.length) % slides.length;
      const slide = slides[current];
      track.scrollTo({left: slide.offsetLeft - track.offsetLeft, behavior:"smooth"});
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    }
    function openLightbox(index) {
      current = index;
      image.src = imagePath(current);
      image.alt = `${productTitle} full-size preview ${current + 1}`;
      count.textContent = `${current + 1} / ${slides.length}`;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("preview-lightbox-open");
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("preview-lightbox-open");
    }
    function moveLightbox(delta) {
      current = (current + delta + slides.length) % slides.length;
      image.src = imagePath(current);
      image.alt = `${productTitle} full-size preview ${current + 1}`;
      count.textContent = `${current + 1} / ${slides.length}`;
    }
    carousel.querySelector("[data-preview-prev]")?.addEventListener("click", () => goTo(current - 1));
    carousel.querySelector("[data-preview-next]")?.addEventListener("click", () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
    slides.forEach((slide, i) => slide.addEventListener("click", () => openLightbox(i)));
    lightbox.querySelectorAll("[data-preview-close]").forEach(node => node.addEventListener("click", closeLightbox));
    lightbox.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => moveLightbox(-1));
    lightbox.querySelector("[data-lightbox-next]")?.addEventListener("click", () => moveLightbox(1));
    lightbox.addEventListener("touchstart", event => { lightbox.dataset.touchX = String(event.changedTouches[0].clientX); }, {passive:true});
    lightbox.addEventListener("touchend", event => {
      const start = Number(lightbox.dataset.touchX || 0), diff = event.changedTouches[0].clientX - start;
      if (Math.abs(diff) > 55) moveLightbox(diff < 0 ? 1 : -1);
    }, {passive:true});
    document.addEventListener("keydown", event => {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "ArrowLeft") moveLightbox(-1);
    });
    track.addEventListener("scroll", () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0, distance = Infinity;
      slides.forEach((slide, i) => { const d = Math.abs(slide.offsetLeft + slide.clientWidth/2 - center); if (d < distance) {distance=d; nearest=i;} });
      current = nearest; dots.forEach((dot, i) => dot.classList.toggle("active", i === nearest));
    }, {passive:true});
  }

  function setupCheckout() {
    const form = qs("#checkout-form");
    if (!form) return;
    const id = C.packages[params.get("product")] ? params.get("product") : "standard";
    const p = C.packages[id];
    qs("#checkout-product-name").textContent = p.title;
    qs("#full-price").textContent = money(p.price);
    qs("#deposit-label").textContent = `From ${money(p.minDeposit)}`;
    qs("#deposit-help").textContent = `Choose any amount from ${money(p.minDeposit)} up to ${money(p.price)}.`;
    qs("#min-hint").textContent = `Minimum: ${money(p.minDeposit)}`;
    qs("#max-hint").textContent = `Maximum: ${money(p.price)}`;
    qs("#summary-logo").src = p.cover;
    qs("#summary-logo").alt = `${p.title} website preview`;
    qs("#summary-title").textContent = p.title;
    qs("#summary-description").textContent = p.description;
    const amountInput = qs("#custom-amount");
    const amountBox = qs("#amount-box");
    const amountError = qs("#amount-error");
    let mode = "full";

    function selectedAmount() {
      if (mode === "full") return p.price;
      return Number(String(amountInput.value).replace(/[^\d]/g,""));
    }
    function validateAmount() {
      const a = selectedAmount();
      if (mode === "full") { amountError.textContent=""; return true; }
      if (!a) { amountError.textContent="Enter an amount."; return false; }
      if (a < p.minDeposit) { amountError.textContent=`The minimum deposit for this package is ${money(p.minDeposit)}.`; return false; }
      if (a > p.price) { amountError.textContent=`The maximum payment is ${money(p.price)}. Choose full payment if you want to complete the order.`; return false; }
      amountError.textContent="";
      return true;
    }
    function refreshSummary(){
      const a = selectedAmount();
      qs("#summary-amount").textContent = a ? money(a) : "—";
      validateAmount();
    }
    document.querySelectorAll(".choice").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      mode = btn.dataset.mode;
      amountBox.classList.toggle("hidden", mode !== "deposit");
      if (mode === "deposit") { amountInput.value = p.minDeposit.toLocaleString("en-NG"); amountInput.focus(); }
      refreshSummary();
    }));
    amountInput.addEventListener("input", () => {
      const n = Number(amountInput.value.replace(/[^\d]/g,""));
      amountInput.value = n ? n.toLocaleString("en-NG") : "";
      refreshSummary();
    });

    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!validateAmount()) return;
      const username = qs("#customer-username").value.trim();
      const email = qs("#customer-email").value.trim();
      const amount = selectedAmount();
      const btn = qs("#pay-button");
      btn.disabled = true; btn.innerHTML = "Preparing secure checkout…";
      try {
        const res = await fetch((C.apiBase || "") + "/api/initialize-payment", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ productId:p.id, productTitle:p.title, amount, name:username, username, email })
        });
        const data = await res.json();
        if (!res.ok || !data.checkout_url) throw new Error(data.message || "Unable to initialize payment.");
        sessionStorage.setItem("techbuild_order", JSON.stringify({productId:p.id, title:p.title, amount, username, email, reference:data.reference || ""}));
        window.location.href = data.checkout_url;
      } catch (err) {
        btn.disabled = false; btn.innerHTML = "Continue to secure payment <span>→</span>";
        alert(err.message + "\\n\\nIf you are testing the design before connecting KoraPay, deploy the included Vercel API and add your KoraPay secret key.");
      }
    });
    refreshSummary();
  }

  async function verifySuccess() {
    const ref = params.get("ref") || params.get("reference") || "";
    const refEl = qs("#payment-reference");
    const statusEl = qs("#verify-status");
    const wa = qs("#whatsapp-success");
    const stateEl = document.getElementById("payment-state");
const titleEl = document.getElementById("payment-title");
if (wa) wa.style.display = "none";
    if (!refEl) return;
    refEl.textContent = ref || "Not provided";
    const order = JSON.parse(sessionStorage.getItem("techbuild_order") || "null");
    const title = order?.title || "website package";
    const username = order?.username || "";
    if (wa) wa.href = waLink(`Hello TechBuild NG, I have completed payment for ${title}. Username: ${username || "not provided"}. Email: ${order?.email || "not provided"}. Payment reference: ${ref || "not shown"}. I am sending my payment proof here.`);
    if (!ref) { statusEl.textContent = "Reference not found. Please contact support on WhatsApp."; return; }
    try {
      const r = await fetch(`/api/verify-payment?reference=${encodeURIComponent(ref)}`);
      const d = await r.json();
      if (d.success) {
  const paymentStatus = String(d.status || "").toLowerCase();

  if (paymentStatus === "success" || paymentStatus === "successful") {

    const verifiedAmount = Number(d.amount || order?.amount || 0);
    const pkg = order?.productId && C.packages[order.productId] ? C.packages[order.productId] : null;
    const fullPrice = Number(pkg?.price || 0);
    const paymentType = fullPrice && verifiedAmount >= fullPrice ? "full payment" : "deposit payment";
    const verifiedAmountText = verifiedAmount ? ` (${money(verifiedAmount)})` : "";
    if (wa) wa.href = waLink(`Hello TechBuild NG, I have completed ${paymentType} for ${title}${verifiedAmountText}. Username: ${username || "not provided"}. Email: ${order?.email || "not provided"}. Payment reference: ${ref || "not shown"}. I am sending my payment proof here.`);

    if (stateEl) stateEl.textContent = "Payment successful";
    if (titleEl) titleEl.textContent = "Payment confirmed.";

    if (wa) wa.style.display = "";

    statusEl.textContent =
      `Payment status: SUCCESS • Amount: ${money(verifiedAmount)}`;

    statusEl.className = "verify-status success";

  } else if (paymentStatus === "pending" || paymentStatus === "processing") {

    if (stateEl) stateEl.textContent = "Payment pending";
    if (titleEl) titleEl.textContent = "Waiting for payment confirmation.";

    if (wa) wa.style.display = "none";

    statusEl.textContent =
      `Payment status: ${paymentStatus.toUpperCase()} • Waiting for payment confirmation.`;

    statusEl.className = "verify-status";

  } else {

    if (stateEl) stateEl.textContent = "Payment cancelled";
    if (titleEl) titleEl.textContent = "Payment was not completed.";

    if (wa) wa.style.display = "none";

    statusEl.textContent =
      `Payment status: ${paymentStatus.toUpperCase() || "CANCELLED"} • Payment was not completed.`;

    statusEl.className = "verify-status";

  }

} else {

  if (wa) wa.style.display = "none";
        statusEl.textContent = d.message || "Payment is not yet confirmed. Please send your proof on WhatsApp.";
      }
    } catch {
      statusEl.textContent = "Payment confirmation could not be checked from this browser. Please send your proof on WhatsApp.";
    }
  }

  header(); footer(); chat(); setupVideo(); renderCatalog();
  document.addEventListener("click", (event) => {
    const demo = event.target.closest("[data-live-demo-empty]");
    if (!demo) return;
    event.preventDefault();
  });
  setupProductModal(); renderVideoGallery(); renderProductDetail(); setupCheckout(); verifySuccess();
})();
