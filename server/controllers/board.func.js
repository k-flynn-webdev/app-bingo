
const m_board = require('../models/board.model.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');

const board_validate = require('../controllers/board.validate.js');


function safe( model, all=false ){
	
	let temp = { 
		url : model.url, 
		data : {
			name : model.data.name, 
			words : model.data.words,	
			// game : {
				// win : model.data.game.win,
				// display : model.data.game.display,
			// },	
		},
	};

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


function split_word_string( input ){

	// let words_array = input.split(/[,\n\r]+/);
	let words_array = input.split('§');
	let words = [];

	for( let count=0;count<words_array.length;count++){
		if( words_array[count].length >= 2){
			let wordClean = helpers.escape( words_array[count] );
			words.push( wordClean.trim() );
		}
	}

	return words;
}


function create( input ){

	let newBoard = new m_board({
		data : {
			name : input.name,
			words : split_word_string(input.lines),			
		},
	});
	newBoard.url = newBoard._id;

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
				words : result.data.words,
				// display : result.data.game.display, 
				// win : result.data.game.win,
			};

		return next(null, object);		

	});

}
exports.board_meta = board_meta;


function board_is_won( input ){

	m_board.findOne({ url : input.url } , function(error , found){

		if( helpers.existsValid( found )){
			found.data.stats.wins +=1;
			found.save();
		}

	});
}
exports.board_is_won = board_is_won;

function board_is_played( input ){

	m_board.findOne({ url : input.url } , function(error , found){

		if( helpers.existsValid( found )){
			found.data.stats.played = new Date();
			found.data.stats.plays +=1;
			found.save();
		}

	});
}
exports.board_is_played = board_is_played;


