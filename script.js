//Мобільне меню 
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open');
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-open');
      }
    });
  });
}

{
  // Скрол для Products
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      // від 480px - 2 слайди
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // від 768px - 3 слайди
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // від 1024px (десктоп) - 4 слайди
      1024: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
    },
  });


}

{
  // Скрол для Gallery 
  var swiper = new Swiper(".gallerySwiper", {
    // Кількість слайдів для показу
    slidesPerView: 1,
    spaceBetween: 10,

    // Пагінація
    pagination: {
      el: ".gallery-swiper-pagination",
      clickable: true,
    },

    // Автовідтворення (опціонально)
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Адаптивні точки (Breakpoints)
    breakpoints: {
      // від 480px - 2 слайди
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // від 768px - 3 слайди
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // від 1024px (десктоп) - 4 слайди
      1024: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
    },
  });
}

//  ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ 
const footerForm = document.querySelector('.footer-form');

if (footerForm) {
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки

    // Отримуємо поля
    const nameInput = footerForm.querySelector('input[type="text"]');
    const phoneInput = footerForm.querySelector('input[type="tel"]');

    // Проста валідація
    let isValid = true;

    // Валідація імені 
    if (nameInput.value.trim().length < 2) {
      alert('Будь ласка, введіть коректне ім’я (мінімум 2 символи)');
      nameInput.focus();
      isValid = false;
      return;
    }

    // Валідація телефону (регулярний вираз для українських номерів)
    // Дозволяє формати: +380..., 0..., 380...
    const phoneRegex = /^\+?3?8?(0\d{9})$/;
    if (!phoneRegex.test(phoneInput.value.replace(/\s+/g, '').replace(/-/g, ''))) {
      alert('Будь ласка, введіть коректний номер телефону (наприклад, +380501234567)');
      phoneInput.focus();
      isValid = false;
      return;
    }

    if (isValid) {
      // Запит до сервера (fetch), імітуємо успіх
      console.log('Дані готові до відправки:', {
        name: nameInput.value,
        phone: phoneInput.value
      });

      // Виводимо повідомлення успіху
      alert('Дякуємо! Ми зателефонуємо вам найближчим часом.');

      // Очищаємо форму
      footerForm.reset();
    }
  });
}

// --- Логіка Слайдера Відгуків ---
const container = document.querySelector('.reviews-container');
const list = document.querySelector('.reviews-list');
const items = document.querySelectorAll('.reviews-item');
const dotsContainer = document.querySelector('.pagination-dots');
const prevBtn = document.querySelector('.scroll-btn.prev');
const nextBtn = document.querySelector('.scroll-btn.next');

if (container && items.length) {

  // Створюємо крапки
  dotsContainer.innerHTML = '';
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      const offset = items[i].offsetLeft - list.offsetLeft;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // Оновлення активної крапки при скролі
  container.addEventListener('scroll', () => {
    const scrollLeft = container.scrollLeft;
    const itemWidth = items[0].offsetWidth + 30; // ширина + gap
    const index = Math.round(scrollLeft / itemWidth);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });

  // Кнопки скролу
  const getScrollAmount = () => items[0].offsetWidth + 30;

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });
}



// --- Маска телефону (Виправлено перетин подій) ---
const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = phoneInput.value.replace(/\D/g, '');
    if (value.startsWith('380')) value = value.substring(3);
    else if (value.startsWith('0')) value = value.substring(1);

    let formatted = "+380";
    if (value.length > 0) formatted += value.substring(0, 2);
    phoneInput.value = formatted.substring(0, 19);
  });

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = "+380";
  });
}
