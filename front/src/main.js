import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'


import request from './helpers/request.js';

Vue.config.productionTip = true


Vue.use( request );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

