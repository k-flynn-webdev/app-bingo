
export default {
	namespaced: true,
	state: {
		action : {
			url : '',
			method : 'POST',
			JSON : true,
			body : {

			},
		},
		player : {
			url : '',
			data : {
				name : '',
				score : 0,	
			},			
		},
	},
	getters: {

		get_action : function( state ){
			return state.action;
		},
		get_player : function( state ){
			return state.player;
		},

		get_url : function( state ){
			return state.player.url;
		},
		get_name : function( state ){
			return state.player.data.name;
		},
		get_score : function( state ){
			return state.player.data.score;
		},

	},
	mutations: {

		action : function( state, input ){
			state.action.url = input;
		},
		player : function( state, input ){
			if( input.url !== undefined ){
				state.player.url = input.url;
			}

			if( input.data !== undefined ){
				if( input.data.name !== undefined ){
					state.player.data.name = input.data.name;
					basic.data.name = input.data.name;
				}
				if( input.data.score !== undefined ){
					state.player.data.score = input.data.score;
				}
			}
		},

	},
	actions: {

		set_action : function( context, input ){
			context.commit('action', input );
		},
		set_player : function( context, input ){
			context.commit('player', input );
		},
		reset : function( context ){
			context.commit('player', basic );
		},

		exit : function( context ){
			context.commit('player', basic );
		},

	}
};

let basic = {
	url : '',
	data : {
		name : '',
		score : 0,
	},
};
