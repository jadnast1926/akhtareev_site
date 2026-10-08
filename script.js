// переключение темы (день-закат)
const themeBtn = document.getElementById('theme');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // в тёмной теме показываем луну, в светлой солнце
    themeBtn.textContent = document.body.classList.contains('dark') ? '🌙' : '☀';
});

// слайдер фото
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
const sliderImage = document.getElementById('slider-image');

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    // плавное затухание
    sliderImage.classList.add('fade');

    // ждем пока картинка станет прозрачной, меняем src, возвращаем видимость
    setTimeout(() => {
        sliderImage.src = images[currentIndex];
        sliderImage.classList.remove('fade');
    }, 400);
}

// плавный скроллчик
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// появление элементов при скролле
const animatedItems = document.querySelectorAll(
    '.photografy, .slider-frame, .memory-card, .hero-content, .gallery-header, .memory-header'
);

animatedItems.forEach(item => {
    item.style.opacity = '0';
    // используем CSS-переменную для начального сдвига
    item.style.setProperty('--anim-y', '30px');
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            item.style.opacity = '1';
            item.style.setProperty('--anim-y', '0px'); // возвращаем элементы на место
        }
    });
}, { threshold: 0.15 });

animatedItems.forEach(item => observer.observe(item));
