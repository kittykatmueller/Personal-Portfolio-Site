const carousel = document.getElementById('home-cards');
const dotsContainer = document.getElementById('home-cards-dots');
const wrap = carousel && carousel.closest('.home-cards-wrap');

if (carousel && dotsContainer) {
  const cards = carousel.querySelectorAll('.home-card');

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'home-cards-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to card ${i + 1}`);
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.home-cards-dot');

  function update() {
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 24; // gap
    const active = Math.round(scrollLeft / cardWidth);
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8;

    dots.forEach((d, i) => d.classList.toggle('is-active', i === active));
    wrap.classList.toggle('is-end', atEnd);
  }

  carousel.addEventListener('scroll', update, { passive: true });
  update();
}
