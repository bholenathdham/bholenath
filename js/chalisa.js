(function () {
  "use strict";

  const STORAGE_KEY = "bholenathLanguage";
  const SUPPORTED_LANGUAGES = ["hi", "en", "bn"];

  function validLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : null;
  }

  function currentLanguage() {
    const selector = document.querySelector(".site-language-select select");
    const selectedFromControl = validLanguage(selector?.value);

    if (selectedFromControl) {
      return selectedFromControl;
    }

    const selectedFromDocument = validLanguage(document.documentElement.lang);

    if (selectedFromDocument) {
      return selectedFromDocument;
    }

    try {
      return validLanguage(window.localStorage.getItem(STORAGE_KEY)) || "hi";
    } catch (error) {
      return "hi";
    }
  }

  function showChalisa(language) {
    const selected = validLanguage(language) || currentLanguage();

    document.querySelectorAll(".lang-content[data-lang]").forEach((block) => {
      const visible = block.dataset.lang === selected;
      block.classList.toggle("active", visible);
      block.classList.toggle("hidden", !visible);
      block.setAttribute("aria-hidden", String(!visible));
    });
  }

  function initialize() {
    document.addEventListener("change", (event) => {
      const selector = event.target.closest(".site-language-select select");
      if (selector) {
        showChalisa(selector.value);
      }
    });

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        showChalisa(event.newValue);
      }
    });

    // The site-wide selector is created on DOMContentLoaded. Waiting until the
    // next task ensures that its initial language has been applied first.
    window.setTimeout(() => showChalisa(currentLanguage()), 0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
