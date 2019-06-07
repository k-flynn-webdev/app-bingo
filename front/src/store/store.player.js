
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
		url : '',
		data : {
			name : 'testName',
			score : 0,	
		},
	},
	getters: {

		get_action : function( state ){
			return state.action;
		},
		get_player : function( state ){
			return state;
		},

		get_url : function( state ){
			return state.url;
		},
		get_name : function( state ){
			return state.data.name;
		},
		get_score : function( state ){
			return state.data.score;
		},

	},
	mutations: {

		action : function( state, input ){
			state.action.url = input;
		},
		player : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}
			if( input.data.name !== undefined ){
				state.data.name = input.data.name;
				basic.data.name = input.data.name;
			}
			if( input.data.score !== undefined ){
				state.data.score = input.data.score;
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
		name : 'testName',
		score : 0,
	},
};
