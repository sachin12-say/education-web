// Signup Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize form steps
  const currentStep = 1
  const totalSteps = 3

  // Get form elements
  const form = document.getElementById("signupForm")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const submitBtn = document.getElementById("submitBtn")

  // Set up event listeners
  if (form) {
    form.addEventListener("submit", handleSubmit)
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToPreviousStep()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToNextStep()
    })
  }

  // Set up form validation
  setupFormValidation()

  // Initialize UI
  updateFormNavigation()
  setupPasswordStrength()
  setupInterestSelection()
  animateFormElements()
})

// Go to next step
function goToNextStep() {
  const currentStepElement = document.getElementById(`step-${currentStep}`)

  // Validate current step before proceeding
  if (!validateStep(currentStep)) {
    shakeElement(currentStepElement)
    return
  }

  // Hide current step
  currentStepElement.classList.remove("active")

  // Mark current step as completed
  const currentStepIndicator = document.querySelector(`.step[data-step="${currentStep}"]`)
  currentStepIndicator.classList.remove("active")
  currentStepIndicator.classList.add("completed")

  // Increment step
  currentStep++

  // Show next step
  const nextStepElement = document.getElementById(`step-${currentStep}`)
  nextStepElement.classList.add("active")

  // Mark next step as active
  const nextStepIndicator = document.querySelector(`.step[data-step="${currentStep}"]`)
  nextStepIndicator.classList.add("active")

  // Update navigation buttons
  updateFormNavigation()

  // Scroll to top of form
  scrollToTop()
}

// Go to previous step
function goToPreviousStep() {
  if (currentStep > 1) {
    // Hide current step
    const currentStepElement = document.getElementById(`step-${currentStep}`)
    currentStepElement.classList.remove("active")

    // Unmark current step
    const currentStepIndicator = document.querySelector(`.step[data-step="${currentStep}"]`)
    currentStepIndicator.classList.remove("active")

    // Decrement step
    currentStep--

    // Show previous step
    const prevStepElement = document.getElementById(`step-${currentStep}`)
    prevStepElement.classList.add("active")

    // Mark previous step as active and not completed
    const prevStepIndicator = document.querySelector(`.step[data-step="${currentStep}"]`)
    prevStepIndicator.classList.add("active")
    prevStepIndicator.classList.remove("completed")

    // Update navigation buttons
    updateFormNavigation()

    // Scroll to top of form
    scrollToTop()
  }
}

// Update form navigation buttons
function updateFormNavigation() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const submitBtn = document.getElementById("submitBtn")

  // Show/hide previous button
  if (currentStep > 1) {
    prevBtn.style.display = "block"
  } else {
    prevBtn.style.display = "none"
  }

  // Show/hide next/submit buttons
  if (currentStep < 3) {
    nextBtn.style.display = "block"
    submitBtn.style.display = "none"
  } else {
    nextBtn.style.display = "none"
    submitBtn.style.display = "block"
  }
}

// Validate current step
function validateStep(step) {
  let isValid = true
  const stepElement = document.getElementById(`step-${step}`)

  // Get all required inputs in current step
  const requiredInputs = stepElement.querySelectorAll("input[required], select[required]")

  requiredInputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false
    }
  })

  // Special validation for step 3
  if (step === 3) {
    // Validate interests
    const interests = document.querySelectorAll('input[name="interests"]:checked')
    if (interests.length === 0) {
      showError("interests", "Please select at least one interest")
      isValid = false
    } else {
      clearError("interests")
    }

    // Validate terms
    const termsCheckbox = document.getElementById("terms")
    if (!termsCheckbox.checked) {
      showError("terms", "You must agree to the terms and conditions")
      isValid = false
    } else {
      clearError("terms")
    }
  }

  return isValid
}

