const user = require('../controllers/user.js');
const user_func = require('../controllers/user.func.js');
const check_user = require('../controllers/user.validate.js');

const token = require('../controllers/token.js');
const token_func = require('../controllers/token.func.js');
const token_server = require('../controllers/token.server.js');
const status = require('../config/status_response.js');
let logger = require( '../log/log.js' );


let messages = [
	'success new user created.',
	'success user updated.',
	'user deleted, goodbye.' ];


// Events
function add_events( App ){
	App.on("board-create", user_func.board_add );
}
exports.add_events = add_events;



module.exports = function( App ) {


	// register events
	user.add_events( App );


	App.post('/api/account/create', 
		check_user.create, 
		check_user.name, 
		check_user.email, 
		check_user.password, 
		function(request, response){

			user.create( request.body, function(error, user_model){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.created).json({
					status : status.success.created,
					message : messages[0],
					data : user_func.safe_data( user_model ),
					token : token.create( user_func.safe_data( user_model )),
				});	
			});
	});

	App.put('/api/account', 
		token.check, 
		token_server.remove,
		check_user.name, 
		check_user.email, 
		check_user.password,		
		function(request, response){

			user.update( request.body, function(error, user_model){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}				

				token.clear( request );

				return response.status(status.success.accepted).json({
					status : status.success.accepted,
					message : messages[1],
					data : user_func.safe_data( user_model ),
					token : token.create( user_func.safe_data( user_model )),
				});

			});
	});

	App.delete('/api/account', 
		token.check, 
		token_server.remove, 
		function(request, response){

			user.remove( request.body, function(error, user_model){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				token.clear( request );

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : messages[2],
				});

			});
	});
}


