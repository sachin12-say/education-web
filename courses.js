// Toggle mobile menu
document.getElementById("hamburger-btn").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("active")
})

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
  const newTheme = currentTheme === "light" ? "dark" : "light"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
}

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme)
}

// Sign language popup functionality
function openSignLanguageHelp() {
  document.getElementById("sign-language-popup").style.display = "flex"
}

function closeSignLanguageHelp() {
  document.getElementById("sign-language-popup").style.display = "none"
}

// Add animation to course cards
document.addEventListener("DOMContentLoaded", () => {
  const courseCards = document.querySelectorAll(".course-card")

  // Add fade-in animation with delay for each card
  courseCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.animationDelay = `${index * 0.1}s`
  })
})
