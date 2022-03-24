import UserProfile from '../components/user-profile.js'
import BannerSliderItem from '../components/banner-slider-item.js'
import ControlSliderItem from '../components/control-slider-item.js'
import Collection from '../components/collection.js'
import MovieCarouselItem from '../components/movie-carousel-item.js'
import bannerSliderModule from '../modules/banner-slider.js'
import collectionModule from '../modules/collections.js'
import headerModule from '../modules/header.js'

const Home = (data) => {
    const userProfilesElement = document.querySelector('[data-usermenu="user-profiles"]')
    const controlsSliderElement = document.querySelector('[data-banner="controls"]')
    const bannerSliderElement = document.querySelector('[data-banner="slider"]')
    const collectionsElement = document.querySelector('[data-carousel="collections"]')
    const { banners, categories, movies, userProfiles } = data

    for (const profile of userProfiles) {
        userProfilesElement.innerHTML += UserProfile(profile)
    }

    for (const banner of banners) {
        bannerSliderElement.innerHTML += BannerSliderItem(banner)
        controlsSliderElement.innerHTML += ControlSliderItem()
    }

    for (const category of categories) {
        collectionsElement.innerHTML += Collection(category)
        const collectionElement = document.querySelector(`[data-id="${category.id}"]`)
        const movieCarouselListElement = collectionElement.querySelector('[data-carousel="list"]')
        const collectionMovies = movies.filter((movie) => movie.categories.includes(category.id))
        for(const movie of collectionMovies) {
            movieCarouselListElement.innerHTML += MovieCarouselItem(movie)
        }
    }

    headerModule().init()
    bannerSliderModule().init()
    collectionModule().init()
}

export default Home