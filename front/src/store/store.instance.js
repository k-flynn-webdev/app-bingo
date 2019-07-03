

export default {
	namespaced: true,
	state: {
		action : {
			url : '',
			method : 'GET',
			JSON : true,
		},
		url : '',
		data : {
			players : [],
			game : {
				win : 0,
				display : 0,
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
		get_win : function( state ){
			return state.data.game.win;
		},
		get_display : function( state ){
			return state.data.game.display;
		},				
	},
	mutations: {

		action : function( state, input ){
			if( input.url !== undefined ){
				state.action.url = input.url;
			}			
			if( input.method !== undefined ){
				state.action.method = input.method;
			}
			if( input.json !== undefined ){
				state.action.json = input.json;
			}						
		},
		instance : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}
			if( input.data !== undefined ){
				state.data.players = input.data.players;
				state.data.game.win = input.data.game.win;
				state.data.game.display = input.data.game.display;
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
			context.commit('action', basic.action );
			context.commit('instance', basic );
		},

	}
};

let basic = {
	action : {
		url : '',
		method : 'GET',
		JSON : true,
	},
	url : '',
	data : {
		players : [],
		game : {
			win : 0,
			display : 0,
			winner : '',
		},
	},
};

