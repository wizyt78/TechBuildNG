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
    const shell = qs("#video-shell");
    if (!shell || !C.videoVimeoUrl) return;
    const match = C.videoVimeoUrl.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
    if (!match) return;
    shell.innerHTML = `<iframe src="https://player.vimeo.com/video/${match[1]}" title="TechBuild NG website walkthrough" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }

  function setupProductModal() {
    const modal = qs("#product-modal");
    if (!modal) return;
    document.querySelectorAll("[data-open-product]").forEach(btn => {
      btn.addEventListener("click", () => {
        const p = C.packages[btn.dataset.openProduct];
        modal.innerHTML = `
          <div class="modal-backdrop" data-close></div>
          <div class="modal-panel">
            <button class="modal-close" data-close aria-label="Close">×</button>
            <span class="eyebrow">${p.tag}</span>
            <img class="modal-logo" src="${p.logo}" alt="">
            <h2>${p.title}</h2>
            <p>${p.detailDescription}</p>
            <div class="modal-price"><span class="old-price">${money(p.oldPrice)}</span><strong>${money(p.price)}</strong></div>
            <div class="modal-actions">
              <a class="btn btn-primary" href="product.html?product=${p.id}">View details & checkout →</a>
              <a class="btn btn-ghost" target="_blank" rel="noopener" href="${waLink("Hello TechBuild NG, I want details about the " + p.title + ".")}">Ask on WhatsApp</a>
            </div>
          </div>`;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden","false");
        modal.querySelectorAll("[data-close]").forEach(x => x.addEventListener("click", close));
      });
    });
    function close(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }
  }

  function renderProductDetail() {
    const el = qs("#product-detail");
    if (!el) return;
    const id = C.packages[params.get("product")] ? params.get("product") : "standard";
    const p = C.packages[id];
    el.innerHTML = `
      <div class="detail-grid">
        <div class="detail-media"><img src="${p.logo}" alt="${p.title}"></div>
        <div class="detail-copy">
          <span class="eyebrow">${p.tag}</span>
          <h1>${p.detailTitle}</h1>
          <p class="detail-lead">${p.detailDescription}</p>
          <div class="detail-price"><span class="old-price">${money(p.oldPrice)}</span><strong>${money(p.price)}</strong><span class="save-pill">Save ${money(p.oldPrice-p.price)}</span></div>
          <ul class="feature-list feature-large">${p.features.map(f=>`<li>${f}</li>`).join("")}</ul>
          <div class="after-payment"><strong>After payment</strong><p>Send your payment proof through the WhatsApp button so your order can be reviewed and work can get started.</p></div>
          <a class="btn btn-primary btn-large" href="checkout.html?product=${p.id}">Choose this package <span>→</span></a>
        </div>
      </div>
      <div class="details-tabs">
        <button class="tab active">Details</button>
        <button class="tab" data-live-tab>Live website</button>
      </div>
      <div class="live-tab-panel" id="live-tab-panel">
        <div class="video-shell" id="detail-video-shell"><div class="video-placeholder"><div class="play">▶</div><strong>Watch the full website walkthrough</strong><span>Replace VIDEO_VIMEO_URL in config.js with your Vimeo video.</span></div></div>
        <h3>Watch the full video of the website included with the package.</h3>
        <p>See the client-facing website and how the admin dashboard works, then open the live website below.</p>
        <p class="live-question">Do you want to see the website live?</p>
        <a class="btn btn-primary" target="_blank" rel="noopener" href="${C.liveWebsiteUrl}">Click here to open the live website ↗</a>
      </div>`;
    const tab = qs("[data-live-tab]");
    const panel = qs("#live-tab-panel");
    if (tab && panel) {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".details-tabs .tab").forEach(t=>t.classList.remove("active"));
        tab.classList.add("active");
        panel.classList.add("visible");
        const shell = qs("#detail-video-shell");
        if (shell && C.videoVimeoUrl) {
          const m = C.videoVimeoUrl.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
          if (m) shell.innerHTML = `<iframe src="https://player.vimeo.com/video/${m[1]}" title="TechBuild NG website walkthrough" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
      });
    }
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
    qs("#summary-logo").src = p.logo;
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
      const name = qs("#customer-name").value.trim();
      const email = qs("#customer-email").value.trim();
      const amount = selectedAmount();
      const btn = qs("#pay-button");
      btn.disabled = true; btn.innerHTML = "Preparing secure checkout…";
      try {
        const res = await fetch((C.apiBase || "") + "/api/initialize-payment", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ productId:p.id, productTitle:p.title, amount, name, email })
        });
        const data = await res.json();
        if (!res.ok || !data.checkout_url) throw new Error(data.message || "Unable to initialize payment.");
        sessionStorage.setItem("techbuild_order", JSON.stringify({productId:p.id, title:p.title, amount, name, email, reference:data.reference || ""}));
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
    if (!refEl) return;
    refEl.textContent = ref || "Not provided";
    const order = JSON.parse(sessionStorage.getItem("techbuild_order") || "null");
    const title = order?.title || "website package";
    const amount = order?.amount ? money(order.amount) : "";
    if (wa) wa.href = waLink(`Hello TechBuild NG, I have completed payment for ${title}${amount ? " ("+amount+")" : ""}. Payment reference: ${ref || "not shown"}. I am sending my payment proof here.`);
    if (!ref) { statusEl.textContent = "Reference not found. Please contact support on WhatsApp."; return; }
    try {
      const r = await fetch(`/api/verify-payment?reference=${encodeURIComponent(ref)}`);
      const d = await r.json();
      if (d.success) {
        const paymentStatus = String(d.status || "").toLowerCase();

        if (paymentStatus === "success" || paymentStatus === "successful") {

          statusEl.textContent = `Payment status: SUCCESS • Amount: ${money(Number(d.amount || 0))}`;
          statusEl.className = "verify-status success";

        } else if (paymentStatus === "pending" || paymentStatus === "processing") {

          statusEl.textContent = `Payment status: ${paymentStatus.toUpperCase()} • Waiting for payment confirmation.`;
          statusEl.className = "verify-status";

        } else {

          statusEl.textContent = `Payment status: ${paymentStatus.toUpperCase() || "CANCELLED"} • Payment was not completed.`;
          statusEl.className = "verify-status";

        }
      } else {
        statusEl.textContent = d.message || "Payment is not yet confirmed. Please send your proof on WhatsApp.";
      }
    } catch {
      statusEl.textContent = "Payment confirmation could not be checked from this browser. Please send your proof on WhatsApp.";
    }
  }

  header(); footer(); chat(); setupVideo(); setupProductModal(); renderProductDetail(); setupCheckout(); verifySuccess();
})();
