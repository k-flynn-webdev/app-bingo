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
				winner : {
					win : model.data.game.winner.win,
					url :  model.data.game.winner.url,
					data : {
						name : model.data.game.winner.data.name,
						lines : model.data.game.winner.data.lines,
						score : model.data.game.winner.data.score,
					}, 
				},
			},		
		},
	};

	if(( process.env.NODE_ENV ).toLowerCase() === 'test' ){
		temp.data.owner = model.data.owner;
	}
	
	return temp;
}
exports.safe = safe;



function get_var_win( line_count ){
	let temp_var = Math.floor( line_count * config.game.win );
	if( temp_var < config.game.min ){
		temp_var = line_count;
	}
	if( temp_var > config.game.max ){
		temp_var = config.game.max;
	}
	return temp_var;
}
function get_var_display( line_count ){
	let temp_var = Math.floor( line_count * config.game.display );
	if( temp_var < config.game.min ){
		temp_var = line_count;
	}
	if( temp_var > config.game.max ){
		temp_var = config.game.max;
	}
	return temp_var;
}


function create( input_board, input_url=false, body=false, next ){

	let board_obj = { url : input_board };

	board_func.board_meta( board_obj, function(error, result){

		if( error ){
			return next( error );
		}

		let win_var = get_var_win( result.lines.length,  );
		let display_var = get_var_display( result.lines.length );

		let newInstance = new m_instance({
			url : !input_url ? helpers.randomID(6) : input_url,
			data : {
				board : input_board,
				lines : result.lines,
				players : [],
				game : {
					win : win_var,
					display : display_var,
				},
				owner : body.user ? body.user.id : '',
			},
		});

		return next(null, newInstance);

	});

}
exports.create = create;



function instance_won( instance, player ){

	instance.data.game.winner.win = true;
	instance.data.game.winner.url = player.url;
	instance.data.game.winner.data.name = player.data.name;
	instance.data.game.winner.data.score = player.data.score;
	instance.data.game.winner.data.lines = player.data.lines;
	
}
exports.instance_won = instance_won;





