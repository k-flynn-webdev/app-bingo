

export default {
	namespaced: true,
	state: {
		url : '',
		data : {
			players : [],
			game : {
				win : 0,
				winner : '',
			},
		},
		polled : 0,
	},
	getters: {

		get_instance : function( state ){
			return state;
		},



		get_poll : function( state ){
			return state.polled;
		},

	},
	mutations: {

		instance : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}
			if( input.data !== undefined ){
				state.data.players = input.data.players;
				state.data.game.win = input.data.game.win;
				state.data.game.winner = input.data.game.winner;
			}
		},	
		poll : function( state, input ){
			state.polled = input;
		},

		// instance : function( state, input ){
		// 	if( input.url !== undefined ){
		// 		state.game.instance.url = input.url;
		// 	}
		// 	if( input.data !== undefined ){
		// 		state.game.instance.data.board = input.data.board;
		// 		state.game.instance.data.players = input.data.players;
		// 		state.game.instance.data.game.win = input.data.game.win;
		// 		// state.game.instance.data.game.ahead = input.data.game.ahead;
		// 		state.game.instance.data.game.winner = input.data.game.winner;
		// 	}
		// 	if( input.polled !== undefined ){
		// 		state.game.instance.polled = input.polled;				
		// 	}
		// 	if( input.winner !== undefined ){
		// 		state.game.winner.url = input.winner.url;				
		// 		state.game.winner.data.name = input.winner.data.name;				
		// 		state.game.winner.data.score = input.winner.data.score;				
		// 		state.game.winner.data.words = input.winner.data.words;				
		// 	}
		// },	

		// player : function( state, input ){
		// 	if( input.url !== undefined && input.url.length > 1 ){
		// 		state.game.player.url = input.url;
		// 	}
		// 	if( input.data !== undefined ){
		// 		if( input.data.name !== undefined && input.data.name.length > 1){
		// 			state.game.player.data.name = input.data.name;
		// 		}				
		// 	}
		// 	// if( input.method !== undefined ){
		// 	// 	state.game.player.method = input.method;
		// 	// }	
		// 	if( input.joined !== undefined ){
		// 		state.game.player.joined = input.joined;
		// 	}					
		// },	

		// words : function( state, input ){
		// 	state.game.player.data.words = input;		
		// },
		// score : function( state, input ){
		// 	state.game.player.data.score = input;
		// },

	},
	actions: {

		set_instance : function( context, input ){
			context.commit('instance', input );
			// context.commit('poll', 0 );
		},


		poll_tick : function( context ){
			let temp = context.getters.get_polled + 1;
			context.commit('poll', temp );
		},

		exit : function( context ){
			let basic = {
				url : '',
				data : {
					game : {
						win : 0,
						winner : '',
					},
					players : [],
				},
				polled : 0,
			};
			context.commit('instance', basic );
		},

		// set_board : function( context, input ){
		// 	context.commit('board', input );
		// },
		// set_player : function( context, input ){
		// 	context.commit('player', input );
		// },		

		// set_words : function( context, input ){
		// 	context.commit('words', input );
		// 	context.commit('score', input.length );
		// },	
		
		// word_add : function( context, input ){
		// 	let temp = context.getters.get_words;
		// 	let index = word_index( input.word.add, temp);
		// 	if( index < 0 ){
		// 		temp.push( input.word.add );
		// 	}
		// 	context.commit('words', temp );
		// 	context.commit('score', input.score );
		// },		
		// word_remove : function( context, input ){
		// 	let temp = context.getters.get_words;
		// 	let index = word_index( input.word.remove, temp);
		// 	if( index >= 0 ){
		// 		temp.splice( index, 1 );
		// 	}
		// 	context.commit('words', temp );
		// 	context.commit('score', input.score );
		// },




		// score_add : function( context ){
		// 	let temp = context.getters.get_score + 1;
		// 	context.commit('score', temp );
		// },		
		// score_remove : function( context ){
		// 	let temp = context.getters.get_score - 1;
		// 	context.commit('score', temp );
		// },	

		// reset_player : function( context ){
		// 	let self= this;
		// 	setTimeout( function(){
		// 		context.commit('words', [] );
		// 		context.commit('score', 0 );
		// 	},100);
		// },		


			
	}
};


