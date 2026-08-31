const navbarHTML = `
<header>
    <nav>
        <a href="../Homepage/Index.html" class="logo">
            <img src="../Shared/Images/Kenzhie-Impek.png" alt="Kenzhie Impekz logo" class="logoImg">
        </a>
        <div class="nav-right">
            <ul class="nav1">
                <li><a href="../About Us/Index.html" class="navItem">About</a></li>
                <li><a href="../Characters/Index.html" class="navItem">Characters</a></li>
                <li><a href="../Maps/Index.html" class="navItem">Maps</a></li>
            </ul>
            <a href="../Login/Index.html" class="login">Login</a>
        </div>
        <i id="menuBar" class="fa-solid fa-bars"></i>
    </nav>
    <div class="dropdown">
        <a href="../About Us/Index.html" class="navItem">About</a>
        <a href="../Characters/Index.html" class="navItem">Characters</a>
        <a href="../Maps/Index.html" class="navItem">Maps</a>
        <a href="../Login/Index.html" class="login">Login</a>
    </div>
</header>
`

document.currentScript.insertAdjacentHTML('beforebegin', navbarHTML)

const menuBar = document.querySelector('#menuBar')
const dropdownMenu = document.querySelector('.dropdown')

menuBar.addEventListener('click', () => {
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
    dropdownMenu.classList.toggle('active')
})
