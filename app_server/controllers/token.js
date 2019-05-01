let jwt = require('jsonwebtoken');
let config = require('../config/config.js');
let status = require('../config/status_response.js');
let logger = require( '../log/log.js' );
let token_func = require('./token.func.js');
let token_server = require('./token.server.js');
let helpers = require('./helpers.js');

let mongoose = require('mongoose');

function create( input ){
	return jwt.sign( 
		input, 
		config.token.secret, 
		{ expiresIn : config.token.expiry } 
	);
}
exports.create = create;

function check( req, res, next ){

	let token = token_func.get_header( req );

	if( !helpers.existsValid( token )){
		return res.status( status.client.input_error ).json({
			status : status.client.input_error, 
			message : 'security token missing.',
		});
	}

	let tokenString = token_func.get_token( token );

	if( token_server.check( tokenString )){

		token_func.verify_token( tokenString, function(error, decoded){

			if( error ){
				logger.add( error.message );
				return res.status( status.client.unauthorized ).json({
					status : status.client.unauthorized,
					message : error.message,
				});
			}
			let token_clean = { clean : decoded, raw : tokenString };
			req.body.token = token_clean;

			next();
		});

	} else {
		return res.status( status.client.unauthorized ).json({
			status : status.client.unauthorized,
			message : 'security token previously used/disabled.',
		});		
	}
}
exports.check = check;

function passive( req, res, next ){
	// this should create a passive user if the person is'nt already signed in..?
	let token_clean = {
		id : mongoose.Types.ObjectId(),
		name : 'anon',
		email : '',
		role : config.role.guest,
	};
	req.body.token = { 
		clean : token_clean, 
		raw : 'rawString.' 
	};
	next();
}
exports.passive = passive;

function clear( req ){ // cleanup
	token_func.clear_header( req );
	req.body.token = null;
}
exports.clear = clear;
