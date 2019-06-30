const m_instance = require('../models/instance.model.js');

const status = require('../config/status_response.js');
const helpers = require('./helpers.js');
const config = require('../config/config.js');

const instance_validate = require('../controllers/instance.validate.js');

const board_func = require('../controllers/board.func.js');
const player_func = require('../controllers/player.func.js');



function clean_players( players ){
	let clean = [];
	for(let i =0;i<players.length;i++){
		clean.push( player_func.safe( players[i] ));
	}
	return clean;
}


function safe( model, all=false ){
	let temp = { 
		url : model.url, 
		data : {
			board : model.data.board, 
			players : clean_players( model.data.players ),	
			game : {
				win : model.data.game.win,
				display : model.data.game.display,
				// ahead : model.data.game.ahead,
				// winner : model.data.game.winner,
				winner : {
					win : model.data.game.winner.win,
					url :  model.data.game.winner.url,
					name :  model.data.game.winner.name,
					score :  model.data.game.winner.score,
				},
			},		
		},
	};

	// if(model.winner !== undefined ){
		// temp.winner = player_func.safe( model.winner, true);
		// temp.winner.data.name = model.winner.data.name;
		// temp.winner.data.score = model.winner.data.score;
		// temp.winner.data.words = model.winner.data.words;
	// }

	return temp;
}
exports.safe = safe;

// function safe_init( model ){
// 	let temp = { 
// 		instance : model.url,
// 		board : model.data.board,
// 	};

// 	return temp;
// }
// exports.safe_init = safe_init;

function get_var_win( word_count ){
	let temp_var = Math.floor( word_count * config.game.win );
	if( temp_var < config.game.min ){
		temp_var = word_count;
	}
	if( temp_var > config.game.max ){
		temp_var = config.game.max;
	}
	return temp_var;
}
function get_var_display( word_count ){
	let temp_var = Math.floor( word_count * config.game.display );
	if( temp_var < config.game.min ){
		temp_var = word_count;
	}
	if( temp_var > config.game.max ){
		temp_var = config.game.max;
	}
	return temp_var;
}


function create( input_board, input_url=false, next ){

	let board_obj = { url : input_board };

	board_func.board_meta( board_obj, function(error, result){

		if( error ){
			return next( error );
		}

		let win_var = get_var_win( result.words.length,  );
		let display_var = get_var_display( result.words.length );

		let newInstance = new m_instance({
			url : !input_url ? helpers.randomID(6) : input_url,
			data : {
				board : input_board,
				words : result.words,
				players : [],
				game : {
					win : win_var,
					display : display_var,
				},
			},
		});

		console.log( newInstance );

		board_func.board_is_played( board_obj );

		return next(null, newInstance);

	});

}
exports.create = create;



function instance_won( instance, player ){

	instance.data.game.winner.win = true;
	instance.data.game.winner.url = player.url;
	instance.data.game.winner.name = player.data.name;
	instance.data.game.winner.score = player.data.score;
	instance.data.game.winner.words = player.data.words;
	// instance.winner = player_func.safe(player);

	board_func.board_is_won( instance.data.board );
	
}
exports.instance_won = instance_won;



// function update( instance, input ){
	// use player_validate
	// let newPlayer = new m_player({
	// 	url : helpers.randomID(5);
	// 	name : input.name,
	// });
	// return newPlayer;
// }
// exports.update = update;


// function remove( running, input ){

	// let indexs = find_index(running, input);

	// let temp = [];
	// for( let i=indexs.length -1; i >= 0; i--){
	// 	running.splice(indexs[i],1);	
	// }
	// return indexs;
// }
// exports.remove = remove;




