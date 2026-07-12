document.addEventListener("DOMContentLoaded", function () {
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slides img");
    const previousButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    if (
        !slidesContainer ||
        slides.length === 0 ||
        !previousButton ||
        !nextButton
    ) {
        console.error("Gallery slider elements could not be found.");
        return;
    }

    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {
        currentSlide = index;
        slidesContainer.style.transform =
            `translateX(-${currentSlide * 100}%)`;
    }

    function showNextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function showPreviousSlide() {
        const previousIndex =
            (currentSlide - 1 + slides.length) % slides.length;

        showSlide(previousIndex);
    }

    function restartTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(showNextSlide, 4000);
    }

    nextButton.addEventListener("click", function () {
        showNextSlide();
        restartTimer();
    });

    previousButton.addEventListener("click", function () {
        showPreviousSlide();
        restartTimer();
    });

    showSlide(0);
    restartTimer();
});