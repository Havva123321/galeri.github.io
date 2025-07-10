// JavaScript for Ardahan University Gallery

document.addEventListener("DOMContentLoaded", () => {
  // Gallery filtering functionality - FIXED VERSION
  const filterButtons = document.querySelectorAll("[data-filter]")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter gallery items with proper animation
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          // Show item
          setTimeout(() => {
            item.style.display = "block"
            item.classList.remove("hide")
            item.classList.add("show")
          }, index * 50)
        } else {
          // Hide item
          item.classList.remove("show")
          item.classList.add("hide")
          setTimeout(() => {
            if (item.classList.contains("hide")) {
              item.style.display = "none"
            }
          }, 300)
        }
      })
    })
  })

  // Modal functionality - FIXED VERSION
  const imageModal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")

  document.addEventListener("click", (e) => {
    const button = e.target.closest('[data-bs-toggle="modal"]')
    if (button) {
      e.preventDefault()
      const imageSrc = button.getAttribute("data-image")
      const imageTitle = button.getAttribute("data-title")

      if (modalImage && modalTitle) {
        modalImage.src = imageSrc
        modalImage.alt = imageTitle
        modalTitle.textContent = imageTitle
      }
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Image error handling - FIXED VERSION
  const images = document.querySelectorAll(".gallery-card img")
  images.forEach((img, index) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.addEventListener("error", function () {
      console.warn(`Image failed to load: ${this.src}`)
      this.src = `/placeholder.svg?height=300&width=400&text=Resim+${index + 1}`
    })
  })

  // Intersection Observer - FIXED VERSION
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "50px",
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, 100)
        imageObserver.unobserve(item)
      }
    })
  }, observerOptions)

  // Initialize intersection observer
  galleryItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    imageObserver.observe(item)
  })

  // Search functionality (if needed)
  function searchGallery(searchTerm) {
    const items = document.querySelectorAll(".gallery-item")
    const term = searchTerm.toLowerCase()

    items.forEach((item) => {
      const title = item.querySelector("h5").textContent.toLowerCase()
      const description = item.querySelector("p").textContent.toLowerCase()

      if (title.includes(term) || description.includes(term)) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
  }

  // Keyboard navigation for modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = window.bootstrap.Modal.getInstance(imageModal)
      if (modal) {
        modal.hide()
      }
    }
  })

  // Add ripple effect to buttons
  function createRipple(event) {
    const button = event.currentTarget
    const circle = document.createElement("span")
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`
    circle.classList.add("ripple")

    const ripple = button.getElementsByClassName("ripple")[0]
    if (ripple) {
      ripple.remove()
    }

    button.appendChild(circle)
  }

  // Apply ripple effect to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", createRipple)
  })

  // Initialize tooltips if Bootstrap tooltips are available
  if (typeof window.bootstrap !== "undefined" && window.bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl))
  }
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Logo error handling - FIXED VERSION
const logo = document.querySelector(".university-logo")
if (logo) {
  logo.addEventListener("error", function () {
    console.warn("Logo failed to load, using fallback")
    this.src = "/placeholder.svg?height=60&width=200&text=ARDAHAN+ÜNİVERSİTESİ"
  })
}
