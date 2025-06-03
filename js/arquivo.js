function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hideen'), 400);
    }, 3000)
}





document.addEventListener("DOMContentLoaded", () => {
    // Menu de navegação responsivo
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active")
        })
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active")
        })
    })

    // Slider de depoimentos
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    let currentIndex = 0

    function showTestimonial(index) {
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove("active")
        })

        dots.forEach((dot) => {
            dot.classList.remove("active")
        })

        testimonials[index].classList.add("active")
        dots[index].classList.add("active")
        currentIndex = index
    }

    if (dots.length > 0) {
        dots.forEach((dot) => {
            dot.addEventListener("click", function () {
                const index = Number.parseInt(this.getAttribute("data-index"))
                showTestimonial(index)
            })
        })
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
            showTestimonial(currentIndex)
        })
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % testimonials.length
            showTestimonial(currentIndex)
        })
    }


    setInterval(() => {
        if (testimonials.length > 0) {
            currentIndex = (currentIndex + 1) % testimonials.length
            showTestimonial(currentIndex)
        }
    }, 5000)


    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            showToast("Message sent successfully! We will contact you shortly.")
            contactForm.reset()
        })
    }


    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                const headerHeight = document.querySelector("header").offsetHeight
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })


    const revealElements = document.querySelectorAll(".service-card, .staff-member, .about-text")

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top

            if (elementTop < triggerBottom) {
                element.style.opacity = "1"
                element.style.transform = "translateY(0)"
            }
        })
    }


    revealElements.forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })


    window.addEventListener("load", checkScroll)

    window.addEventListener("scroll", checkScroll)
})