
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


let game_modes = ['', 'playing' ];
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
				score : 0,
				url : '',
				name : '',
			},
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

			// let playing = false;
			if( state.game.board &&
				state.game.instance &&
				state.game.words &&
				state.game.joined &&
				state.game.mode === game_modes[0] &&
				state.game.result === game_result[0] ){	
					console.log('setting to play mode.');
					state.game.mode = game_modes[1];
					// playing = true;			
			} else {
				state.game.mode = game_modes[0];	
				state.game.mode = game_result[0];	
			}

			if( input.result !== undefined &&
				input.result !== '' ){
					state.game.result = input.result;
					console.log( 'game is ' + input.result );

					if( input.winner !== undefined ){
						state.game.winner.url = input.winner.url;
						state.game.winner.name = input.winner.name;
						state.game.winner.score = input.winner.score;
					}

			}



			// if( input.mode !== undefined && 
			// 	state.game.mode === game_modes[1] ){

			// 	console.log( 'input' );
			// 	console.log( input );

				// if( input.result === game_result[1] || input.result === game_result[2] ){
			// 		// game is won
					
					// let winType = input.result === game_result[1] ? game_result[1] : game_result[2];  
					// state.game.mode = winType;

				// }

			// }			

		},

		poll : function( state, input ){
			state.game.poll = input.poll;
		},


	},
	actions: {

		set_words : function( context, input ){
			context.commit('words', input );
			context.commit('game', {} );
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
			context.commit('poll');
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
	mode : game_modes[0],
	result : game_result[0],
	winner : {
		score : 0,
		url : '',
		name : '',
	},	
	poll : 0,
}

