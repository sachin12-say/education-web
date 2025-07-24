// Accessibility Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const accessibilityButton = document.getElementById("accessibility-menu-button")
  const accessibilityDropdown = document.getElementById("accessibility-dropdown")
  const closeButton = document.getElementById("close-accessibility")

  // Toggle switches
  const highContrastToggle = document.getElementById("high-contrast")
  const screenReaderToggle = document.getElementById("screen-reader")
  const focusModeToggle = document.getElementById("focus-mode")
  const readingGuideToggle = document.getElementById("reading-guide")

  // Font size buttons
  const decreaseFontBtn = document.getElementById("decrease-font")
  const resetFontBtn = document.getElementById("reset-font")
  const increaseFontBtn = document.getElementById("increase-font")

  // Line spacing buttons
  const decreaseSpacingBtn = document.getElementById("decrease-spacing")
  const resetSpacingBtn = document.getElementById("reset-spacing")
  const increaseSpacingBtn = document.getElementById("increase-spacing")

  // Text alignment buttons
  const alignLeftBtn = document.getElementById("align-left")
  const alignCenterBtn = document.getElementById("align-center")
  const alignRightBtn = document.getElementById("align-right")

  // Reset all button
  const resetAllBtn = document.getElementById("reset-all")

  // Load saved settings
  loadAccessibilitySettings()

  // Toggle dropdown visibility
  accessibilityButton.addEventListener("click", () => {
    accessibilityDropdown.classList.toggle("active")
    const isExpanded = accessibilityDropdown.classList.contains("active")
    accessibilityButton.setAttribute("aria-expanded", isExpanded)
  })

  // Close dropdown
  closeButton.addEventListener("click", () => {
    accessibilityDropdown.classList.remove("active")
    accessibilityButton.setAttribute("aria-expanded", "false")
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !accessibilityDropdown.contains(event.target) &&
      !accessibilityButton.contains(event.target) &&
      accessibilityDropdown.classList.contains("active")
    ) {
      accessibilityDropdown.classList.remove("active")
      accessibilityButton.setAttribute("aria-expanded", "false")
    }
  })

  // High Contrast Mode
  highContrastToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("high-contrast")
    } else {
      document.body.classList.remove("high-contrast")
    }
    saveAccessibilitySetting("highContrast", this.checked)
  })

  // Screen Reader
  screenReaderToggle.addEventListener("change", function () {
    if (this.checked) {
      enableScreenReader()
    } else {
      disableScreenReader()
    }
    saveAccessibilitySetting("screenReader", this.checked)
  })

  // Font Size Controls
  decreaseFontBtn.addEventListener("click", () => {
    changeFontSize(-1)
  })

  resetFontBtn.addEventListener("click", () => {
    resetFontSize()
  })

  increaseFontBtn.addEventListener("click", () => {
    changeFontSize(1)
  })

  // Line Spacing Controls
  decreaseSpacingBtn.addEventListener("click", () => {
    changeLineSpacing(-1)
  })

  resetSpacingBtn.addEventListener("click", () => {
    resetLineSpacing()
  })

  increaseSpacingBtn.addEventListener("click", () => {
    changeLineSpacing(1)
  })

  // Text Alignment Controls
  alignLeftBtn.addEventListener("click", () => {
    setTextAlignment("left")
  })

  alignCenterBtn.addEventListener("click", () => {
    setTextAlignment("center")
  })

  alignRightBtn.addEventListener("click", () => {
    setTextAlignment("right")
  })

  // Focus Mode
  focusModeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("focus-mode")
    } else {
      document.body.classList.remove("focus-mode")
    }
    saveAccessibilitySetting("focusMode", this.checked)
  })

  // Reading Guide
  readingGuideToggle.addEventListener("change", function () {
    if (this.checked) {
      enableReadingGuide()
    } else {
      disableReadingGuide()
    }
    saveAccessibilitySetting("readingGuide", this.checked)
  })

  // Reset All Settings
  resetAllBtn.addEventListener("click", () => {
    resetAllAccessibilitySettings()
  })

  // Font Size Functions
  function changeFontSize(direction) {
    const currentSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    let newSize

    if (direction > 0) {
      newSize = Math.min(currentSize + 2, 24) // Max 24px
    } else {
      newSize = Math.max(currentSize - 2, 12) // Min 12px
    }

    document.documentElement.style.fontSize = newSize + "px"
    saveAccessibilitySetting("fontSize", newSize)
  }

  function resetFontSize() {
    document.documentElement.style.fontSize = "16px"
    saveAccessibilitySetting("fontSize", 16)
  }

  // Line Spacing Functions
  function changeLineSpacing(direction) {
    const body = document.body
    const currentSpacing = Number.parseFloat(getComputedStyle(body).lineHeight) || 1.5
    let newSpacing

    if (direction > 0) {
      newSpacing = Math.min(currentSpacing + 0.2, 2.5) // Max 2.5
    } else {
      newSpacing = Math.max(currentSpacing - 0.2, 1) // Min 1
    }

    body.style.lineHeight = newSpacing
    saveAccessibilitySetting("lineSpacing", newSpacing)
  }

  function resetLineSpacing() {
    document.body.style.lineHeight = ""
    saveAccessibilitySetting("lineSpacing", null)
  }

  // Text Alignment Functions
  function setTextAlignment(alignment) {
    document.body.style.textAlign = alignment
    saveAccessibilitySetting("textAlignment", alignment)
  }

  // Screen Reader Functions
  function enableScreenReader() {
    // Create screen reader if it doesn't exist
    if (!window.screenReader) {
      window.screenReader = {
        active: true,
        speak: (text) => {
          const utterance = new SpeechSynthesisUtterance(text)
          window.speechSynthesis.speak(utterance)
        },
      }

      // Add event listeners for screen reader
      document.addEventListener(
        "focus",
        (e) => {
          if (window.screenReader && window.screenReader.active) {
            const target = e.target
            let textToRead = ""

            if (target.tagName === "A") {
              textToRead = `Link: ${target.textContent}`
            } else if (target.tagName === "BUTTON") {
              textToRead = `Button: ${target.textContent}`
            } else if (target.tagName === "INPUT") {
              textToRead = `Input field: ${target.placeholder || target.name || "No label"}`
            } else if (target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3") {
              textToRead = `Heading: ${target.textContent}`
            } else {
              textToRead = target.textContent
            }

            if (textToRead) {
              window.screenReader.speak(textToRead)
            }
          }
        },
        true,
      )
    } else {
      window.screenReader.active = true
    }

    // Announce screen reader is active
    setTimeout(() => {
      if (window.screenReader) {
        window.screenReader.speak("Screen reader activated")
      }
    }, 500)
  }

  function disableScreenReader() {
    if (window.screenReader) {
      window.screenReader.active = false
      window.speechSynthesis.cancel()
    }
  }

  // Reading Guide Functions
  function enableReadingGuide() {
    // Create reading guide if it doesn't exist
    if (!document.getElementById("reading-guide-element")) {
      const guide = document.createElement("div")
      guide.id = "reading-guide-element"
      guide.style.position = "fixed"
      guide.style.height = "30px"
      guide.style.width = "100%"
      guide.style.backgroundColor = "rgba(255, 255, 0, 0.2)"
      guide.style.pointerEvents = "none"
      guide.style.zIndex = "9999"
      guide.style.display = "none"
      document.body.appendChild(guide)

      // Add mouse move event listener
      document.addEventListener("mousemove", moveReadingGuide)
    } else {
      document.getElementById("reading-guide-element").style.display = "block"
      document.addEventListener("mousemove", moveReadingGuide)
    }
  }

  function disableReadingGuide() {
    const guide = document.getElementById("reading-guide-element")
    if (guide) {
      guide.style.display = "none"
    }
    document.removeEventListener("mousemove", moveReadingGuide)
  }

  function moveReadingGuide(e) {
    const guide = document.getElementById("reading-guide-element")
    if (guide) {
      guide.style.display = "block"
      guide.style.top = e.clientY - 15 + "px"
    }
  }

  // Save and Load Settings
  function saveAccessibilitySetting(setting, value) {
    try {
      const settings = JSON.parse(localStorage.getItem("accessibilitySettings")) || {}
      settings[setting] = value
      localStorage.setItem("accessibilitySettings", JSON.stringify(settings))
    } catch (e) {
      console.error("Error saving accessibility setting:", e)
    }
  }

  function loadAccessibilitySettings() {
    try {
      const settings = JSON.parse(localStorage.getItem("accessibilitySettings")) || {}

      // Apply high contrast
      if (settings.highContrast) {
        highContrastToggle.checked = true
        document.body.classList.add("high-contrast")
      }

      // Apply screen reader
      if (settings.screenReader) {
        screenReaderToggle.checked = true
        enableScreenReader()
      }

      // Apply font size
      if (settings.fontSize) {
        document.documentElement.style.fontSize = settings.fontSize + "px"
      }

      // Apply line spacing
      if (settings.lineSpacing) {
        document.body.style.lineHeight = settings.lineSpacing
      }

      // Apply text alignment
      if (settings.textAlignment) {
        document.body.style.textAlign = settings.textAlignment
      }

      // Apply focus mode
      if (settings.focusMode) {
        focusModeToggle.checked = true
        document.body.classList.add("focus-mode")
      }

      // Apply reading guide
      if (settings.readingGuide) {
        readingGuideToggle.checked = true
        enableReadingGuide()
      }
    } catch (e) {
      console.error("Error loading accessibility settings:", e)
    }
  }

  function resetAllAccessibilitySettings() {
    // Reset all toggles
    highContrastToggle.checked = false
    screenReaderToggle.checked = false
    focusModeToggle.checked = false
    readingGuideToggle.checked = false

    // Remove all applied settings
    document.body.classList.remove("high-contrast", "focus-mode")
    document.documentElement.style.fontSize = ""
    document.body.style.lineHeight = ""
    document.body.style.textAlign = ""

    // Disable active features
    disableScreenReader()
    disableReadingGuide()

    // Clear saved settings
    localStorage.removeItem("accessibilitySettings")

    // Announce reset
    alert("All accessibility settings have been reset.")
  }

  // Add CSS for focus mode
  const focusModeStyle = document.createElement("style")
  focusModeStyle.textContent = `
    .focus-mode .navbar, .focus-mode .footer, .focus-mode .sidebar {
      opacity: 0.3;
      transition: opacity 0.3s ease;
    }
    .focus-mode .navbar:hover, .focus-mode .footer:hover, .focus-mode .sidebar:hover {
      opacity: 1;
    }
    .focus-mode main {
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.4);
    }
    .high-contrast {
      filter: contrast(1.5);
    }
    .high-contrast body {
      background: #000 !important;
      color: #fff !important;
    }
    .high-contrast a, .high-contrast button {
      color: #ffff00 !important;
    }
    .high-contrast h1, .high-contrast h2, .high-contrast h3, .high-contrast h4 {
      color: #00ffff !important;
    }
    #reading-guide-element {
      box-shadow: 0 0 10px 2px rgba(255, 255, 0, 0.3);
    }
  `
  document.head.appendChild(focusModeStyle)
})
