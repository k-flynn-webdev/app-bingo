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

			instance.fetch( request.params.instance, function(error, result_instance){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				// if an instance has already been won, you can only send a leave ..
				if( result_instance.data.game.winner.win ){
					// game has been won already.. end process ..
					return response.status(status.client.unauthorized).json({ 
						status : status.client.unauthorized,
						message : 'Game has been won.', 
						data : instance_func.safe( result_instance ),
					});
				}

				player.create( request.body, result_instance, function(error, result_player){

					if( error ){
						logger.add( error.message );
						return response.status(error.status).json({ 
							status : error.status,
							message : error.message, 
						});	
					}

					instance.update( result_instance );

					return response.status(status.success.created).json({
						status : status.success.created,
						message : 'New player joined.',
						data : player_func.safe( result_player ),
					});
				});
			});
	});

	// // Player update 
	App.put('/api/instance/:instance', 
		instance_check.instance,
		player_check.player,
		function(request, response){

			instance.fetch( request.params.instance, function(error, result_instance){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				// if an instance has already been won, you can only send a leave ..
				if( result_instance.data.game.winner.win ){
					// game has been won already.. end process ..
					return response.status(status.client.unauthorized).json({ 
						status : status.client.unauthorized,
						message : 'Game has been won.', 
						data : instance_func.safe( result_instance ),
					});
				}

				player.update( request.body.player, result_instance, function(error, result_player){
					
					if( error ){
						logger.add( error.message );
						return response.status(error.status).json({ 
							status : error.status,
							message : error.message, 
						});
					}

					instance.update( result_instance );
					instance.update_time( result_instance );

					let clean_instance = instance_func.safe( result_instance );

					let gameLost = false;
					let gameWon = false;
					if( clean_instance.data.game.winner.win ){
						if( clean_instance.data.game.winner.url === result_player.url ){
							gameWon = true;
						} else {
							gameLost = true;
						}
					}

					// if an instance has already been won, you can only send a leave ..
					if( gameLost ){
						// game has been won already.. end process ..
						return response.status(status.client.unauthorized).json({ 
							status : status.client.unauthorized,
							message : 'Game has been lost.',
							data : clean_instance,
						});
					}

					let updateResult = request.body.player; // bounce back confirm ..
					Object.assign(updateResult, player_func.safe( result_player ));
					if( gameWon ){
						updateResult.data.game = clean_instance.data.game;
					}

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

			instance.fetch( request.params.instance, function(error, result_instance){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				player.remove( request.body.player, result_instance, function(error, result_player){

					if( error ){
						logger.add( error.message );
						return response.status(error.status).json({ 
							status : error.status,
							message : error.message, 
						});	
					}

					instance.update( result_instance );
					
					return response.status(status.success.ok).json({
						status : status.success.ok,
						message : 'Player removed.',
						data : player_func.safe( result_player ),
					});
				});
			});
	});

}


