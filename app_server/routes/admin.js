const user = require('../controllers/user.js');
const user_func = require('../controllers/user.func.js');
const check_user = require('../controllers/user.validate.js');

const admin = require('../controllers/admin.js');
const token = require('../controllers/token.js');
const status = require('../config/status_response.js');
let logger = require( '../log/log.js' );


module.exports = function( App ) {

	App.post('/api/admin/request', 
		token.check,
		check_user.password,
		function(request, response){

			admin.request( request.body, function(error, user_model){

				if( error ){
					return response.status(error.status).json({ 
						status : error.status, 
						message : error.message, 
					});
				}

				return response.status(status.success.accepted).json({ 
					status : status.success.accepted,
					message : 'success, admin rights granted.', 
					token : token.create( user_func.safe_data( user_model )),					
				});

			});
	});


	App.post('/api/admin/stats', 
		token.check,
		admin.check,
		function(request, response){
			
			admin.get_db_stats( function(result){

				return response.status(status.success.ok).json({ 
					status : status.success.ok,
					message : 'DB stats.', 
					data : result,
				});

			});
	});

	App.post('/api/admin/reset/:collection', 
		token.check,
		admin.check,
		function(request, response){
			
			admin.reset_db( request.params.collection, function(error, result){

				if( error ){
					return response.status(error.status).json({ 
						status : error.status, 
						message : error.message, 
					});
				}

				return response.status(status.success.ok).json({ 
					status : status.success.ok,
					message : 'DB collection reset: ' + request.params.collection + '.', 
				});

			});
	});

	App.post('/api/admin/user/all', 
		token.check,
		admin.check,
		function(request, response){
			admin.get_users_all( request.body, function(error, result){

				if( error ){
					return response.status(error.status).json({ 
						status : error.status, 
						message : error.message, 
					});
				}

				return response.status(status.success.ok).json({ 
					status : status.success.ok,
					message : 'Users found: all(' + result.length + ').', 
					data : result,
				});

			});
	});
	App.post('/api/admin/user/month', 
		token.check,
		admin.check,
		function(request, response){
			admin.get_users_month( request.body, function(error, result){

				if( error ){
					return response.status(error.status).json({ 
						status : error.status, 
						message : error.message, 
					});
				}

				return response.status(status.success.ok).json({ 
					status : status.success.ok,
					message : 'Users found: month(' + result.new.length + ').', 
					data : result,					
				});

			});
	});

	App.put('/api/admin/user/:user', 
		token.check,
		admin.check,
		function(request, response){

			user.update_with_id( request.params.user, request.body, function(error, user_model){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}				

				return response.status(status.success.accepted).json({
					status : status.success.accepted,
					message : 'user successfully edited by admin.',
					data : user_func.safe_data( user_model, true ),
				});

			});			
	});

	App.delete('/api/admin/user/:user', 
		token.check,
		admin.check,
		function(request, response){

			user.remove_with_id( request.params.user, request.body, function(error, user_model){

				if( error ){
					logger.add( error.message );
					return response.status(error.status).json({ 
						status : error.status,
						message : error.message, 
					});	
				}				

				return response.status(status.success.accepted).json({
					status : status.success.accepted,
					message : 'user successfully deleted by admin.',
					data : user_func.safe_data( user_model, true ),
				});

			});			
	});

}


