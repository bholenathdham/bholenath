// LANGUAGE TOGGLE

const toggle = document.getElementById("langToggle");

if (toggle) {

let bengali = false;

toggle.addEventListener("click", () => {

const en = document.querySelectorAll(".en");
const bn = document.querySelectorAll(".bn");

bengali = !bengali;

if (bengali) {

en.forEach(el => el.classList.add("hidden"));
bn.forEach(el => el.classList.remove("hidden"));

toggle.innerText = "English";

} else {

en.forEach(el => el.classList.remove("hidden"));
bn.forEach(el => el.classList.add("hidden"));

toggle.innerText = "বাংলা";

}

});

}


// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

menuToggle.addEventListener("click", () => {

navbar.classList.toggle("active");

});

}


// WAIT FOR PAGE LOAD

window.addEventListener("DOMContentLoaded", () => {


// LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

if (galleryImages.length && lightbox && lightboxImg) {

galleryImages.forEach(img => {

img.addEventListener("click", () => {

lightbox.style.display = "flex";
lightboxImg.src = img.src;

});

});

}

if (closeLightbox && lightbox) {

closeLightbox.addEventListener("click", () => {

lightbox.style.display = "none";

});

}

if (lightbox) {

lightbox.addEventListener("click", (e) => {

if (e.target === lightbox) {

lightbox.style.display = "none";

}

});

}


// BACK TO TOP

const backToTop = document.getElementById("backToTop");

if (backToTop) {

window.addEventListener("scroll", () => {

if (window.scrollY > 400) {

backToTop.style.display = "block";

} else {

backToTop.style.display = "none";

}

});

backToTop.addEventListener("click", () => {

window.scrollTo({
top: 0,
behavior: "smooth"
});

});

}


// DAILY QUOTES

const quoteEn = document.getElementById("quoteTextEn");
const quoteBn = document.getElementById("quoteTextBn");

const quotesEn = [
"Where there is faith, there is the grace of Mahadev.",
"Om Namah Shivaya is the path to inner peace.",
"Lord Shiva blesses those who walk with humility.",
"Faith turns obstacles into opportunities.",
"The devotee who remembers Mahadev is never alone.",
"Har Har Mahadev."
];

const quotesBn = [
"যেখানে বিশ্বাস আছে, সেখানেই মহাদেবের কৃপা আছে।",
"ওঁ নমঃ শিবায় অন্তরের শান্তির পথ।",
"মহাদেব তাঁদের আশীর্বাদ করেন যারা বিনয় ও ভক্তির পথে চলেন।",
"বিশ্বাস বাধাকে সুযোগে পরিণত করে।",
"যে ভক্ত মহাদেবকে স্মরণ করে, সে কখনও একা নয়।",
"হর হর মহাদেব।"
];

if (quoteEn && quoteBn) {

let quoteIndex = 0;

setInterval(() => {

quoteIndex = (quoteIndex + 1) % quotesEn.length;

quoteEn.innerText = quotesEn[quoteIndex];
quoteBn.innerText = quotesBn[quoteIndex];

}, 15000);

}


// TEMPLE BELL

const bellBtn = document.getElementById("bellBtn");

if (bellBtn) {

bellBtn.addEventListener("click", () => {

const bell = document.getElementById("bellSound");

if (bell) {

bell.currentTime = 0;

const playPromise = bell.play();

if (playPromise !== undefined) {

playPromise.catch(error => {

console.log("Audio blocked:", error);

});

}

}

});

}

});


document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");
    });

});

const popup = document.getElementById("popupCard");
const closeBtn = document.getElementById("closePopup");
const launcher = document.getElementById("popupLauncher");

const lastClosed = localStorage.getItem("popupClosedTime");

const DAY = 24 * 60 * 60 * 1000;

if(lastClosed){

    const now = Date.now();

    if(now - parseInt(lastClosed) < DAY){

        popup.style.display = "none";
        launcher.style.display = "block";
    }

}

closeBtn.addEventListener("click", () => {

    popup.style.display = "none";

    launcher.style.display = "block";

    localStorage.setItem(
        "popupClosedTime",
        Date.now()
    );

});

launcher.addEventListener("click", () => {

    popup.style.display = "block";

    launcher.style.display = "none";

});
