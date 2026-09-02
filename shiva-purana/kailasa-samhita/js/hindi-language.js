(function () {
  "use strict";
 const STORAGE_KEY = "bholenathLanguageV3";
  const LANGUAGES = [{code:"hi",label:"हिन्दी"},{code:"en",label:"English"},{code:"bn",label:"বাংলা"}];

  function setLanguage(language, select) {
    const selected = LANGUAGES.some((item) => item.code === language) ? language : "hi";
    LANGUAGES.forEach(({code}) => document.querySelectorAll(`.${code}`).forEach((element) => element.classList.toggle("hidden", code !== selected)));
    document.documentElement.lang = selected;
    select.value = selected;
    try { localStorage.setItem(STORAGE_KEY, selected); } catch (_) {}
  }

  function initialize() {
    const oldToggle = document.getElementById("langToggle");
    if (!oldToggle || !document.querySelector(".hi")) return;
    const anchor = document.createComment("language-selector-position");
    oldToggle.parentNode.insertBefore(anchor, oldToggle);
    const wrapper = document.createElement("label");
    wrapper.className = "site-language-select";
    wrapper.setAttribute("aria-label", "Choose Hindi, English or Bengali");
    const icon = document.createElement("span");
    icon.className = "site-language-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "🌐";
    const select = document.createElement("select");
    LANGUAGES.forEach(({code,label}) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = label;
      select.appendChild(option);
    });
    wrapper.append(icon, select);
    oldToggle.replaceWith(wrapper);
    select.addEventListener("change", () => setLanguage(select.value, select));

    function placeSelector() {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const menuButton = document.getElementById("menuToggle");
      if (mobile && menuButton && menuButton.parentNode) {
        menuButton.parentNode.insertBefore(wrapper, menuButton);
      } else if (anchor.parentNode) {
        anchor.parentNode.insertBefore(wrapper, anchor.nextSibling);
      }
    }

    const style = document.createElement("style");
    style.textContent = `
      .site-language-select{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 10px;color:#fff;background:#9b3f00;border:1px solid rgba(255,255,255,.38);border-radius:7px;white-space:nowrap}
      .site-language-icon{font-size:15px;line-height:1}
      .site-language-select select{display:block!important;width:auto!important;min-width:72px!important;max-width:none!important;border:0!important;outline:0!important;color:#fff!important;background:#9b3f00!important;font:inherit;font-size:14px!important;font-weight:500!important;cursor:pointer;opacity:1!important;visibility:visible!important}
      .site-language-select select option{color:#21160e;background:#fff}
      .site-language-select:focus-within{border-color:#efb84e;box-shadow:0 0 0 2px rgba(239,184,78,.2)}
      @media(max-width:768px){
        .header-container{align-items:center!important;column-gap:4px!important}
        .header-container .logo{flex:1 1 0!important;min-width:0!important;gap:6px!important}
        .header-container .logo img{height:44px!important;width:44px!important;flex:0 0 44px!important}
        .header-container .logo-text{min-width:0!important;margin-left:0!important}
        .header-container .logo-text h1{font-size:16px!important;line-height:1.1!important;white-space:nowrap!important}
        .site-language-select{height:38px;margin-left:auto;padding:0 7px;gap:4px;background:#9b3f00;flex:0 0 auto}
        .site-language-icon{font-size:13px}
        .site-language-select select{min-width:52px!important;font-size:12px!important;padding:0!important}
        .header-container .menu-toggle{width:40px!important;height:40px!important;flex:0 0 40px!important;margin-left:2px!important}
        .header-container nav{order:10!important}
      }
      @media(max-width:390px){
        .header-container .logo{gap:4px!important}
        .header-container .logo img{height:40px!important;width:40px!important;flex-basis:40px!important}
        .header-container .logo-text h1{font-size:15px!important}
        .site-language-select{height:36px;padding:0 5px;gap:3px}
        .site-language-select select{min-width:48px!important;font-size:11px!important}
        .header-container .menu-toggle{width:38px!important;height:38px!important;flex-basis:38px!important}
      }
    `;
    document.head.appendChild(style);
    let saved = "hi";
    try { saved = localStorage.getItem(STORAGE_KEY) || "hi"; } catch (_) {}
    setLanguage(saved, select);
    placeSelector();
    window.addEventListener("resize", placeSelector);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
