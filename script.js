"use-strict";
//  ************************************************//
// *** SET CURRENT YEAR ***
//**************************************************/

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//  ************************************************//
// *** SCROLL ***
//**************************************************/

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to the top:
    if (href === "#")
      window.scrollTo({
        // px of the page
        top: 0,
        behavior: "smooth",
      });
    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
    // Close mobile navigation
    // if (link.classList.contains("main-nav-link")) {
    //   headerEl.classList.toggle("nav-open");
    // }
  });
});
//  ************************************************//
// *** STICK NAVIGATION ***
//**************************************************/

const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    // calling the function it will observe the entry we passed and check if it's false. So then will apply the function

    // ent.isIntersecting === false
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    // ent.isIntersecting === true
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },

  {
    // In the viewport
    root: null,

    // 0 - out of the viewport - false
    // 1 - inside the viewport - true
    // 0 because we want to the hero section move completely out of the viewport.
    threshold: 0,

    // This margin is considered outside the root
    // It's only possible to set the value in px. -80px is the height we set in the sticky property css
    rootMargin: "-80px",
  }
);

// We can stablish any other section we call the function
obs.observe(sectionHeroEl);

//  ************************************************//
// *** SLIDER ***
//**************************************************/
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activateDot(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// Next slide:

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);

  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;

    goToSlide(slide);
    activateDot(slide);
  }
});
