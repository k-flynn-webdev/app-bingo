const status = require('../config/status_response.js');

const instance = require('../controllers/instance.js');

const board_check = require('../controllers/board.validate.js');
const instance_check = require('../controllers/instance.validate.js');

const instance_func = require('../controllers/instance.func.js');

const token = require('../controllers/token.js');
let logger = require( '../log/log.js' );



module.exports = function( App ) {


	App.get('/api/instance/:board/create', 
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

				return response.status(status.success.created).json({
					status : status.success.created,
					message : 'New board instance created.',
					data : instance_func.safe( result ),
				});

			});
	});


	App.get('/api/instance/:board/random', 
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


				// if an instance has already been won, notify ..
				if( result.data.game.winner !== "" ){

					return response.status(status.success.accepted).json({
						status : status.success.accepted,
						message : 'Game has been won.',
						data : instance_func.safe( result ),
					});

				} else {

					return response.status(status.success.ok).json({
						status : status.success.ok,
						message : 'Latest update.',
						data : instance_func.safe( result ),
					});

				}




			});
	});

}


