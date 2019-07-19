const status = require('../config/status_response.js');
const board = require('../controllers/board.js');
const board_func = require('../controllers/board.func.js');
const board_check = require('../controllers/board.validate.js');
// const token = require('../controllers/token.js');
let logger = require( '../log/log.js' );


module.exports = function( App ) {

	App.post('/api/board/create', 
		board_check.create,
		board_check.name,
		board_check.lines,
		function(request, response){

			board.create( request.body, function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.created).json({
					status : status.success.created,
					message : 'New board created.',
					data : board_func.safe( result ),
				});

			});
	});

	App.get('/api/board/:board',
		board_check.board,
		function(request, response){

			board.get( request.params.board, function(error, result){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : 'Board data.',
					data : board_func.safe( result ),
				});

			});
	});


}


