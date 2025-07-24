// Contact Form Validation and Submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Reset previous error messages
      clearErrors()

      // Validate form
      if (validateForm()) {
        // Simulate form submission
        submitForm()
      }
    })
  }

  // Add input validation on blur
  const formInputs = document.querySelectorAll(".contact-form input, .contact-form select, .contact-form textarea")
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })
})

// Validate the entire form
function validateForm() {
  let isValid = true

  // Validate name
  const nameInput = document.getElementById("name")
  if (!nameInput.value.trim()) {
    showError(nameInput, "name-error", "Please enter your full name")
    isValid = false
  } else if (nameInput.value.trim().length < 3) {
    showError(nameInput, "name-error", "Name must be at least 3 characters")
    isValid = false
  }

  // Validate email
  const emailInput = document.getElementById("email")
  if (!emailInput.value.trim()) {
    showError(emailInput, "email-error", "Please enter your email address")
    isValid = false
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "email-error", "Please enter a valid email address")
    isValid = false
  }

  // Validate subject
  const subjectInput = document.getElementById("subject")
  if (!subjectInput.value) {
    showError(subjectInput, "subject-error", "Please select a subject")
    isValid = false
  }

  // Validate message
  const messageInput = document.getElementById("message")
  if (!messageInput.value.trim()) {
    showError(messageInput, "message-error", "Please enter your message")
    isValid = false
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, "message-error", "Message must be at least 10 characters")
    isValid = false
  }

  // Validate consent
  const consentInput = document.getElementById("consent")
  if (!consentInput.checked) {
    showError(consentInput, "consent-error", "You must agree to the privacy policy")
    isValid = false
  }

  return isValid
}

// Validate a single field
function validateField(field) {
  switch (field.id) {
    case "name":
      if (!field.value.trim()) {
        showError(field, "name-error", "Please enter your full name")
      } else if (field.value.trim().length < 3) {
        showError(field, "name-error", "Name must be at least 3 characters")
      } else {
        clearError(field, "name-error")
      }
      break

    case "email":
      if (!field.value.trim()) {
        showError(field, "email-error", "Please enter your email address")
      } else if (!isValidEmail(field.value)) {
        showError(field, "email-error", "Please enter a valid email address")
      } else {
        clearError(field, "email-error")
      }
      break

    case "subject":
      if (!field.value) {
        showError(field, "subject-error", "Please select a subject")
      } else {
        clearError(field, "subject-error")
      }
      break

    case "message":
      if (!field.value.trim()) {
        showError(field, "message-error", "Please enter your message")
      } else if (field.value.trim().length < 10) {
        showError(field, "message-error", "Message must be at least 10 characters")
      } else {
        clearError(field, "message-error")
      }
      break

    case "consent":
      if (!field.checked) {
        showError(field, "consent-error", "You must agree to the privacy policy")
      } else {
        clearError(field, "consent-error")
      }
      break
  }
}

// Show error message
function showError(input, errorId, message) {
  const errorElement = document.getElementById(errorId)
  input.classList.add("error")
  errorElement.textContent = message
  errorElement.classList.add("show")
}

// Clear error message
function clearError(input, errorId) {
  const errorElement = document.getElementById(errorId)
  input.classList.remove("error")
  errorElement.textContent = ""
  errorElement.classList.remove("show")
}

// Clear all errors
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message")
  const inputs = document.querySelectorAll(".contact-form input, .contact-form select, .contact-form textarea")

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

// Submit form
function submitForm() {
  // Show loading state
  const submitButton = document.querySelector('.contact-form button[type="submit"]')
  const originalButtonText = submitButton.innerHTML
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitButton.disabled = true

  // Simulate API call with timeout
  setTimeout(() => {
    // Reset form
    document.getElementById("contactForm").reset()

    // Reset button
    submitButton.innerHTML = originalButtonText
    submitButton.disabled = false

    // Show success message
    showSuccessModal()
  }, 1500)
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

// Toggle FAQ items
function toggleFaq(element) {
  const faqItem = element.parentElement

  // Close all other FAQs
  const allFaqs = document.querySelectorAll(".faq-item")
  allFaqs.forEach((item) => {
    if (item !== faqItem && item.classList.contains("active")) {
      item.classList.remove("active")
    }
  })

  // Toggle current FAQ
  faqItem.classList.toggle("active")
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("success-modal")
  if (event.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})
