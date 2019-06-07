
function word_index( list, word ){
	let index = -1;

	if( word.id === undefined ){
		let tempWord = {
			word : word,
			id : word_hash( word ),
		};
		word = tempWord;
	}

	for( let i = 0; i < list.length; i++ ){
		if( list[i].id === word.id ){
			return i;
		}
	}
	return index;
}

let word_hash = function (str){
	let hash = 0;
	if (str.length == 0) return hash;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}


export default {
	namespaced: true,
	state: {
		words : [],
		game : {
			board : false,
			instance : false,
			words : false,
			joined : false,
			mode : '',
			// modes : ['', 'won', 'lost', 'playing']
			poll : 0,
		},
	},
	getters: {

		get_words : function( state ){
			return state.words;
		},

		get_game : function( state ){
			return state.game;
		},
		get_poll : function( state ){
			return state.game.poll;
		},

	},
	mutations: {

		words : function( state, input ){
			state.words = input;
			if( input.length > 0 ){
				state.game.words = true;
			}		
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


		game : function( state, input ){
			if( input.board !== undefined ){
				state.game.board = input.board;
			}
			if( input.instance !== undefined ){
				state.game.instance = input.instance;
			}
			if( input.joined !== undefined ){
				state.game.joined = input.joined;
			}

			if( input.mode !== undefined ){

				if( input.mode === '' ){
					state.game.mode = input.mode;
				} else {
					if( state.game.board &&
						state.game.instance &&
						state.game.words &&
						state.game.joined ){

						state.game.mode = input.mode;
					}
				}
			}
			if( input.poll !== undefined ){
				state.game.poll = input.poll;
			}
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

		set_game : function( context, input ){
			context.commit('game', input );
		},

		poll : function( context ){
			let temp = context.getters.get_poll + 1;
			context.commit('game', { poll : temp } );
		},

		reset : function( context ){
			context.commit('words', [] );
			context.commit('game', basic );
		},
		exit : function( context ){
			context.commit('words', [] );
			context.commit('game', basic );
		},
	}
};

let basic = {
	board : false,
	instance : false,
	words : false,
	joined : false,
	mode : '',
	poll : 0,
}