// Validate individual input
function validateInput(input) {
  const value = input.value.trim()
  const id = input.id

  switch (id) {
    case "firstName":
    case "lastName":
      if (!value) {
        showError(id, "This field is required")
        return false
      } else if (value.length < 2) {
        showError(id, "Must be at least 2 characters")
        return false
      }
      clearError(id)
      return true

    case "email":
      if (!value) {
        showError(id, "Email is required")
        return false
      } else if (!isValidEmail(value)) {
        showError(id, "Please enter a valid email address")
        return false
      }
      clearError(id)
      return true

    case "password":
      if (!value) {
        showError(id, "Password is required")
        return false
      } else if (value.length < 8) {
        showError(id, "Password must be at least 8 characters")
        return false
      }
      clearError(id)
      return true

    case "confirmPassword":
      const password = document.getElementById("password").value
      if (!value) {
        showError(id, "Please confirm your password")
        return false
      } else if (value !== password) {
        showError(id, "Passwords do not match")
        return false
      }
      clearError(id)
      return true

    default:
      if (input.required && !value) {
        showError(id, "This field is required")
        return false
      }
      clearError(id)
      return true
  }
}

// Show error message
function showError(id, message) {
  const errorElement = document.getElementById(`${id}-error`)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  const inputElement = document.getElementById(id)
  if (inputElement) {
    inputElement.classList.add("error")
  }
}

// Clear error message
function clearError(id) {
  const errorElement = document.getElementById(`${id}-error`)
  if (errorElement) {
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }

  const inputElement = document.getElementById(id)
  if (inputElement) {
    inputElement.classList.remove("error")
  }
}

// Check if email is valid
function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Setup form validation
function setupFormValidation() {
  const inputs = document.querySelectorAll("input, select")

  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.required || input.value.trim() !== "") {
        validateInput(input)
      }
    })
  })

  // Email validation
  const emailInput = document.getElementById("email")
  if (emailInput) {
    emailInput.addEventListener(
      "input",
      debounce(() => {
        if (emailInput.value.trim() !== "") {
          validateEmailAvailability(emailInput.value)
        }
      }, 500),
    )
  }

  // Password confirmation
  const passwordInput = document.getElementById("password")
  const confirmPasswordInput = document.getElementById("confirmPassword")

  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener("input", () => {
      if (confirmPasswordInput.value.trim() !== "") {
        validateInput(confirmPasswordInput)
      }
    })
  }
}

// Setup password strength meter
function setupPasswordStrength() {
  const passwordInput = document.getElementById("password")
  const strengthFill = document.getElementById("strength-fill")
  const strengthText = document.getElementById("strength-text")

  if (passwordInput && strengthFill && strengthText) {
    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value
      const strength = calculatePasswordStrength(password)

      // Remove all classes
      strengthFill.className = "strength-fill"

      // Add appropriate class
      if (password.length === 0) {
        strengthText.textContent = "Password strength"
      } else if (strength < 30) {
        strengthFill.classList.add("weak")
        strengthText.textContent = "Weak password"
      } else if (strength < 60) {
        strengthFill.classList.add("fair")
        strengthText.textContent = "Fair password"
      } else if (strength < 80) {
        strengthFill.classList.add("good")
        strengthText.textContent = "Good password"
      } else {
        strengthFill.classList.add("strong")
        strengthText.textContent = "Strong password"
      }
    })
  }
}

// Calculate password strength (0-100)
function calculatePasswordStrength(password) {
  let strength = 0

  // Length
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 10

  // Complexity
  if (/[a-z]/.test(password)) strength += 10
  if (/[A-Z]/.test(password)) strength += 20
  if (/[0-9]/.test(password)) strength += 20
  if (/[^A-Za-z0-9]/.test(password)) strength += 20

  return Math.min(strength, 100)
}

// Setup interest selection
function setupInterestSelection() {
  const interestItems = document.querySelectorAll(".interest-item")

  interestItems.forEach((item) => {
    item.addEventListener("click", () => {
      const checkbox = item.querySelector("input[type='checkbox']")
      checkbox.checked = !checkbox.checked

      // Clear error if at least one is selected
      const checkedInterests = document.querySelectorAll('input[name="interests"]:checked')
      if (checkedInterests.length > 0) {
        clearError("interests")
      }
    })
  })
}

