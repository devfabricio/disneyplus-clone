
const sliderItems = document.querySelectorAll('[data-banner="item"]')
const slider = document.querySelector('[data-banner="slider"]')
const state = {
    mouseDownPosition: 0,
    lastTranslatePosition: 0,
    currentSliderPosition: 0
}

function translateSlide(position){
    state.lastTranslatePosition = position
    slider.style.transform = `translateX(${position}px)`
}

function preventDefault(event){
    event.preventDefault()

}

function onMouseDown(event){
    const slide = event.currentTarget
    state.mouseDownPosition = event.clientX
    state.currentSliderPosition = event.clientX - state.lastTranslatePosition
    slide.addEventListener('mousemove', onMouseMove)     
}

function onMouseMove(event){
    translateSlide(event.clientX - state.currentSliderPosition)
    slider.style.transform = `translateX(${event.clientX - state.mouseDownPosition}px)`
   
        
}

function onMouseUp(event){
    const slide = event.currentTarget
    slide.removeEventListener('mousemove', onMouseMove)    
}

function onMouseLeave(event){
    const slide = event.currentTarget  
    slide.removeEventListener('mousemove', onMouseMove)  
}

function setListeners(){
    sliderItems.forEach(function (slide, index){
        const link = slide.querySelector('.banner-slider-link')
        link.addEventListener('click', preventDefault)
        link.addEventListener('click', preventDefault)
        slide.addEventListener('dragstart', preventDefault)
        slide.addEventListener('mousedown', onMouseDown)
        slide.addEventListener('mouseup', onMouseUp)
        slide.addEventListener('mouseleave', onMouseLeave)
        
    })
}
    

function init() {
   setListeners()
}

export default {
    init
}