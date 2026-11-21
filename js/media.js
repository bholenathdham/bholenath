/* Bholenath Dham — media page
   1) Tap-to-play videos: the real YouTube player loads only when a visitor taps.
   2) Photo lightbox: arrows, swipe, keyboard (←, →, Esc), caption. */
(function () {
  "use strict";

  /* ---------- 1. Videos ---------- */
  document.querySelectorAll(".yt-facade").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let "open in new tab" work
      e.preventDefault();
      var id = a.getAttribute("data-yt");
      var f = document.createElement("iframe");
      f.className = "yt-live";
      f.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1";
      f.title = a.getAttribute("data-title") || "Bholenath Dham video";
      f.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      f.setAttribute("allowfullscreen", "");
      f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      f.width = 359; f.height = 643;
      a.replaceWith(f);
      f.focus();
    });
  });

  /* ---------- 2. Lightbox ---------- */
  var imgs = Array.prototype.slice.call(document.querySelectorAll(".gallery img"));
  var box = document.getElementById("lightbox");
  var big = document.getElementById("lightbox-img");
  var cap = document.getElementById("lightbox-cap");
  if (!imgs.length || !box || !big) return;

  var closeBtn = box.querySelector(".close-lightbox");
  var prevBtn = box.querySelector(".lb-prev");
  var nextBtn = box.querySelector(".lb-next");
  var cur = 0;

  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    var im = imgs[cur];
    big.src = im.currentSrc || im.src;
    big.alt = im.alt || "Bholenath Dham";
    if (cap) cap.textContent = im.alt ? im.alt + "  ·  " + (cur + 1) + " / " + imgs.length : "";
    // warm the neighbours so arrows feel instant
    [cur + 1, cur - 1].forEach(function (n) {
      var nb = imgs[(n + imgs.length) % imgs.length];
      if (nb) { var pre = new Image(); pre.src = nb.currentSrc || nb.src; }
    });
  }
  function open(i) {
    box.style.display = "flex";
    document.body.classList.add("lb-open");
    show(i);
    if (closeBtn) closeBtn.focus();
  }
  function close() {
    box.style.display = "none";
    document.body.classList.remove("lb-open");
    big.src = "";
    if (imgs[cur]) imgs[cur].focus && imgs[cur].focus({ preventScroll: true });
  }

  imgs.forEach(function (im, i) {
    im.setAttribute("tabindex", "0");
    im.setAttribute("role", "button");
    im.addEventListener("click", function () { open(i); });
    im.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
    closeBtn.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") close(); });
  }
  if (prevBtn) prevBtn.addEventListener("click", function (e) { e.stopPropagation(); show(cur - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function (e) { e.stopPropagation(); show(cur + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });

  document.addEventListener("keydown", function (e) {
    if (box.style.display !== "flex") return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(cur + 1);
    else if (e.key === "ArrowLeft") show(cur - 1);
  });

  var x0 = null;
  box.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) show(dx < 0 ? cur + 1 : cur - 1);
  }, { passive: true });
})();