// Simulate email availability check
function validateEmailAvailability(email) {
  const validationIcon = document.getElementById("email-validation")

  if (!isValidEmail(email)) {
    validationIcon.className = "validation-icon"
    return
  }

  // Simulate API call
  setTimeout(() => {
    // For demo purposes, consider some emails as taken
    const takenEmails = ["test@example.com", "admin@learners.us", "info@learners.us"]

    if (takenEmails.includes(email.toLowerCase())) {
      validationIcon.className = "validation-icon invalid"
      showError("email", "This email is already registered")
    } else {
      validationIcon.className = "validation-icon valid"
      clearError("email")
    }
  }, 600)
}

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault()

  // Validate final step
  if (!validateStep(currentStep)) {
    return
  }

  // Show loading overlay
  const loadingOverlay = document.getElementById("loading-overlay")
  loadingOverlay.style.display = "flex"

  try {
    // Simulate API call
    await simulateFormSubmission()

    // Hide loading overlay
    loadingOverlay.style.display = "none"

    // Show success modal
    showSuccessModal()
  } catch (error) {
    // Hide loading overlay
    loadingOverlay.style.display = "none"

    // Show error
    alert("An error occurred. Please try again.")
  }
}

// Simulate form submission
function simulateFormSubmission() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById("success-modal")
  modal.style.display = "flex"
}

// Close modal
function closeModal() {
  const modal = document.getElementById("success-modal")
  modal.style.display = "none"
}

// Redirect to login
function redirectToLogin() {
  window.location.href = "login.html"
}

// Toggle password visibility
function togglePassword(id) {
  const passwordInput = document.getElementById(id)
  const passwordIcon = document.getElementById(`${id}-icon`)

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    passwordIcon.className = "fas fa-eye-slash"
  } else {
    passwordInput.type = "password"
    passwordIcon.className = "fas fa-eye"
  }
}

// Social signup
function socialSignup(provider) {
  alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup would be implemented here.`)
}

// Shake element animation
function shakeElement(element) {
  element.classList.add("shake")
  setTimeout(() => {
    element.classList.remove("shake")
  }, 500)
}

// Scroll to top of form
function scrollToTop() {
  const formContainer = document.querySelector(".form-side")
  if (formContainer) {
    formContainer.scrollTop = 0
  }
}

// Animate form elements
function animateFormElements() {
  // Animate form header
  const formHeader = document.querySelector(".form-header")
  if (formHeader) {
    formHeader.style.opacity = "0"
    formHeader.style.transform = "translateY(20px)"

    setTimeout(() => {
      formHeader.style.transition = "all 0.8s ease"
      formHeader.style.opacity = "1"
      formHeader.style.transform = "translateY(0)"
    }, 100)
  }

  // Animate progress steps
  const steps = document.querySelectorAll(".step")
  steps.forEach((step, index) => {
    step.style.opacity = "0"
    step.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        step.style.transition = "all 0.5s ease"
        step.style.opacity = "1"
        step.style.transform = "translateY(0)"
      },
      200 + index * 100,
    )
  })

  // Animate social buttons
  const socialButtons = document.querySelectorAll(".social-btn")
  socialButtons.forEach((button, index) => {
    button.style.opacity = "0"
    button.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        button.style.transition = "all 0.5s ease"
        button.style.opacity = "1"
        button.style.transform = "translateY(0)"
      },
      500 + index * 100,
    )
  })

  // Animate form inputs in first step
  const inputs = document.querySelectorAll("#step-1 .form-group")
  inputs.forEach((input, index) => {
    input.style.opacity = "0"
    input.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        input.style.transition = "all 0.5s ease"
        input.style.opacity = "1"
        input.style.transform = "translateY(0)"
      },
      700 + index * 100,
    )
  })
}

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add keydown event listener for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && !e.target.classList.contains("btn")) {
    e.preventDefault()

    if (currentStep < 3) {
      goToNextStep()
    } else {
      document.getElementById("submitBtn").click()
    }
  }
})

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("success-modal")
  if (e.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})
