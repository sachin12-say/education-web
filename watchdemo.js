// Initialize accessibility course videos
document.querySelectorAll(".accessibility-course-card .video-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function () {
    const video = this.nextElementSibling
    const source = video.querySelector("source")

    // Set the actual source
    if (source.getAttribute("src") === null) {
      source.setAttribute("src", source.getAttribute("data-src"))
      video.load()
    }

    // Hide overlay and play video
    this.classList.add("hidden")
    video.play()

    // Show overlay when video is paused or ended
    video.addEventListener("pause", () => {
      this.classList.remove("hidden")
    })

    video.addEventListener("ended", () => {
      this.classList.remove("hidden")
    })
  })
})

// Add animation for accessibility course cards
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".accessibility-course-card").forEach((card, index) => {
    card.style.opacity = 0
    card.style.transform = "translateY(20px)"
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })
})
