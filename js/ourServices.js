const tabs = document.querySelectorAll('.tabs-title');
let prevTarget = document.querySelector('.tabs-title:first-child');
let tabsContent = document.querySelectorAll('.service-content-wrapper');
let tabsIndexCounter = 0;
let textIndexCounter = 0;

tabs.forEach(element => {
    element.setAttribute('data-tab-number', `${tabsIndexCounter}`);
    tabsIndexCounter++;
});

tabsContent.forEach(element => {
    element.setAttribute('data-text-number', `${textIndexCounter}`);
    textIndexCounter++;
});

const tabsHandler = event => {
    if (prevTarget) {
        prevTarget.classList.remove('active');
        tabsContent[prevTarget.getAttribute('data-tab-number')].classList.add('inactive');
    }

    event.target.classList.add('active');
    tabsContent[event.target.getAttribute('data-tab-number')].classList.remove('inactive');
    prevTarget = event.target;
};

document.querySelector('.our-services-tabs').addEventListener('click', tabsHandler);