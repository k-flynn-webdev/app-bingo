
const m_player = require('../models/player.model.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');

const player_validate = require('../controllers/player.validate.js');


function safe( model, win=false ){
	let temp = { 
		url : model.url, 
		data : {
			name : model.data.name, 
			score : model.data.score, 
			// words : model.data.words,		
			// time : model.data.time,		
		},
	};

	if(win){
		temp.data.words = model.data.words;
	}

	return temp;
}
exports.safe = safe;


// function set_words( input, player ){

// 	if( helpers.existsValid( input.words )){
// 		player.data.words = input.words;

// 		for(let i=0;i<player.data.words.length;i++){
// 			player.data.words[i] = helpers.escape( player.data.words[i] );
// 		}

// 	}
// }

function create( input ){

	let newPlayer = new m_player({
		url : helpers.randomID(5),
		data : {
			name : helpers.escape( input.name ),
			score : helpers.escape( input.score ) || 0,
			time : Date.now(),
		},
	});

	return newPlayer;
}
exports.create = create;


function update( input, player, instance_words, next ){

	if( helpers.existsValid( input.name ) && helpers.existsValid( input.name.update ) ){
		name_update(input.name.update, player, next);
	}

	if( helpers.existsValid( input.word ) && helpers.existsValid( input.word.add ) ){
		word_add(input.word.add, player, instance_words, next);
	}

	if( helpers.existsValid( input.word ) && helpers.existsValid( input.word.remove ) ){
		word_remove(input.word.remove, player, next);
	}

	if( helpers.existsValid( input.word ) && helpers.existsValid( input.word.reset ) ){
		word_reset(player, next);
	}

}
exports.update = update;



function name_update( input, player, next ){
	
	if( input.length <= 3){
		let error = {
			status : status.client.input_error,
			message : 'Player name update is too short.'
		}
		return next(error);
	}

	player.data.name = helpers.escape(input);
	player.data.time = Date.now();

	return next(null, player);
	
}


function word_exists( word, instance_words){

	for(let i=0;i<instance_words.length;i++){
		if( instance_words[i] == word ){
			return true;
		}
	}
	return false;
}

function word_add( input, player, instance_words, next ){
	let newWord = helpers.escape(input);

	if( input.length <= 3){
		let error = {
			status : status.client.input_error,
			message : 'Player word to add is too short.'
		}
		return next(error);
	}

	if( !word_exists(newWord, instance_words)){
		let error = {
			status : status.client.input_error,
			message : 'Player word to add does not exist.'
		}
		return next(error);		
	}

	for(let i=0;i<player.data.words.length;i++){
		if( player.data.words[i] == newWord ){
			let error = {
				status : status.client.forbidden,
				message : 'Player already has this word.'
			}
			return next(error);
		}
	}

	player.data.words.push(newWord);
	player.data.score = player.data.words.length;
	player.data.time = Date.now();

	return next(null, player);
}

function word_remove( input, player, next ){
	let newWord = helpers.escape(input);

	for(let i=player.data.words.length -1;i>=0;i--){
		if( player.data.words[i] == newWord ){
			player.data.words.splice(i,1);
			player.data.score = player.data.words.length;
			player.data.time = Date.now();

			return next(null, player);
		}
	}

	let error = {
		status : status.client.input_error,
		message : 'Player does not have this word.'
	}
	return next(error);
}

function word_reset( player, next ){

	player.data.words = [];
	player.data.score = 0;
	player.data.time = Date.now();

	return next(null, player);
}


// function remove( player, players){

	// let findBy= null;
	// let results = [];
	
	// if( helpers.existsValid( player.url )){
	// 	findBy = matchURL;
	// } else if( helpers.existsValid( player.data ) && helpers.existsValid( player.data.name )){
	// 	findBy = matchName;
	// } else {
	// 	findBy = matchID;
	// }

	// for( let i=0;i<players.length;i++){
	// 	if( findBy(player, players[i]) ){
	// 		results.push( i );	
	// 	}
	// }

	// return results;
// }
// exports.remove = remove;




function matchURL( a, b ){
	if( a.url === b.url ){
		return true;
	} 
	return false;
}

function matchName( a, b ){
	if( a.data.name === b.data.name ){
		return true;
	} 
	return false;
}

function matchID( a, b ){
	if( a._id === b._id ){
		return true;
	} 
	return false;
}



function find( search, player, players){

	let findBy= null;
	let results = [];
	
	if( helpers.existsValid( search.url )){
		findBy = matchURL;
	} else if( helpers.existsValid( search.data ) && helpers.existsValid( search.data.name )){
		findBy = matchName;
	} else {
		findBy = matchID;
	}

	for( let i=0;i<players.length;i++){
		if( findBy(player, players[i]) ){
			results.push( i );	
		}
	}

	return results;
}
exports.find = find;







