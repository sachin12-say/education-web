// // About Page JavaScript with GSAP Animations
// document.addEventListener("DOMContentLoaded", () => {
//   // Register GSAP ScrollTrigger plugin
//   gsap.registerPlugin(ScrollTrigger)

//   // Initialize animations
//   initializeAnimations()
//   initializeChartAnimation()
//   initializeCounterAnimations()
// })

// // Initialize GSAP animations
// function initializeAnimations() {
//   // Banner title animation
//   gsap.from(".banner-title", {
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     ease: "power3.out",
//     delay: 0.3,
//   })

//   // Banner subtitle animation
//   gsap.from(".banner-subtitle", {
//     opacity: 0,
//     y: 30,
//     duration: 0.8,
//     ease: "power2.out",
//     delay: 0.6,
//   })

//   // Banner stats animation
//   gsap.from(".stat-item", {
//     opacity: 0,
//     y: 30,
//     duration: 0.6,
//     ease: "power2.out",
//     delay: 0.9,
//     stagger: 0.2,
//   })

//   // Story section animation
//   gsap.from(".story-text", {
//     scrollTrigger: {
//       trigger: ".story-content",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     x: -50,
//     duration: 1,
//     ease: "power2.out",
//   })

//   gsap.from(".story-image", {
//     scrollTrigger: {
//       trigger: ".story-content",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     x: 50,
//     duration: 1,
//     ease: "power2.out",
//     delay: 0.3,
//   })

//   // Mission and Vision cards animation
//   gsap.from(".mission-card, .vision-card", {
//     scrollTrigger: {
//       trigger: ".mission-vision-grid",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     y: 50,
//     duration: 0.8,
//     ease: "power2.out",
//     stagger: 0.3,
//   })

//   // Values cards animation
//   gsap.from(".value-card", {
//     scrollTrigger: {
//       trigger: ".values-grid",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     y: 40,
//     duration: 0.6,
//     ease: "power2.out",
//     stagger: 0.2,
//   })

//   // Team members animation
//   gsap.from(".team-member", {
//     scrollTrigger: {
//       trigger: ".team-grid",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     y: 50,
//     duration: 0.8,
//     ease: "power2.out",
//     stagger: 0.2,
//   })

//   // Impact section animation
//   gsap.from(".impact-text", {
//     scrollTrigger: {
//       trigger: ".impact-content",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     x: -50,
//     duration: 1,
//     ease: "power2.out",
//   })

//   gsap.from(".impact-visual", {
//     scrollTrigger: {
//       trigger: ".impact-content",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     x: 50,
//     duration: 1,
//     ease: "power2.out",
//     delay: 0.3,
//   })

//   // CTA section animation
//   gsap.from(".cta-content", {
//     scrollTrigger: {
//       trigger: ".about-cta",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//     opacity: 0,
//     y: 30,
//     duration: 0.8,
//     ease: "power2.out",
//   })
// }

// // Initialize chart animation
// function initializeChartAnimation() {
//   const chartBars = document.querySelectorAll(".chart-bar")

//   chartBars.forEach((bar) => {
//     gsap.from(bar, {
//       scrollTrigger: {
//         trigger: ".impact-chart",
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//       "--bar-height": "0%",
//       duration: 1.5,
//       ease: "power2.out",
//       delay: 0.5,
//     })
//   })
// }

// // Initialize counter animations
// function initializeCounterAnimations() {
//   // Banner stats counters
//   const bannerStats = document.querySelectorAll(".stat-number")
//   bannerStats.forEach((stat) => {
//     const finalValue = stat.textContent
//     const numericValue = Number.parseInt(finalValue.replace(/[^\d]/g, ""))

//     gsap.from(stat, {
//       textContent: 0,
//       duration: 2,
//       ease: "power2.out",
//       delay: 1.2,
//       snap: { textContent: 1 },
//       onUpdate: function () {
//         const currentValue = Math.floor(this.targets()[0].textContent)
//         if (finalValue.includes("K")) {
//           stat.textContent = currentValue + "K+"
//         } else if (finalValue.includes("%")) {
//           stat.textContent = currentValue + "%"
//         } else {
//           stat.textContent = currentValue.toLocaleString()
//         }
//       },
//     })
//   })

//   // Impact highlights counters
//   const impactNumbers = document.querySelectorAll(".highlight-item h4")
//   impactNumbers.forEach((number) => {
//     gsap.from(number, {
//       scrollTrigger: {
//         trigger: ".impact-highlights",
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//       textContent: 0,
//       duration: 2,
//       ease: "power2.out",
//       snap: { textContent: 1 },
//       onUpdate: function () {
//         const currentValue = Math.floor(this.targets()[0].textContent)
//         number.textContent = currentValue.toLocaleString() + "+"
//       },
//     })
//   })

//   // Chart values animation
//   const chartValues = document.querySelectorAll(".bar-value")
//   chartValues.forEach((value) => {
//     const finalValue = Number.parseInt(value.textContent.replace("%", ""))

//     gsap.from(value, {
//       scrollTrigger: {
//         trigger: ".impact-chart",
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//       textContent: 0,
//       duration: 1.5,
//       ease: "power2.out",
//       delay: 1,
//       snap: { textContent: 1 },
//       onUpdate: function () {
//         const currentValue = Math.floor(this.targets()[0].textContent)
//         value.textContent = currentValue + "%"
//       },
//     })
//   })
// }

// // Parallax effect for banner
// function initializeParallax() {
//   gsap.to(".banner-background", {
//     scrollTrigger: {
//       trigger: ".about-banner",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//     },
//     y: "50%",
//     ease: "none",
//   })
// }

// // Initialize parallax on larger screens
// if (window.innerWidth > 768) {
//   initializeParallax()
// }

// // Smooth scroll for internal links
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault()
//     const target = document.querySelector(this.getAttribute("href"))
//     if (target) {
//       gsap.to(window, {
//         duration: 1,
//         scrollTo: target,
//         ease: "power2.inOut",
//       })
//     }
//   })
// })

// // Add hover effects for team members
// document.querySelectorAll(".team-member").forEach((member) => {
//   member.addEventListener("mouseenter", () => {
//     gsap.to(member.querySelector(".member-image img"), {
//       scale: 1.1,
//       duration: 0.3,
//       ease: "power2.out",
//     })
//   })

//   member.addEventListener("mouseleave", () => {
//     gsap.to(member.querySelector(".member-image img"), {
//       scale: 1,
//       duration: 0.3,
//       ease: "power2.out",
//     })
//   })
// })

// // Add intersection observer for additional animations
// const observerOptions = {
//   threshold: 0.1,
//   rootMargin: "0px 0px -50px 0px",
// }

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("animated")
//     }
//   })
// }, observerOptions)

// // Observe elements for animation
// document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//   observer.observe(el)
// })

// // Add loading animation for images
// document.querySelectorAll("img").forEach((img) => {
//   img.addEventListener("load", () => {
//     gsap.from(img, {
//       opacity: 0,
//       scale: 1.1,
//       duration: 0.6,
//       ease: "power2.out",
//     })
//   })
// })

// // Handle window resize for responsive animations
// window.addEventListener("resize", () => {
//   ScrollTrigger.refresh()
// })
