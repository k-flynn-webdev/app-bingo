

export default {
	namespaced: true,
	state: {
		game : {
			board : {
				url : '',
				data : {
					name : 'Play Bingo!',
					words : [],	
					game : {
						win : 0,
						display : 0,
					},				
				},
			},
			instance : {
				url : '',
				data : {
					board : '',
					players : [],
					game : {
						win : 0,
						// ahead : '',
						winner : '',
					},
				},
				polled : 0,
			},
			player : {
				url : '',
				data : {
					name : '',
					score : 0,	
					words : [],			
				},
			},
			winner : {
				url : '',
				data : {
					name : '',
					score : 0,	
					words : [],			
				},
			},			
		},
	},
	getters: {

		get_board : function( state ){
			return state.game.board;
		},

		get_instance : function( state ){
			return state.game.instance;
		},
		get_players : function( state ){
			return state.game.instance.data.players;
		},

		get_player : function( state ){
			return state.game.player;
		},	
		get_words : function( state ){
			return state.game.player.data.words;
		},		
		get_score : function( state ){
			return state.game.player.data.score;
		},		

		get_winner : function( state ){
			return state.game.winner;
		},

	},
	mutations: {

		board : function( state, input ){
			if( input.url !== undefined ){
				state.game.board.url = input.url;
			}
			if( input.data !== undefined ){
				state.game.board.data.name = input.data.name;
				state.game.board.data.game.win = input.data.game.win;
				state.game.board.data.game.display = input.data.game.display;
				state.game.board.data.words = input.data.words;
			}
		},	

		instance : function( state, input ){
			if( input.url !== undefined ){
				state.game.instance.url = input.url;
			}
			if( input.data !== undefined ){
				state.game.instance.data.board = input.data.board;
				state.game.instance.data.players = input.data.players;
				state.game.instance.data.game.win = input.data.game.win;
				// state.game.instance.data.game.ahead = input.data.game.ahead;
				state.game.instance.data.game.winner = input.data.game.winner;
			}
			if( input.polled !== undefined ){
				state.game.instance.polled = input.polled;				
			}
			if( input.winner !== undefined ){
				state.game.winner.url = input.winner.url;				
				state.game.winner.data.name = input.winner.data.name;				
				state.game.winner.data.score = input.winner.data.score;				
				state.game.winner.data.words = input.winner.data.words;				
			}
		},	

		player : function( state, input ){
			if( input.url !== undefined && input.url.length > 1 ){
				state.game.player.url = input.url;
			}
			if( input.data !== undefined ){
				if( input.data.name !== undefined && input.data.name.length > 1){
					state.game.player.data.name = input.data.name;
				}				
			}
			// if( input.method !== undefined ){
			// 	state.game.player.method = input.method;
			// }	
			if( input.joined !== undefined ){
				state.game.player.joined = input.joined;
			}					
		},	

		words : function( state, input ){
			state.game.player.data.words = input;		
		},
		score : function( state, input ){
			state.game.player.data.score = input;
		},

	},
	actions: {

		set_instance : function( context, input ){
			context.commit('instance', input );
		},		
		set_board : function( context, input ){
			context.commit('board', input );
		},
		set_player : function( context, input ){
			context.commit('player', input );
		},		

		// set_words : function( context, input ){
		// 	context.commit('words', input );
		// 	context.commit('score', input.length );
		// },	
		
		word_add : function( context, input ){
			let temp = context.getters.get_words;
			let index = word_index( input.word.add, temp);
			if( index < 0 ){
				temp.push( input.word.add );
			}
			context.commit('words', temp );
			context.commit('score', input.score );
		},		
		word_remove : function( context, input ){
			let temp = context.getters.get_words;
			let index = word_index( input.word.remove, temp);
			if( index >= 0 ){
				temp.splice( index, 1 );
			}
			context.commit('words', temp );
			context.commit('score', input.score );
		},

		score_add : function( context ){
			let temp = context.getters.get_score + 1;
			context.commit('score', temp );
		},		
		score_remove : function( context ){
			let temp = context.getters.get_score - 1;
			context.commit('score', temp );
		},	

		reset_player : function( context ){
			let self= this;
			setTimeout( function(){
				context.commit('words', [] );
				context.commit('score', 0 );
			},100);
		},
		exit : function( context ){
			context.commit('board', basic_board );
			context.commit('instance', basic_instance );
			context.commit('player', basic_player );
			context.commit('words', [] );
			context.commit('score', 0 );
		},				
	}
};


function word_index( input, array ){
	for( let i = 0; i < array.length; i++){
		if( array[i] === input ){
			return i;
		}
	} 
	return -1;
}

const basic_board = {
	url : '',
	data : {
		name : 'Play Bingo!',
		words : [],
		game : {
			display : 0,
			win : 0,
		},
	},
}

const basic_instance = {
	url : '',
	data : {
		board : '',
		players : [],
		game : {
			win : 0,
			// ahead : '',
			winner : '',
		},
		polled : 0,
	},
	winner : {
		url : '',
		data : {
			name : '',
			score : 0,	
			words : [],			
		},
	},
}

const basic_player = {
	// url : '',
	data : {
		score : 0,
		words : [],
	},
	// method : 'POST',
	joined : false,
}

