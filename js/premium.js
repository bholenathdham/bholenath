/* Bholenath Dham — premium interactions (v1)
   Share (WhatsApp / native share), Shivaratri countdown, bell counter, scroll reveal.
   No external services, no tracking. Safe to remove with premium.css. */
(function () {
  "use strict";

  document.documentElement.classList.add("bd-js");

  function store(get, key, value) {
    try {
      if (get) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (_) { /* private mode */ }
    return null;
  }

  function currentLang() {
    var l = (document.documentElement.lang || "hi").slice(0, 2);
    return l === "en" || l === "bn" ? l : "hi";
  }

  /* ---------- Share ---------- */
  var SHARE = {
    en: "Har Har Mahadev \uD83D\uDE4F Visit Bholenath Dham, a Shiva temple in Chandpara, West Bengal \u2014 open 24 hours.",
    bn: "হর হর মহাদেব \uD83D\uDE4F পশ্চিমবঙ্গের চাঁদপাড়ায় ভোলেনাথ ধাম — ২৪ ঘণ্টা খোলা শিব মন্দির।",
    hi: "हर हर महादेव \uD83D\uDE4F चाँदपाड़ा, पश्चिम बंगाल का भोलेनाथ धाम — 24 घंटे खुला शिव मंदिर।"
  };

  function shareUrl() {
    var canon = document.querySelector('link[rel="canonical"]');
    var base = canon && canon.href ? canon.href : window.location.href.split("#")[0];
    return base + (base.indexOf("?") > -1 ? "&" : "?") + "utm_source=share&utm_medium=social";
  }

  function share() {
    var text = SHARE[currentLang()];
    var url = shareUrl();
    if (navigator.share) {
      navigator.share({ title: document.title, text: text, url: url }).catch(function () {});
      return;
    }
    window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank", "noopener");
  }

  document.querySelectorAll("[data-bd-share]").forEach(function (el) {
    el.addEventListener("click", share);
  });

  /* ---------- Maha Shivaratri countdown ---------- */
  var box = document.getElementById("shivaratriCountdown");
  if (box) {
    var target = Date.parse(box.getAttribute("data-target"));
    var cells = {};
    box.querySelectorAll("[data-u]").forEach(function (b) { cells[b.getAttribute("data-u")] = b; });
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };

    var tick = function () {
      var diff = target - Date.now();
      if (!isFinite(diff) || diff < -86400000) { box.hidden = true; return false; }
      if (diff < 0) diff = 0;
      var s = Math.floor(diff / 1000);
      cells.d.textContent = Math.floor(s / 86400);
      cells.h.textContent = pad(Math.floor((s % 86400) / 3600));
      cells.m.textContent = pad(Math.floor((s % 3600) / 60));
      cells.s.textContent = pad(s % 60);
      box.hidden = false;
      return true;
    };
    if (tick()) {
      var timer = window.setInterval(function () { if (!tick()) window.clearInterval(timer); }, 1000);
    }
  }

  /* ---------- Bell: ring animation + personal counter (this device only) ---------- */
  var bellBtn = document.getElementById("bellBtn");
  var bellIcon = document.querySelector(".bell-container .bell-icon");
  var countBox = document.getElementById("bellCount");
  var KEY = "bholenathBellCount";

  function renderCount(n) {
    if (!countBox) return;
    var out = countBox.querySelector("[data-bell-n]");
    if (out) out.textContent = n.toLocaleString("en-IN");
    countBox.hidden = n < 1;
  }
  var rung = parseInt(store(true, KEY), 10) || 0;
  renderCount(rung);

  if (bellBtn) {
    bellBtn.addEventListener("click", function () {
      rung += 1;
      store(false, KEY, String(rung));
      renderCount(rung);
      if (bellIcon) {
        bellIcon.classList.remove("is-ringing");
        void bellIcon.offsetWidth;
        bellIcon.classList.add("is-ringing");
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var targets = document.querySelectorAll(
    ".pathway-card, .quote-box, #temple-bell .bell-container, .observances-section .festival-card, .darshan-section, .homepage-faq, .related-links a"
  );
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("bd-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el, i) {
      el.classList.add("bd-reveal");
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
  }
})();
