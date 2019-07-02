
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');
const config = require('../config/config.js');

let nameSize = 60;
let emailSize = 100;
let textSize = 150;


function isNumber( input ){
	local = helpers.escape( input );
	local = Number( local );
	if( isNaN(local) ){
		let message = { error : {} };
		message.error.status = status.client.input_error;
		message.error.message = 'Expected a number.';
		return message;
	}
	return local;
}
exports.isNumber = isNumber;

function isDate( input ){
	local = helpers.escape( input );
	local = new Date( local );
	if( local == 'Invalid Date' || isNaN(local.valueOf()) ){
		let message = { error : {} };
		message.error.status = status.client.input_error;
		message.error.message = 'Expected a date.';
		return message;	
	}
	return local;
}
exports.isDate = isDate;

function isTextBlock( input ){
	local = helpers.shorten( input, textSize, '..' );
	local = helpers.escape( local );
	local = helpers.sanitize( local );
	return local;
}
exports.isTextBlock = isTextBlock;

// function isName( input ){
// 	let local = helpers.escape( input );
// 	if( local.length <= 2 ){ 
// 		let message = { error : {} };
// 		message.error.status = status.client.input_error;
// 		message.error.message = 'Name too short, try something longer (' + 2 + ').';
// 		return message;	
// 	}
// 	if( local.length > nameSize ){ 
// 		let message = { error : {} };
// 		message.error.status = status.client.input_error;
// 		message.error.message = 'Name too long, try something shorter (' + nameSize.toString() + ').';
// 		return message;	
// 	}	
// 	return local;
// }
// exports.isName = isName;

// function isEmail( input ){
// 	let local = helpers.escape( input ).toLowerCase();
// 	if( local.length <= 6){ 
// 		// let message = { error : {} };
// 		// message.error.status = status.client.input_error;
// 		// message.error.message = 'Email appears too short.';
// 		return false;
// 	}
// 	if( local.indexOf('@') === -1 ){
// 		// let message = { error : {} };
// 		// message.error.status = status.client.input_error;
// 		// message.error.message = 'Email not valid, missing @.';
// 		return false;
// 	}
// 	if( local.indexOf('.') === -1 ){
// 		// let message = { error : {} };
// 		// message.error.status = status.client.input_error;
// 		// message.error.message = 'Email not valid.';
// 		return false;
// 	}
// 	if( local.length > emailSize ){
// 		// let message = { error : {} };
// 		// message.error.status = status.client.input_error;
// 		// message.error.message = 'Email is very long, try something shorter (' + emailSize.toString() + ').';
// 		return false;
// 	}
// 	return local;
// }
// exports.isEmail = isEmail;

// function isPassword( input ){
// 	let local = input;
// 	if( local.length < 5 ){ 
// 		let message = { error : {} };
// 		message.error.status = status.client.input_error;
// 		message.error.message = 'Password too short, try something longer (' + config.string.min_size.toString() + ').';
// 		return message;
// 	}
// 	local = helpers.shorten( local, config.string.max_size );
// 	local = helpers.sanitize( local );
// 	local = helpers.escape( local );
// 	return local;
// }
// exports.isPassword = isPassword;



