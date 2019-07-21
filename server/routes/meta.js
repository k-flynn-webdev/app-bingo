const status = require('../config/status_response.js');

const meta = require('../controllers/games.meta.js');
const instances = require('../controllers/instance.live.js');


module.exports = function( App ) {


	// leave as api for future apps?
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

	// leave as api for future apps?
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




	App.get('/meta/instance/all',
		function(request, response){

			// just return the entire server instances running

			instances.all( function(result){

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Instances current:',
					data : result,
				});

			});
	});



	App.get('/meta/server/stats',
		function(request, response){

			meta.server_stats( function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Stats so far.',
					data : result,
				});

			});
	});

}


