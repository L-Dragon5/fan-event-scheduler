import React from 'react';
import ReactDOM from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import AdminUserMain from './admin/AdminUserMain';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

const adminRoot = document.getElementById('admin-root');
const publicRoot = document.getElementById('app');

if (typeof adminRoot !== 'undefined' && adminRoot !== null) {
  ReactDOM.render(<AdminUserMain />, adminRoot);
} else if (typeof publicRoot !== 'undefined' && publicRoot !== null) {
  ReactDOM.render(
    <InertiaApp
      initialPage={JSON.parse(app.dataset.page)}
      resolveComponent={(name) => require(`./Pages/${name}`).default}
    />,
    publicRoot,
  );
}
