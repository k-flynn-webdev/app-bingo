const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
let helpers = require('./helpers.js');


function get_header(request){
	let token = request.headers['access-token'] || request.headers['authorization'] || request.headers['Authorization'];
	token = helpers.escape(token);
	return token;
}
exports.get_header = get_header;

function clear_header(request){
	if( helpers.existsValid( request.headers['access-token'] )){
		request.headers['access-token'] = null;
	} 
	if( helpers.existsValid( request.headers['authorization'] )){
		request.headers['authorization'] = null;
	} 
	if( helpers.existsValid( request.headers['Authorization'] )){
		request.headers['Authorization'] = null;
	} 	
}
exports.clear_header = clear_header;

function get_token( input ){
	let bearer = 'Bearer';
	let tokenLower = input.toLowerCase();
	let hasBearer = tokenLower.indexOf( bearer.toLowerCase() );
	let token = '';
	
	if( hasBearer !== -1){ // is present
		let temp = input.split( bearer );
		token = temp[1].trim();
	}		
	return token;
}
exports.get_token = get_token;

function verify_token( input , next ){
	jwt.verify( input, config.token.secret, function(error, decoded ){
		if( error ){
			return next( error );
		}
		
		return next(null, decoded);
	});
}
exports.verify_token = verify_token;






