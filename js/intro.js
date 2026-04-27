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
  });

  // Pause icon/dot CSS keyframe animations until intro is gone
  var animEls = document.querySelectorAll('.hero-icon-head, .hero-icon-shoulders, .hero-dot');
  animEls.forEach(function (el) {
    el.style.animationPlayState = 'paused';
  });

  setTimeout(function () {
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.remove();
      document.body.style.overflow = '';

      // Animate hero elements in
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          heroEls.forEach(function (el, i) {
            el.style.transition = 'opacity 0.7s ease ' + (i * 0.15) + 's, transform 0.7s ease ' + (i * 0.15) + 's';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        });
      });

      // Resume icon/dot animations (their CSS delays kick in from here)
      animEls.forEach(function (el) {
        el.style.animationPlayState = 'running';
      });
    }, 500);
  }, 4200);
})();
