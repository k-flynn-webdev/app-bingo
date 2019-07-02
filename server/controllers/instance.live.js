const config = require('../config/config.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');


const live = [];


function players(){
	let players = 0;
	for(let i =0;i<live.length;i++){
		players += live[i].data.players.length;
	}
	return { players : players };
}
exports.players = players;

function games(){
	let games = [];
	for(let i =0;i<live.length;i++){
		if( live[i].data.game.winner === "" ){
			games.push( live[i].url );	
		}
	}
	return { games : games };
}
exports.games = games;

function running(){
	return live.length;
}
exports.running = running;


function all( next ){
	return next(live);
}
exports.all = all;





function insert( instance ){
	live.unshift( instance );
	return true;
}
exports.insert = insert;


function remove( instance ){

	let removed = [];
	let indexs = get_index( { url : true }, instance, live );

	if( indexs.length > 0 ){
		for( let i=indexs.length -1; i >= 0; i--){
			removed.push( live[ indexs[i] ] );
			live.splice( indexs[i], 1 );	
		}
		return removed;
	}

	return false;	
}
exports.remove = remove;



function get( search, instance ){

	let indexs = get_index( search, instance );
	let results = [];

	for( let i=0;i<indexs.length;i++){
		results.push( live[ indexs[i] ] );
	}

	if( results.length > 0 ){
		return results;
	}

	return false;
}
exports.get = get;


function random( search, instance ){

	let indexs = get_index( search, instance );

	if( indexs.length > 0 ){
		let randomIndex = Math.floor( Math.random() * indexs.length );
		return live[ indexs[ randomIndex ] ];
	}

	return false;	
}
exports.random = random;









function matchURL( a, b ){
	if( a.url.toString() === b.url.toString() ){
		return true;
	} 
	return false;
}

function matchBoard( a, b ){
	if( a.data.board.toString() === b.data.board.toString() ){
		return true;
	} 
	return false;
}

function matchID( a, b ){
	if( a._id.toString() === b._id.toString() ){
		return true;
	} 
	return false;
}

function get_index( search, instance ){

	let findBy= null;
	let results = [];

	if( helpers.existsValid( search.url )){
		findBy = matchURL;
	} else if( helpers.existsValid( search.data ) && helpers.existsValid( search.data.board )){
		findBy = matchBoard;
	} else {
		findBy = matchID;
	}

	for( let i=0;i<live.length;i++){
		if( findBy(instance, live[i]) ){
			results.push( i );	
		}
	}

	return results;
}




