
const header = document.querySelector('[data-header]')
const openNavSubmenu = document.querySelector('[data-open-navsubmenu]')
const navSubmenu = document.querySelector('[data-navsubmenu]')
const userMenu = document.querySelector('[data-usermenu]')
const openUserMenu = document.querySelector('[data-open-usermenu]')

function onWindowScroll(){
    if(window.scrollY > 20) {
        header.style.backgroundColor = '#0C0D14'
    }else {
        header.style.backgroundColor = 'transparent'
    }
}

function onTouchOpenNavSubmenu(event){
    event.preventDefault()
    navSubmenu.classList.toggle('active')
}

function onTouchOpenUserMenu(event){
    event.preventDefault()
    userMenu.classList.toggle('active')
}


function setListeners(){
    window.addEventListener('scroll', onWindowScroll)
    openNavSubmenu.addEventListener('touchstart', onTouchOpenNavSubmenu)
    openUserMenu.addEventListener('touchstart', onTouchOpenUserMenu)
}

function init(){
   setListeners()
}

export default {
    init
}