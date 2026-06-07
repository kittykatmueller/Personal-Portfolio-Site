document.querySelectorAll('.home-timeline-entry').forEach(function (entry) {
  entry.addEventListener('click', function () {
    entry.classList.toggle('is-open');
  });
});
