const langButtons = document.querySelectorAll('.lang-btn');
const allLanguages = document.querySelectorAll('.name-lang');

langButtons.forEach(button => {

button.addEventListener('click', () => {

langButtons.forEach(btn =>
btn.classList.remove('active')
);

button.classList.add('active');

const selectedLang = button.dataset.lang;

allLanguages.forEach(item =>
item.classList.remove('active')
);

document
.querySelectorAll('.name-lang.' + selectedLang)
.forEach(item =>
item.classList.add('active')
);

});

});
