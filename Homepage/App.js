const aetherDepan = document.querySelector('#aether-depan')
const title = document.querySelector('#title')
const navbar = document.querySelector('nav')
const parallaxSection = document.querySelector('.parallax')

let parallaxTicking = false

function updateParallax() {
    const value = Math.min(window.scrollY, aetherDepan.clientHeight / 2)

    aetherDepan.style.transform = 'translateY(' + value * -0.4 + 'px)'
    title.style.transform = 'translateY(' + value * 1.15 + 'px)'

    navbar.classList.toggle('nav-solid', window.scrollY >= parallaxSection.clientHeight - navbar.clientHeight)
    parallaxTicking = false
}

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        parallaxTicking = true
        requestAnimationFrame(updateParallax)
    }
})

window.addEventListener('load', updateParallax)

updateParallax()

let slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
    showSlides(slideIndex += n)
}

function showSlides(n) {
    const slides = document.getElementsByClassName('container-3')

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }

    slides[slideIndex - 1].style.display = 'flex'
}

let slideIndexCharacter = 1
showSlidesCharacter(slideIndexCharacter)

function plusSlidesCharacter(n) {
    showSlidesCharacter(slideIndexCharacter += n)
}

function showSlidesCharacter(n) {
    const slides = document.getElementsByClassName('character-slider')

    if (n > slides.length) {
        slideIndexCharacter = 1
    }
    if (n < 1) {
        slideIndexCharacter = slides.length
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }

    slides[slideIndexCharacter - 1].style.display = 'block'
}

function revealOnScroll(selector, stagger) {
    const items = document.querySelectorAll(selector)

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible')
                revealObserver.unobserve(entry.target)
            }
        })
    }, { threshold: 0.15 })

    items.forEach((item, index) => {
        item.classList.add('reveal')
        if (stagger) {
            item.style.transitionDelay = (index % 3) * 0.12 + 's'
            item.addEventListener('transitionend', (event) => {
                if (event.target === item && item.classList.contains('reveal-visible')) {
                    item.style.transitionDelay = ''
                }
            })
        }
        revealObserver.observe(item)
    })
}

revealOnScroll('#news-updates h1, .judul-character, .weapon-tulisan, .weapon-gambar-aja')
revealOnScroll('.slide', true)
