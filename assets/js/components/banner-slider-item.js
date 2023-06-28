const BannerSliderItem = (props) => {
    return`
        <div class="banner-slider-item" data-banner="item" data-id="${props.id}">
            <a  href="/${props.slug}" class="banner-slider-link">
                <img class="banner-slider-cover" src="${props.imageCover}" alt="${props.title}"/>
                <img class="banner-slider-title" src="${props.imageTitle}" alt="${props.title}" data-banner="img-title"/>                        
            </a>
        </div>
    `
}
export default BannerSliderItem