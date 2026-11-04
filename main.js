function initMobileNav() {
  const links = document.querySelector('.nav-links');
  if (!links) return;

  links.id = 'nav-links';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-controls', links.id);
  toggle.innerHTML = '<span></span><span></span><span></span>';
  links.before(toggle);

  const setOpen = open => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  setOpen(false);

  // Tout clic hors du bouton referme le menu, y compris sur un lien.
  document.addEventListener('click', e => {
    setOpen(toggle.contains(e.target) && !links.classList.contains('open'));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();

  const fab = document.querySelector('.cv-fab');
  if (!fab) return;

  const footer = document.querySelector('footer');
  if (footer) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const fromBottom = window.innerHeight - entry.boundingClientRect.top;
        fab.style.bottom = (fromBottom + 16) + 'px';
      } else {
        fab.style.bottom = '';
      }
    }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });
    observer.observe(footer);
  }

  let clicked = false;

  fab.addEventListener('click', e => {
    if (!clicked) {
      e.preventDefault();
      clicked = true;
      const original = fab.textContent;
      fab.removeAttribute('download');
      fab.href = 'cv.html';
      fab.textContent = 'Et si vous jetiez un coup d\'œil au portfolio avant ? 😉 Le CV est dans la page À propos !';

      setTimeout(() => {
        fab.textContent = original;
      }, 3000);
    }
  });
});
