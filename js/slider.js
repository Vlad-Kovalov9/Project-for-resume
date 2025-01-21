const slider = document.querySelector('.slider-items');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
let startX = 0;
let endX = 0;

function createDots() {
  const slides = slider.children;
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function updateSlider() {
  const slideWidth = slider.children[0].clientWidth;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateDots();
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : slider.children.length - 1;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < slider.children.length - 1) ? currentIndex + 1 : 0;
  updateSlider();
});

dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    currentIndex = parseInt(e.target.dataset.index, 10);
    updateSlider();
  }
});

// Додаємо підтримку свайпів
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
  const slideWidth = slider.children[0].clientWidth;
  const threshold = slideWidth * 0.2;

  if (startX - endX > threshold) {
    currentIndex = (currentIndex < slider.children.length - 1) ? currentIndex + 1 : 0;
  } else if (endX - startX > threshold) {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slider.children.length - 1;
  }

  updateSlider();
});

createDots();
updateDots();
