// Theme Management
let currentTheme = localStorage.getItem("theme") || "light"

function initializeTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme)
  updateThemeIcons()
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.documentElement.setAttribute("data-theme", currentTheme)
  localStorage.setItem("theme", currentTheme)
  updateThemeIcons()
}

function updateThemeIcons() {
  const themeIcon = document.getElementById("theme-icon")
  const mobileThemeIcon = document.getElementById("mobile-theme-icon")

  if (currentTheme === "light") {
    themeIcon.className = "fas fa-moon"
    mobileThemeIcon.className = "fas fa-moon"
  } else {
    themeIcon.className = "fas fa-sun"
    mobileThemeIcon.className = "fas fa-sun"
  }
}

// Mobile Menu Management
function toggleMobileMenu() {
  const navMenu = document.getElementById("nav-menu")
  const hamburgerIcon = document.getElementById("hamburger-icon")

  navMenu.classList.toggle("active")

  if (navMenu.classList.contains("active")) {
    hamburgerIcon.className = "fas fa-times"
  } else {
    hamburgerIcon.className = "fas fa-bars"
  }
}

// Hero Slider Management
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const indicators = document.querySelectorAll(".indicator")

function showSlide(index) {
  // Remove active class from all slides and indicators
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Add active class to current slide and indicator
  slides[index].classList.add("active")
  indicators[index].classList.add("active")

  currentSlide = index
}

function goToSlide(index) {
  showSlide(index)
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length
  showSlide(nextIndex)
}

// Auto-advance slides
function startSlideshow() {
  setInterval(nextSlide, 3000)
}

// Accessibility Features
function readAloud() {
  const text =
    "Introducing Career Accelerators – focus on the skills and real-world experience that'll get you noticed."

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.pitch = 1
    speechSynthesis.speak(utterance)
  } else {
    alert("Speech synthesis not supported in your browser.")
  }
}

function showSignLanguageHelp() {
  document.getElementById("sign-language-popup").style.display = "flex"
}

function closeSignLanguageHelp() {
  document.getElementById("sign-language-popup").style.display = "none"
}

// Font Size Adjustment
let currentFontSize = 16

function adjustFontSize(change) {
  currentFontSize += change
  currentFontSize = Math.max(12, Math.min(24, currentFontSize))
  document.documentElement.style.fontSize = currentFontSize + "px"
}

// Language Change (placeholder function)
function changeLanguage(language) {
  console.log("Language changed to:", language)
  // Implement language change logic here
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        const navMenu = document.getElementById("nav-menu")
        const hamburgerIcon = document.getElementById("hamburger-icon")
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          hamburgerIcon.className = "fas fa-bars"
        }
      }
    })
  })
}

// Intersection Observer for Animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".stat-card, .course-card, .about-text, .about-image")
  animatedElements.forEach((el) => observer.observe(el))
}

// Newsletter Subscription
function initializeNewsletter() {
  const newsletterInput = document.querySelector(".newsletter-input")
  const subscribeBtn = document.querySelector(".newsletter .btn-primary")

  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
      const email = newsletterInput.value.trim()

      if (email && isValidEmail(email)) {
        alert("Thank you for subscribing!")
        newsletterInput.value = ""
      } else {
        alert("Please enter a valid email address.")
      }
    })
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Course Enrollment
function initializeCourseEnrollment() {
  const enrollButtons = document.querySelectorAll(".course-card .btn-primary")

  enrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseCard = this.closest(".course-card")
      const courseName = courseCard.querySelector("h3").textContent
      alert(`Enrollment initiated for: ${courseName}`)
    })
  })
}

// Handle Window Resize
function handleResize() {
  const navMenu = document.getElementById("nav-menu")
  const hamburgerIcon = document.getElementById("hamburger-icon")

  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    hamburgerIcon.className = "fas fa-bars"
  }
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  startSlideshow()
  initializeSmoothScrolling()
  initializeAnimations()
  initializeNewsletter()
  initializeCourseEnrollment()

  // Add resize listener
  window.addEventListener("resize", handleResize)

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const navMenu = document.getElementById("nav-menu")
    const hamburger = document.getElementById("hamburger")
    const hamburgerIcon = document.getElementById("hamburger-icon")

    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      hamburgerIcon.className = "fas fa-bars"
    }
  })

  // Close popup when clicking outside
  document.addEventListener("click", (e) => {
    const popup = document.getElementById("sign-language-popup")
    if (e.target === popup) {
      closeSignLanguageHelp()
    }
  })
})

// Handle keyboard navigation
document.addEventListener("keydown", (e) => {
  // Close popup with Escape key
  if (e.key === "Escape") {
    closeSignLanguageHelp()
  }

  // Navigate slides with arrow keys
  if (e.key === "ArrowLeft") {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length
    showSlide(prevIndex)
  } else if (e.key === "ArrowRight") {
    nextSlide()
  }
})

  // // <!-- JS for mobile nav -->
  // <script>
  //   const hamburger = document.getElementById('hamburger-btn');
  //   const navMenu = document.getElementById('nav-menu');
  //   hamburger.addEventListener('click', () => {
  //     navMenu.classList.toggle('active');
  //   });
  // </script>