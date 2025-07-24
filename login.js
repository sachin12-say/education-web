// Login Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")

  // Form submission
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Real-time validation
  emailInput.addEventListener("blur", () => validateField(emailInput))
  passwordInput.addEventListener("blur", () => validateField(passwordInput))

  // Input animations
  const inputs = document.querySelectorAll(".form-group input")
  inputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus)
    input.addEventListener("blur", handleInputBlur)
  })

  // Animate elements on page load
  animatePageLoad()
})

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault()

  // Clear previous errors
  clearErrors()

  // Validate form
  if (!validateLoginForm()) {
    return
  }

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Show loading state
  showLoadingState()

  try {
    // Simulate API call
    await simulateLogin(email, password)

    // Hide loading state
    hideLoadingState()

    // Show success modal
    showSuccessModal()
  } catch (error) {
    hideLoadingState()
    showError("login", error.message)
  }
}

// Validate login form
function validateLoginForm() {
  let isValid = true

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Validate email
  if (!email.trim()) {
    showError("email", "Please enter your email address")
    isValid = false
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address")
    isValid = false
  }

  // Validate password
  if (!password.trim()) {
    showError("password", "Please enter your password")
    isValid = false
  } else if (password.length < 6) {
    showError("password", "Password must be at least 6 characters")
    isValid = false
  }

  return isValid
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name

  switch (fieldName) {
    case "email":
      if (!value) {
        showError("email", "Please enter your email address")
      } else if (!isValidEmail(value)) {
        showError("email", "Please enter a valid email address")
      } else {
        clearError("email")
      }
      break

    case "password":
      if (!value) {
        showError("password", "Please enter your password")
      } else if (value.length < 6) {
        showError("password", "Password must be at least 6 characters")
      } else {
        clearError("password")
      }
      break
  }
}

// Show error message
function showError(fieldName, message) {
  const input = document.getElementById(fieldName)
  const errorElement = document.getElementById(`${fieldName}-error`)

  input.classList.add("error")
  errorElement.textContent = message
  errorElement.classList.add("show")

  // Remove error after animation
  setTimeout(() => {
    input.classList.remove("error")
  }, 500)
}

// Clear error message
function clearError(fieldName) {
  const input = document.getElementById(fieldName)
  const errorElement = document.getElementById(`${fieldName}-error`)

  input.classList.remove("error")
  errorElement.textContent = ""
  errorElement.classList.remove("show")
}

// Clear all errors
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message")
  const inputs = document.querySelectorAll(".form-group input")

  errorMessages.forEach((error) => {
    error.textContent = ""
    error.classList.remove("show")
  })

  inputs.forEach((input) => {
    input.classList.remove("error")
  })
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Simulate login API call
function simulateLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo credentials check
      if (email === "demo@learners.us" && password === "demo123") {
        resolve({ success: true, user: { email, name: "Demo User" } })
      } else if (email === "admin@learners.us" && password === "admin123") {
        resolve({ success: true, user: { email, name: "Admin User" } })
      } else {
        reject(new Error("Invalid email or password"))
      }
    }, 2000)
  })
}

// Show loading state
function showLoadingState() {
  const loginBtn = document.querySelector(".login-btn")
  const loadingOverlay = document.getElementById("loading-overlay")

  loginBtn.classList.add("loading")
  loginBtn.disabled = true
  loadingOverlay.style.display = "flex"
}

// Hide loading state
function hideLoadingState() {
  const loginBtn = document.querySelector(".login-btn")
  const loadingOverlay = document.getElementById("loading-overlay")

  loginBtn.classList.remove("loading")
  loginBtn.disabled = false
  loadingOverlay.style.display = "none"
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById("success-modal")
  modal.style.display = "flex"
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const passwordIcon = document.getElementById("password-icon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    passwordIcon.className = "fas fa-eye-slash"
  } else {
    passwordInput.type = "password"
    passwordIcon.className = "fas fa-eye"
  }
}

// Fill demo credentials
function fillDemoCredentials() {
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")

  // Animate filling
  emailInput.value = ""
  passwordInput.value = ""

  typeText(emailInput, "demo@learners.us", 50)
  setTimeout(() => {
    typeText(passwordInput, "demo123", 50)
  }, 1000)
}

// Type text animation
function typeText(element, text, speed) {
  let i = 0
  const timer = setInterval(() => {
    element.value += text.charAt(i)
    i++
    if (i >= text.length) {
      clearInterval(timer)
      // Trigger focus effect
      element.focus()
      element.blur()
    }
  }, speed)
}

// Social login
function socialLogin(provider) {
  showLoadingState()

  setTimeout(() => {
    hideLoadingState()
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login would be implemented here`)
  }, 1500)
}

// Redirect to dashboard
function redirectToDashboard() {
  // In a real app, this would redirect to the dashboard
  alert("Redirecting to dashboard...")
  window.location.href = "index.html"
}

// Handle input focus animations
function handleInputFocus(e) {
  const inputContainer = e.target.closest(".input-container")
  const icon = inputContainer.querySelector(".input-icon")

  if (icon) {
    icon.style.transform = "scale(1.1)"
    icon.style.color = "var(--primary-color)"
  }
}

// Handle input blur animations
function handleInputBlur(e) {
  const inputContainer = e.target.closest(".input-container")
  const icon = inputContainer.querySelector(".input-icon")

  if (icon) {
    icon.style.transform = "scale(1)"
    if (!e.target.value) {
      icon.style.color = "var(--text-muted)"
    }
  }
}

// Animate page load
function animatePageLoad() {
  // Animate floating shapes
  const shapes = document.querySelectorAll(".floating-shape")
  shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 0.5}s`
  })

  // Animate form elements
  const formElements = document.querySelectorAll(".form-group")
  formElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        element.style.transition = "all 0.5s ease"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      },
      500 + index * 100,
    )
  })
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("success-modal")
  if (event.target === modal) {
    modal.style.display = "none"
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modal = document.getElementById("success-modal")
    modal.style.display = "none"
  }
})

// Keyboard navigation for form
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const activeElement = document.activeElement

    if (activeElement.tagName === "INPUT") {
      const form = activeElement.closest("form")
      const inputs = Array.from(form.querySelectorAll("input"))
      const currentIndex = inputs.indexOf(activeElement)

      if (currentIndex < inputs.length - 1) {
        event.preventDefault()
        inputs[currentIndex + 1].focus()
      }
    }
  }
})
