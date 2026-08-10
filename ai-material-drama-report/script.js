const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('p');
const closeButton = dialog.querySelector('.lightbox-close');

function openLightbox(image) {
  dialogImage.src = image.currentSrc || image.src;
  dialogImage.alt = image.alt;
  dialogCaption.textContent = image.alt;
  dialog.showModal();
  closeButton.focus();
}

document.querySelectorAll('[data-lightbox]').forEach((image) => {
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `放大查看：${image.alt}`);
  image.addEventListener('click', () => openLightbox(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const navLinks = [...document.querySelectorAll('[data-nav]')];
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

navLinks.forEach((clickedLink) => {
  clickedLink.addEventListener('click', () => {
    navLinks.forEach((link) => {
      const active = link === clickedLink;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
});

let scrollTicking = false;

function updateActiveFromScroll() {
  const readingLine = window.scrollY + window.innerHeight * 0.32;
  let current = navTargets[0];
  navTargets.forEach((section) => {
    if (section.offsetTop <= readingLine) current = section;
  });
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateActiveFromScroll);
}, { passive: true });

updateActiveFromScroll();
