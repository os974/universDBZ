// Menu burger
const burger = document.getElementById("burger");
const navMenu = document.querySelector(".nav ul");
if (burger) {
  burger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Mode sombre/clair avec gestion de l'icône
const toggleBtn = document.getElementById("theme-toggle");
const images = document.querySelectorAll(".card img");

function updateImages(theme) {
  images.forEach(img => {
    const daySrc = img.getAttribute("data-day");
    const nightSrc = img.getAttribute("data-night");
    img.setAttribute("src", theme === "dark" ? nightSrc : daySrc);
  });
}

let currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
updateImages(currentTheme);
if (toggleBtn) {
  toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  toggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    let newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
    updateImages(newTheme);
  });
}

// Animation au scroll (uniquement si cartes présentes) apparition progressive
const cards = document.querySelectorAll(".card");
if (cards.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

// Animation au clic du bouton de contact
const form = document.querySelector("#contact form");
const button = form.querySelector("button");

form.addEventListener("submit", e => {
  e.preventDefault(); // empêche le rechargement de la page

  button.classList.add("animate");

  // Retire la classe après l’animation pour pouvoir la rejouer
  button.addEventListener("animationend", () => {
    button.classList.remove("animate");
  }, { once: true });
});
