const header = document.querySelector('[data-header]')
const openNavSubmenu = document.querySelector('[data-open-navsubmenu]')
const navSubmenu = document.querySelector("[data-navsubmenu]")
const openUsermenu = document.querySelector("[data-open-usermenu]")
const usermenu = document.querySelector("[data-usermenu]")



function onWindowScroll() {
    if(window.scrollY > 20) {
        header.style.backgroundColor = '#0c0d14'
    } else {
        header.style.backgroundColor = 'transparent'
    }
}

function ontouchOpenNavSubmenu(event){
    event.preventDefault()
    navSubmenu.classList.toggle('active')
}

function ontouchOpenUsermenu(event){
    event.preventDefault()
    usermenu.classList.toggle('active')
}

function setListerners(){
    window.addEventListener('scroll', onWindowScroll)
    openNavSubmenu.addEventListener('touchstart', ontouchOpenNavSubmenu )
    openUsermenu.addEventListener('touchstart', ontouchOpenUsermenu )
    
}

function init() {
    setListerners()
}

export default {
    init
}