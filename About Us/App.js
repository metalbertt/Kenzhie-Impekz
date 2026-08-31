const slides = document.getElementsByClassName('carousel-item')

let slideIndex = 0
showSlide()

setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length
    showSlide()
}, 5000)

function showSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }
    slides[slideIndex].style.display = 'block'
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

revealOnScroll('.infos', true)
revealOnScroll('.char')
