
const bcrypt = require('bcrypt');
const status = require('../config/status_response.js');
const config = require('../config/config.js');
const helpers = require('./helpers.js');



let nameSize = 60;
let emailSize = 100;
let textSize = 150;

let messages = [
'name missing.',
'email missing.',
'password missing.',
'email appears broken, either missing @ or domain.'
]

function create( req, res, next){

	if( !helpers.existsValid( req.body.name )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[0],
		});
	}

	if( !helpers.existsValid( req.body.email )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[1],
		});
	}

	if( !helpers.existsValid( req.body.password )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[2],
		});
	}

	next();
}
exports.create = create;

function login( req, res, next){

	if( !helpers.existsValid( req.body.email )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[1],
		});
	}

	if( !helpers.existsValid( req.body.password )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[2],
		});
	}

	next();
}
exports.login = login;


function name( req, res, next){
	if( helpers.existsValid( req.body.name )){

		let local = helpers.escape( req.body.name );
		
		if( local.length <= 2 || local.length > nameSize ){ 
			return res.status(status.client.input_error).json({
				status : status.client.input_error,
				message : 'Name should be between 2 - ' + nameSize.toString() + ' characters long.',
			});	
		}	

		req.body.name = local;
	}
	next();
}
exports.name = name;


function email( req, res, next){
	if( helpers.existsValid( req.body.email )){

		let tinyEmail = '2@1.com';
		let local = helpers.escape( req.body.email );

		local = helpers.sanitize( local );

		if( local.length <= tinyEmail.length || local.length >= emailSize ){ 
			return res.status(status.client.input_error).json({
				status : status.client.input_error,
				message : 'Email should be between ' + tinyEmail.length + ' - ' + emailSize.toString() + ' characters long.',
			});	
		}	

		if( local.indexOf('@') === -1 ){
			return res.status(status.client.input_error).json({
				status : status.client.input_error,
				message : messages[3],
			});
		}
		if( local.indexOf('.') === -1 ){
			return res.status(status.client.input_error).json({
				status : status.client.input_error,
				message : messages[3],
			});
			return false;
		}

		req.body.email = local;
	}
	next();
}
exports.email = email;


function password( req, res, next){
	if( helpers.existsValid( req.body.password )){

		let local = helpers.escape( req.body.password );
		
		if( local.length <= config.string.min_size ){ 
			return res.status(status.client.input_error).json({
				status : status.client.input_error,
				message : 'Password should be at least ' + config.string.min_size.toString() + ' characters long.',
			});	
		}	

		local = helpers.shorten( local, config.string.max_size );
		local = helpers.sanitize( local );
		local = helpers.escape( local );

		req.body.password = local;
	}
	next();
}
exports.password = password;

