import Vue from 'vue'
import Vuex from 'vuex'

import user from './store.user.js';

import game from './store.game.js';
import board from './store.board.js';
import instance from './store.instance.js';
import player from './store.player.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {

	},
	mutations: {
	
	},	
	getters : {
		
	},
	actions: {

	},
	modules : {
		user,
		game,
		board,
		instance,
		player,
	}
})
