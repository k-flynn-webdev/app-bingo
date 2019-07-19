const config = require('../config/config.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');

const player_func = require('../controllers/player.func.js');

const m_player = require('../models/player.model.js');




function insert( player, instance ){

	let index = player_func.find( player, player, instance.data.players );
	if( index.length === 0 ){
		// instance.data.players.push( player_func.safe( player ));
		instance.data.players.push( player );
		instance.data.game.time = Date.now();
		
		return true;
	}

	return false;	
}
// exports.insert = insert;


function remove( player, instance, next){

	let result = remove_direct( player, instance );
	if( !result ){
		let error = {
			status : status.client.not_found,
			message : 'Instance missing this player.',
		}		
		return next(error);
	}

	return next( null, player);
}
exports.remove = remove;


function remove_direct( player, instance){

	let index = player_func.find( player, player, instance.data.players );
	
	if( index.length === 0 || index[0] < 0 ){		
		return false;
	}

	instance.data.players.splice( index[0], 1 );
	instance.data.game.time = Date.now();

	return true;
}
exports.remove_direct = remove_direct;





function create( input, instance, next){

	let newPlayer = player_func.create( input );

	let result = insert( newPlayer, instance);
	if( result ){
		return next(null, newPlayer );
	}

	let error = {
		status : status.client.unauthorized,
		message : 'Instance already contains this player.',
	}

	// else error .. possible duplicate?
	return next( error );
}
exports.create = create;



function update( playerInput, instance, next){

	let index = player_func.find( playerInput, playerInput, instance.data.players );
	if( index.length === 0 ){
		let error = {
			status : status.server.unavailable,
			message : 'Instance does not have this player, please re-join.',
		}
		return next( error );
	}

	player_func.update( playerInput, instance.data.players[index[0]], instance.data.lines, next );
}
exports.update = update;




