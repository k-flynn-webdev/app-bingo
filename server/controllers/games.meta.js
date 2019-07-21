const helpers = require('../controllers/helpers.js');

const m_board = require('../models/board.model.js');
const instance_live = require('../controllers/instance.live.js');



function server_stats( next ){

	let stats_obj = {
		games_played : 0,
		games_won : 0,
		games : instance_live.games().games,
		players : instance_live.players().players,
	}

 	m_board.find({}, function(error, boardsFound){

		if( error ){
			return next({ 
				status : error.status,
				message : error.message 
			});
		}

		if( !helpers.existsValid(boardsFound) ){
			return next({ 
				status : 404,
				message : 'No boards found.'
			});
		}

 		for(let i =0; i < boardsFound.length;i++){
 			stats_obj.games_won += boardsFound[i].data.stats.wins;
 			stats_obj.games_played += boardsFound[i].data.stats.plays;
 		}

		return next(null, stats_obj );

	});	
}
exports.server_stats = server_stats;


function boards_summary( input ){

	let sum_objs = [];

	for( let i =0; i < input.length;i++){
		let temp_obj = {
			url : input[i].url,
			name : input[i].data.name,
			plays : input[i].data.stats.plays,
			wins : input[i].data.stats.wins,
			lines : input[i].data.lines.length,
		};
		sum_objs.push(temp_obj);
	}
	return sum_objs;
}


// Front page index ..
function boards_latest( next ){

	let start = new Date();
	let end = new Date();
	end.setMonth(end.getMonth() - 3);

	let searchParams = {};

	// let searchParams = { "data.date.created" : { $gte : start, $lt : end } };
	searchParams['data.date.created'] = { $gte : end , $lt : start };
	let sortParams = [['data.date.created', -1]];

	search( searchParams, sortParams, boards_summary, next );
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

	search( searchParams, sortParams, boards_summary, next );
}
exports.boards_popular = boards_popular;



// TODO
function search( search, sort, edit, next ){
	
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

			if(edit !== undefined || edit !== null ){
				boardsFound = edit( boardsFound )
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

			if(edit !== undefined || edit !== null ){
				boardsFound = edit( boardsFound )
			}

			return next(null, boardsFound); // TODO	
		});		
	}
}
