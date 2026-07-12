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
