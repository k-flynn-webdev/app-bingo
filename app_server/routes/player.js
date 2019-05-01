 const status = require('../config/status_response.js');

const instance = require('../controllers/instance.js');
const player = require('../controllers/player.js');

const board_check = require('../controllers/board.validate.js');
const instance_check = require('../controllers/instance.validate.js');
const player_check = require('../controllers/player.validate.js');

const instance_func = require('../controllers/instance.func.js');
const player_func = require('../controllers/player.func.js');

const token = require('../controllers/token.js');
let logger = require( '../log/log.js' );





module.exports = function( App ) {


	// Player join 
	App.post('/api/instance/:instance', 
		instance_check.instance,
		player_check.join,
		function(request, response){

			instance.fetch( request.params.instance, function(error, instanceResult){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				// if an instance has already been won, you can only send a leave ..
				if( instanceResult.data.game.winner !== "" ){
					// game has been won already.. end process ..
					return response.status(status.client.unauthorized).json({ 
						status : status.client.unauthorized,
						message : 'Game has been won.', 
						win : true,
					});
				}				

				player.create( request.body, instanceResult, function(error, result){

					if( error ){
						logger.add( error.message );
						return response.status(error.status).json({ 
							status : error.status,
							message : error.message, 
						});	
					}

					instance.update( instanceResult );

					return response.status(status.success.created).json({
						status : status.success.created,
						message : 'New player joined.',
						data : player_func.safe( result ),
					});
				});
			});
	});

	// // Player update 
	App.put('/api/instance/:instance', 
		instance_check.instance,
		player_check.player,
		function(request, response){

			instance.fetch( request.params.instance, function(error, instanceResult){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				// if an instance has already been won, you can only send a leave ..
				if( instanceResult.data.game.winner !== "" ){
					// game has been won already.. end process ..
					return response.status(status.client.unauthorized).json({ 
						status : status.client.unauthorized,
						message : 'Game has been won.', 
						win : true,
					});
				}	

				player.update( request.body.player, instanceResult, function(error, result){
					
					if( error ){
						logger.add( error.message );
						return response.status(error.status).json({ 
							status : error.status,
							message : error.message, 
						});
					}

					instance.update( instanceResult );
					instance.update_time( instanceResult );


					// did this update win?
					if( instanceResult.data.game.winner !== "" ){
						// game has been won already.. end process ..
						return response.status(status.client.unauthorized).json({ 
							status : status.client.unauthorized,
							message : 'Game has been won.', 
							win : true,
						});
					}
					

					let updateResult = request.body.player;
					updateResult.score = result.data.score;

					return response.status(status.success.accepted).json({
						status : status.success.accepted,
						message : 'Player updated successfully.',
						data : updateResult,
					});
				});
			});
	});

	// // Player remove 
	App.delete('/api/instance/:instance', 
		instance_check.instance,
		player_check.player,
		function(request, response){

			instance.fetch( request.params.instance, function(error, instanceResult){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				player.remove( request.body.player, instanceResult, function(error, result){

					if( error ){
						logger.add( error.message );
						return response.status(error.status).json({ 
							status : error.status,
							message : error.message, 
						});	
					}

					instance.update( instanceResult );
					
					return response.status(status.success.ok).json({
						status : status.success.ok,
						message : 'Player removed.',
						data : result,
					});
				});
			});
	});

}


