
function line_index( list, line ){
	let index = -1;

	if( line.id === undefined ){
		let temp_line = {
			line : line,
			id : line_hash( line ),
		};
		line = temp_line;
	}

	for( let i = 0; i < list.length; i++ ){
		if( list[i].id === line.id ){
			return i;
		}
	}
	return index;
}

let line_hash = function (str){
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
		state.game.lines &&
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
		lines : [],
		game : {
			board : false,
			instance : false,
			lines : false,
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

		get_lines : function( state ){
			return state.lines;
		},

		get_game : function( state ){
			return state.game;
		},
		get_winner : function( state ){
			return state.game.winner;
		},

	},
	mutations: {

		lines : function( state, input ){
			state.lines = input;
			if( input.length > 0 ){
				state.game.lines = true;
			}
		},


		line_submit : function( state, input ){
			let index = line_index( state.lines, input );
			state.lines[index].waiting = true;
		},
		line_add : function( state, input ){
			let index = line_index( state.lines, input );
			state.lines[index].selected = true;
			state.lines[index].waiting = false;
		},
		line_remove : function( state, input ){
			let index = line_index( state.lines, input );
			state.lines[index].selected = false;
			state.lines[index].waiting = false;
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
			state.lines = [];
			state.game.board = false;
			state.game.instance = false;
			state.game.lines = false;
			state.game.joined = false;
			state.game.mode = game_modes[0];
			state.game.result = game_result[0];
			state.game.winner.url = '';
			state.game.winner.data.name = '';
			state.game.winner.data.score = 0;
		},


	},
	actions: {

		set_lines : function( context, input ){
			context.commit('lines', input );		
		},

		submit_line : function( context, input ){
			context.commit('line_submit', input );
		},
		add_line : function( context, input ){
			context.commit('line_add', input );
		},
		remove_line : function( context, input ){
			context.commit('line_remove', input );
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
	lines : [],
	game : {
		board : false,
		instance : false,
		lines : false,
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

