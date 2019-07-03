
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

let check_ready = function( state ){

	if(	state.game.board &&
		state.game.instance &&
		state.game.words &&
		state.game.joined &&
		state.game.mode === game_modes[0] &&
		state.game.result === game_result[0] ){
			state.game.mode = game_modes[1];
			return true;
	} else {
		state.game.mode = game_modes[0];
		return false;		
	}
}


let game_modes = [ '', 'playing' ];
let game_result = [ '', 'won', 'lost' ];

export default {
	namespaced: true,
	state: {
		words : [],
		game : {
			board : false,
			instance : false,
			words : false,
			joined : false,
			mode : game_modes[0],
			result : game_result[0],
			winner : {
				url : '',
				data : {
					score : 0,
					name : '',
				},
			},
		},
	},
	
	getters: {

		get_words : function( state ){
			return state.words;
		},

		get_game : function( state ){
			return state.game;
		},
		get_winner : function( state ){
			return state.game.winner;
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

			let pre = state.game.mode;
			if( state.game.mode !== game_modes[1] ){
				let isReady = check_ready( state );
				if( isReady ){
					// console.log('setting to play mode.');
				}
			}

			if( input.result !== undefined &&
				input.result !== '' ){
					state.game.mode = game_modes[0];
					state.game.result = input.result;
					// console.log( 'game is ' + input.result );

					if( input.winner !== undefined ){
						state.game.winner.url = input.winner.url;
						state.game.winner.data.name = input.winner.data.name;
						state.game.winner.data.score = input.winner.data.score;
					}
			}

		},

		exit : function( state, input ){
			state.words = [];
			state.game.board = false;
			state.game.instance = false;
			state.game.words = false;
			state.game.joined = false;
			state.game.mode = game_modes[0];
			state.game.result = game_result[0];
			state.game.winner.url = '';
			state.game.winner.data.name = '';
			state.game.winner.data.score = 0;
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

		exit : function( context ){
			context.commit('exit' );
		},
	}
};

let basic = {
	words : [],
	game : {
		board : false,
		instance : false,
		words : false,
		joined : false,
		mode : game_modes[0],
		result : game_result[0],
		winner : {
			url : '',
			data : {
				score : 0,
				name : '',
			},
		},
	},
}

