/* Bholenath Dham — Daily Darshan Card: a shareable image made in the browser. No tracking, no uploads. */
(function () {
  "use strict";
  var Q = [
    { sa: "ॐ नमः शिवाय", en: "I bow to Shiva.", bn: "আমি শিবকে প্রণাম করি।", hi: "मैं शिव को प्रणाम करता हूँ।" },
    { sa: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥", en: "We worship the three-eyed Lord who nourishes all. May He free us from the bondage of death, as a ripe fruit is freed from its vine, and grant us immortality.", bn: "আমরা ত্রিনেত্র প্রভুর আরাধনা করি, যিনি সবার পুষ্টিদাতা। পাকা ফল যেমন বৃন্ত থেকে মুক্ত হয়, তেমনই তিনি আমাদের মৃত্যুবন্ধন থেকে মুক্ত করে অমৃতত্ব দান করুন।", hi: "हम त्रिनेत्र भगवान की आराधना करते हैं जो सबका पोषण करते हैं। जैसे पका फल बेल से छूट जाता है, वैसे ही वे हमें मृत्यु के बंधन से मुक्त कर अमरत्व प्रदान करें।" },
    { sa: "ॐ तत्पुरुषाय विद्महे\nमहादेवाय धीमहि ।\nतन्नो रुद्रः प्रचोदयात् ॥", en: "May we know the Supreme Being, may we meditate on Mahadev, and may Rudra inspire our minds.", bn: "আমরা পরমপুরুষকে জানি, মহাদেবের ধ্যান করি; রুদ্র আমাদের বুদ্ধিকে প্রেরণা দিন।", hi: "हम परम पुरुष को जानें, महादेव का ध्यान करें; रुद्र हमारी बुद्धि को प्रेरित करें।" },
    { sa: "कर्पूरगौरं करुणावतारं\nसंसारसारं भुजगेन्द्रहारम् ।\nसदा वसन्तं हृदयारविन्दे\nभवं भवानीसहितं नमामि ॥", en: "I bow to Shiva, fair as camphor, an embodiment of compassion, who dwells forever in the lotus of the heart together with Bhavani.", bn: "কর্পূরের মতো শুভ্র, করুণার অবতার শিবকে প্রণাম, যিনি ভবানীর সঙ্গে সর্বদা হৃদয়পদ্মে বিরাজ করেন।", hi: "कपूर के समान गौर, करुणा के अवतार शिव को प्रणाम, जो भवानी के साथ सदा हृदय-कमल में निवास करते हैं।" },
    { sa: "नमामीशमीशान निर्वाणरूपं\nविभुं व्यापकं ब्रह्मवेदस्वरूपम् ।", en: "I bow to the Lord of all, the form of liberation, all-pervading, the very essence of Brahman and the Vedas.", bn: "আমি সেই ঈশ্বরকে প্রণাম করি, যিনি মুক্তিস্বরূপ, সর্বব্যাপী, ব্রহ্ম ও বেদের স্বরূপ।", hi: "मैं उस ईश्वर को प्रणाम करता हूँ जो मोक्षस्वरूप, सर्वव्यापक तथा ब्रह्म और वेद का स्वरूप हैं।" },
    { sa: "सत्यं शिवं सुन्दरम्", en: "Truth. Auspiciousness. Beauty.", bn: "সত্য। মঙ্গল। সৌন্দর্য।", hi: "सत्य। कल्याण। सौन्दर्य।" },
    { sa: "हर हर महादेव", en: "Hail Mahadev, remover of all sorrow.", bn: "জয় মহাদেব, সব দুঃখের হরণকারী।", hi: "जय महादेव, सब दुःखों को हरने वाले।" },
    { sa: "ॐ नमः शम्भवाय च\nमयोभवाय च नमः शङ्कराय च", en: "Salutations to Shambhu, the source of happiness, and to Shankara, the giver of peace.", bn: "সুখের উৎস শম্ভুকে প্রণাম, শান্তিদাতা শঙ্করকে প্রণাম।", hi: "सुख के स्रोत शम्भु को प्रणाम, शान्ति देने वाले शंकर को प्रणाम।" },
    { sa: "शिवोऽहम्", en: "I am Shiva: pure, peaceful awareness.", bn: "আমি শিব: শুদ্ধ, শান্ত চৈতন্য।", hi: "मैं शिव हूँ: शुद्ध, शान्त चेतना।" },
    { sa: "ॐ नमो भगवते रुद्राय", en: "Salutations to Lord Rudra.", bn: "ভগবান রুদ্রকে প্রণাম।", hi: "भगवान रुद्र को नमस्कार।" }
  ];
  var LBL = {
    en: { today: "Today's darshan card", share: "Share on WhatsApp", dl: "Download image", next: "Another blessing", mon: "Monday is Lord Shiva's day. Har Har Mahadev.", foot: "Bholenath Dham · Chandpara, West Bengal", msg: "Har Har Mahadev 🙏 Today's blessing from Bholenath Dham:" },
    bn: { today: "আজকের দর্শন কার্ড", share: "WhatsApp-এ শেয়ার করুন", dl: "ছবি ডাউনলোড", next: "আরেকটি আশীর্বাদ", mon: "সোমবার ভগবান শিবের দিন। হর হর মহাদেব।", foot: "ভোলেনাথ ধাম · চাঁদপাড়া, পশ্চিমবঙ্গ", msg: "হর হর মহাদেব 🙏 ভোলেনাথ ধামের আজকের আশীর্বাদ:" },
    hi: { today: "आज का दर्शन कार्ड", share: "WhatsApp पर साझा करें", dl: "तस्वीर डाउनलोड करें", next: "एक और आशीर्वाद", mon: "सोमवार भगवान शिव का दिन है। हर हर महादेव।", foot: "भोलेनाथ धाम · चाँदपाड़ा, पश्चिम बंगाल", msg: "हर हर महादेव 🙏 भोलेनाथ धाम का आज का आशीर्वाद:" }
  };
  var root = document.documentElement, cv = document.getElementById("dcCanvas");
  if (!cv) return;
  var ctx = cv.getContext("2d"), W = 1080, H = 1350;
  var day = Math.floor((Date.now() + 19800000) / 86400000); /* India date */
  var idx = day % Q.length, offset = 0, bg = new Image(), ready = false;
  function lang() { var l = (root.lang || "hi").slice(0, 2); return l === "en" || l === "bn" ? l : "hi"; }
  function wrap(text, font, maxW) {
    ctx.font = font; var out = [];
    text.split("\n").forEach(function (para) {
      var words = para.split(" "), line = "";
      words.forEach(function (w) {
        var t = line ? line + " " + w : w;
        if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
      });
      out.push(line);
    });
    return out;
  }
  function draw() {
    var L = LBL[lang()], q = Q[(idx + offset) % Q.length], l = lang();
    ctx.clearRect(0, 0, W, H);
    if (ready) {
      var r = Math.max(W / bg.width, H / bg.height), w = bg.width * r, h = bg.height * r;
      ctx.drawImage(bg, (W - w) / 2, (H - h) / 2, w, h);
    } else { ctx.fillStyle = "#160708"; ctx.fillRect(0, 0, W, H); }
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "rgba(22,7,8,.80)"); g.addColorStop(.5, "rgba(22,7,8,.72)"); g.addColorStop(1, "rgba(22,7,8,.92)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(241,213,143,.85)"; ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72);
    ctx.strokeStyle = "rgba(241,213,143,.35)"; ctx.lineWidth = 1; ctx.strokeRect(54, 54, W - 108, H - 108);
    ctx.textAlign = "center"; ctx.fillStyle = "#f1d58f";
    ctx.font = "600 110px 'Noto Serif Devanagari','Noto Sans Devanagari',serif"; ctx.fillText("ॐ", W / 2, 190);
    ctx.font = "600 34px 'Cormorant Garamond',Georgia,serif"; ctx.fillText("B H O L E N A T H   D H A M", W / 2, 250);
    var d = new Date(Date.now() + 19800000 + offset * 86400000);
    var ds = d.toLocaleDateString(l === "en" ? "en-IN" : l === "bn" ? "bn-IN" : "hi-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    ctx.font = "400 28px 'Poppins','Noto Sans Bengali','Noto Sans Devanagari',sans-serif"; ctx.fillStyle = "rgba(253,248,238,.8)"; ctx.fillText(ds, W / 2, 300);
    ctx.fillStyle = "#c99a3c"; ctx.fillRect(W / 2 - 60, 335, 120, 3);
    /* mantra */
    var sf = (q.sa.length > 60 ? 54 : q.sa.length > 30 ? 66 : 92);
    var lines = wrap(q.sa, "600 " + sf + "px 'Noto Serif Devanagari','Noto Sans Devanagari',serif", W - 220), lh = sf * 1.5;
    var mf = l === "en" ? "italic 500 40px 'Cormorant Garamond',Georgia,serif" : "500 34px 'Noto Serif " + (l === "bn" ? "Bengali" : "Devanagari") + "','Noto Sans " + (l === "bn" ? "Bengali" : "Devanagari") + "',serif";
    var ml = wrap(q[l], mf, W - 240), mlh = l === "en" ? 58 : 56;
    var total = lines.length * lh + 50 + ml.length * mlh, y = 380 + (H - 380 - 250 - total) / 2 + sf;
    ctx.fillStyle = "#fdf8ee"; ctx.font = "600 " + sf + "px 'Noto Serif Devanagari','Noto Sans Devanagari',serif";
    lines.forEach(function (t) { ctx.fillText(t, W / 2, y); y += lh; });
    y += 20; ctx.fillStyle = "#f1d58f"; ctx.font = mf;
    ml.forEach(function (t) { ctx.fillText(t, W / 2, y); y += mlh; });
    if (d.getUTCDay() === 1) { ctx.fillStyle = "#c99a3c"; ctx.font = "500 28px 'Poppins','Noto Sans Bengali','Noto Sans Devanagari',sans-serif"; ctx.fillText(L.mon, W / 2, H - 200); }
    ctx.fillStyle = "#c99a3c"; ctx.fillRect(W / 2 - 60, H - 160, 120, 3);
    ctx.fillStyle = "rgba(253,248,238,.9)"; ctx.font = "500 28px 'Poppins','Noto Sans Bengali','Noto Sans Devanagari',sans-serif"; ctx.fillText(L.foot, W / 2, H - 110);
    ctx.fillStyle = "#f1d58f"; ctx.font = "600 30px 'Poppins',sans-serif"; ctx.fillText("bholenathdham.in", W / 2, H - 70);
    ["dcShare", "dcDl", "dcNext", "dcTitle"].forEach(function (id) { var e = document.getElementById(id); if (e) e.textContent = L[{ dcShare: "share", dcDl: "dl", dcNext: "next", dcTitle: "today" }[id]]; });
  }
  function blob(cb) { cv.toBlob(cb, "image/png"); }
  function share() {
    var L = LBL[lang()], url = "https://bholenathdham.in/daily.html?utm_source=share&utm_medium=card";
    blob(function (b) {
      var file = b && new File([b], "bholenath-dham-darshan.png", { type: "image/png" });
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], text: L.msg + " " + url }).catch(function () {});
      } else {
        window.open("https://wa.me/?text=" + encodeURIComponent(L.msg + " " + url), "_blank", "noopener");
      }
    });
  }
  function download() {
    blob(function (b) { var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "bholenath-dham-darshan.png"; document.body.appendChild(a); a.click(); document.body.removeChild(a); });
  }
  document.getElementById("dcShare").addEventListener("click", share);
  document.getElementById("dcDl").addEventListener("click", download);
  document.getElementById("dcNext").addEventListener("click", function () { offset += 1; draw(); });
  new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ["lang"] });
  var fonts = ["600 40px 'Noto Serif Devanagari'", "500 30px 'Noto Serif Bengali'", "500 30px 'Noto Sans Bengali'", "500 30px 'Noto Sans Devanagari'", "italic 500 40px 'Cormorant Garamond'", "600 30px 'Cormorant Garamond'", "400 28px 'Poppins'"];
  function refresh() { draw(); }
  bg.onload = function () { ready = true; refresh(); };
  bg.src = "images/temple1.webp";
  draw();
  if (document.fonts && document.fonts.load) {
    Promise.all(fonts.map(function (f) { return document.fonts.load(f, "ॐঅa"); })).then(refresh, refresh);
    document.fonts.ready.then(refresh);
  }
})();
