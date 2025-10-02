const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-menu');

if (toggle && list) {
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        list.classList.toggle('open');
    });
}