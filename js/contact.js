const overlay = document.getElementById('contact-overlay');
const closeBtn = document.getElementById('contact-close');
const emailBtn = document.getElementById('contact-email-btn');
const copiedMsg = document.getElementById('contact-copied');

document.querySelectorAll('.js-open-contact').forEach((btn) => {
  btn.addEventListener('click', () => {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

function closeOverlay() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeOverlay);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeOverlay();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});

emailBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('kmuellerservices@gmail.com').then(() => {
    copiedMsg.classList.add('is-visible');
    setTimeout(() => copiedMsg.classList.remove('is-visible'), 2000);
  });
});
