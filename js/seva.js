document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".seva-page");
  const languageButton = document.getElementById("langToggle");
  const menuButton = document.getElementById("menuToggle");
  const navigation = document.getElementById("navbar");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", String(isOpen));
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
      languageButton.setAttribute(
        "aria-label",
        showBengali ? "Switch to English" : "বাংলায় দেখুন"
      );
    });
  }
});

