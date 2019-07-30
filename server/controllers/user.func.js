
const m_user = require('../models/user.model.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');


function safe_data( model, all=false ){
	let user_safe = { 
		id : model._id, 
		name : model.name, 
		email : model.email, 
		role : model.role, 
	};

	if( all ){
		user_safe.date = {
			created : model.date.created,
			updated : model.date.updated,
			login : model.date.login,
		};	
	}

	if(( process.env.NODE_ENV ).toLowerCase() === 'test' ){
		user_safe.date = model.date;
		user_safe.data = model.data;
	}

	return user_safe;
}
exports.safe_data = safe_data;

function save( model, next ){
	model.save( function(error, result){
		if( error ){
			return next({ 
				status : status.server.bad, 
				message : error.message 
			});	
		}
		return next(null, result);
	});		
}
exports.save = save;


function get_id( input ){
	// if( helpers.existsValid( input._id )){
	// 	return helpers.escape( input._id );
	// }
	if( helpers.existsValid( input.id )){
		// console.log( 'input.id' );
		// console.log( input.id );
		return helpers.escape( input.id );
	}
	if( helpers.existsValid( input.token )){
		if( helpers.existsValid( input.token.id )){
			return helpers.escape( input.token.id );
		}
		if( helpers.existsValid( input.token.clean )){
			if( helpers.existsValid( input.token.clean.id )){
				return helpers.escape( input.token.clean.id );
			}	
		}		
	}
	if( helpers.existsValid( input ) && input.length === 24 ){
		return helpers.escape( input );
	}	
}
exports.get_id = get_id;


function get_by_id( input, next ){
	
	let found_id = get_id( input );

	m_user.findOne({ _id: found_id } , function(error , found){

		if( error ){
			return next(error);
		}

		return next(null, found);

	});
}
exports.get_by_id = get_by_id;


function get_by_email( input, next ){
	m_user.findOne({ email: input.email } , function(error , found){

		if( error ){
			return next(error);
		}

		return next(null, found);

	});
}
exports.get_by_email = get_by_email;










