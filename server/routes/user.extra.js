const user = require('../controllers/user.js');
const user_func = require('../controllers/user.func.js');
const user_extra = require('../controllers/user.extra.js');
const check_user = require('../controllers/user.validate.js');

const token = require('../controllers/token.js');
const token_server = require('../controllers/token.server.js');

const status = require('../config/status_response.js');
const logger = require( '../log/log.js' );


let messages = [
	'success welcome back.',
	'success user logged out, goodbye.'];

// user paths 
module.exports = function( App ) {

	App.post('/api/account/login',
		check_user.login, 
		check_user.email, 
		check_user.password, 
		function(request, response){

			user_extra.login( request.body, function(error, user_model){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : messages[0],
					token : token.create( user_func.safe_data( user_model )),
				});	
			});
	});

	App.post('/api/account/logout',
		token.check, 
		token_server.remove, 
		function(request, response){

			user_extra.logout( request.body, function(error, user_model){

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
					message : messages[1],
					token : '',
				});	

			});
	});

}


