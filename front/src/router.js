import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/store';

import Index from './views/Index.vue'
import Login from './views/Login.vue'


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
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('./views/Logout.vue'),
      meta : {
        type : 'user',
      },
      beforeEnter: secureRoute,           
    },    
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue'),    
      beforeEnter: secureRoute,
      meta : {
        type : 'user',
      },
      beforeEnter: secureRoute,
    },    
    {
      path: '/admin/request',
      name: 'adminrequest',
      component: () => import('./views/AdminRequest.vue'),      
      meta : {
        type : 'user',
      },
      beforeEnter: secureRoute,           
    },      
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      meta : {
        type : 'admin',
      },    
      beforeEnter: secureRoute,
    },  
    {
      path: '/board/create',
      name: 'board create',
      component: () => import('./views/Board_Create.vue')
    },
    {
      path: '/board/:board',
      name: 'board lobby',
      component: () => import('./views/Board_Lobby.vue')
    },  
    {
      path: '/instance/:instance',
      name: 'board game',
      component: () => import('./views/Board_Game.vue')      
    },   
  ]
});
