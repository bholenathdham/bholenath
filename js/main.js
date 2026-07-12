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
