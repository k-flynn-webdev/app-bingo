
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');


let messages = [
'player url missing or malformed.',
]

// function player( req, res, next){

// 	// if( !helpers.existsValid( req.params.instance )){
// 	// 	return res.status( status.client.input_error).json({
// 	// 		status : status.client.input_error,
// 	// 		message : messages[0],
// 	// 	});
// 	// }

// 	// req.params.instance = helpers.escape( req.params.instance );

// 	next();
// }
// exports.player = player;


function join( req, res, next){

	// console.log('joining');

	if( !helpers.existsValid( req.body.name )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : 'missing player information. Please re-join.',
		});
	}

	req.body.name = helpers.escape( req.body.name );

	next();
}
exports.join = join;




function player( req, res, next){

	if( !helpers.existsValid( req.body.player )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : 'missing player information. Please re-join.',
		});
	}

	if( !helpers.existsValid( req.body.player.url )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : 'missing player url. Please re-join.',
		});
	}

	if( helpers.existsValid( req.body.player.url )){
		req.body.player.url = helpers.escape( req.body.player.url );
	}

	if( helpers.existsValid( req.body.player.name )){
		if( helpers.existsValid( req.body.player.name.update )){
			req.body.player.name.update = helpers.escape( req.body.player.name.update );
		} else {
			req.body.player.name = helpers.escape( req.body.player.name );
		}
	}	

	if( helpers.existsValid( req.body.player.lines )){
		req.body.player.lines = helpers.escape( req.body.player.lines );
	}	
	
	if( helpers.existsValid( req.body.player.line )){
		if( helpers.existsValid( req.body.player.line.add )){
			req.body.player.line.add = helpers.escape( req.body.player.line.add );
		} 
		if( helpers.existsValid( req.body.player.line.remove )){
			req.body.player.line.remove = helpers.escape( req.body.player.line.remove );
		}
	}

	next();
}
exports.player = player;



