const status = require('../config/status_response.js');

const meta = require('../controllers/games.meta.js');


module.exports = function( App ) {

	App.get('/meta/board/latest',
		function(request, response){

			meta.boards_latest( function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Latest boards.',
					data : result,
				});

			});
	});

	App.get('/meta/board/popular',
		function(request, response){

			meta.boards_popular( function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Popular boards.',
					data : result,
				});

			});
	});

	App.get('/meta/board/wins_plays',
		function(request, response){

			meta.wins_plays( function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Win and plays so far.',
					data : result,
				});

			});
	});


	App.get('/meta/instance/players',
		function(request, response){

			meta.instance_players( function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Players currently.',
					data : result,
				});

			});
	});

	App.get('/meta/instance/games',
		function(request, response){

			meta.instance_games( function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Games playing.',
					data : result,
				});

			});
	});
}


