import Vue from 'vue'
import Vuex from "vuex";
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:3000');

// Configs
Vue.config.productionTip = false
Vue.use(BootstrapVue);

Vue.use(Vuex);

import store from './store.js';

// Components
let IndexComponent = Vue.extend({
  template: '#index',
  props: ['posts'],
});

let VideosComponent = Vue.extend({
  template: '#videos',
  props: ["counter"]
});

Vue.component("index", IndexComponent);
Vue.component("videos", VideosComponent);

// Ah Vue!
new Vue({
  store, // ES6 equivalent of store: store
  render: h => h(App)
}).$mount('#app');
// vm.$store(store);