console.log("Glossary JS Loaded");

/* =========================
   SHIVA GLOSSARY SEARCH
========================= */
// Glossary Search

const searchInput = document.getElementById("glossarySearch");

searchInput.addEventListener("keyup", function () {

const filter = this.value.toLowerCase();

const cards = document.querySelectorAll(".glossary-card");

cards.forEach(card => {

const text = card.textContent.toLowerCase();

if(text.includes(filter)){

card.style.display = "block";

}else{

card.style.display = "none";

}

});

});



/* =========================
   ALPHABET NAVIGATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const alphabetLinks =
    document.querySelectorAll(".alphabet-nav a");

    alphabetLinks.forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            const letter =
            this.dataset.letter;

            const target =
            document.getElementById(
            "letter-" + letter
            );

            if(target){

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }

        });

    });

});


/* =========================
   CLEAR SEARCH ON ESC
========================= */

document.addEventListener("keydown", e => {

    if(e.key === "Escape"){

        const searchBox =
        document.getElementById("glossarySearch");

        if(searchBox){

            searchBox.value = "";

            document
            .querySelectorAll(".glossary-card")
            .forEach(card => {

                card.style.display = "";

            });

        }

    }

});

/* ==========================
   BACK TO TOP BUTTON
========================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

if(window.scrollY > 500){
backToTop.style.display = "block";
}else{
backToTop.style.display = "none";
}

});

backToTop.addEventListener("click", () => {

window.scrollTo({
top:0,
behavior:"smooth"
});

});

document.addEventListener("DOMContentLoaded", function () {

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {

button.addEventListener("click", function () {

this.parentElement.classList.toggle("active");

});

});

});
