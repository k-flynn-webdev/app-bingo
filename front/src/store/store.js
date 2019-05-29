import Vue from 'vue'
import Vuex from 'vuex'

import user from './store.user.js';
// import game from './store.game.js';
import board from './store.board.js';
import instance from './store.instance.js';
// import player from './store.player.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// counter: 0,
	},
	mutations: {
		// increment : function( state, input ){
		// 	state.counter += input;
		// },
		// decrement : function( state, input ){
		// 	state.counter -= input;
		// },	
	},	
	getters : {
		// count : function( state ){
		// 	return state.counter;
		// },		
	},
	actions: {

	},
	modules : {
		user,
		board,
		instance,
		// player,
	}
})
