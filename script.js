// Переключение темы (БЭМ-модификатор body--dark)
const themeBtn = document.getElementById('theme');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('body--dark');
    themeBtn.textContent = document.body.classList.contains('body--dark') ? '🌙' : '☀';
});

// Слайдер фото
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
let isSliderAnimating = false; // Защита от спам-кликов
const sliderImage = document.getElementById('slider-image');

function changeSlide(direction) {
    if (isSliderAnimating) return; // Если анимация идет, клик игнорируется
    isSliderAnimating = true;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    // Используем БЭМ-класс анимации затухания
    sliderImage.classList.add('slider__image--fade');

    setTimeout(() => {
        sliderImage.src = images[currentIndex];
        sliderImage.classList.remove('slider__image--fade');
        isSliderAnimating = false; // Освобождаем слайдер для новых кликов
    }, 400);
}

// Плавный скролл по БЭМ-ссылкам nav__link
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

// Появление элементов при скролле (БЭМ-селекторы)
const animatedItems = document.querySelectorAll(
    '.photo-cards__item, .slider, .memory-card, .hero-content, .gallery-header, .memory-header'
);

// Задаем только начальное состояние. Свойства transition теперь контролирует сам CSS!
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
            observer.unobserve(item); // Фикс производительности: прекращаем слежку после появления
        }
    });
}, { threshold: 0.15 });

animatedItems.forEach(item => observer.observe(item));
