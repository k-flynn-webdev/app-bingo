const token = require('../controllers/token.js');
const path = require('path');
const status = require('../config/status_response.js');

module.exports = function( App ) {

	App.get('/*', function(request, response){
		response.status(status.success.ok).sendFile( path.join(__dirname, '..', 'public', 'index.html' ));
	});

}


