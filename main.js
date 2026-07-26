document.addEventListener('DOMContentLoaded', () => {
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
