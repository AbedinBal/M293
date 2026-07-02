const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpans = document.querySelectorAll('#year');
const form = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');

if (toggleButton && navLinks) {
  toggleButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

yearSpans.forEach((span) => {
  span.textContent = new Date().getFullYear();
});

if (form && formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    formMessage.textContent = `Danke, ${name || 'lieber Kunde'}! Deine Nachricht wurde gespeichert.`;
    form.reset();
  });
}
