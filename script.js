const themeBtn = document.getElementById('theme');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('body--dark');
    themeBtn.textContent = document.body.classList.contains('body--dark') ? '🌙' : '☀';
});

const images = [
    'images/pictures/child_camp_pic.png',
    'images/pictures/brother_pic.png',
    'images/pictures/in_train_pic.png',
    'images/pictures/saxophone_pic.png',
    'images/pictures/all_pic.png',
    'images/pictures/build_pic.png',
    'images/pictures/friend_pic.png',
    'images/pictures/instruktiv_pic.png',
    'images/pictures/phylarmony_pic.png',
    'images/pictures/sobor_pic.png',
    'images/pictures/tusa_jusa_pic.png',
    'images/pictures/wheel_pic.png'
];

let currentIndex = 0;
let isSliderAnimating = false;
const sliderImage = document.getElementById('slider-image');

function changeSlide(direction) {
    if (isSliderAnimating) return;
    isSliderAnimating = true;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    sliderImage.classList.add('slider__image--fade');

    setTimeout(() => {
        sliderImage.src = images[currentIndex];
        sliderImage.classList.remove('slider__image--fade');
        isSliderAnimating = false;
    }, 400);
}

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const animatedItems = document.querySelectorAll(
    '.photo-cards__item, .slider, .memory-card, .screen__hero, .section-header'
);

animatedItems.forEach(item => {
    item.style.opacity = '0';
    item.style.setProperty('--anim-y', '30px');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            item.style.opacity = '1';
            item.style.setProperty('--anim-y', '0px');
            observer.unobserve(item);
        }
    });
}, { threshold: 0.15 });

animatedItems.forEach(item => observer.observe(item));
