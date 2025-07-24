// Quiz Data and Functionality
const quizData = [
  {
    question: "What is the most important benefit of online learning?",
    answers: [
      "Lower cost than traditional education",
      "Flexibility to learn at your own pace",
      "Access to global instructors",
      "No need for physical textbooks",
    ],
    correct: 1,
    explanation:
      "Flexibility is the key advantage of online learning, allowing students to balance education with work and personal commitments.",
  },
  {
    question: "Which skill is most in-demand in today's digital job market?",
    answers: ["Traditional marketing", "Data analysis and programming", "Manual bookkeeping", "Telephone sales"],
    correct: 1,
    explanation:
      "Data analysis and programming skills are highly sought after as businesses increasingly rely on data-driven decisions and digital solutions.",
  },
  {
    question: "What percentage of Fortune 500 companies use online learning for employee training?",
    answers: ["Around 25%", "Around 50%", "Around 75%", "Over 90%"],
    correct: 3,
    explanation:
      "Over 90% of Fortune 500 companies use online learning platforms for employee development and training programs.",
  },
  {
    question: "How long does it typically take to complete a professional online course?",
    answers: ["1-2 weeks", "4-12 weeks", "6 months to 1 year", "2-3 years"],
    correct: 1,
    explanation:
      "Most professional online courses are designed to be completed in 4-12 weeks, making them perfect for skill development without long-term commitment.",
  },
  {
    question: "What is the completion rate for students who engage actively in online courses?",
    answers: ["Around 30%", "Around 50%", "Around 70%", "Around 90%"],
    correct: 2,
    explanation:
      "Students who actively participate in discussions, complete assignments, and engage with course materials have a completion rate of around 70%.",
  },
  {
    question: "Which learning method is proven to be most effective for skill retention?",
    answers: [
      "Reading textbooks only",
      "Watching video lectures only",
      "Hands-on practice with projects",
      "Taking multiple-choice tests",
    ],
    correct: 2,
    explanation:
      "Hands-on practice with real projects provides the best skill retention as it combines theory with practical application.",
  },
]

let currentQuestionIndex = 0
let userAnswers = []
let quizScore = 0
let quizStarted = false

// Initialize quiz functionality
document.addEventListener("DOMContentLoaded", () => {
  setupQuizTrigger()
  setupQuizEventListeners()
})

// Setup quiz trigger when user reaches footer
function setupQuizTrigger() {
  const footer = document.querySelector(".footer")
  const quizTrigger = createQuizTrigger()

  if (footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !quizStarted) {
            setTimeout(() => {
              showQuizTrigger()
            }, 2000) // Show trigger 2 seconds after footer is visible
          }
        })
      },
      {
        threshold: 0.3,
      },
    )

    observer.observe(footer)
  }
}

// Create floating quiz trigger button
function createQuizTrigger() {
  const trigger = document.createElement("button")
  trigger.className = "quiz-trigger"
  trigger.innerHTML = '<i class="fas fa-brain"></i>'
  trigger.onclick = startQuiz
  trigger.style.display = "none"
  trigger.title = "Take a quick knowledge quiz!"
  document.body.appendChild(trigger)
  return trigger
}

// Show quiz trigger with animation
function showQuizTrigger() {
  const trigger = document.querySelector(".quiz-trigger")
  if (trigger) {
    trigger.style.display = "flex"
    trigger.style.animation = "quizSlideIn 0.5s ease-out"
  }
}

// Setup quiz event listeners
function setupQuizEventListeners() {
  // Close quiz when clicking outside
  document.addEventListener("click", (e) => {
    const quizPopup = document.getElementById("quiz-popup")
    if (e.target === quizPopup) {
      closeQuiz()
    }
  })

  // Close quiz with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeQuiz()
    }
  })
}

// Start the quiz
function startQuiz() {
  const quizPopup = document.getElementById("quiz-popup")
  const trigger = document.querySelector(".quiz-trigger")

  // Hide trigger
  if (trigger) {
    trigger.style.display = "none"
  }

  // Reset quiz state
  currentQuestionIndex = 0
  userAnswers = []
  quizScore = 0
  quizStarted = true

  // Show quiz popup
  quizPopup.style.display = "flex"
  setTimeout(() => {
    quizPopup.classList.add("show")
  }, 10)

  // Initialize quiz
  updateTotalQuestions()
  showQuestion()
}

