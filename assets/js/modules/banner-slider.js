const sliderItems = document.querySelectorAll('[data-banner=item')
const slider = document.querySelector('[data-banner="slider"]')

const state = {
    MouseDownPosition: 0,
    movementPosition: 0,
    lastTranslatePosition: 0,
    currentSliderPosition: 0,
    currentSlideIndex: 0

}

function translateSlide(position){
    state.lastTranslatePosition = position
    slider.style.transform = `translateX(${position}px)` 
}

function getCenterPosition (index){
    const slide = sliderItems[index]
    const margin = (window.innerWidth - slide.offsetWidth) / 2
    const centerPosition = margin - (slide.offsetWidth * index)
    return centerPosition
}

function forwardSlide (){
    if (state.currentSlideIndex < sliderItems.length - 1){
        setVisibleSlide (state.currentSlideIndex + 1)
    } else {
        setVisibleSlide (state.currentSlideIndex)
    }
 
}

function backwardSlide(){
    if (state.currentSlideIndex > 0){
        setVisibleSlide (state.currentSlideIndex - 1)
    } else {
        setVisibleSlide (state.currentSlideIndex)
    }
}

function animateTransition(active){
    if(active){
            slider.style.transition = 'transform .3s'
    } else {
        slider.style.removeProperty('transition')
    }
}

function setVisibleSlide (index) {
    animateTransition(true)
    const position = getCenterPosition (index)
    translateSlide(position)
}

function preventDefault(event){
    event.preventDefault()
}

function onMouseDown (event, index) {
    const slide = event.currentTarget
    state.MouseDownPosition = event.clientX
    state.currentSliderPosition = event.clientX - state.lastTranslatePosition
    state.currentSlideIndex = index
    animateTransition(false)
    slide.addEventListener('mousemove', onMouseMove)
}

function onMouseMove (event) {
    state.movementPosition = event.clientX - state.MouseDownPosition
    translateSlide(event.clientX - state.currentSliderPosition)

}

function onMouseUp (event) {
    const slide = event.currentTarget
    if(state.movementPosition > 150) {
        backwardSlide()
    } else if (state.movementPosition < -150) {
        forwardSlide()
    } else {
        const calc = getCenterPosition (state.currentSlideIndex)
        translateSlide(calc)
    }
    slide.removeEventListener('mousemove', onMouseMove)
}

function onMouseLeave (event) {
    const slide = event.currentTarget
    slide.removeEventListener('mousemove', onMouseMove)
}

function setListerners () {
    sliderItems.forEach((slide, index) => {
    const link = slide.querySelector('.banner-slider__link')
    link.addEventListener('click', preventDefault)
    slide.addEventListener('dragstart', preventDefault)
    slide.addEventListener('mousedown', (event) => {
        onMouseDown(event, index)
    })
    slide.addEventListener('mouseup', onMouseUp)
    slide.addEventListener('mouseleave', onMouseLeave)
    })

}

function init(){
    setVisibleSlide(2)
    setListerners()
}
export default {
    init
}