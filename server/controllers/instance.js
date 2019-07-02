const config = require('../config/config.js');
const status = require('../config/status_response.js');
const helpers = require('./helpers.js');
let logger = require( '../log/log.js' );


const instance_func = require('../controllers/instance.func.js');
const board_func = require('../controllers/board.func.js');

const instance_live = require('../controllers/instance.live.js');
const player = require('../controllers/player.js');

const m_instance = require('../models/instance.model.js');



function base_search( url, board){
	let url_id = '';
	let board_id = '';
	let object = {};

	if( url !== undefined  && url !== false ){
		url_id = url;
		object.url = url_id;
	}
	if( board !== undefined && board !== false ){
		board_id = board;
		object.data = { board : board_id };
	}

	return object;
}


function create( input, next){
		
	instance_func.create( input, null, function( error, newInstance){

		if( error ){
			return next( error );
		}

		instance_live.insert( newInstance );

		return next(null, newInstance );
	});	
}
exports.create = create;


function random( board_url, next){

	let instance = base_search( false, board_url );

	let randomBoard = instance_live.random( instance, instance );

	if( randomBoard !== false ){

		return next(null, randomBoard );

	} else {

		create( board_url, next);

	}
}
exports.random = random;


// function join( instance_url, board_url, next){

// 	let search = { url : true };
// 	let instance = base_search(instance_url, board_url);

// 	let instanceJoin = instance_live.get( search, instance );

// 	if( !instanceJoin ){

// 		let error = {
// 			status : status.client.unavailable,
// 			message : 'Instance is now closed, try starting another from the menu.',
// 		}	
// 		return next( error );

// 	} else {


// 	}



// 	if( instanceJoin !== false ){

// 		return next(null, instanceJoin );

// 	} else {

// 		instance_func.create( board_url, instance_url, function(error, newInstance){

// 			instance_live.insert( newInstance );

// 			if( error ){
// 				return next( newInstance );
// 			}

// 			return next(null, newInstance );
// 		});
		
// 	}
// }
// exports.join = join;


function remove( instance_url ){

	let obj = { url : instance_url };

	result = instance_live.remove( obj );
	if( result ){
		console.log( 'Instance: (' + obj.url + ') removed.');
	} else {
		logger.add( 'Error removing instance: (' + obj.url + ').' );
		console.log( 'Error removing instance: (' + obj.url + ').');
	}

}
exports.remove = remove;


function fetch( instance_url, next){

	let instance = base_search( instance_url );

	let instanceFound = instance_live.get( instance, instance );

	if( !instanceFound ){
		let error = {
			status : status.client.not_found,
			message : 'Instance is now closed, try starting another from the menu.',
		}
		return next( error );			
	}

	// clearing old or timed out players ..
	boot_dead_players( instanceFound[0] );	

	return next(null, instanceFound[0] );
}
exports.fetch = fetch;



// TODO when a player is removed, if they've been ahead clear that
// TODO when a player is removed, when they poll they should be notified directly in a compnent..
// {
//   "status": 503,
//   "message": "Instance does not have this player, please re-join."
// }
// need to fix this


function update( instanceFound ){

	// clearing old or timed out players ..
	// boot_dead_players( instanceFound );

	if( !instanceFound.data.game.winner.win ){

		// resetting ..
		// instanceFound.data.game.ahead = '';

		// sort players ..
		instanceFound.data.players.sort( sort_by_players );


		// work out winners ..
		// let player_ahead = ahead( instanceFound.data.players );
		let player_win = winner( instanceFound.data.players, instanceFound.data.game.win );

		// if( player_ahead !== -1 ){
		// 	instanceFound.data.game.ahead = instanceFound.data.players[ player_ahead ].url;
		// }
		if( player_win !== -1 ){
			instance_func.instance_won( instanceFound, instanceFound.data.players[ player_win ] );
		}		
	}

}
exports.update = update;



function update_time( instanceFound ){
	instanceFound.data.game.time = Date.now();
}
exports.update_time = update_time;



function sort_by_players( a, b ){
	let temp = b.data.score - a.data.score;

	if(temp !== 0){
		return temp;
	}

	let time = b.data.joined - a.data.joined;
	return time;

}

// function ahead( players ){
// 	// TODO remove this..
// 	let index = -1;
// 	let score = 0;

// 	for(let i=0;i<players.length;i++){
// 		if( players[i].data.score > score ){
// 			index = i;
// 			score = players[i].data.score;
// 		}
// 	}

// 	return index;
// }

function winner( players, win ){

	let index = -1;
	let score = win;

	for(let i=0;i<players.length;i++){
		if( players[i].data.score >= score ){
			index = i;
			score = players[i].data.score;
		}
	}

	return index;
}

console.log('Removing players after (' + config.game.timeout_secs + ')secs inactivity. ');


// run by a cron job?
function boot_all_cron( next ){

	let result = {
		message : '',
		data : {
			total : {
				players : 0,
				instances : 0,				
			},
			removed : {
				players : 0,
				instances : 0,
			},
		},
	};

	instance_live.all( function( instances_all ){

		result.data.total.instances = instances_all.length;	
		for( let i = instances_all.length -1; i >= 0; i--){
			result.data.total.players += instances_all[i].data.players.length;
		}

		for( let i = instances_all.length -1; i >= 0; i--){
			result.data.removed.players += boot_dead_players( instances_all[i] );
		}

		for( let i = instances_all.length -1; i >= 0; i--){
			result.data.removed.instances += boot_dead_instance( instances_all[i] );
		}

		result.message = 'Cron job instance finished.';
		
		return next(result);
	});
}
exports.boot_all_cron = boot_all_cron;


function boot_dead_players( instance ){

	let players_removed = 0;

	for( let i = instance.data.players.length -1; i >= 0; i--){
		if( !valid_time( instance.data.players[i] )){
			player.remove_direct( instance.data.players[i], instance );
			players_removed +=1;
		}
	}

	return players_removed;
}

function boot_dead_instance( instance ){

	let instances_removed = 0;

	// close instance ..
	let playerLength = instance.data.players.length < 1;
	if( playerLength ){
		instances_removed +=1;
		// begin removal after 10sec..
		setTimeout( function(){
			remove( instance.url );
		}, 10 * 1000 );
	}

	return instances_removed;
}

function valid_time( player ){
	let dateNow = Date.now();
	let datePlayer = new Date( player.data.time );
	let diff = Math.abs(dateNow - datePlayer); // in mss
	let seconds = Math.floor((diff/1000));
	// let minutes = Math.floor((diff/1000)/60);

	if( seconds >= config.game.timeout_secs ){
		console.log('player (' + player.url + ') last updated: ' + seconds + 's ago. Removing.');
		return false;
	} 
	return true;
}


// function search( search, next ){
	
// 	// m_board.find({ _id : input.id }, function(error, boardFound){
// 	m_board.find( search, function(error, boardsFound){

// 		if( error ){
// 			return next({ 
// 				status : status.server.bad, 
// 				message : error.message 
// 			});
// 		}

// 		if( !helpers.existsValid( boardsFound )){
// 			return next({ 
// 				status : status.server.bad,  
// 				message : 'No board found.',
// 			});
// 		}

// 		return next(null, boardsFound); // TODO
// 	});
// }
// exports.search = search;



