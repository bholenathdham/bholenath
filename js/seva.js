document.addEventListener("DOMContentLoaded", () => {

    const langBtn = document.getElementById("langToggle");

    let currentLang = "en";

    langBtn.addEventListener("click", () => {

        const enElements = document.querySelectorAll(".en");
        const bnElements = document.querySelectorAll(".bn");

        if (currentLang === "en") {

            enElements.forEach(el => el.classList.add("hidden"));
            bnElements.forEach(el => el.classList.remove("hidden"));

            langBtn.textContent = "English";
            currentLang = "bn";

        } else {

            bnElements.forEach(el => el.classList.add("hidden"));
            enElements.forEach(el => el.classList.remove("hidden"));

            langBtn.textContent = "বাংলা";
            currentLang = "en";
        }

    });

});
