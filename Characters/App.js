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

const characters = [
    'Images/Character-Amber-Show.png',
    'Images/Character-Beidou-Show.png',
    'Images/Character-Dehya-Show.png',
    'Images/Character-Heizou-Show.png',
    'Images/Character-Jean-Show.png',
    'Images/Character-Nahida-Show.png',
    'Images/Character-Sara-Show.png',
    'Images/Character-Xiao-Show.png'
]

const characterName = [
    'Amber',
    'Beidou',
    'Dehya',
    'Shikanoin Heizou',
    'Jean',
    'Nahida',
    'Kujou Sara',
    'Xiao'
]

const characterDesc = [
    "A perky, straightforward girl, who is also the only Outrider of the Knights of Favonius. Her amazing mastery of the glider has made her a three-time winner of the Gliding Champion in Mondstadt. As a rising star within the Knights of Favonius, Amber is always ready for any challenging tasks.",
    'Captain of the Crux, with quite the reputation in Liyue. There are those who say she can split mountains and part the sea. Others say she draws lightning through her sword. Some say that even the mightiest of sea beasts are no match for her. For those not from Liyue, it may sound like a hearty joke, but those that have sailed with her will say—"No matter what sea beasts there may be, Beidou will be sure to split them all in two."',
    'A member of "The Eremites," a loosely-organized mercenary organization. She is brave, powerful, and enjoys an excellent reputation among mercenaries.',
    "A young prodigy detective from the Tenryou Commission. His senses are sharp and his thoughts are ingenious. No matter what unsolved case he's facing, he can get to the truth in unexpected ways.",
    "As the Acting Grand Master of the Knights, Jean has always been devoted to her duties and maintaining peace in Mondstadt. She had taken precautions long before the onset of Stormterror's assault, and she will guard Mondstadt with her life as always.",
    "Lesser Lord Kusanali dwells deep in the Sanctuary of Surasthana, and has never really been in the limelight, nor has she even been mentioned much. Her burden is heavy, but though she may experience loneliness, and though darkness is all she sees before her, she will not stop moving forward.",
    'Leader of the Tenryou Commission forces. A charismatic woman who acts as swiftly as a storm wind and always honors her word. She bears the title of "Devotee of the Divine" and has sworn her allegiance to the Raiden Shogun. The eternity that the Shogun pursues is the cause that she is willing to fight for.',
    "One of the mighty and illuminated adepti guarding Liyue, also heralded as the 'Vigilant Yaksha'. Despite his youthful appearance, tales of his exploits have been documented for millennia. He is especially fond of Wangshu Inn's Almond Tofu. This is because it tastes just like the sweet dreams he used to devour."
]

const characterList = document.querySelectorAll('.character-head')
const characterImage = document.querySelector('#character-active')
const characterTitle = document.querySelector('#char-name')
const characterDescription = document.querySelector('.character-description')
const characterExplanation = document.querySelector('.character-explanation')

characterList.forEach((character, index) => {
    character.addEventListener('click', () => {
        const characterSelected = document.querySelector('.character-highlight')
        characterSelected.classList.remove('character-highlight')
        character.classList.add('character-highlight')

        characterImage.src = characters[index]
        characterTitle.innerHTML = characterName[index]
        characterDescription.innerHTML = characterDesc[index]

        const swapTargets = [characterImage, characterExplanation]
        swapTargets.forEach(el => {
            el.classList.remove('swap-fade')
            void el.offsetWidth
            el.classList.add('swap-fade')
        })
    })
})

const regions = ['mondstat', 'liyue', 'inazuma', 'sumeru']

const regionButtons = {}
regions.forEach(region => {
    regionButtons[region] = document.querySelector('.region .' + region)
})

function resetActive() {
    characterList.forEach(character => {
        character.classList.remove('character-deactive')
    })
}

regions.forEach(region => {
    const button = regionButtons[region]

    button.addEventListener('click', () => {
        if (button.classList.contains(region + '-active')) {
            button.classList.remove(region + '-active')
            resetActive()
            return
        }

        regions.forEach(other => {
            regionButtons[other].classList.remove(other + '-active')
        })
        button.classList.add(region + '-active')

        resetActive()
        characterList.forEach(character => {
            if (!character.classList.contains(region)) {
                character.classList.add('character-deactive')
            }
        })
    })
})
