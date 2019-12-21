const loadMoreBtn = document.querySelector('.load-more-button');
const loadingAnimation = document.querySelector('.lds-ellipsis');
const insertingTarget = document.querySelector('.amazing-work-gallery-wrapper');
const galleryTabs = document.querySelector('.amazing-work-tabs');

const switchTab = event => {

    if (event.target.classList.contains('amazing-work-tab')) {
        if (event.target.getAttribute('data-loadMore-clicker') < 2) {
            loadMoreBtn.hidden = false;
        } else {
            loadMoreBtn.hidden = true;
        }
        let allAddedItems = document.querySelectorAll('.amazing-work-gallery-item-wrapper');
        let lastActiveTab = document.querySelector('.amazing-active-tab');
        lastActiveTab.classList.remove('amazing-active-tab');
        event.target.classList.add('amazing-active-tab');
        let activeTabCategory = +event.target.getAttribute('data-image-category');

        if (activeTabCategory === 99) {

            // allAddedItems.forEach(element => {
            //     if (element.classList.contains('hidden-item')) {
            //         element.classList.remove('hidden-item');
            //     }
            // });

            if (allAddedItems.length < 36) {
                loadMoreBtn.hidden = false;
            } else {
                loadMoreBtn.hidden = true;
            }

            for (let i = 0; i < allAddedItems.length; i++) {
                if (i < 36) {
                    if (allAddedItems[i].classList.contains('hidden-item')) {
                        allAddedItems[i].classList.remove('hidden-item');
                    }
                } else {
                    allAddedItems[i].classList.add('hidden-item');
                }
            }

        } else {
            allAddedItems.forEach(element => {

                if (+element.querySelector('img').getAttribute('data-image-category') !== activeTabCategory) {
                    element.classList.add('hidden-item');
                } else {
                    if (element.classList.contains('hidden-item')) {
                        element.classList.remove('hidden-item');
                    }
                }

            });
        }
    }
};

const setShownItems = () => {
    let shownItems = 0;
    let activeTab = document.querySelector('.amazing-active-tab');
    let activeTabCategory = +activeTab.getAttribute('data-image-category');
    let allAddedItems = document.querySelectorAll('.amazing-work-gallery-item-wrapper');
    allAddedItems.forEach(element => {
        if (+element.querySelector('img').getAttribute('data-image-category') === activeTabCategory) {
            shownItems++;
        }
    });
    console.log(`At category #${activeTabCategory} shown ${shownItems} items`);
    document.querySelector('.amazing-active-tab').setAttribute('data-shown-items', `${shownItems}`);
};

const loadMorePictures = () => {
    let activeTab = document.querySelector('.amazing-active-tab');
    let buttonPressCounter = activeTab.getAttribute('data-loadMore-clicker');
    console.log(buttonPressCounter);
    const currentActiveTab = document.querySelector('.amazing-active-tab');
    const category = +currentActiveTab.getAttribute('data-image-category');
    // const categoryLabel = currentActiveTab.innerText;
    const categoryLabels = ['Graphic Design', 'Web Design', 'Landing Pages', 'Wordpress'];
    let allAddedItems = document.querySelectorAll('.amazing-work-gallery-item-wrapper');

    let shownImageAmount = 0;

    allAddedItems.forEach(element => {
        if (!element.classList.contains('hidden-item')) {
            shownImageAmount++;
        }
    });

    if (category === 99) {
        let switcher = Math.round(shownImageAmount / 4) + 1;//switcher === 4;
        console.log(switcher);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {

                if (+document.querySelector(`.amazing-work-tab[data-image-category='${j}']`).getAttribute('data-shown-items') === 27) {
                    continue;
                }

                let imagesPathTemplate = {
                    0: `./img/graphicDesign/graphic-design${switcher}.jpg`,
                    1: `./img/webDesign/web-design${switcher}.jpg`,
                    2: `./img/landingPage/landing-page${switcher}.jpg`,
                    3: `./img/wordpress/wordpress${switcher}.jpg`
                };

                let galleryItemTemplate = `<div class="amazing-work-gallery-item-wrapper">
                <img src=${imagesPathTemplate[j]} data-image-category="${j}" alt="" class="amazing-work-gallery-image">
                <div class="amazing-work-gallery-item-hover">
                    <div class="amazing-icons-wrapper">
                        <div class="amazing-icon-inner-wrapper">
                            <i class="fa fa-link"></i>
                        </div>
                        <div class="amazing-icon-inner-wrapper">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                    <div class="amazing-text-wrapper">
                        <h2 class="amazing-text-title">creative design</h2>
                        <h2 class="amazing-text-category" data-image-category="${j}">${categoryLabels[j]}</h2>
                    </div>
                </div>
            </div>`;

                insertingTarget.insertAdjacentHTML('beforeend', galleryItemTemplate);
            }
            switcher++;
        }

    } else {
        let countingBorder = 12;

        if (27 - shownImageAmount < 12) {
            countingBorder = 27 - shownImageAmount;
        }

        let switcher = shownImageAmount + 1;
        console.log(switcher);

        for (let i = 0; i < countingBorder; i++) {
            let imagesPathTemplate = {
                0: `./img/graphicDesign/graphic-design${switcher}.jpg`,
                1: `./img/webDesign/web-design${switcher}.jpg`,
                2: `./img/landingPage/landing-page${switcher}.jpg`,
                3: `./img/wordpress/wordpress${switcher}.jpg`
            };
            let galleryItemTemplate = `<div class="amazing-work-gallery-item-wrapper">
                <img src=${imagesPathTemplate[category]} data-image-category="${category}" alt="" class="amazing-work-gallery-image">
                <div class="amazing-work-gallery-item-hover">
                    <div class="amazing-icons-wrapper">
                        <div class="amazing-icon-inner-wrapper">
                            <i class="fa fa-link"></i>
                        </div>
                        <div class="amazing-icon-inner-wrapper">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                    <div class="amazing-text-wrapper">
                        <h2 class="amazing-text-title">creative design</h2>
                        <h2 class="amazing-text-category" data-image-category="${category}">${categoryLabels[category]}</h2>
                    </div>
                </div>
            </div>`;
            insertingTarget.insertAdjacentHTML('beforeend', galleryItemTemplate);
            switcher++;
        }

        setShownItems();
    }
    buttonPressCounter++;
    activeTab.setAttribute('data-loadMore-clicker', buttonPressCounter);

    if (buttonPressCounter == 2 || document.querySelectorAll('.amazing-work-gallery-item-wrapper').length >= 36) {
        loadMoreBtn.hidden = true;
    }

};

const loadMoreDelay = () => {
    loadMoreBtn.hidden = true;
    loadingAnimation.hidden = false;
    setTimeout(() => {
        loadMoreBtn.hidden = false;
        loadingAnimation.hidden = true;
        loadMorePictures();
    }, 2000);
};

galleryTabs.addEventListener('click', switchTab);
loadMoreBtn.addEventListener('click', loadMoreDelay);

document.querySelector('.news-gallery').addEventListener('click', event=>{
    event.preventDefault();
});
;