// Update total questions display
function updateTotalQuestions() {
  document.getElementById("total-questions").textContent = quizData.length
}

// Show current question
function showQuestion() {
  const question = quizData[currentQuestionIndex]
  const questionContainer = document.getElementById("question-container")
  const feedbackContainer = document.getElementById("quiz-feedback")

  // Hide feedback and show question
  feedbackContainer.classList.remove("show")
  questionContainer.style.display = "block"

  // Update progress
  updateProgress()

  // Update question counter
  document.getElementById("current-question").textContent = currentQuestionIndex + 1

  // Set question text
  document.getElementById("question-text").textContent = question.question

  // Create answer options
  const answersContainer = document.getElementById("answers-container")
  answersContainer.innerHTML = ""

  question.answers.forEach((answer, index) => {
    const answerElement = createAnswerElement(answer, index)
    answersContainer.appendChild(answerElement)
  })

  // Update navigation buttons
  updateNavigationButtons()

  // Add animation
  questionContainer.style.animation = "questionSlideIn 0.5s ease-out"
}

// Create answer element
function createAnswerElement(answerText, index) {
  const answerDiv = document.createElement("div")
  answerDiv.className = "answer-option"
  answerDiv.onclick = () => selectAnswer(index)

  const letterSpan = document.createElement("span")
  letterSpan.className = "answer-letter"
  letterSpan.textContent = String.fromCharCode(65 + index) // A, B, C, D

  const textSpan = document.createElement("span")
  textSpan.className = "answer-text"
  textSpan.textContent = answerText

  answerDiv.appendChild(letterSpan)
  answerDiv.appendChild(textSpan)

  return answerDiv
}

// Select an answer
function selectAnswer(selectedIndex) {
  const question = quizData[currentQuestionIndex]
  const answerOptions = document.querySelectorAll(".answer-option")

  // Disable all options
  answerOptions.forEach((option) => {
    option.style.pointerEvents = "none"
  })

  // Mark selected answer
  answerOptions[selectedIndex].classList.add("selected")

  // Show correct/incorrect feedback
  setTimeout(() => {
    answerOptions.forEach((option, index) => {
      if (index === question.correct) {
        option.classList.add("correct")
      } else if (index === selectedIndex && index !== question.correct) {
        option.classList.add("incorrect")
      }
    })

    // Store user answer
    userAnswers[currentQuestionIndex] = selectedIndex

    // Update score
    if (selectedIndex === question.correct) {
      quizScore++
    }

    // Show feedback
    setTimeout(() => {
      showFeedback(selectedIndex === question.correct)
    }, 800)
  }, 300)
}

// Show feedback for the answer
function showFeedback(isCorrect) {
  const question = quizData[currentQuestionIndex]
  const questionContainer = document.getElementById("question-container")
  const feedbackContainer = document.getElementById("quiz-feedback")
  const feedbackIcon = document.getElementById("feedback-icon")
  const feedbackText = document.getElementById("feedback-text")
  const feedbackExplanation = document.getElementById("feedback-explanation")

  // Hide question and show feedback
  questionContainer.style.display = "none"
  feedbackContainer.classList.add("show")

  // Set feedback content
  if (isCorrect) {
    feedbackIcon.innerHTML = '<i class="fas fa-check"></i>'
    feedbackIcon.className = "feedback-icon correct"
    feedbackText.textContent = "Correct!"
    feedbackText.className = "feedback-text correct"
  } else {
    feedbackIcon.innerHTML = '<i class="fas fa-times"></i>'
    feedbackIcon.className = "feedback-icon incorrect"
    feedbackText.textContent = "Incorrect"
    feedbackText.className = "feedback-text incorrect"
  }

  feedbackExplanation.textContent = question.explanation

  // Update navigation buttons
  updateNavigationButtons()
}

// Update progress bar
function updateProgress() {
  const progressFill = document.getElementById("quiz-progress")
  const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100
  progressFill.style.width = progressPercentage + "%"
}

