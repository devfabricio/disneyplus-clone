const sliderItems = document.querySelectorAll('[data-banner="item"]')
const slider = document.querySelector('[data-banner="slider"]')
const btnNext = document.querySelector('[data-banner="btn-next"]')
const btnPrevious= document.querySelector('[data-banner="btn-previous"]')
const btnControls = document.querySelectorAll('[data-banner="btn-control"]')
const imgTitles = document.querySelectorAll('[data-banner="img-title"]')


const state = {
    mouseDownPosition: 0,
    movimentPosition: 0,
    lastTranslatePosition: 0,
    currentSliderPosition: 0,
    currentSlideIndex: 0
}

function translateSlide(position) {
    state.lastTranslatePosition = position
    slider.style.transform = `translateX(${position}px)`
}



function getCenterPosition(index) {
    const slide = sliderItems[index]
    const margin = (document.body.clientWidth - slide.offsetWidth) / 2
    const centerPosition = margin - (slide.offsetWidth * index)
    return centerPosition
}

function fowardSlide() {
    if(state.currentSlideIndex < sliderItems.length - 1) {
        setVisibleSlide(state.currentSlideIndex + 1)
    } else {
        setVisibleSlide(state.currentSlideIndex)
    }
}

function backwardSlide() {
    if(state.currentSlideIndex > 0) {
        setVisibleSlide(state.currentSlideIndex - 1)
    } else {
        setVisibleSlide(state.currentSlideIndex)
    }
}

function animeteTransition(active) {
    if(active) {
        slider.style.transition = 'transform .3s'
    } else {
        slider.style.removeProperty('transition')
    }
}

function activeControlButton(index) {
    btnControls.forEach(function(item) {
        item.classList.remove('active')
    })
    const btnControl = btnControls[index]
    btnControl.classList.add('active')
}

function activeImageTitle(index) {
    imgTitles.forEach(function(item) {
        item.classList.remove('active')
    })
    const imgTitle = imgTitles[index]
    imgTitle.classList.add('active')
}

function setVisibleSlide(index) {
    state.currentSlideIndex = index
    const position = getCenterPosition(index)
    activeControlButton(index)
    activeImageTitle(index)
    animeteTransition(true)
    translateSlide(position)
}

function preventDefault(event) {
    event.preventDefault()
}

function onControlButtonClick(event, index) {
    setVisibleSlide(index)
}

// quando clica em cima do elemento
function onMouseDown(event, index) {
    const slide = event.currentTarget
    state.mouseDownPosition = event.clientX
    state.currentSliderPosition = event.clientX - state.lastTranslatePosition
    state.currentSlideIndex = index
    animeteTransition(false)
    slide.addEventListener('mousemove', onMouseMove)
}

// quando o mouse passa pelo elemnto
function onMouseMove(event) {
    state.movimentPosition = event.clientX - state.mouseDownPosition
    translateSlide(event.clientX - state.currentSliderPosition)
}

// quando solta o botão do mouse
function onMouseUp(event) {
    const slide = event.currentTarget
    const movementQtd = event.type.includes('touch') ? 50 : 150
    if(state.movimentPosition > movementQtd) {
        backwardSlide()
    } else if(state.movimentPosition < -movementQtd) {
        fowardSlide()
    } else {
        setVisibleSlide(state.currentSlideIndex)
    }
    slide.removeEventListener('mousemove', onMouseMove)
    
}

// quando o mouse sai de cima do elemento
function onMouseLeave(event) {
    const slide = event.currentTarget
    slide.removeEventListener('mousemove', onMouseMove)
}

function onTouchStart(event, index) {
    const slide = event.currentTarget
    slide.addEventListener('touchmove', onTouchMove)
    event.clientX = event.touches[0].clientX
    onMouseDown(event, index)
}

function onTouchMove(event) {
    event.clientX = event.touches[0].clientX
    onMouseMove(event)
}

function onTouchEnd(event) {
    const slide = event.currentTarget
    slide.removeEventListener('touchmove', onTouchMove)
    onMouseUp(event)
}

function onResizeWindown() {
    setVisibleSlide(state.currentSlideIndex)
}

function setListeners() {
    btnNext.addEventListener('click', fowardSlide)
    btnPrevious.addEventListener('click', backwardSlide)
    sliderItems.forEach(function(slide, index) {
        const link = slide.querySelector('.banner-slider__link')
        link.addEventListener('click', preventDefault)
        slide.addEventListener('dragstart', preventDefault)
        slide.addEventListener('mousedown', function(event) {
            onMouseDown(event, index)
        })
        slide.addEventListener('mouseup', onMouseUp)
        slide.addEventListener('mouseleave', onMouseLeave)
        btnControls[index].addEventListener('click', function(event) {
            onControlButtonClick(event, index)
        })
        slide.addEventListener('touchstart', function(event) {
            onTouchStart(event, index)
        })
        slide.addEventListener('touchend', onTouchEnd)
    })
    let resizeTimeOut;
    window.addEventListener('resize', function(event) {
        clearTimeout(resizeTimeOut)
        resizeTimeOut = setTimeout(function() {
            onResizeWindown()
        }, 1000)
    })
}

function init() {
    setVisibleSlide(2)
    setListeners()
}

export default {
    init
}