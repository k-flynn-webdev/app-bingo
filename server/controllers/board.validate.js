
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');
const board_func = require('../controllers/board.func.js');
const config = require('../config/config.js');


let messages = [
'board name missing.',
'board lines missing.',
'board url missing or malformed.',
'board search malformed.',
'board has too few lines.',
'board has some lines too short.',
]

let nameSize = 99;

function create( req, res, next){

	if( !helpers.existsValid( req.body.name )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[0],
		});
	}

	if( !helpers.existsValid( req.body.lines )){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[1],
		});
	}

	// has enough lines?
	let temp_lines = board_func.split_lines( req.body.lines );
	if( temp_lines.length < config.game.min ){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[4],
		});
	}
	// lines long enough?
	let lines_pass = true;
	for(let i = 0;i< temp_lines.length;i++){
		if(temp_lines[i].length < 5){
			lines_pass = false;
			break;
		}
	}
	if( !lines_pass ){
		return res.status( status.client.input_error).json({
			status : status.client.input_error,
			message : messages[5],
		});
	}


	next();
}
exports.create = create;

function name( req, res, next){
	if( helpers.existsValid( req.body.name )){

		let local = helpers.escape( req.body.name );
		
		if( local.length <= 2 || local.length > nameSize ){ 
			return res.status(status.client.input_error).json({
				status : status.client.input_error,
				message : 'Board name should be between 2 - ' + nameSize.toString() + ' characters long.',
			});	
		}	

		req.body.name = local;
	}
	next();
}
exports.name = name;


function lines( req, res, next){
	if( helpers.existsValid( req.body.lines )){
		req.body.lines = helpers.escape( req.body.lines );
	}
	next();
}
exports.lines = lines;


function board( req, res, next){

	if( helpers.existsValid( req.params.board ) && req.params.board.length > 5 ){
		req.params.board = helpers.escape( req.params.board );
	} else {
		return res.status(status.client.input_error).json({
			status : status.client.input_error,
			message : messages[2],
		});			
	}
	next();
}
exports.board = board;


// function search( req, res, next){
	// todo 
// 	if( helpers.existsValid( req.params.search )){
// 		req.params.search = helpers.escape( req.params.search );
// 	} else {
// 		return res.status(status.client.input_error).json({
// 			status : status.client.input_error,
// 			message : messages[3],
// 		});			
// 	}
// 	next();
// }
// exports.search = search;

