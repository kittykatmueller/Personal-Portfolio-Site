const navLinks = document.querySelectorAll('.cs-contents-link');
const sections = document.querySelectorAll('.cs-section');

// Smooth scroll on click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Highlight active section on scroll — always pick the topmost visible one
const visibleSections = new Set();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleSections.add(entry.target);
    } else {
      visibleSections.delete(entry.target);
    }
  });

  // Find the topmost section among currently visible ones
  let topmost = null;
  visibleSections.forEach(section => {
    if (!topmost || section.compareDocumentPosition(topmost) & Node.DOCUMENT_POSITION_FOLLOWING) {
      topmost = section;
    }
  });

  navLinks.forEach(link => link.classList.remove('active'));
  if (topmost) {
    const active = document.querySelector(`.cs-contents-link[href="#${topmost.id}"]`);
    if (active) active.classList.add('active');
  }
}, {
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
});

sections.forEach(section => observer.observe(section));

// ── Scroll reveal ──
const revealSelectors = [
  '.section-eyebrow',
  '.section-heading',
  '.subsection-heading',
  '.section-body',
  '.section-list',
  '.card',
  '.section-img-wrap',
  '.section-img-stack',
  '.findings-box',
  '.implication-box',
  '.note-box',
  '.sprint-weeks',
  '.img-caption',
];

const revealEls = document.querySelectorAll(revealSelectors.join(','));

revealEls.forEach((el, i) => {
  el.setAttribute('data-reveal', '');
  // stagger siblings within the same parent
  const siblings = [...el.parentElement.querySelectorAll('[data-reveal]')];
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = `${idx * 0.08}s`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}, { rootMargin: '-5% 0px -5% 0px', threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));
