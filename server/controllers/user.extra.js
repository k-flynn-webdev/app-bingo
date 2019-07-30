const bcrypt = require('bcrypt');
const user_func = require('./user.func.js');
const m_user = require('../models/user.model.js');
const config = require('../config/config.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');

let logger = require( '../log/log.js' );


function login( input, next){
	
	user_func.get_by_email( input, function(error, userFound){

		if( error ){
			return next({ 
				status : status.client.input_error, 
				message : error.message, 
			});
		}

		if( !helpers.existsValid( userFound )){
			return next({ 
				status : status.client.not_found, 
				message : 'no user found with that email.',
			});
		}

		bcrypt.compare( input.password, userFound.password, function(error, result){	
			
			if( error || result === false ){
				return next({ 
					status : status.client.unauthorized, 
					message : 'password does not match.' 
				});
			}

			userFound.date.login = new Date();
			user_func.save( userFound, next);

		});

	});
}
exports.login = login;


function logout( input, next){
	
	user_func.get_by_id( input, function(error, userFound){

		if( error ){
			return next({ 
				status : status.client.input_error, 
				message : error.message, 
			});
		}

		if( !helpers.existsValid( userFound )){
			return next({ 
				status : status.client.input_error, 
				message : 'no user found with that id.',
			});
		}

		return next(null, userFound);

	});
}
exports.logout = logout;



function board_event( user, error_msg, success_msg, success_action ){
	
	user_func.get_by_id( user, function(error, userFound){
		
		if(error){
			logger.add( error );
			return;
		}

		success_action( userFound );

		user_func.save( userFound, function( error, result ){

			if( error ){
				logger.add( error_obj );
				return;
			}

			logger.add( success_msg );
		});
	});
}


function board_create( user, board, instance ){

	if( !user  || !board ){
		return;
	}

	let pre = user ? 'User (' + user.id + ') ' : '';
	let error_obj = 'Error: ' + pre + 'failed adding to user with created Board (' + board + ').';
	let success_obj = 'Success: ' + pre + 'added to user with created Board (' + board + ').';

	board_event( user, error_obj, success_obj, function( input ){
		input.data.boards.created.push( helpers.escape( board ));
	});
}
exports.board_create = board_create;


// instance creator
function board_start( user, board, instance ){

	if( !user  || !instance ){
		return;
	}

	let pre = user ? 'User (' + user.id + ') ' : '';
	let error_obj = 'Error: ' + pre + 'failed adding to user with started Board (' + instance.data.board + ').';
	let success_obj = 'Success: ' + pre + 'added to user with started Board (' + instance.data.board + ').';

	board_event( user, error_obj, success_obj, function( input ){
		input.data.boards.started.push( helpers.escape( instance.data.board ));
	});

}
exports.board_start = board_start;


// regular player
function board_join( user, board, instance, player ){

	if( !user  || !instance ){
		return;
	}

	let pre = user ? 'User (' + user.id + ') ' : '';
	let error_obj = 'Error: ' + pre + 'failed adding to user with played Board (' + instance.data.board + ').';
	let success_obj = 'Success: ' + pre + 'added to user with played Board (' + instance.data.board + ').';

	board_event( user, error_obj, success_obj, function( input ){
		input.data.stats.played = new Date();
		input.data.boards.played.push( helpers.escape( instance.data.board ));
		input.data.session.instance = helpers.escape( instance.url );
		input.data.session.player = helpers.escape( player.url );
	});

}
exports.board_join = board_join;

// regular player
function board_leave( user ){

	if( !user ){
		return;
	}

	let pre = user ? 'User (' + user.id + ') ' : '';
	let error_obj = 'Error: ' + pre + 'failed updating user on exit.';
	let success_obj = 'Success: ' + pre + 'updated user on exit.';

	board_event( user, error_obj, success_obj, function( input ){
		input.data.session.instance = '';
		input.data.session.player = '';
	});

}
exports.board_leave = board_leave;

function board_won( user, board, instance, player ){

	if( !user  || !instance ){
		return;
	}

	let pre = user ? 'User (' + user.id + ') ' : '';
	let error_obj = 'Error: ' + pre + 'failed adding to user with won Board (' + instance.data.board + ').';
	let success_obj = 'Success: ' + pre + 'added to user with won Board (' + instance.data.board + ').';

	// console.log(user)
	// console.log(board)
	// console.log(instance)
	// console.log(player)

	board_event( user, error_obj, success_obj, function( input ){
		input.data.boards.won.push( helpers.escape( instance.data.board ));
	});

}
exports.board_won = board_won;




