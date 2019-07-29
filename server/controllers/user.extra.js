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
	
	// console.log('board create emit!');

	// console.log('user');
	// console.log(user);
	// console.log('board');
	// console.log(board);
	// console.log('instance');
	// console.log(instance);

	if( !helpers.existsValid( user ) || !helpers.existsValid( board )){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user with created Board (' + board + ').';

		// console.log('board create emit inside!' );
		// console.log('userFound');
		// console.log(userFound);

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.boards.created.push( helpers.escape( board ));

		user_func.save( userFound, function( error, next ){

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

	// console.log('board start emit!');

	if( !helpers.existsValid( user ) || !helpers.existsValid( instance ) ){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		// console.log('user');
		// console.log(user);
		// console.log('board');
		// console.log(board);
		// console.log('instance');
		// console.log(instance);

	
		// console.log('board start emit inside!' );



		// console.log('userFound');
		// console.log(userFound);

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user with started Board (' + board + ').';

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.boards.started.push( helpers.escape( instance.data.board ));

		user_func.save( userFound, function( error, next ){

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
function board_join( user, board, instance ){

	// console.log('board_join');
	// console.log('user');
	// console.log(user);
	// console.log('board');
	// console.log(board);
	// console.log('instance');
	// console.log(instance.data);

	if( !helpers.existsValid( user ) || !helpers.existsValid( instance )){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		// console.log('board join emit inside!' );
		// console.log('userFound');
		// console.log(userFound);

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user current Instance (' + instance.url + ').';

		// console.log( !helpers.existsValid(userFound) );

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		// console.log('extra');

		userFound.data.stats.played = new Date();
		userFound.data.boards.played.push( helpers.escape( instance.data.board ));
		userFound.data.session.instance = instance.url;

		user_func.save( userFound, function( error, next ){

			if( error ){
				// console.log('inside');
				// console.log('error');
				// console.log(error);
				logger.add( error_obj );
				return;
			}

			// console.log( 'updated' );
			// console.log( userFound );			

			let success_obj = 'Success: ' + pre + 'adding to user current Instance (' + instance.url + ').';
			logger.add( success_obj );

		});

	});
}
exports.board_join = board_join;


function board_won( user, board, instance ){

	// console.log('user');
	// console.log(user);
	// console.log('board');
	// console.log(board);
	// console.log('instance');
	// console.log(instance);

	if( !helpers.existsValid( user ) || !helpers.existsValid( instance ) ){
		return;
	}

	user_func.get_by_id( user, function(error, userFound){

		// console.log('board won emit inside!' );
		// console.log('userFound');
		// console.log(userFound);

		let pre = 'User (' + user.id + ') ';
		let error_obj = 'Error: ' + pre + 'failed adding to user Board won (' + board + ').';

		if( error || !helpers.existsValid(userFound) ){
			logger.add( error_obj );
			return;
		}

		userFound.data.boards.won = helpers.escape( instance.data.board );

		user_func.save( userFound, function( error, next ){

			if( error ){
				logger.add( error_obj );
				return;
			}

			let success_obj = 'Success: ' + pre + 'adding to user Board won (' + board + ').';
			logger.add( success_obj );

		});

	});
}
exports.board_won = board_won;




