const inputUsername = document.getElementById('inputUsername')
const inputPassword = document.getElementById('inputPassword')

const inputUsernameRegis = document.getElementById('inputUsernameRegis')
const inputPasswordRegis = document.getElementById('inputPasswordRegis')
const inputEmailRegis = document.getElementById('inputEmailRegis')
const inputRepasswordRegis = document.getElementById('inputRepasswordRegis')
const inputAgeRegis = document.getElementById('inputAgeRegis')
const inputPolicy = document.getElementById('policy')

const buttonSubmit = document.getElementById('submit')
const buttonRegis = document.getElementById('submit-register')

const divError = document.getElementById('divError')
const divErrorRegis = document.getElementById('divErrorRegis')

function gantiLogin() {
    document.querySelector('.container-login').style.display = 'flex'
    document.querySelector('.container-register').style.display = 'none'
    divErrorRegis.innerHTML = ''
}

function gantiRegister() {
    document.querySelector('.container-login').style.display = 'none'
    document.querySelector('.container-register').style.display = 'flex'
    divError.innerHTML = ''
}

buttonSubmit.addEventListener('click', (event) => {
    event.preventDefault()

    let errorText = ''

    if (inputUsername.value == '') {
        errorText = 'Enter the correct username or password'
    } else if (inputPassword.value.length < 8) {
        errorText = 'Enter the correct username or password'
    }

    if (errorText == '') location.href = '../Homepage/Index.html'

    divError.innerHTML = errorText
})

buttonRegis.addEventListener('click', (event) => {
    event.preventDefault()

    let errorText = ''

    if (inputUsernameRegis.value == '') {
        errorText = 'Enter the correct username'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmailRegis.value)) {
        errorText = 'Enter a valid email address'
    } else if (inputAgeRegis.value == '') {
        errorText = 'Enter your age'
    } else if (Number(inputAgeRegis.value) < 12) {
        errorText = 'Should be 12 or older'
    } else if (inputPasswordRegis.value.length < 8) {
        errorText = 'Enter the correct password'
    } else if (inputRepasswordRegis.value != inputPasswordRegis.value) {
        errorText = "Password doesn't match"
    } else if (inputPolicy.checked != true) {
        errorText = 'Accept the terms and conditions'
    }

    if (errorText == '') location.href = '../Homepage/Index.html'

    divErrorRegis.innerHTML = errorText
})

document.querySelectorAll('.container-login input, .container-register input').forEach((el) => {
    el.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return
        if (el.closest('.container-login')) buttonSubmit.click()
        else buttonRegis.click()
    })
})
