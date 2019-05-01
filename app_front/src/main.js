import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import request from './helpers/request.js';


Vue.config.productionTip = false


Vue.use( request );

// var vm = new Vue ({
// 	router,
// 	store,
// 	data : {},
// 	components: { App },
// 	template: '<App/>'
// }).$mount('#app')

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');


// var vm = new Vue ({
// 	el: '#app',
// 	router,
// 	store,
// 	data : {},
// 	components: { App },
// 	template: '<App/>'
// })