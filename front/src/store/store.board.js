
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
			name : '',
			words : [],
			game : {
				display : 0,
				win : 0,
			},
		}
	},
	getters: {

		get_action : function( state ){
			return state.action.url;
		},
		get_board : function( state ){
			return state;
		},
		get_words : function( state ){
			return state.data.words;
		},
		get_display : function( state ){
			return state.data.game.display;
		},
	},
	mutations: {

		action : function( state, input ){
			state.action.url = input;
		},
		board : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}
			if( input.data !== undefined ){
				state.data.name = input.data.name;
				state.data.words = input.data.words;
				state.data.game = input.data.game;
			}
		},	

	},
	actions: {

		set_action : function( context, input ){
			context.commit('action', input );
		},
		set_board : function( context, input ){
			context.commit('board', input );
		},
		exit : function( context ){
			context.commit('board', basic );
		},

	}
};

let basic = {
	url : '',
	data : {
		name : '',
		words : [],
		game : {
			win : 0,
			display : 0,
		},
	}
}
