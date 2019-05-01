const helpers = require('../controllers/helpers.js');

const m_board = require('../models/board.model.js');
const instance_live = require('../controllers/instance.live.js');




function instance_players( next ){
	return next(null, instance_live.players());
}
exports.instance_players = instance_players;

function instance_games( next ){
	return next(null, instance_live.games());
}
exports.instance_games = instance_games;




// Front page index ..
function boards_latest( next ){

	let start = new Date();
	let end = new Date();
	end.setMonth(end.getMonth() - 3);

	let searchParams = {};

	// let searchParams = { "data.date.created" : { $gte : start, $lt : end } };
	searchParams['data.date.created'] = { $gte : end , $lt : start };
	let sortParams = [['data.date.created', -1]];

	search( searchParams, sortParams, next);
}
exports.boards_latest = boards_latest;


function boards_popular( next ){

	let start = new Date();
	let end = new Date();
	end.setMonth(end.getMonth() - 3);

	let searchParams = {};

	// let searchParams = { "data.date.created" : { $gte : start, $lt : end } };
	searchParams['data.stats.played'] = { $gte : end , $lt : start };
	let sortParams = [['data.stats.plays', -1]];

	search( searchParams, sortParams, next);
}
exports.boards_popular = boards_popular;


function wins_plays( next ){
	let wins = 0;
	let plays = 0;

 	m_board.find({}, function(error, boardsFound){

		if( error ){
			return next(error);
		}

		if( !helpers.existsValid(boardsFound) ){
			return next(false);
		}

 		for(let i =0; i < boardsFound.length;i++){
 			wins += boardsFound[i].data.stats.wins;
 			plays += boardsFound[i].data.stats.plays;
 		}

 		return next(null, { wins : wins, plays : plays });

	});
}
exports.wins_plays = wins_plays;






function search( search, sort, next ){
	
	if( sort !== null ){
		m_board.find(search).sort(sort).exec(function(error, boardsFound ){

			if( error ){
				return next({ 
					status : status.server.bad, 
					message : error.message 
				});
			}

			if( !helpers.existsValid( boardsFound )){
				return next({ 
					status : status.server.bad,  
					message : 'No board found.',
				});
			}

			return next(null, boardsFound); // TODO	
		});	
	} else {
		 m_board.find(search, function(error, boardsFound){
		 	
			if( error ){
				return next({ 
					status : status.server.bad, 
					message : error.message 
				});
			}

			if( !helpers.existsValid( boardsFound )){
				return next({ 
					status : status.server.bad,  
					message : 'No board found.',
				});
			}

			return next(null, boardsFound); // TODO	
		});		
	}
}
