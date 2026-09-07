(function () {
  "use strict";

  const LANGUAGE_KEY = "bholenathLanguage";

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // The page still works when storage is unavailable.
    }
  }

  function setLanguage(language) {
    const isBengali = language === "bn";
    const languageButton = document.getElementById("langToggle");

    document.querySelectorAll(".en").forEach((element) => {
      element.classList.toggle("hidden", isBengali);
    });

    document.querySelectorAll(".bn").forEach((element) => {
      element.classList.toggle("hidden", !isBengali);
    });

    document.documentElement.lang = isBengali ? "bn" : "en";

    if (languageButton) {
      languageButton.textContent = isBengali ? "English" : "বাংলা";
      languageButton.setAttribute("aria-pressed", String(isBengali));
      languageButton.setAttribute(
        "aria-label",
        isBengali ? "Switch language to English" : "Switch language to Bengali",
      );
    }

    safeStorageSet(LANGUAGE_KEY, isBengali ? "bn" : "en");
  }

  function initializeLanguage() {
    const languageButton = document.getElementById("langToggle");
    const savedLanguage = safeStorageGet(LANGUAGE_KEY) === "bn" ? "bn" : "en";

    setLanguage(savedLanguage);

    languageButton?.addEventListener("click", () => {
      setLanguage(document.documentElement.lang === "bn" ? "en" : "bn");
    });
  }

  function initializeOptionalNavigationInclude() {
    const placeholder = document.getElementById("nav-placeholder");

    if (!placeholder || typeof window.fetch !== "function") {
      return;
    }

    window
      .fetch("/nav.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Navigation request failed: ${response.status}`);
        }
        return response.text();
      })
      .then((markup) => {
        placeholder.innerHTML = markup;
      })
      .catch(() => {
        // Keep the page's built-in navigation when the optional include is absent.
      });
  }

  function initializeMobileMenu() {
    const menuButton = document.getElementById("menuToggle");
    const navigation = document.getElementById("navbar");

    if (!menuButton || !navigation) {
      return;
    }

    const closeMenu = () => {
      navigation.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    };

    menuButton.addEventListener("click", () => {
      const willOpen = !navigation.classList.contains("active");
      navigation.classList.toggle("active", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute(
        "aria-label",
        willOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("active")) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1180) {
        closeMenu();
      }
    });
  }

  function initializeScriptureSlider() {
    const track = document.querySelector(".spx-slider-track");
    const nextButton = document.querySelector(".spx-next");
    const previousButton = document.querySelector(".spx-prev");

    if (!track) {
      return;
    }

    const scrollOneCard = (direction) => {
      const firstCard = track.querySelector(".spx-card");
      const gap =
        Number.parseFloat(window.getComputedStyle(track).columnGap) || 20;
      const distance = firstCard
        ? firstCard.getBoundingClientRect().width + gap
        : 320;

      track.scrollBy({
        left: direction * distance,
        behavior: "smooth",
      });
    };

    nextButton?.addEventListener("click", () => scrollOneCard(1));
    previousButton?.addEventListener("click", () => scrollOneCard(-1));

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollOneCard(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollOneCard(-1);
      }
    });
  }

  function initializeGallery() {
    const galleryButtons = document.querySelectorAll(
      ".home-gallery-item, .gallery img",
    );
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-img");
    const closeButton = document.querySelector(".close-lightbox");
    let returnFocus = null;

    if (!galleryButtons.length || !lightbox || !lightboxImage || !closeButton) {
      return;
    }

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.hidden = true;
      document.body.classList.remove("is-lightbox-open");
      returnFocus?.focus();
    };

    galleryButtons.forEach((button) => {
      const openLightbox = () => {
        const image = button.matches("img")
          ? button
          : button.querySelector("img");

        if (!image) {
          return;
        }

        returnFocus = button;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightbox.hidden = false;
        lightbox.classList.add("is-open");
        document.body.classList.add("is-lightbox-open");
        closeButton.focus();
      };

      if (button.matches("img")) {
        button.setAttribute("role", "button");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-label", `Open image: ${button.alt}`);
        button.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox();
          }
        });
      }

      button.addEventListener("click", openLightbox);
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }

  function initializeBackToTop() {
    const button = document.getElementById("backToTop");

    if (!button) {
      return;
    }

    const updateVisibility = () => {
      button.classList.toggle("is-visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initializeDailyWisdom() {
    const englishQuote = document.getElementById("quoteTextEn");
    const bengaliQuote = document.getElementById("quoteTextBn");

    if (!englishQuote || !bengaliQuote) {
      return;
    }

    const englishQuotes = [
      "Where there is faith, there is the grace of Mahadev.",
      "Om Namah Shivaya is a path from restlessness to inner peace.",
      "Humility makes the heart a sacred dwelling place for Shiva.",
      "A sincere prayer is never lost in the silence of Kailasa.",
      "The devotee who remembers Mahadev is never truly alone.",
      "Let every action become worship and every breath become remembrance.",
    ];

    const bengaliQuotes = [
      "যেখানে বিশ্বাস আছে, সেখানেই মহাদেবের কৃপা আছে।",
      "ওঁ নমঃ শিবায় অশান্তি থেকে অন্তরের শান্তির পথ।",
      "বিনয় হৃদয়কে শিবের পবিত্র আবাসে পরিণত করে।",
      "আন্তরিক প্রার্থনা কৈলাসের নীরবতায় কখনও হারিয়ে যায় না।",
      "যে ভক্ত মহাদেবকে স্মরণ করে, সে কখনও সত্যিই একা নয়।",
      "প্রতিটি কর্ম হোক পূজা এবং প্রতিটি শ্বাস হোক স্মরণ।",
    ];

    let quoteIndex = 0;
    window.setInterval(() => {
      quoteIndex = (quoteIndex + 1) % englishQuotes.length;
      englishQuote.textContent = englishQuotes[quoteIndex];
      bengaliQuote.textContent = bengaliQuotes[quoteIndex];
    }, 15000);
  }

  function initializeTempleBell() {
    const bellButton = document.getElementById("bellBtn");
    const bellAudio = document.getElementById("bellSound");
    const bellIcon = document.querySelector(".home-bell-content .bell-icon");
    const blessingMessage = document.getElementById("blessingMessage");
    const englishBlessing = document.getElementById("blessingEn");
    const bengaliBlessing = document.getElementById("blessingBn");

    if (!bellButton) {
      return;
    }

    bellButton.addEventListener("click", () => {
      bellIcon?.classList.remove("is-ringing");
      window.requestAnimationFrame(() => bellIcon?.classList.add("is-ringing"));

      if (bellAudio) {
        bellAudio.currentTime = 0;
        const playback = bellAudio.play();
        playback?.catch(() => {
          // Some browsers block audio until their media policy allows it.
        });
      }

      if (document.documentElement.lang === "bn") {
        englishBlessing?.classList.add("hidden");
        bengaliBlessing?.classList.remove("hidden");
      } else {
        bengaliBlessing?.classList.add("hidden");
        englishBlessing?.classList.remove("hidden");
      }

      if (blessingMessage) {
        blessingMessage.hidden = false;
      }
    });

    bellIcon?.addEventListener("animationend", () => {
      bellIcon.classList.remove("is-ringing");
    });
  }

  function initializeFaq() {
    const faqItems = document.querySelectorAll(
      ".home-faq-list details, .faq-grid details",
    );

    faqItems.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) {
          return;
        }

        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      });
    });
  }

  function initializeOptionalPopup() {
  const popup = document.getElementById("popupCard");
  const closeButton = document.getElementById("closePopup");
  const launcher = document.getElementById("popupLauncher");

  if (!popup || !closeButton || !launcher) {
    return;
  }

  const POPUP_KEY = "bholenathPopupLastShown";
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

  const lastShown = Number(safeStorageGet(POPUP_KEY)) || 0;
  const canShowPopup = Date.now() - lastShown >= TWENTY_FOUR_HOURS;

  if (canShowPopup) {
    popup.hidden = false;
    launcher.hidden = true;

    safeStorageSet(POPUP_KEY, String(Date.now()));
  } else {
    popup.hidden = true;
    launcher.hidden = false;
  }

  closeButton.addEventListener("click", () => {
    popup.hidden = true;
    launcher.hidden = false;
  });

  launcher.addEventListener("click", () => {
    popup.hidden = false;
    launcher.hidden = true;
  });
}

  function initialize() {
    initializeLanguage();
    initializeOptionalNavigationInclude();
    initializeMobileMenu();
    initializeScriptureSlider();
    initializeGallery();
    initializeBackToTop();
    initializeDailyWisdom();
    initializeTempleBell();
    initializeFaq();
    initializeOptionalPopup();
    
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
