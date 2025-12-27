var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".gallerySwiper", {

  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Автовідтворення 
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Адаптивні точки 
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