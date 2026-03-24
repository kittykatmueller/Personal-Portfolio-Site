(function () {
  var overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  // Skip if already seen this session
  if (sessionStorage.getItem('intro-seen')) {
    overlay.remove();
    return;
  }

  sessionStorage.setItem('intro-seen', '1');
  document.body.style.overflow = 'hidden';

  // After SVG draw (10s) + short pause, fade out
  setTimeout(function () {
    overlay.style.transition = 'opacity 1s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.remove();
      document.body.style.overflow = '';
    }, 1000);
  }, 6800);
})();
