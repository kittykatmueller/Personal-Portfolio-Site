const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('nav-mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close when a link inside the menu is tapped
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      mobileMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
    }
  });
}
