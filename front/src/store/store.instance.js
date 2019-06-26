

export default {
	namespaced: true,
	state: {
		action : {
			url : '',
			method : 'GET',
			JSON : false,
		},
		url : '',
		data : {
			players : [],
			game : {
				win : 0,
				winner : '',
			},
		},
	},
	getters: {

		get_action : function( state ){
			return state.action;
		},
		get_instance : function( state ){
			return state;
		},
		get_players : function( state ){
			return state.data.players;
		},
	},
	mutations: {

		action : function( state, input ){
			state.action.url = input;
		},
		instance : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}
			if( input.data !== undefined ){
				state.data.players = input.data.players;
				state.data.game.win = input.data.game.win;
				state.data.game.winner = input.data.game.winner;
			}
		},
		players : function( state, input ){
			if( input.data !== undefined && 
				input.data.players !== undefined){
					state.data.players = input.data.players;
			}
		},

	},
	actions: {

		set_action : function( context, input ){
			context.commit('action', input );
		},
		set_instance : function( context, input ){
			context.commit('instance', input );
		},
		set_players : function( context, input ){
			context.commit('players', input );
		},

		exit : function( context ){
			basic.url = '';
			context.commit('instance', basic );
			context.commit('mode', '' );
		},

	}
};

let basic = {
	url : '',
	data : {
		game : {
			win : 0,
			winner : '',
		},
		players : [],
	},
};
