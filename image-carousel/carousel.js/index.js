const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const pause = document.querySelector('#pause');
let auto = true;
const intervalTime = 4000;
let slideInterval;

//next button
const nextSlide = () => {
  const current = document.querySelector('.current');
  current.classList.remove('current');
  if(current.nextElementSibling) {
    current.nextElementSibling.classList.add('current');
  } else {
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

//prev button
const prevSlide = () => {
  const current = document.querySelector('.current');
  current.classList.remove('current');
  if(current.previousElementSibling) {
    current.previousElementSibling.classList.add('current');
  } else {
    slides[slides.length - 1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

//pause button
const pressPause = () => {
  pause.innerText = "\u25B6";//play icon
  auto = false;
  clearInterval(slideInterval);
};

//play button
const pressPlay = () => {
  pause.innerText = "\u23F8";//pause icon
  auto = true;
  slideInterval = setInterval(nextSlide, intervalTime);
};

//button events
next.addEventListener('click', e => {
  nextSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  };
});

prev.addEventListener('click', e => {
  prevSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  };
});

pause.addEventListener('click', e => {
  auto ? pressPause() : pressPlay();
});

//auto slideshow
if(auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
};

//keyboard navigation
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37://left arrow
      prevSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  };
      break;
    case 39://right arrow
      nextSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  };
      break;
    case 32://space bar
  auto ? pressPause() : pressPlay();
  };
};