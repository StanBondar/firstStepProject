$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    "gutter": 25,
    isFitWidth: true
});

const loadMoreButton = document.querySelector('.masonry-load-more');
const loading = document.querySelector('.loading-animation');
const $galleryOfImages = $('.gallery-images-wrapper');
const galleryItems = document.querySelectorAll('.gallery-of-best-images-item');
let clickCounter = 0;

const loadMasonry = () => {
    let imageCounter = 1;
    galleryItems.forEach(element => {
        let $newElement = $(`<div class="gallery-of-best-images-item grid-item">\n` +
            `                <img src="./img/galleryOfBestImages/bestImage${imageCounter}.png" alt="terrasse" class="best-image-file">\n` +
            `                <div class="best-image-hover">\n` +
            `                    <div class="hover-best-image-icon-container"><i class="fa fa-search"></i></div>\n` +
            `                    <div class="hover-best-image-icon-container"><i class="fa fa-expand"></i></div>\n` +
            `                </div>\n` +
            `            </div>`);
        $galleryOfImages.append($newElement).masonry( 'appended', $newElement );
        imageCounter++;
    });

};

const loadMoreMasonryDelay = () => {
    clickCounter++;
    loadMoreButton.hidden = true;
    loading.hidden = false;
    setTimeout(() => {
        if(clickCounter<2) {
            loadMoreButton.hidden = false;
        }
        loading.hidden = true;
        loadMasonry();
    }, 2000);
};

loadMoreButton.addEventListener('click', loadMoreMasonryDelay);