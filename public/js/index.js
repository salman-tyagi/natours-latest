import '@babel/polyfill';
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';
import { bookTour } from './stripe.js';

// DOM elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUserData = document.querySelector('.form-user-data');
const updatePasswordData = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (updateUserData)
  updateUserData.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (updatePasswordData)
  updatePasswordData.addEventListener('submit', async e => {
    e.preventDefault();

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { currentPassword, password, passwordConfirm },
      'password'
    );
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;

    bookTour(tourId);
  });
