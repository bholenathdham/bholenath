const toggle = document.getElementById("langToggle");

let bengali = false;

toggle.addEventListener("click",()=>{

const en = document.querySelectorAll(".en");
const bn = document.querySelectorAll(".bn");

bengali = !bengali;

if(bengali){

en.forEach(el=>el.classList.add("hidden"));
bn.forEach(el=>el.classList.remove("hidden"));

toggle.innerText="English";

}else{

en.forEach(el=>el.classList.remove("hidden"));
bn.forEach(el=>el.classList.add("hidden"));

toggle.innerText="বাংলা";

}

});

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

});

window.addEventListener("DOMContentLoaded", () => {

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;

    });

});

closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){
        lightbox.style.display = "none";
    }

});

});

lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

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

let quoteIndex = 0;

setInterval(() => {

    quoteIndex = (quoteIndex + 1) % quotesEn.length;

    document.getElementById("quoteTextEn").innerText =
    quotesEn[quoteIndex];

    document.getElementById("quoteTextBn").innerText =
    quotesBn[quoteIndex];

}, 5000);