// Update navigation buttons
function updateNavigationButtons() {
  const prevBtn = document.querySelector(".quiz-prev")
  const nextBtn = document.querySelector(".quiz-next")
  const finishBtn = document.querySelector(".quiz-finish")
  const feedbackVisible = document.getElementById("quiz-feedback").classList.contains("show")

  // Show/hide previous button
  prevBtn.style.display = currentQuestionIndex > 0 && !feedbackVisible ? "flex" : "none"

  // Show/hide next/finish buttons
  if (feedbackVisible) {
    if (currentQuestionIndex === quizData.length - 1) {
      nextBtn.style.display = "none"
      finishBtn.style.display = "flex"
    } else {
      nextBtn.style.display = "flex"
      finishBtn.style.display = "none"
    }
  } else {
    nextBtn.style.display = "none"
    finishBtn.style.display = "none"
  }
}

// Go to next question
function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++
    showQuestion()
  }
}

// Go to previous question
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    showQuestion()
  }
}

// Finish quiz and show results
function finishQuiz() {
  const questionContainer = document.getElementById("question-container")
  const feedbackContainer = document.getElementById("quiz-feedback")
  const resultsContainer = document.getElementById("quiz-results")
  const progressContainer = document.querySelector(".quiz-progress")
  const navigationContainer = document.querySelector(".quiz-navigation")

  // Hide question, feedback, progress, and navigation
  questionContainer.style.display = "none"
  feedbackContainer.classList.remove("show")
  progressContainer.style.display = "none"
  navigationContainer.style.display = "none"

  // Show results
  resultsContainer.style.display = "block"

  // Calculate and display results
  displayResults()
}

// Display quiz results
function displayResults() {
  const finalScore = document.getElementById("final-score")
  const scorePercentage = document.getElementById("score-percentage")
  const performanceMessage = document.getElementById("performance-message")

  const percentage = Math.round((quizScore / quizData.length) * 100)

  // Animate score counting
  animateScore(quizScore, quizData.length)

  finalScore.textContent = `${quizScore}/${quizData.length}`
  scorePercentage.textContent = `${percentage}%`

  // Set performance message
  let message = ""
  let messageClass = ""

  if (percentage >= 90) {
    message = "🎉 Excellent! You have a great understanding of online learning!"
    messageClass = "excellent"
  } else if (percentage >= 70) {
    message = "👍 Good job! You know quite a bit about online education."
    messageClass = "good"
  } else if (percentage >= 50) {
    message = "📚 Not bad! Consider exploring more about online learning."
    messageClass = "average"
  } else {
    message = "💪 Keep learning! Our courses can help you improve your knowledge."
    messageClass = "poor"
  }

  performanceMessage.textContent = message
  performanceMessage.className = `performance-message ${messageClass}`
}

// Animate score counting
function animateScore(score, total) {
  const scoreElement = document.getElementById("final-score")
  let currentScore = 0
  const increment = score / 20 // 20 steps

  const timer = setInterval(() => {
    currentScore += increment
    if (currentScore >= score) {
      currentScore = score
      clearInterval(timer)
    }
    scoreElement.textContent = `${Math.floor(currentScore)}/${total}`
  }, 50)
}

// Retake quiz
function retakeQuiz() {
  const resultsContainer = document.getElementById("quiz-results")
  const progressContainer = document.querySelector(".quiz-progress")
  const navigationContainer = document.querySelector(".quiz-navigation")

  // Hide results
  resultsContainer.style.display = "none"

  // Show progress and navigation
  progressContainer.style.display = "block"
  navigationContainer.style.display = "flex"

  // Reset quiz
  currentQuestionIndex = 0
  userAnswers = []
  quizScore = 0

  // Start over
  showQuestion()
}

// Close quiz
function closeQuiz() {
  const quizPopup = document.getElementById("quiz-popup")
  const trigger = document.querySelector(".quiz-trigger")

  quizPopup.classList.remove("show")

  setTimeout(() => {
    quizPopup.style.display = "none"

    // Reset quiz state
    const resultsContainer = document.getElementById("quiz-results")
    const progressContainer = document.querySelector(".quiz-progress")
    const navigationContainer = document.querySelector(".quiz-navigation")

    resultsContainer.style.display = "none"
    progressContainer.style.display = "block"
    navigationContainer.style.display = "flex"

    currentQuestionIndex = 0
    userAnswers = []
    quizScore = 0
    quizStarted = false

    // Show trigger again if user wants to retake
    if (trigger) {
      trigger.style.display = "flex"
    }
  }, 300)
}

// Add quiz styles to main CSS
function addQuizStyles() {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "quiz.css"
  document.head.appendChild(link)
}

// Initialize quiz styles
addQuizStyles()
