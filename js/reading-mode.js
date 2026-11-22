/* Bholenath Dham — Purana reading mode (v1)
   Text size, serif/sans, light/sepia/night, line width, progress bar and "continue where you left off".
   Self-contained (injects its own CSS). Runs only on pages that have chapter text. No tracking. */
(function () {
  "use strict";
  if (window.__bdReadingMode) return;
  var chapter = document.querySelector(".sp-chapter-text");
  if (!chapter) return;
  window.__bdReadingMode = true;

  var KEY = "bholenathReadingV1";
  var POS = "bholenathReadPos:" + location.pathname;
  var root = document.documentElement;

  var T = {
    en: { aa: "Reading settings", size: "Text size", font: "Font", serif: "Serif", sans: "Sans", theme: "Background", day: "Day", sepia: "Sepia", night: "Night", width: "Width", narrow: "Narrow", wide: "Wide", reset: "Reset", close: "Close", cont: "Continue where you left off?", go: "Continue", again: "Start over" },
    bn: { aa: "পড়ার সেটিংস", size: "লেখার আকার", font: "ফন্ট", serif: "সেরিফ", sans: "সান্স", theme: "ব্যাকগ্রাউন্ড", day: "দিন", sepia: "সেপিয়া", night: "রাত", width: "প্রস্থ", narrow: "সরু", wide: "চওড়া", reset: "রিসেট", close: "বন্ধ", cont: "যেখানে ছেড়েছিলেন সেখান থেকে চালিয়ে যাবেন?", go: "চালিয়ে যান", again: "শুরু থেকে" },
    hi: { aa: "पढ़ने की सेटिंग", size: "अक्षर का आकार", font: "फ़ॉन्ट", serif: "सेरिफ़", sans: "सैन्स", theme: "पृष्ठभूमि", day: "दिन", sepia: "सेपिया", night: "रात", width: "चौड़ाई", narrow: "संकरी", wide: "चौड़ी", reset: "रीसेट", close: "बंद करें", cont: "जहाँ छोड़ा था वहीं से जारी रखें?", go: "जारी रखें", again: "शुरू से" }
  };
  function lang() {
    var l = (root.lang || "hi").slice(0, 2);
    return l === "en" || l === "bn" ? l : "hi";
  }

  var S = { size: 2, font: "sans", theme: "day", width: "normal" };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved) for (var k in S) if (saved[k] != null) S[k] = saved[k]; } catch (_) {}
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }

  var SIZES = [17, 19, 21, 24, 28];

  /* ---------- CSS ---------- */
  var css = [
    ".bd-rm-bar{position:fixed;left:0;top:0;height:3px;width:0;z-index:99999;background:linear-gradient(90deg,#c99a3c,#f1d58f);transition:width .12s linear;pointer-events:none}",
    ".bd-rm-btn{position:fixed;left:14px;bottom:16px;z-index:9998;width:48px;height:48px;border-radius:50%;border:1px solid #c99a3c;background:#2a0d0f;color:#f1d58f;font:700 18px Georgia,serif;cursor:pointer;box-shadow:0 8px 20px -8px rgba(0,0,0,.6)}",
    ".bd-rm-btn small{font-size:12px}",
    ".bd-rm-panel{position:fixed;left:14px;bottom:74px;z-index:9999;width:min(320px,calc(100vw - 28px));padding:16px;border-radius:16px;background:#fffaf0;color:#2b1a14;border:1px solid #c99a3c;box-shadow:0 18px 40px -16px rgba(0,0,0,.55);font:500 14px Poppins,system-ui,sans-serif}",
    ".bd-rm-panel[hidden]{display:none}",
    ".bd-rm-panel h4{margin:0 0 10px;font:700 15px Poppins,system-ui,sans-serif;color:#6b0f14}",
    ".bd-rm-row{margin:10px 0}.bd-rm-row>span{display:block;margin-bottom:6px;font-size:12px;letter-spacing:.04em;color:#7a5a3a}",
    ".bd-rm-seg{display:flex;gap:6px}.bd-rm-seg button{flex:1;padding:9px 4px;border-radius:10px;border:1px solid #d9c391;background:#fff;color:#2b1a14;font:600 13px inherit;font-family:inherit;cursor:pointer}",
    ".bd-rm-seg button[aria-pressed=true]{background:#6b0f14;border-color:#6b0f14;color:#fff}",
    ".bd-rm-foot{display:flex;justify-content:space-between;margin-top:12px}.bd-rm-foot button{background:none;border:0;color:#6b0f14;font:600 13px Poppins,system-ui,sans-serif;cursor:pointer;text-decoration:underline}",
    ".bd-rm-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:78px;z-index:9999;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 24px);padding:12px 16px;border-radius:14px;background:#2a0d0f;color:#f1d58f;border:1px solid #c99a3c;font:500 14px Poppins,system-ui,sans-serif;box-shadow:0 18px 40px -16px rgba(0,0,0,.6)}",
    ".bd-rm-toast button{padding:7px 14px;border-radius:999px;border:1px solid #c99a3c;background:#c99a3c;color:#2a0d0f;font:700 13px inherit;font-family:inherit;cursor:pointer}",
    ".bd-rm-toast button.ghost{background:transparent;color:#f1d58f}",
    /* reading styles */
    ".sp-chapter-text p,.sp-chapter-text li{font-size:var(--bd-rm-size,19px)!important;line-height:1.95!important}",
    "html.bd-rm-serif .sp-chapter-text p,html.bd-rm-serif .sp-chapter-text li{font-family:'Noto Serif Bengali','Noto Serif Devanagari',Georgia,'Times New Roman',serif!important}",
    "html.bd-rm-narrow .sp-section .sp-chapter-text{max-width:620px;margin-left:auto;margin-right:auto}",
    "html.bd-rm-wide .sp-section .sp-chapter-text{max-width:1000px;margin-left:auto;margin-right:auto}",
    /* sepia */
    "html.bd-rm-sepia body{background:#f4ecd8!important}",
    "html.bd-rm-sepia .sp-intro,html.bd-rm-sepia .sp-section,html.bd-rm-sepia .sp-quote,html.bd-rm-sepia .sp-chapter-nav{background:transparent!important}",
    "html.bd-rm-sepia .sp-chapter-text p{color:#3b2a1a!important}",
    /* night */
    "html.bd-rm-night body{background:#14100d!important;color:#e6d9c4}",
    "html.bd-rm-night .sp-intro,html.bd-rm-night .sp-section,html.bd-rm-night .sp-quote,html.bd-rm-night .sp-chapter-nav,html.bd-rm-night .sp-chapter-section{background:transparent!important;color:#e6d9c4!important;border-color:rgba(201,154,60,.35)!important;box-shadow:none!important}",
    "html.bd-rm-night .sp-intro p,html.bd-rm-night .sp-section p,html.bd-rm-night .sp-section li,html.bd-rm-night .sp-quote p,html.bd-rm-night .sp-chapter-text p,html.bd-rm-night .sp-chapter-nav p{color:#e6d9c4!important}",
    "html.bd-rm-night .sp-intro h1,html.bd-rm-night .sp-section h2,html.bd-rm-night .sp-section h3,html.bd-rm-night .sp-chapter-nav h2,html.bd-rm-night .sp-quote h2{color:#f1d58f!important}",
    "html.bd-rm-night .sp-chapter-nav a{background:#2a0d0f!important;color:#f1d58f!important;border-color:rgba(201,154,60,.5)!important}",
    "html.bd-rm-night .sp-intro p,html.bd-rm-night .sp-chapter-text,html.bd-rm-night .sp-feature-card,html.bd-rm-night .sp-info-card,html.bd-rm-night .sp-structure-box,html.bd-rm-night .sp-faq-item,html.bd-rm-night .sp-card,html.bd-rm-night .sp-samhita-list div,html.bd-rm-night .sp-quote-box{background:#201813!important;background-image:none!important;border-color:rgba(201,154,60,.35)!important;box-shadow:none!important}",
    "html.bd-rm-night .sp-feature-card *,html.bd-rm-night .sp-info-card *,html.bd-rm-night .sp-structure-box *,html.bd-rm-night .sp-faq-item *,html.bd-rm-night .sp-card *,html.bd-rm-night .sp-samhita-list div *,html.bd-rm-night .sp-quote-box *{color:#e6d9c4!important}",
    "html.bd-rm-night .sp-feature-card h3,html.bd-rm-night .sp-info-card h3,html.bd-rm-night .sp-quote-box h2,html.bd-rm-night .sp-quote-box h3{color:#f1d58f!important}",
    "html.bd-rm-night .sp-chapter-text *{color:#e6d9c4!important}",
    "html.bd-rm-night :is(.sp-intro,.sp-section,.sp-quote,.sp-chapter-nav) :is(h1,h2,h3,h4) *{color:inherit!important}",
    "html.bd-rm-night .sp-chapter-nav a *{color:#f1d58f!important}",
    "html.bd-rm-night .sp-feature-icon,html.bd-rm-night .sp-feature-icon *,html.bd-rm-night .sp-feature-card .sp-feature-icon,html.bd-rm-night .sp-feature-card .sp-feature-icon *,html.bd-rm-night .sp-info-card .sp-info-icon,html.bd-rm-night .sp-info-card .sp-info-icon *{color:#6b0f14!important}",
    "html.bd-rm-night .sp-feature-section{background:transparent!important}",
    "html.bd-rm-night .sp-feature-section :is(h1,h2,h3,h4),html.bd-rm-night .sp-feature-section :is(h1,h2,h3,h4) *{color:#f1d58f!important}",
    "html.bd-rm-night .sp-quote-box p{background:transparent!important;color:#e6d9c4!important}",
    "html.bd-rm-night .chapter-list li{background:#201813!important;background-image:none!important;border-color:rgba(201,154,60,.35)!important}",
    "html.bd-rm-night .chapter-list li,html.bd-rm-night .chapter-list li *{color:#e6d9c4!important}",
    "html.bd-rm-night .chapter-list li a,html.bd-rm-night .chapter-list li a *{color:#f1d58f!important}",
    "html.bd-rm-night section[class^=sp-] :is(h1,h2,h3,h4),html.bd-rm-night section[class^=sp-] :is(h1,h2,h3,h4) *{color:#f1d58f!important}",
    "html.bd-rm-night section[class^=sp-] :is(p,li) a{color:#f1d58f!important}",
    "html.bd-rm-night .sp-chapter-text{color:#e6d9c4!important}",
    "html.bd-rm-night .sp-next-card p,html.bd-rm-night .sp-next-card p *{color:#e6d9c4!important}",
    "html.bd-rm-night .chapter-status,html.bd-rm-night .chapter-status *{color:#1b5e20!important}",
    "html.bd-rm-night .sp-chapter-text a{color:#f1d58f!important}"
  ].join("\n");
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function apply() {
    root.style.setProperty("--bd-rm-size", SIZES[S.size] + "px");
    root.classList.toggle("bd-rm-serif", S.font === "serif");
    ["sepia", "night"].forEach(function (t) { root.classList.toggle("bd-rm-" + t, S.theme === t); });
    root.classList.toggle("bd-rm-narrow", S.width === "narrow");
    root.classList.toggle("bd-rm-wide", S.width === "wide");
  }
  apply();

  /* ---------- UI ---------- */
  var bar = document.createElement("div"); bar.className = "bd-rm-bar"; bar.setAttribute("aria-hidden", "true");
  var btn = document.createElement("button"); btn.type = "button"; btn.className = "bd-rm-btn"; btn.innerHTML = "A<small>a</small>";
  btn.setAttribute("aria-expanded", "false");
  var panel = document.createElement("div"); panel.className = "bd-rm-panel"; panel.hidden = true; panel.setAttribute("role", "dialog");
  document.body.appendChild(bar); document.body.appendChild(btn); document.body.appendChild(panel);

  function seg(name, opts, cur) {
    return '<div class="bd-rm-seg">' + opts.map(function (o) {
      return '<button type="button" data-k="' + name + '" data-v="' + o[0] + '" aria-pressed="' + (String(cur) === String(o[0])) + '">' + o[1] + "</button>";
    }).join("") + "</div>";
  }
  function render() {
    var t = T[lang()];
    btn.setAttribute("aria-label", t.aa); btn.title = t.aa;
    panel.setAttribute("aria-label", t.aa);
    panel.innerHTML =
      "<h4>" + t.aa + "</h4>" +
      '<div class="bd-rm-row"><span>' + t.size + "</span>" + seg("size", [[0, "A−−"], [1, "A−"], [2, "A"], [3, "A+"], [4, "A++"]], S.size) + "</div>" +
      '<div class="bd-rm-row"><span>' + t.font + "</span>" + seg("font", [["sans", t.sans], ["serif", t.serif]], S.font) + "</div>" +
      '<div class="bd-rm-row"><span>' + t.theme + "</span>" + seg("theme", [["day", t.day], ["sepia", t.sepia], ["night", t.night]], S.theme) + "</div>" +
      '<div class="bd-rm-row"><span>' + t.width + "</span>" + seg("width", [["narrow", t.narrow], ["normal", "•"], ["wide", t.wide]], S.width) + "</div>" +
      '<div class="bd-rm-foot"><button type="button" data-act="reset">' + t.reset + '</button><button type="button" data-act="close">' + t.close + "</button></div>";
  }
  render();
  new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ["lang"] });

  function toggle(open) {
    panel.hidden = !open; btn.setAttribute("aria-expanded", String(open));
  }
  btn.addEventListener("click", function () { toggle(panel.hidden); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  panel.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.act === "close") { toggle(false); btn.focus(); return; }
    if (b.dataset.act === "reset") { S = { size: 2, font: "sans", theme: "day", width: "normal" }; }
    else if (b.dataset.k) { var v = b.dataset.v; S[b.dataset.k] = b.dataset.k === "size" ? parseInt(v, 10) : v; }
    persist(); apply(); render();
  });

  /* ---------- Progress + continue ---------- */
  function span() {
    var first = document.querySelector(".sp-intro") || chapter;
    var secs = document.querySelectorAll(".sp-section");
    var last = secs.length ? secs[secs.length - 1] : chapter;
    var top = first.getBoundingClientRect().top + window.pageYOffset;
    var bottom = last.getBoundingClientRect().bottom + window.pageYOffset;
    return { top: top, len: Math.max(1, bottom - top - window.innerHeight * 0.6) };
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    window.requestAnimationFrame(function () {
      var s = span();
      var p = Math.min(1, Math.max(0, (window.pageYOffset - s.top) / s.len));
      bar.style.width = (p * 100).toFixed(1) + "%";
      try {
        if (p > 0.97) localStorage.removeItem(POS);
        else if (p > 0.04) localStorage.setItem(POS, p.toFixed(4));
      } catch (_) {}
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  var prev = 0;
  try { prev = parseFloat(localStorage.getItem(POS)) || 0; } catch (_) {}
  if (prev > 0.08 && window.pageYOffset < 200 && !location.hash) {
    var toast = document.createElement("div"); toast.className = "bd-rm-toast"; toast.setAttribute("role", "status");
    var t = T[lang()];
    toast.innerHTML = "<span>" + t.cont + '</span><button type="button" data-go>' + t.go + '</button><button type="button" class="ghost" data-no>' + t.again + "</button>";
    document.body.appendChild(toast);
    var gone = function () { if (toast.parentNode) toast.parentNode.removeChild(toast); };
    toast.querySelector("[data-go]").addEventListener("click", function () {
      var s = span(); window.scrollTo({ top: s.top + prev * s.len, behavior: "smooth" }); gone();
    });
    toast.querySelector("[data-no]").addEventListener("click", function () { try { localStorage.removeItem(POS); } catch (_) {} gone(); });
    window.setTimeout(gone, 12000);
  }
})();
