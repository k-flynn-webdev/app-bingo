const m_user = require('../models/user.model.js');
const m_board = require('../models/board.model.js');

const board_func = require('../controllers/board.func.js');

const config = require('../config/config.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');


let messages = [
	'email already in use.',
	'missing user id.',
	'missing user.',
	'no fields to update.' ];



function create( input, next){

	let newBoard = board_func.create( input );
	board_func.save( newBoard, function(error, result){

		if( error ){
			return next(error);
		}

		return next(null, board_func.safe( result ));

	});

}
exports.create = create;



function get( input, next ){

	board_func.get( input, function(error , result){

		if( error ){
			return next({ 
				status : status.client.not_found, 
				message : error.message 
			});
		}

		if( !helpers.existsValid( result )){
			return next({ 
				status : status.client.not_found, 
				message : 'No board result.' 
			});
		}

		return next(null, board_func.safe( result ));

	});
}
exports.get = get;


function update( id, input, next ){
	
	// get( id, function( error, result){

	// 	if( error ){
	// 		return next({ 
	// 			status : status.server.bad, 
	// 			message : error.message 
	// 		});
	// 	}

	// 	result.name = input.name;
	// 	result.words = get_words(input.words);

	// 	board_func.save( result, next); // TODO

	// })

}
exports.update = update;



function remove( input, next ){
	
	// m_board.findByIdAndRemove({ _id : input.id }, function(error, boardFound){

	// 	if( error ){
	// 		return next({ 
	// 			status : status.server.bad, 
	// 			message : error.message 
	// 		});
	// 	}

	// 	if( !helpers.existsValid( boardFound )){
	// 		return next({ 
	// 			status : status.server.bad,  
	// 			message : 'No board found.',
	// 		});
	// 	}

	// 	return next(null, boardFound); // TODO
	// });


}
exports.remove = remove;









