import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'


import request from './helpers/request.js';
import game_cfg from '../../shared/game_cfg.js';
Vue.prototype.$game_config = game_cfg.CONFIG;

Vue.config.productionTip = true


Vue.use( request );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

