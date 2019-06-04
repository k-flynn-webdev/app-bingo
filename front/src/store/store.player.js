

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
		joined : false,
		polled : 0,
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

		get_poll : function( state ){
			return state.polled;
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
			if( input.joined !== undefined ){
				state.joined = input.joined;
			}			
		},
		poll : function( state, input ){
			state.polled = input;
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
			context.commit('poll', 0 );
		},

		poll_tick : function( context ){
			let temp = context.getters.get_polled + 1;
			context.commit('poll', temp );
		},

		exit : function( context ){
			context.commit('player', basic );
			context.commit('poll', 0 );
		},
			
	}
};

let basic = {
	url : '',
	data : {
		name : 'testName',
		score : 0,					
	},
	polled : 0,
};
