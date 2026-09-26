document.addEventListener("DOMContentLoaded", () => {
// Theme Toggle (Dark / Light Mode)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");


themeToggle.addEventListener("click", () => {
const currentTheme = document.body.getAttribute("data-theme");
if (currentTheme === "dark") {
document.body.removeAttribute("data-theme");
themeIcon.className = "fa-solid fa-moon";
localStorage.setItem("theme", "light");
} else {
document.body.setAttribute("data-theme", "dark");
themeIcon.className = "fa-solid fa-sun";
localStorage.setItem("theme", "dark");
}
});




const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
document.body.setAttribute("data-theme", "dark");
themeIcon.className = "fa-solid fa-sun";
}




const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");


hamburger.addEventListener("click", () => {
navMenu.classList.toggle("active");
hamburger.querySelector("i").classList.toggle("fa-xmark");
});


// Smooth scroll + close mobile menu on nav link click
document.querySelectorAll(".nav-link").forEach((link) => {
link.addEventListener("click", (e) => {
const targetId = link.getAttribute("href");
const targetEl = document.querySelector(targetId);
if (targetEl) {
e.preventDefault();
targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
}
navMenu.classList.remove("active");
hamburger.querySelector("i").className = "fa-solid fa-bars";
});
});




const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {
let current = "";
sections.forEach((section) => {
const sectionTop = section.offsetTop - 120;
if (window.scrollY >= sectionTop) {
current = section.getAttribute("id");
}
});
navLinks.forEach((link) => {
link.classList.remove("active");
if (link.getAttribute("href") === `#${current}`) {
link.classList.add("active");
}
});
});
