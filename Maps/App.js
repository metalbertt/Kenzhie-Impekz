const carouselSlide = document.querySelector('.carousel-slide')
const carouselImg = document.querySelectorAll('.carousel-slide-img')

const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')

let counter = 1
let size = carouselImg[0].clientWidth

function setCarouselPosition(animate) {
    carouselSlide.style.transition = animate ? 'transform 0.4s ease-in-out' : 'none'
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
}

setCarouselPosition(false)

nextBtn.addEventListener('click', () => {
    if (counter >= carouselImg.length - 1) return
    counter++
    setCarouselPosition(true)
})

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return
    counter--
    setCarouselPosition(true)
})

carouselSlide.addEventListener('transitionend', (event) => {
    if (event.target !== carouselSlide) return
    if (carouselImg[counter].id === 'lastClone') {
        counter = carouselImg.length - 2
        setCarouselPosition(false)
    }
    if (carouselImg[counter].id === 'firstClone') {
        counter = 1
        setCarouselPosition(false)
    }
})

window.addEventListener('resize', () => {
    size = carouselImg[0].clientWidth
    if (carouselImg[counter].id === 'lastClone') counter = carouselImg.length - 2
    if (carouselImg[counter].id === 'firstClone') counter = 1
    setCarouselPosition(false)
})

const snapSections = [
    document.querySelector('#carousel'),
    document.querySelector('#mondstatMore'),
    document.querySelector('#liyueMore'),
    document.querySelector('#inazumaMore'),
    document.querySelector('#sumeruMore')
]

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const wrap = entry.target.querySelector('.more-wrap')
            wrap.style.opacity = ''
            wrap.classList.add('fadeinLeft')
            fadeObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.25 })

snapSections.slice(1).forEach(section => {
    section.querySelector('.more-wrap').style.opacity = '0'
    fadeObserver.observe(section)
})

let snapTarget = null
let snapSetAt = 0
let snapCooldownUntil = 0

window.addEventListener('scroll', () => {
    if (snapTarget !== null && Math.abs(window.scrollY - snapTarget) < 2) {
        snapTarget = null
        snapCooldownUntil = performance.now() + 250
    }
})

window.addEventListener('wheel', (event) => {
    if (event.ctrlKey || event.deltaY === 0) return

    const positions = snapSections.map(section => section.offsetTop)
    const lastSnap = positions[positions.length - 1]

    if (window.scrollY > lastSnap + 10) return

    if (snapTarget !== null) {
        if (performance.now() - snapSetAt > 1200) {
            snapTarget = null
        } else {
            event.preventDefault()
            return
        }
    }

    if (performance.now() < snapCooldownUntil) {
        event.preventDefault()
        return
    }

    let current = 0
    for (let i = 0; i < positions.length; i++) {
        if (positions[i] <= window.scrollY + 10) current = i
    }

    let target
    if (event.deltaY > 0) {
        target = current + 1
    } else if (window.scrollY > positions[current] + 10) {
        target = current
    } else {
        target = current - 1
    }

    if (target >= positions.length) return
    if (target < 0) return
    event.preventDefault()

    snapTarget = positions[target]
    snapSetAt = performance.now()
    window.scrollTo({ top: snapTarget, behavior: 'smooth' })
}, { passive: false })

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        snapTarget = document.querySelector(link.getAttribute('href')).offsetTop
        snapSetAt = performance.now()
    })
})
