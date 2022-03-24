const MovieCarouselItem = (props) => {
    return `
        <li class="movie-carousel__item" data-carousel="item" data-id="${props.id}">
            <a class="movie-carousel__link" href="/${props.slug}">
                <img class="movie-carousel__cover" src="${props.imageCover}" alt="${props.title}" />
            </a>
        </li>
    `
}

export default MovieCarouselItem