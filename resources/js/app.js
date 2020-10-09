import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import AdminUserMain from './admin/AdminUserMain';
import HomePage from './public/HomePage';
import LoginPage from './public/LoginPage';
import RegisterPage from './public/RegisterPage';
import ForgotPasswordPage from './public/ForgotPasswordPage';
import PublicSchedulePage from './public/PublicSchedulePage';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

const adminRoot = document.getElementById('admin-root');
const homeRoot = document.getElementById('home-root');
const loginRoot = document.getElementById('login-root');
const registerRoot = document.getElementById('register-root');
const forgotPasswordRoot = document.getElementById('forgot-password-root');
const publicScheduleRoot = document.getElementById('public-schedule-root');

if (typeof adminRoot !== 'undefined' && adminRoot !== null) {
  ReactDOM.render(<AdminUserMain />, adminRoot);
} else if (typeof homeRoot !== 'undefined' && homeRoot !== null) {
  ReactDOM.render(<HomePage />, homeRoot);
} else if (typeof loginRoot !== 'undefined' && loginRoot !== null) {
  ReactDOM.render(<LoginPage />, loginRoot);
} else if (typeof registerRoot !== 'undefined' && registerRoot !== null) {
  ReactDOM.render(<RegisterPage />, registerRoot);
} else if (
  typeof forgotPasswordRoot !== 'undefined' &&
  forgotPasswordRoot !== null
) {
  ReactDOM.render(<ForgotPasswordPage />, forgotPasswordRoot);
} else if (
  typeof publicScheduleRoot !== 'undefined' &&
  publicScheduleRoot !== null
) {
  ReactDOM.render(<PublicSchedulePage />, publicScheduleRoot);
}
