const mongoose = require('mongoose');
const helpers = require('../controllers/helpers.js');
const config = require('../config/config.js');

let default_date = new Date( 'January 01, 2000 00:00:00' );

var user = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	date : {
		created : { type: Date, required: true, default : new Date() },
		updated : { type: Date, required: true, default : default_date },
		login : { type: Date, required: true, default : default_date },
	},
	role: { type: String, required: true, default : config.role.user },
})

module.exports = mongoose.model('User', user);



function preSaveFunc( object ){
	// object.name = helpers.shorten( object.name, 100);
	// object.email = helpers.shorten( object.email, 100);
	return object;
}
exports.preSaveFunc = preSaveFunc;

user.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
user.pre('update', function (next) {
	preSaveFunc(this);	
	next();
});