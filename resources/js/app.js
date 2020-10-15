import React from 'react';
import ReactDOM from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

const root = document.getElementById('app');

if (typeof root !== 'undefined' && root !== null) {
  ReactDOM.render(
    <InertiaApp
      initialPage={JSON.parse(root.dataset.page)}
      resolveComponent={(name) => require(`./Pages/${name}`).default}
    />,
    root,
  );
}
