
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');


let messages = [
'instance url missing or malformed.',
'search malformed.',
]

function instance( req, res, next){

	if( !helpers.existsValid( req.params.instance ) || req.params.instance.length < 5 ){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[0],
		});
	}

	req.params.instance = helpers.escape( req.params.instance );

	next();
}
exports.instance = instance;


// function player( req, res, next){

// 	if( !helpers.existsValid( req.body.player )){
// 		return res.status( status.client.input_error).json({
// 			status : status.client.input_error,
// 			message : 'missing player information. Please re-join.',
// 		});
// 	}

// 	if( helpers.existsValid( req.body.player.url )){
// 		req.body.player.url = helpers.escape( req.body.player.url );
// 	}
// 	if( helpers.existsValid( req.body.player.name )){
// 		req.body.player.name = helpers.escape( req.body.player.name );
// 	}	
// 	if( helpers.existsValid( req.body.player.words )){
// 		req.body.player.words = helpers.escape( req.body.player.words );
// 	}
// 	if( helpers.existsValid( req.body.player.score )){
// 		req.body.player.score = helpers.escape( req.body.player.score );
// 	}

// 	next();
// }
// exports.player = player;



// function search( req, res, next){
// 	if( helpers.existsValid( req.params.search )){
// 		req.params.search = helpers.escape( req.params.search );
// 	} else {
// 		return res.status(status.client.input_error).json({
// 			status : status.client.input_error,
// 			message : messages[1],
// 		});			
// 	}
// 	next();
// }
// exports.search = search;

