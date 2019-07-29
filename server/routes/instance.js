const status = require('../config/status_response.js');

const instance = require('../controllers/instance.js');

const board_check = require('../controllers/board.validate.js');
const instance_check = require('../controllers/instance.validate.js');

const instance_func = require('../controllers/instance.func.js');

const token = require('../controllers/token.js');
let logger = require( '../log/log.js' );



module.exports = function( App ) {


	App.post('/api/instance/:board/create', 
		board_check.board,
		function(request, response){

			instance.create( request.params.board, function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});
				}

				let var_user = request.body.user || false;
				let var_board = result.data.board || false;
				let var_instance = result || false;
				App.emit("board-start", var_user, var_board, var_instance );

				return response.status(status.success.created).json({
					status : status.success.created,
					message : 'New board instance created.',
					data : instance_func.safe( result ),
				});

			});
	});


	App.post('/api/instance/:board/random', 
		board_check.board,
		function(request, response){

			instance.random( request.params.board, function(error, result){
				
				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				// todo this needs to be if random was found??
				let var_user = request.body.user || false;
				let var_board = result.data.board || false;
				let var_instance = result || false;
				App.emit("board-join", var_user, var_board, var_instance );

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Found a random board instance.',
					data : instance_func.safe( result ),
				});

			});
	});



	// INSTANCE SECTION
	App.get('/api/instance/:instance', 
		instance_check.instance,
		function(request, response){

			instance.fetch( request.params.instance, function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				let msg = 'Latest update.';
				// if an instance has already been won, notify ..
				if( result.data.game.winner.win ){
					msg = 'Game has been won.';
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : msg,
					data : instance_func.safe( result ),
				});


			});
	});

}


