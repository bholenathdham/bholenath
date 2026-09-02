(function () {
  "use strict";

  const STORAGE_KEY = "bholenathLanguage";
  const LANGUAGES = new Set(["hi", "en", "bn"]);

  function validLanguage(language) {
    return LANGUAGES.has(language) ? language : null;
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

  function showNames(language) {
    const selected = validLanguage(language) || currentLanguage();

    document.querySelectorAll(".name-lang").forEach((item) => {
      const visible = item.classList.contains(selected);
      item.classList.toggle("active", visible);
      item.classList.toggle("hidden", !visible);
      item.setAttribute("aria-hidden", String(!visible));
    });
  }

  function initialize() {
    document.addEventListener("change", (event) => {
      const selector = event.target.closest(".site-language-select select");
      if (selector) {
        showNames(selector.value);
      }
    });

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        showNames(event.newValue);
      }
    });

    // The site-wide selector is created during DOMContentLoaded. Waiting for
    // the next task makes its initial selection authoritative on first load.
    window.setTimeout(() => showNames(currentLanguage()), 0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
