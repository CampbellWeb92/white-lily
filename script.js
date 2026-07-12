'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((slider) => {
    const track = slider.querySelector('.slides');
    const slides = Array.from(track?.querySelectorAll('img') || []);
    const previousButton = slider.querySelector('.prev-btn');
    const nextButton = slider.querySelector('.next-btn');

    if (!track || slides.length === 0 || !previousButton || !nextButton) {
      return;
    }

    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.setAttribute('aria-hidden', String(slideIndex !== currentSlide));
      });
    };

    previousButton.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

    slider.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
      if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
    });

    slider.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) < 45) return;
      showSlide(swipeDistance > 0 ? currentSlide + 1 : currentSlide - 1);
    }, { passive: true });

    showSlide(0);
  });
});
