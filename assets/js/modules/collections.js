const collections = document.querySelectorAll('[data-carousel="collection"]')
const collectionData = []


const preventDefault = event => {
    event.preventDefault()
}

const translateSlide = (position) => {
    state.lastTranslatePosition = position
    carouselList.style.transform = `translateX(${position}px)`
}

const getCenterPosition = (slideIndex) => {
    const item = carouselItems[state.currentItemIndex]
    const itemWidth = item.offsetWidth
    const bodyWidth = document.body.clientWidth
    const margin = bodyWidth - (itemWidth * 5)
}

const onMouseDown = (event, index) => {
    const item = event.currentTarget
    state.currentItemIndex = index
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition
    state.mouseDownPosition = event.clientX
    item.addEventListener('mousemove', onMouseMove)
}

const onMouseMove = (event) => {
    state.movement = event.clientX - state.mouseDownPosition
    const position = event.clientX - state.currentSlidePosition
    translateSlide(position)
}

const onMouseUp = (event) => {
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)    
}

const onMouseLeave = (event) => {
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)    
}

const insertCollectionData = (collection) => {
    collectionData.push({
        carouselList: collection.querySelector('[data-carousel="list"]'),
        carouselItems: collection.querySelectorAll('[data-carousel="item"]'),
        btnPrevious: collection.querySelectorAll('[data-carousel="btn-previous"]'),
        btnNext: collection.querySelectorAll('[data-carousel="btn-next"]'),
    
        state: {
        mouseDownPosition: 0,
        movement: 0,
        lastTranslatePosition: 0,
        currentSlidePosition: 0,
        currentItemIndex: 0,
        currentSlideIndex: 0
    }
    })
}

const setListeners = (collectionIndex) => {
    const data = collectionData[collectionIndex]
    data.carouselItems.forEach((item, index) => {
        const link = item.querySelector('.movie-carousel-link')
        link.addEventListener('click', preventDefault)
        item.addEventListener('dragstart', preventDefault)
        item.addEventListener('mousedown', (event) => {
            onMouseDown(event, index)
        })
        item.addEventListener('mouseup', onMouseUp)
        item.addEventListener('mouseleave', onMouseLeave)
        

    })
}


const init = ()=>{
    collections.forEach((collection, collectionIndex) => {
        insertCollectionData(collection)
        setListeners(collectionIndex)
    })
    setListeners()
}

export default{
    init
}