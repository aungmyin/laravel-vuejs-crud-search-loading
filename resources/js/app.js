/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

import Vue from "vue"; // if this is not work add this =>  window.Vue = require('vue');
window.Vue = require('vue');

import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import Swal from 'sweetalert2';
import VueProgressBar from 'vue-progressbar';
import Form from 'vform';
import Loading from 'vue-loading-overlay';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
//for paginate
Vue.component("pagination", require("laravel-vue-pagination"));
//loading
Vue.use(Loading, {
    color: '#3490dc',
    width: '45px',
    height: '45px'
});
//vue progressbar
const options = {
    color: '#0d6efd',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }

//Vue processbar
Vue.use(VueProgressBar, options); 

/**
 * to use in all page.
 */
window.Swal = Swal;
window.Form = Form;

import App from "./app.vue";
import { routes } from "./routes";

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

const app = new Vue({
    el: "#app",
    router: router,
    render: (h) => h(App),
});
