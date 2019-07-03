
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
		}
	},
	getters: {
		get_action : function( state ){
			return state.action;
		},
		get_board : function( state ){
			return state;
		},
		get_words : function( state ){
			return state.data.words;
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
		board : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}

			if( input.data !== undefined ){

				if( input.data.name !== undefined ){
					state.data.name = input.data.name;
				}
				if( input.data.words !== undefined ){
					state.data.words = input.data.words;
				}
				
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
			context.commit('action', basic.action );
			context.commit('board', basic );
		},

	}
};


let basic = {
	action : {
		url : '',
		method : 'GET',
		JSON : false,
	},
	url : '',
	data : {
		name : '',
		words : [],
	}
}
