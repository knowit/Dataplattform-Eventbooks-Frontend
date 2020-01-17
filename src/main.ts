import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'reflect-metadata';
import 'es6-shim';

import './config';

Vue.config.productionTip = false;
Vue.directive('visible', (el, binding) => {
  el.style.visibility = !!binding.value ? 'visible' : 'hidden';
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
