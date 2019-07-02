let jwt = require('jsonwebtoken');
let config = require('../config/config.js');
let m_token = require('../models/token.model.js');
let status = require('../config/status_response.js');
let logger = require( '../log/log.js' );
let token_func = require('./token.func.js');


let tokens_black_list = [];
let hasInit = false;


function get_tokens( next ){
	m_token.find({}, function(error, allTokens ){
		if( error ){
			return next( error );
		}
		return next(null, allTokens);
	});
}
function delete_tokens( ids, next ){
	m_token.remove({ _id: { $in: ids } }, function (error) {
		if( error ){
			return next( error );
		}
		return next(null, true);
	});
}


function init(){
	if( !hasInit ){
		hasInit = true;
		console.log('Token service: starting.');

		get_tokens( function( error, tokens){

			if( error ){
				logger.add( error );
				console.log( error );
				return;
			}	

			remove_expired( tokens );

			for (let count=0;count<tokens.length;count++){
				tokens_black_list.push( tokens[count].raw );
			}

			console.log('Token service: tokens revoked(' + tokens_black_list.length + ').');

		});
	}
}

function revoke( token ){
	let deniedToken = new m_token({ raw : token });
	deniedToken.save( function( error, result ){
		if( error ){
			logger.add( error );
			console.log( error );
		}
		tokens_black_list.push( result.raw );
	});
}
exports.revoke = revoke;

function check( token ){
	if( !hasInit ){
		init(); 
	}
	for (let count=0;count<tokens_black_list.length;count++){
		if( token === tokens_black_list[count] ){
			return false; // check failed // deny because previously revoked
		}
	}
	return true; // check is fine
}
exports.check = check;

function remove( req, res, next ){
	revoke( req.body.token.raw );
	next();
}
exports.remove = remove;


function remove_expired( tokens ){

	let expired = [];

	for (let count=0;count<tokens.length;count++){
		let token = tokens[count];
		jwt.verify( token.raw, config.token.secret, function(error, decoded ){
			if( error ){ 
				// probably expired?!
				expired.push( token._id );
			}
		});
	}

	if( expired.length ){

		delete_tokens( expired, function( error, result){
			
			if( error ){
				logger.add( error );
				console.log( error );
				return;
			}

			let stringMessage = 'Expired tokens to be removed: ' + expired.length + '.';
			console.log( stringMessage );
			logger.add( stringMessage );

		});
	}
}

init();




