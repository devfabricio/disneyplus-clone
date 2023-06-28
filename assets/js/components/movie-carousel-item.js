const MovieCarouselItem = (props) => {
    return `
        <li class="movie-carousel-item" data-carousel="item" data-id="${props.id}">
            <a class="movie-carousel-link" href="/${props.slug}">
                <img class="movie-carousel-cover" src="${props.imageCover}" alt="${props.title}" />
            </a>
        </li>
    `
}

export default MovieCarouselItem