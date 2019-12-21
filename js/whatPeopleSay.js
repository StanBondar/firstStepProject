let iconsCover = document.querySelector('.icons-cover');
const icons = document.querySelectorAll('.carousel-icon');
let iconsPrevTarget = document.querySelector('.active-icon');
let iconsCoverPrevTarget = document.querySelector('.active-icon-cover');
let mainIcon = document.querySelector('.what-say-person-icon');
let description = document.querySelector('.what-people-say-description');
let name = document.querySelector('.what-say-person-name');
let position = document.querySelector('.what-say-person-position');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.previous-button');

const descriptions = ['Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.',
    'Integer dignissim, augue tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis.',
    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.'];

const names = ['Nina Petrova', 'Man with jacket', 'HASAN ALI', 'Glasses blonde'];
const positions = ['Photographer', 'Witcher', 'UX Designer', 'Accountant'];

const changeIconsHandler = event => {
    if (event.target.hasAttribute('src')) {
        if (event.target !== iconsPrevTarget) {
            event.target.classList.add('active-icon');
            event.target.parentNode.classList.add('active-icon-cover');
            iconsPrevTarget.classList.remove('active-icon');
            iconsCoverPrevTarget.classList.remove('active-icon-cover');
            iconsCoverPrevTarget = event.target.parentNode;
            iconsPrevTarget = event.target;

            $('.what-people-say-description, .what-say-person-name, .what-say-person-position, .what-say-person-icon').fadeTo(300, 0.1);
            setTimeout(() => {
                mainIcon.setAttribute('src', event.target.getAttribute('src'));
                description.innerText = descriptions[event.target.getAttribute('data-icon-number')];
                name.innerText = names[event.target.getAttribute('data-icon-number')];
                position.innerText = positions[event.target.getAttribute('data-icon-number')];
            }, 300);
            $('.what-people-say-description, .what-say-person-name, .what-say-person-position, .what-say-person-icon').fadeTo(300, 1);
        }
    }
};

const setNextIconActive = () => {
    let switcher = iconsPrevTarget.getAttribute('data-icon-number');
    iconsPrevTarget.classList.remove('active-icon');
    iconsPrevTarget.parentNode.classList.remove('active-icon-cover');
    if (+switcher < icons.length - 1) {
        switcher++;
    } else if (+switcher === icons.length - 1) {
        switcher = 0;
    }
    document.querySelector(`img[data-icon-number='${switcher}']`).classList.add('active-icon');
    iconsPrevTarget = document.querySelector(`img[data-icon-number='${switcher}']`);
    document.querySelector(`img[data-icon-number='${switcher}']`).parentNode.classList.add('active-icon-cover');
    iconsCoverPrevTarget = document.querySelector(`img[data-icon-number='${switcher}']`).parentNode;

    $('.what-people-say-description, .what-say-person-name, .what-say-person-position, .what-say-person-icon').fadeTo(300, 0.1);
    setTimeout(() => {
        mainIcon.setAttribute('src', iconsPrevTarget.getAttribute('src'));
        description.innerText = descriptions[switcher];
        name.innerText = names[switcher];
        position.innerText = positions[switcher];
    }, 300);
    $('.what-people-say-description, .what-say-person-name, .what-say-person-position, .what-say-person-icon').fadeTo(300, 1);
};

const setPreviousIconActive = () => {
    let switcher = iconsPrevTarget.getAttribute('data-icon-number');
    iconsPrevTarget.classList.remove('active-icon');
    iconsPrevTarget.parentNode.classList.remove('active-icon-cover');
    if (+switcher > 0) {
        switcher--;
    } else if (+switcher === 0) {
        switcher = icons.length - 1;
    }
    document.querySelector(`img[data-icon-number='${switcher}']`).classList.add('active-icon');
    iconsPrevTarget = document.querySelector(`img[data-icon-number='${switcher}']`);
    document.querySelector(`img[data-icon-number='${switcher}']`).parentNode.classList.add('active-icon-cover');
    iconsCoverPrevTarget = document.querySelector(`img[data-icon-number='${switcher}']`).parentNode;

    $('.what-people-say-description, .what-say-person-name, .what-say-person-position, .what-say-person-icon').fadeTo(300, 0.1);
    setTimeout(() => {
        mainIcon.setAttribute('src', iconsPrevTarget.getAttribute('src'));
        description.innerText = descriptions[switcher];
        name.innerText = names[switcher];
        position.innerText = positions[switcher];
    }, 300);
    $('.what-people-say-description, .what-say-person-name, .what-say-person-position, .what-say-person-icon').fadeTo(300, 1);
};

let nextSlidePlease = setInterval(setNextIconActive, 4000);

const restartInterval = () => {
    clearInterval(nextSlidePlease);
    nextSlidePlease = setInterval(setNextIconActive, 4000);
};

iconsCover.addEventListener('click', () => {
    changeIconsHandler(event);
    restartInterval();
});

nextButton.addEventListener('click', () => {
    setNextIconActive();
    restartInterval();
});

prevButton.addEventListener('click', () => {
    setPreviousIconActive();
    restartInterval();
});