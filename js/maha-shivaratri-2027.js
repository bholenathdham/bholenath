document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".festival-page");
  const languageButton = document.getElementById("langToggle");
  const menuButton = document.getElementById("menuToggle");
  const navigation = document.getElementById("navbar");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = navigation.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (page && languageButton) {
    languageButton.addEventListener("click", () => {
      const showBengali = !page.classList.contains("lang-bn");
      page.classList.toggle("lang-bn", showBengali);
      page.classList.toggle("lang-en", !showBengali);
      document.documentElement.lang = showBengali ? "bn" : "en";
      languageButton.textContent = showBengali ? "English" : "বাংলা";
      languageButton.setAttribute("aria-label", showBengali ? "Switch to English" : "বাংলায় দেখুন");
    });
  }

  const eventTime = new Date("2027-03-06T17:00:00+05:30").getTime();
  const fields = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]')
  };

  const updateCountdown = () => {
    const remaining = eventTime - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => {
        if (field) field.textContent = "00";
      });
      return;
    }

    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60)
    };

    Object.entries(values).forEach(([name, value]) => {
      if (fields[name]) fields[name].textContent = String(value).padStart(2, "0");
    });
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});

