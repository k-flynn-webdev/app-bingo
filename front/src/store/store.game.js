

export default {
	namespaced: true,
	state: {
		words : [],		
	},
	getters: {

		get_words : function( state ){
			return state.words;
		},

	},
	mutations: {

		words : function( state, input ){
			state.words = input;		
		},

	},
	actions: {

		set_words : function( context, input ){
			context.commit('words', input );
		},
		reset : function( context ){
			context.commit('words', [] );
		},
		exit : function( context ){
			context.commit('words', [] );
		},
	}
};



