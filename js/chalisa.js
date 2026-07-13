const buttons = document.querySelectorAll(".lang-btn");
const contents = document.querySelectorAll(".lang-content");

buttons.forEach(button => {

button.addEventListener("click", () => {

const lang = button.dataset.lang;

buttons.forEach(btn =>
btn.classList.remove("active")
);

button.classList.add("active");

contents.forEach(content => {

content.classList.remove("active");

if(content.classList.contains(lang)){
content.classList.add("active");
}

});

});

});
