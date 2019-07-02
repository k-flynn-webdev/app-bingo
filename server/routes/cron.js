const status = require('../config/status_response.js');

const instances = require('../controllers/instance.js');


module.exports = function( App ) {

	App.get('/cron/instance/',
		function(request, response){

			instances.boot_all_cron( function(result){

				return response.status(status.success.ok).json({
					status : status.success.ok,
					message : result.message,
					data : result.data,
				});

			});
	});

}

