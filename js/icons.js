/* Bholenath Dham — sacred icon set (v1)
   Replaces decorative emoji with clean line icons that follow the surrounding text colour.
   Text is never lost: the original emoji stays in the icon's data-emoji attribute / aria. */
(function () {
  "use strict";
  if (window.__bdIcons) return;
  window.__bdIcons = true;

  var P = {
    trishul: '<path d="M12 3v18M6 4v5a6 6 0 0 0 12 0V4M9 21h6"/>',
    star: '<path fill="currentColor" stroke="none" d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
    lotus: '<path d="M12 20c-4.5-1.8-6.5-6-5.5-10.5 3 .2 5 2.2 5.5 4.5.5-2.3 2.5-4.3 5.5-4.5 1 4.5-1 8.7-5.5 10.5zM12 14c-1-3 0-6 0-9 1 3 1 6 0 9zM3 15c2 .3 4 1.7 5 3.5M21 15c-2 .3-4 1.7-5 3.5"/>',
    beads: '<circle cx="12" cy="12" r="8" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="0.1 4.1"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
    temple: '<path d="M12 3L3 9h18zM5 9v12M9 9v12M15 9v12M19 9v12M3 21h18"/>',
    book: '<path d="M2 5c3-1 7-1 10 1 3-2 7-2 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1zM12 6v14"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    scroll: '<path d="M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6M9 8h7M9 12h7M9 16h4"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    video: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    books: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM16.5 5l3.8-1 3 15.5-3.8 1z"/>',
    heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    leaf: '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8"/>',
    lamp: '<path d="M3 13h18a8 8 0 0 1-8 7h-2a8 8 0 0 1-8-7zM12 3c2 2 2 4 0 6-2-2-2-4 0-6z"/>',
    cookie: '<path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z"/><path d="M9 11h.01M13 15h.01M8 15h.01"/>',
    scale: '<path d="M12 3v18M7 21h10M4 7h16M4 7l-2.5 7a3.5 3.5 0 0 0 5 0zM20 7l-2.5 7a3.5 3.5 0 0 0 5 0z"/>',
    flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    link: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
    note: '<path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 1 1 3.6 2.4c-.7.4-1.1 1-1.1 1.8M12 17h.01"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    glass: '<path d="M7 3h10l-1 18H8zM7.5 9h9"/>',
    doc: '<path d="M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6"/>',
    broom: '<path d="M14 3l-4 8M6 11h8l3 10H3zM8 16h6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    mountain: '<path d="M3 20l6-11 4 6 3-4 5 9z"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    home: '<path d="M3 11l9-8 9 8M5 10v11h14V10M10 21v-6h4v6"/>',
    bowl: '<path d="M3 12h18a9 9 0 0 1-18 0zM8 8c0-2 2-2 2-4M13 8c0-2 2-2 2-4"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
    wave: '<path d="M2 9c3-3 5 3 8 0s5 3 8 0M2 15c3-3 5 3 8 0s5 3 8 0"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'
  };

  /* emoji -> icon name ("om" is drawn as the Devanagari glyph, which is on every phone) */
  var MAP = {
    "🔱": "trishul", "✦": "star", "✨": "star", "⭐": "star", "🙏": "lotus", "🌺": "lotus", "🪷": "lotus", "🌸": "lotus",
    "📿": "beads", "✅": "check", "✔️": "check", "☑️": "check", "🏛️": "temple", "🛕": "temple", "🏛": "temple",
    "📖": "book", "📕": "book", "📘": "book", "🌐": "globe", "🌍": "globe", "🌎": "globe", "🌏": "globe",
    "📜": "scroll", "📸": "camera", "📷": "camera", "🔔": "bell", "📅": "calendar", "🗓️": "calendar", "🎬": "video", "🎥": "video",
    "🔒": "lock", "🔐": "lock", "🌙": "moon", "🌑": "moon", "📚": "books", "🤝": "heart", "❤️": "heart", "💛": "heart", "🧡": "heart",
    "📍": "pin", "🌿": "leaf", "🍃": "leaf", "🪔": "lamp", "🕯️": "lamp", "🍪": "cookie", "⚖️": "scale", "🚩": "flag", "🔗": "link",
    "📝": "note", "✍️": "note", "📞": "phone", "☎️": "phone", "📱": "phone", "🕒": "clock", "🕐": "clock", "⏰": "clock", "⏳": "clock",
    "❓": "help", "❔": "help", "💧": "drop", "🥛": "glass", "📑": "doc", "📄": "doc", "📋": "doc", "🧹": "broom",
    "✉️": "mail", "📧": "mail", "📤": "share", "🔄": "share", "☀️": "sun", "🌅": "sun", "🌄": "mountain", "⛰️": "mountain", "🏔️": "mountain",
    "💳": "card", "🎯": "target", "🏠": "home", "🏗": "temple", "🍛": "bowl", "🔥": "flame", "🌊": "wave", "🌟": "star", "🎉": "star", "🌌": "star", "🌕": "moon", "🌼": "lotus", "🌳": "leaf", "🌱": "leaf", "🎵": "music", "🎶": "music", "🔊": "music", "🕉️": "om", "🕉": "om"
  };

  var keys = Object.keys(MAP).sort(function (a, b) { return b.length - a.length; });
  var rx = new RegExp(keys.map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|"), "g");

  var css = ".bd-ic{display:inline-block;width:1.05em;height:1.05em;vertical-align:-.17em;flex:none}" +
    ".bd-ic svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
    ".bd-om{font-family:'Noto Sans Devanagari','Noto Serif Devanagari','Nirmala UI',sans-serif;font-weight:600;line-height:1;font-style:normal}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  function make(name, emoji) {
    var s = document.createElement("span");
    s.setAttribute("aria-hidden", "true"); s.setAttribute("data-emoji", emoji);
    if (name === "om") { s.className = "bd-om"; s.textContent = "ॐ"; return s; }
    s.className = "bd-ic";
    s.innerHTML = '<svg viewBox="0 0 24 24" focusable="false">' + P[name] + "</svg>";
    return s;
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, OPTION: 1, SELECT: 1, TITLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1 };

  function run(rootEl) {
    var w = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || SKIP[p.tagName] || (p.closest && p.closest("[data-no-icons]"))) return NodeFilter.FILTER_REJECT;
        rx.lastIndex = 0;
        return rx.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [], n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (t) {
      var txt = t.nodeValue, frag = document.createDocumentFragment(), last = 0, m;
      rx.lastIndex = 0;
      while ((m = rx.exec(txt))) {
        if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        frag.appendChild(make(MAP[m[0]], m[0]));
        last = m.index + m[0].length;
      }
      if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
      t.parentNode.replaceChild(frag, t);
    });
  }

  function go() { try { run(document.body); } catch (e) {} }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go, { once: true }); else go();
})();
