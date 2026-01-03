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
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1.2, // Показує шматочок наступної для мобілок (інтуїтивно для свайпу)
  centeredSlides: false,
  spaceBetween: 15,
  slidesPerGroup: 1, // ГОРТАЄМО ПО ОДНІЙ КАРТЦІ
  loop: false, // Для точної кількості крапок краще вимкнути loop
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  },
});
}


// Слайдер Галерея
const gallerySwiper = new Swiper(".gallerySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".gallery-swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
});



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
const list = document.querySelector('.reviews-list');
const dotsContainer = document.querySelector('.pagination-dots');
const items = document.querySelectorAll('.reviews-item');
let currentIndex = 0;

function getItemsPerPage() {
  if (window.innerWidth >= 1280) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateSlider() {
  const itemsPerPage = getItemsPerPage();
  const itemWidth = items[0].offsetWidth + 20; // ширина + gap
  list.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

  // Оновлення активної точки
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function createPagination() {
  dotsContainer.innerHTML = '';
  const itemsPerPage = getItemsPerPage();

  // Кількість точок = Загальна кількість - (Видимі - 1)
  // Для десктопа: 6 - (3 - 1) = 4 точки.
  const dotsCount = items.length - itemsPerPage + 1;

  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
}

// Слухачі подій
window.addEventListener('resize', () => {
  currentIndex = 0; // Скидаємо при зміні екрану
  createPagination();
  updateSlider();
});

document.querySelector('.next').addEventListener('click', () => {
  const dotsCount = items.length - getItemsPerPage() + 1;
  if (currentIndex < dotsCount - 1) {
    currentIndex++;
    updateSlider();
  }
});

document.querySelector('.prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Ініціалізація
createPagination();
updateSlider();


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
