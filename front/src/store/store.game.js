
function word_index( list, word ){
	let index = -1;

	for( let i = 0; i < list.length; i++ ){
		if( list[i].id === word.id ){
			return i;
		}
	}
	return index;
}


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

		word_submit : function( state, input ){
			let index = word_index( state.words, input );
			state.words[index].waiting = true;
		},
		word_add : function( state, input ){
			let index = word_index( state.words, input );
			state.words[index].selected = true;
			state.words[index].waiting = false;
		},
		word_remove : function( state, input ){
			let index = word_index( state.words, input );
			state.words[index].selected = false;
			state.words[index].waiting = false;
		},

	},
	actions: {

		set_words : function( context, input ){
			context.commit('words', input );
		},

		submit_word : function( context, input ){
			context.commit('word_submit', input );
		},
		add_word : function( context, input ){
			context.commit('word_add', input );
		},
		remove_word : function( context, input ){
			context.commit('word_remove', input );
		},

		reset : function( context ){
			context.commit('words', [] );
		},
		exit : function( context ){
			context.commit('words', [] );
		},
	}
};



