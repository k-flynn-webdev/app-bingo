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


function board_add( input, board  ){
	
	user_func.get_by_id( input, function(error, userFound){

		if( error ){
			let error_obj = 'Error: ' + 'User (' + input.user.id + ') failed update with new Board (' + board + ').'
			logger.add( error_obj );
			return;
		}

		userFound.boards.push( helpers.escape( board ) );

		user_func.save( userFound, function( error, next ){

			if( error ){
				let error_obj = 'Error: ' + 'User (' + input.user.id + ') failed update with new Board (' + board + ').'
				logger.add( error_obj );
				return;
			}

			let success_obj = 'Success: ' + 'User (' + input.user.id + ') updated with new Board (' + board + ').'
			logger.add( success_obj );

		});

	});
}
exports.board_add = board_add;



