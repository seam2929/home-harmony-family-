const toggle = document.querySelector('.menu');
const nav = document.querySelector('.header nav');
const mobileQuery = window.matchMedia('(max-width: 800px)');

function resetSubmenus() {
  nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    dropdown.classList.remove('expanded');
    dropdown.querySelector(':scope > .nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
}

nav.querySelectorAll('.nav-dropdown > .nav-trigger').forEach(trigger => {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.addEventListener('click', event => {
    const dropdown = trigger.parentElement;
    if (!mobileQuery.matches || dropdown.classList.contains('expanded')) return;
    event.preventDefault();
    resetSubmenus();
    dropdown.classList.add('expanded');
    trigger.setAttribute('aria-expanded', 'true');
  });
});

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  toggle.textContent = open ? '×' : '☰';
  if (!open) resetSubmenus();
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (link.matches('.nav-trigger') && mobileQuery.matches) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.textContent = '☰';
  resetSubmenus();
}));

document.querySelector('#quote-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  status.textContent = 'Thanks! This is a demo form, so your request was not sent. Connect an email or form service to receive submissions.';
  status.classList.add('submitted');
  event.currentTarget.reset();
});
