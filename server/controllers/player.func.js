
const m_player = require('../models/player.model.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');

const player_validate = require('../controllers/player.validate.js');


function safe( model, win=false ){

	let temp = { 
		url : 'anon', 
		data : {
			name : 'anon', 
			score : 0, 
		},
	};

	if( model.url !== undefined ){
		temp.url = model.url;
	}
	if( model.data !== undefined ){
		if( model.data.name !== undefined ){
			temp.data.name = model.data.name;
		}
		if( model.data.score !== undefined ){
			temp.data.score = model.data.score;
		}
		if(win && model.data.lines !== undefined ){
			temp.data.lines = model.data.lines;
		}		
	}

	return temp;
}
exports.safe = safe;



function create( input ){

	let newPlayer = new m_player({
		url : helpers.randomID(5),
		data : {
			name : helpers.escape( input.name ),
			score : helpers.escape( input.score ) || 0,
			time : Date.now(),
		},
	});

	// if user is logged in, tag as owner ..
	if( helpers.existsValid( input.user ) ){
		newPlayer.data.owner = input.user.id;
	}

	return newPlayer;
}
exports.create = create;


function update( input, player, instance_lines, next ){

	if( helpers.existsValid( input.name ) && helpers.existsValid( input.name.update ) ){
		name_update(input.name.update, player, next);
	}

	if( helpers.existsValid( input.line )){

		if( helpers.existsValid( input.line.add ) ){
			line_add(input.line.add, player, instance_lines, next);
		}

		if( helpers.existsValid( input.line.remove ) ){
			line_remove(input.line.remove, player, next);
		}

		if( helpers.existsValid( input.line.reset ) ){
			line_reset(player, next);
		}		

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


function line_exists( line, instance_lines){

	for(let i=0;i<instance_lines.length;i++){
		if( instance_lines[i] == line ){
			return true;
		}
	}
	return false;
}

function line_add( input, player, instance_lines, next ){
	let new_line = helpers.escape( input );

	if( input.length <= 3){
		let error = {
			status : status.client.input_error,
			message : 'Player line to add is too short.'
		}
		return next( error );
	}

	if( !line_exists( new_line, instance_lines )){
		let error = {
			status : status.client.input_error,
			message : 'Player line to add does not exist.'
		}
		return next( error );
	}

	for(let i=0;i<player.data.lines.length;i++){
		if( player.data.lines[i] == new_line ){
			let error = {
				status : status.client.forbidden,
				message : 'Player already has this line.'
			}
			return next(error);
		}
	}

	player.data.lines.push(new_line);
	player.data.score = player.data.lines.length;
	player.data.time = Date.now();

	return next(null, player);
}

function line_remove( input, player, next ){
	let new_line = helpers.escape(input);

	for(let i=player.data.lines.length -1;i>=0;i--){
		if( player.data.lines[i] == new_line ){
			player.data.lines.splice(i,1);
			player.data.score = player.data.lines.length;
			player.data.time = Date.now();

			return next(null, player);
		}
	}

	let error = {
		status : status.client.input_error,
		message : 'Player does not have this line.'
	}
	return next(error);
}

function line_reset( player, next ){

	player.data.name = player.data.name;
	player.data.lines = [];
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







