import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/store';

import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Account from './views/Account.vue'
import Admin from './views/Admin.vue'
import AdminRequest from './views/AdminRequest.vue'

import BoardCreate from './views/Board_Create.vue'
// import BoardStart from './views/Board_Start.vue'
// import BoardJoin from './views/Board_Join.vue'
import BoardLobby from './views/Board_Lobby.vue'
import Game from './views/Game.vue'


Vue.use(Router)

const secureRoute = (to, from, next) => {

	if( to.meta.type !== 'user' && to.meta.type !== 'admin' ){
		return next();
	}

	let userDetails = Store.getters['user/get_user'];
	let isUser = userDetails.role === 'user';
	let isAdmin = userDetails.role === 'admin';

	if( to.meta.type === 'user' ){
		if( isUser || isAdmin ){
			return next();
		}
	}	

	if( to.meta.type === 'admin' ){
		if( isAdmin ){
			return next();
		}
	}

	return next({ path: '/login' });
}


export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
		},		
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/logout',
			name: 'logout',
			component: Logout,
			meta : {
				type : 'user',
			},
			beforeEnter: secureRoute,						
		},		
		{
			path: '/account',
			name: 'account',
			component: Account,
			beforeEnter: secureRoute,
			meta : {
				type : 'user',
			},
			beforeEnter: secureRoute,
		},		
		{
			path: '/admin/request',
			name: 'adminrequest',
			component: AdminRequest,
			meta : {
				type : 'user',
			},
			beforeEnter: secureRoute,						
		},			
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
			meta : {
				type : 'admin',
			},		
			beforeEnter: secureRoute,
		},	
		{
			path: '/board/create',
			name: 'board create',
			component: BoardCreate,	
		},
		{
			path: '/board/:board',
			name: 'board lobby',
			component: BoardLobby,	
		},	
		{
			path: '/instance/:instance',
			name: 'board game',
			component: Game,	
		},			
		// {
		// 	path: '/board/:board',
		// 	name: 'board view new',
		// 	component: BoardStart,	
		// },		
		// {
		// 	path: '/board/:board/:instance',
		// 	name: 'board view',
		// 	component: BoardJoin,	
		// },				
	]
});
