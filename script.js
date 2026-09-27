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
// ---- Detail Modal (Projects + Education/Certifications) ----
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");


const modalData = {
"project-1": {
image: "Image/pen-academy.png",
date: "May 2026",
title: "PenAcademy - Learning Platform",
description: "Designed and developed a web-based learning platform guiding users from core networking concepts through hands-on penetration testing. Built a progress-tracking feature enabling learners to monitor their course completion using HTML, CSS, and JavaScript.",
tags: ["HTML5", "CSS3", "JavaScript", "Cybersecurity"]
},
"project-2": {
image: "Image/enterprise-campus-network.png",
date: "Jul 2026",
title: "Enterprise Campus Switching Network",
description: "Designed and implemented an enterprise campus network for 4 departments using 1 Layer 3 switch, 2 Layer 2 access switches, and 8 end devices. Configured VLANs, IEEE 802.1Q trunking, STP, SVIs, Inter-VLAN Routing, and Layer 3 switching. Implemented EtherChannel (LACP) for link redundancy and bandwidth optimization. Verified end-to-end network connectivity using ICMP (Ping).",
tags: ["Cisco Packet Tracer", "VLAN", "L3 Switching", "EtherChannel"]
},
"project-3": {
image: "Image/earth orbital Simulation.png",
date: "Jun 2026",
title: "Interactive 3D Earth Orbit Simulation",
description: "Developed an interactive 3D Earth orbit simulation using JavaScript and OpenGL. Implemented satellite orbit animation with mouse-click color interaction.",
tags: ["JavaScript", "OpenGL"]
},
"edu-1": {
date: "Expected March 2027",
title: "B.Sc. in Computer Science & Engineering",
description: "Southeast University — 11th Semester | CGPA: 3.65 / 4.00",
tags: []
},
"edu-2": {
date: "Issued June 2026 · Valid through June 2029",
title: "CPTE - Certified Penetration Testing Engineer",
description: "Mile2 Cybersecurity Institute. Specialized in Network Reconnaissance, Vulnerability Assessment, and Penetration Testing.",
tags: []
},
"edu-3": {
date: "In Progress",
title: "Cisco Certified Network Associate (CCNA)",
description: "Hands-on expertise in Routing, Switching, and Secure Device Access.",
tags: []
},
"edu-4": {
date: "Feb 2024",
title: "21st Century Employability Skilling Program",
description: "Wadhwani Foundation — Advanced (Basic Level), 77-hour professional training.",
tags: []
}
};


function openModal(key) {
const data = modalData[key];
if (!data) return;


const tagsHtml = data.tags.length
? `<div class="project-tags">${data.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
: "";
const imageHtml = data.image ? `<img src="${data.image}" alt="${data.title}">` : "";


modalBody.innerHTML = `
${imageHtml}
<span class="modal-date">${data.date}</span>
<h3>${data.title}</h3>
<p>${data.description}</p>
${tagsHtml}
`;
modalOverlay.classList.add("active");
}

function closeModal() {
modalOverlay.classList.remove("active");
}

document.querySelectorAll("[data-modal]").forEach((card) => {
card.addEventListener("click", () => openModal(card.getAttribute("data-modal")));
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
if (e.key === "Escape") closeModal();
});

// FIX 1: real, original interactive feature — validates every field with
// messages, marks invalid fields, and only "sends" the message once
// every rule passes.
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");


const validationRules = [
{
id: "firstName",
errorId: "firstNameError",
validate: (value) => value.trim().length >= 2,
message: "First name must be at least 2 characters."
},
{
id: "lastName",
errorId: "lastNameError",
validate: (value) => value.trim().length >= 2,
message: "Last name must be at least 2 characters."
},
{
id: "email",
errorId: "emailError",
validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
message: "Please enter a valid email address."
},
{
id: "message",
errorId: "messageError",
validate: (value) => value.trim().length >= 10,
message: "Message must be at least 10 characters."
}
];


function validateField(rule) {
const input = document.getElementById(rule.id);
const errorEl = document.getElementById(rule.errorId);
const passed = rule.validate(input.value);


if (passed) {
input.classList.remove("invalid");
errorEl.textContent = "";
} else {
input.classList.add("invalid");
errorEl.textContent = rule.message;
}
return passed;
}


function validatePhoneField() {
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const value = phoneInput.value.trim();




if (value === "") {
phoneInput.classList.remove("invalid");
phoneError.textContent = "";
return true;
}


const passed = /^[0-9+\-\s()]{7,15}$/.test(value);
if (passed) {
phoneInput.classList.remove("invalid");
phoneError.textContent = "";
} else {
phoneInput.classList.add("invalid");
phoneError.textContent = "Please enter a valid phone number.";
}
return passed;
}


function validateContactForm() {
let isValid = true;
validationRules.forEach((rule) => {
if (!validateField(rule)) isValid = false;
});
if (!validatePhoneField()) isValid = false;
return isValid;
}


// Live feedback: clear a field's error as soon as it becomes valid again
validationRules.forEach((rule) => {
document.getElementById(rule.id).addEventListener("input", () => validateField(rule));
});
document.getElementById("phone").addEventListener("input", validatePhoneField);


contactForm.addEventListener("submit", (e) => {
e.preventDefault();


if (!validateContactForm()) {
formFeedback.className = "form-feedback error";
formFeedback.textContent = "Please fix the highlighted fields and try again.";
formFeedback.style.display = "block";
return;
}


formFeedback.className = "form-feedback success";
formFeedback.textContent = "Thank you! Your message has been sent successfully.";
formFeedback.style.display = "block";


contactForm.reset();
document
.querySelectorAll(".form-group input, .form-group textarea")
.forEach((el) => el.classList.remove("invalid"));
document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));


setTimeout(() => {
formFeedback.style.display = "none";
}, 4000);
});
});


