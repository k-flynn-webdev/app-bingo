
const m_board = require('../models/board.model.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');

const board_validate = require('../controllers/board.validate.js');

let logger = require( '../log/log.js' );


function safe( model, all=false ){
	
	let temp = { 
		url : model.url, 
		data : {
			name : model.data.name, 
			lines : model.data.lines,	
		},
	};

	if(( process.env.NODE_ENV ).toLowerCase() === 'test' ){
		temp.data.owner = model.data.owner;
	}

	return temp;
}
exports.safe = safe;


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


function split_line_string( input ){

	// let lines_array = input.split(/[,\n\r]+/);
	let lines_array = input.split('§');
	let lines = [];

	for( let count=0;count<lines_array.length;count++){
		if( lines_array[count].length >= 2){
			let line_clean = helpers.escape( lines_array[count] );
			lines.push( line_clean.trim() );
		}
	}

	return lines;
}


function create( input ){

	let newBoard = new m_board({
		data : {
			name : input.name,
			lines : split_line_string(input.lines),			
		},
	});
	newBoard.url = newBoard._id;

	if( helpers.existsValid( input.user ) ){
		newBoard.data.owner = input.user.id;	
	}

	return newBoard;
}
exports.create = create;


function find( input, next ){

	let findby = null;

	if( helpers.existsValid( input.url )){
		findby = { url : input.url };
	} else if ( helpers.existsValid( input._id ) ){
		findby = { _id : input._id };
	} else if ( helpers.existsValid( input.data ) && helpers.existsValid( input.data.name ) ){
		findby = { name : input.data.name };
	} else {
		findby = { url : input };
	}

	m_board.findOne( findby , function(error, found){

		if( error ){
			return next(error);
		}

		if( !helpers.existsValid( found )){
			return next({ 
				status : status.client.not_found, 
				message : 'No board with that url found.' 
			});	
		}	

		return next(null, found);

	});
}



function get( input, next ){
	find( input, next );
}
exports.get = get;





function update( input, next ){
	// TODO 
	// // use player_validate
	// let newPlayer = new m_player({
	// 	url : helpers.randomID(5);
	// 	name : input.name,
	// });
	// return newPlayer;// TODO
}
exports.update = update;



function remove( input, next ){
	// TODO 

	// let findby = null;

	// if( helpers.existsValid( input.url )){
	// 	findby = { url : input.url };
	// } else if ( helpers.existsValid( input._id ) ){
	// 	findby = { _id : input._id };
	// } else {
	// 	findby = { data : { name : input.data.name }, };
	// }

	// m_board.findOne( findby , function(error , found){

	// 	if( error ){
	// 		return next(error);
	// 	}

	// 	if( !helpers.existsValid( found )){
	// 		return next(error);
	// 	}		

	// 	found.delete();

	// 	return next(null, found);

	// });
}
exports.remove = remove;



function board_meta( input, next ){

	find( input, function(error, result){

		if(error){
			return next(error);
		}

		let object = { 
				lines : result.data.lines,
			};

		return next(null, object);		

	});

}
exports.board_meta = board_meta;




function board_start( user, board, instance ){

	if( !helpers.existsValid( board )){
		return;
	}

	m_board.findOne({ url : board } , function(error , found){

		if( error || !helpers.existsValid(found) ){
			let pre = '';

			if( helpers.existsValid( user )){
				pre = 'User (' + user.id + ') ';
			}

			let error_obj = 'Error: ' + pre + 'failed update played on Board (' + board + ').';

			logger.add( error_obj );
			return;
		}

		if( helpers.existsValid( found )){
			found.data.stats.plays +=1;
			found.data.stats.played = new Date();
			found.save();
		}

	});
}
exports.board_start = board_start;


function board_won( user, board, instance ){

	if( !helpers.existsValid( board )){
		return;
	}

	m_board.findOne({ url : board } , function(error , found){

		if( error || !helpers.existsValid(found) ){
			let pre = '';

			if( helpers.existsValid( user )){
				pre = 'User (' + user.id + ') ';
			}

			let error_obj = 'Error: ' + pre + 'failed update win on Board (' + board + ').';

			logger.add( error_obj );
			return;
		}

		if( helpers.existsValid( found )){
			found.data.stats.wins +=1;
			found.save();
		}

	});
}
exports.board_won = board_won;

