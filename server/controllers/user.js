const bcrypt = require('bcrypt');
const m_user = require('../models/user.model.js');
const config = require('../config/config.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');
const user_func = require('../controllers/user.func.js');
const user_extra = require('../controllers/user.extra.js');


let messages = [
	'email already in use.',
	'missing user id.',
	'missing user.',
	'no fields to update.' ];


// Events
function add_events( App ){
	App.on("board-create", user_extra.board_add );
}
exports.add_events = add_events;


function create( input, next){
	
	user_func.get_by_email( input, function(error, found){

		if( error ){
			return next({ 
				status : status.client.input_error, 
				message : error.message, 
			});
		}

		if( helpers.existsValid( found )){
			return next({ 
				status : status.client.input_error, 
				message : messages[0],
			});
		}

		bcrypt.hash( input.password, config.hash.strength, function(error, hash){	
			if( error ){
				return next({ 
					status : status.server.bad, 
					message : error.message 
				});
			}
			let newUser = new m_user({
				name : input.name, 
				email : input.email, 
				password : hash,
			});
			user_func.save( newUser, next);
		});

	});
}
exports.create = create;



function update( input, next){

	let id = user_func.get_id( input );

	update_with_id(id, input, next);	
	
}
exports.update = update;



function update_with_id( id, input, next){

	if( !helpers.existsValid( id )){
		return next({ 
			status : status.client.input_error, 
			message : messages[1],
		});
	}

	if( helpers.existsValid( input.name ) || helpers.existsValid( input.email ) || helpers.existsValid( input.password ) ){

		user_func.get_by_id( helpers.escape(id) , function(error, userFound){

			let updated = false;
			function updateUser( user ){
				if( !updated ){
					user.date.updated = new Date();
					updated = true;
				}
			}

			if( error ){
				return next({ 
					status : status.server.bad, 
					message : error.message 
				});
			}

			if( !helpers.existsValid( userFound )){
				return next({ 
					status : status.server.bad,  
					message : messages[2],
				});
			}

			if( helpers.existsValid( input.name )){
				userFound.name = input.name;
				updateUser( userFound );
			}
			if( helpers.existsValid( input.email )){
				userFound.email = input.email;
				updateUser( userFound );
			}
			if( helpers.existsValid( input.created )){
				userFound.date.created = input.created;
				updateUser( userFound );
			}
			if( helpers.existsValid( input.updated )){
				userFound.date.updated = input.updated;
				updateUser( userFound );
			}
			if( helpers.existsValid( input.login )){
				userFound.date.login = input.login;
				updateUser( userFound );
			}

			if( helpers.existsValid( input.password )){
				
				bcrypt.hash( input.password, config.hash.strength, function(error, hash){	
				
					if( error ){
						return next({ 
							status : status.server.bad, 
							message : error.message 
						});
					}

					userFound.password = hash;
					updateUser( userFound );
					user_func.save( userFound, next);
				});
			} else {
				user_func.save( userFound, next);
			}

		});
	} else {
		return next({ 
			status : status.client.input_error, 
			message : messages[3],
		});
	}

}
exports.update_with_id = update_with_id;



function remove( input, next){
	
	let id = user_func.get_id( input );

	remove_with_id(id, input, next);

}
exports.remove = remove;

function remove_with_id( id, input, next){
	
	if( !helpers.existsValid( id )){
		return next({ 
			status : status.client.input_error, 
			message : messages[1],
		});
	}

	m_user.findByIdAndRemove({ _id : id }, function(error, userFound){

		if( error ){
			return next({ 
				status : status.server.bad, 
				message : error.message 
			});
		}

		if( !helpers.existsValid( userFound )){
			return next({ 
				status : status.server.bad,  
				message : messages[2],
			});
		}

		return next(null, userFound);
	});

}
exports.remove_with_id = remove_with_id;








