(function () {
  const container = document.querySelector('.home-hero-video');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.hs-slide'));
  const dots   = Array.from(container.querySelectorAll('.hs-dot'));
  const prev   = container.querySelector('.hs-arrow--prev');
  const next   = container.querySelector('.hs-arrow--next');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  if (prev) prev.addEventListener('click', function () { goTo(current - 1); startTimer(); });
  if (next) next.addEventListener('click', function () { goTo(current + 1); startTimer(); });

  startTimer();
})();
