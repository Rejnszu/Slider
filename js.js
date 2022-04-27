// SLIDER
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let sliderOffsetX = 100;
let sliderWidth = 100;
let sliderMovetime = 9000;
let currentSlideOrder = 0;

function initialSlidesPosition() {
  slides.forEach(function (slide, i) {
    slide.style.transform = "translateX(" + sliderOffsetX * i + "%" + ")";
    slide.style.width = sliderWidth + "%";
    setInterval(() => (slide.style.opacity = "1"), 1500 * i);
  });
}
initialSlidesPosition();

function slideTranslateX() {
  slides.forEach(function (slide, i) {
    slide.style.transform =
      "translateX(" + -sliderOffsetX * (-i + currentSlideOrder) + "%" + ")";
  });
}
function dotsActive() {
  dots.forEach((dotActive) => dotActive.classList.remove("active"));
  dots[currentSlideOrder].classList.add("active");
}
function previousSlide() {
  currentSlideOrder -= 1;
  if (currentSlideOrder < 0) {
    currentSlideOrder = slides.length - 1;
  }
  dotsActive();
  slideTranslateX();
}
function nextSlide() {
  currentSlideOrder += 1;
  if (currentSlideOrder >= slides.length) {
    currentSlideOrder = 0;
  }
  dotsActive();
  slideTranslateX();
}

function moveSlides() {
  prev.addEventListener("click", function () {
    previousSlide();
    resetInterval();
  });
  document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowLeft") {
      previousSlide();
      resetInterval();
    }
  });
  next.addEventListener("click", function () {
    nextSlide();
    resetInterval();
  });
  document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowRight") {
      nextSlide();
      resetInterval();
    }
  });
  dots.forEach(function (dot, dotIndex) {
    dot.addEventListener("click", function () {
      resetInterval();
      dots.forEach((dotActive) => dotActive.classList.remove("active"));
      this.classList.add("active");
      currentSlideOrder = dotIndex;
      slideTranslateX();
    });
  });
}

moveSlides();

let slideInterval = setInterval(nextSlide, sliderMovetime);

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, sliderMovetime);
}
