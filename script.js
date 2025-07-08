// Hamburger nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Theme toggler
const themeSwitch = document.getElementById('theme-toggle');
themeSwitch.checked = document.documentElement.getAttribute('data-theme') === 'dark';
themeSwitch.addEventListener('change', () => {
  const mode = themeSwitch.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
});

// Smooth scroll links
document.querySelectorAll('.smooth').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const thankYouMsg = form.querySelector('.form-status');

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      thankYouMsg.textContent = 'Thanks for your message! 🎉';
      form.reset();
    } else {
      const data = await res.json();
      thankYouMsg.textContent = data.error || 'Oops! There was a problem submitting.';
    }
  } catch (err) {
    thankYouMsg.textContent = 'Oops! Something went wrong.';
  }
});
