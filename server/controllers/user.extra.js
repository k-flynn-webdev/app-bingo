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






function board_create( user, board, instance ){

	if( !helpers.existsValid( user ) || !helpers.existsValid( board )){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user with created Board (' + board + ').';

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.boards.created.push( helpers.escape( board ));

		user_func.save( userFound, function( error, result ){

			if( error ){
				logger.add( error_obj );
				return;
			}

			let success_obj = 'Success: ' + pre + ' updated with new created Board (' + board + ').'
			logger.add( success_obj );

		});

	});
}
exports.board_create = board_create;

// instance creator
function board_start( user, board, instance ){

	if( !helpers.existsValid( user ) || !helpers.existsValid( instance ) ){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user with started Board (' + board + ').';

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.boards.started.push( helpers.escape( instance.data.board ));

		user_func.save( userFound, function( error, result ){

			if( error ){
				logger.add( error_obj );
				return;
			}

			let success_obj = 'Success: ' + pre + 'adding to user with started Board (' + board + ').';
			logger.add( success_obj );

		});

	});
}
exports.board_start = board_start;


// regular player
function board_join( user, board, instance, player ){

	if( !helpers.existsValid( user ) || !helpers.existsValid( instance ) ){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user with played Board (' + instance.data.board + ').';

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.stats.played = new Date();
		userFound.data.boards.played.push( helpers.escape( instance.data.board ));
		userFound.data.session.instance = helpers.escape( instance.url );
		userFound.data.session.player = helpers.escape( player.url );

		user_func.save( userFound, function( error, result ){

			if( error ){
				logger.add( error_obj );
				return;
			}

			let success_obj = 'Success: ' + pre + 'adding to user with played Board (' + instance.data.board + ').';
			logger.add( success_obj );

		});

	});
}
exports.board_join = board_join;


function board_won( user, board, instance, player ){

	if( !helpers.existsValid( user ) || !helpers.existsValid( instance ) ){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user with won Board (' + instance.data.board + ').';

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.boards.won.push( helpers.escape( instance.data.board ));

		user_func.save( userFound, function( error, result ){

			if( error ){
				logger.add( error_obj );
				return;
			}

			let success_obj = 'Success: ' + pre + 'adding to user with won Board (' + instance.data.board + ').';
			logger.add( success_obj );

		});

	});
}
exports.board_won = board_won;




