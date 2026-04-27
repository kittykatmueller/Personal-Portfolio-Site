(function () {
  var overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  if (sessionStorage.getItem('intro-seen')) {
    overlay.remove();
    return;
  }

  sessionStorage.setItem('intro-seen', '1');
  document.body.style.overflow = 'hidden';

  // Hold hero elements back from animating while intro plays
  var heroEls = document.querySelectorAll('.home-heading, .home-body, .home-cta-group, .home-hero-video');
  heroEls.forEach(function (el) {
    el.removeAttribute('data-animate');
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  setTimeout(function () {
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.remove();
      document.body.style.overflow = '';
      // Stagger hero elements in after intro disappears
      heroEls.forEach(function (el, i) {
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 150);
      });
    }, 500);
  }, 5500);
})();
