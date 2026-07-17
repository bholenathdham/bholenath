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
