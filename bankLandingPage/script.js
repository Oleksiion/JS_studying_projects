'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(item => item.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* document.querySelectorAll('.nav__link').forEach(item =>
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
); */

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `hello <button class="btn btn--close-cookie">Got it</button>`;
// header.prepend(message);
//header.append(message);

//console.log(Number.parseFloat('120,1300px', 10));

//console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log(window.scrollY);
  window.scrollTo({
    left: s1coords.left,
    top: s1coords.top + scrollY,
    behavior: 'smooth',
  });

  s1coords.scrollIntoView();
});

// TABS
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
console.log(tabsContent);

//tabs.forEach(tab => tab.addEventListener('click', () => console.log('tab')));

tabsContainer.addEventListener('click', function (e) {
  //const clickedBtn = e.target.parentElement;
  const clickedBtn = e.target.closest('.operations__tab');

  //activate tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  if (!clickedBtn) return;
  clickedBtn.classList.add('operations__tab--active');

  //activate content
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
    .classList.add('operations__content--active');
});

//STICKY navigation
const nav = document.querySelector('.nav');
const sec1Position = section1.getBoundingClientRect();

//console.log(sec1Position);
/* window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > sec1Position.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}); */

// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

//CALLBACK
const stickyNav = function (entries, observer) {
  entries.forEach(function (entry) {
    console.log(entry);
    console.log(entries);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
  /* const [entry] = entries;
  console.log(entry);
  console.log(entries); */

  // Each entry describes an intersection change for one observed
  // target element:
  //   entry.boundingClientRect
  //   entry.intersectionRatio
  //   entry.intersectionRect
  //   + entry.isIntersecting
  //   entry.rootBounds
  //   +entry.target
  //   entry.time
  //
  /*   if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
 */
};

//OPTIONS
const obsOptions = {
  root: null,
  threshold: 0,
  //rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);

//headerObserver.observe(header);

// Sticky navigation: Intersection Observer API

/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions1 = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions1);
observer.observe(section1); */

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

slider.style.transform = 'translateX(-800px)';
slider.style.overflow = 'visible';

console.log(slides);

// 0% 100% 200% 300%

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

let curSlide = 0;
let maxSlide = slides.length;

btnRight.addEventListener('click', function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
});

btnLeft.addEventListener('click', function () {
  curSlide--;

  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
});
//
// -100 % 0% 100% 200% 300%
