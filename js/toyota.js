const navLinks = document.querySelectorAll('.sidebar-nav a');
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
    const active = document.querySelector(`.sidebar-nav a[href="#${topmost.id}"]`);
    if (active) active.classList.add('active');
  }
}, {
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
});

sections.forEach(section => observer.observe(section));
