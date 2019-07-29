const mongoose = require('mongoose');
const helpers = require('../controllers/helpers.js');
const config = require('../config/config.js');


var player = mongoose.Schema({
	url : { type: String, required: true },
	data : {
		owner : { type: mongoose.Schema.Types.ObjectId },
		time : { type: Date, required: true, default : Date.now() },
		joined : { type: Date, required: true, default : Date.now() },
		name : { type: String, required: true },
		score : { type: Number, required: false, default : 0 },
		lines : { type: Array, required: false  },
	}
})

module.exports = mongoose.model('Player', player);



function preSaveFunc( object ){
	// object.name = helpers.shorten( object.name, 100);
	// object.email = helpers.shorten( object.email, 100);
	return object;
}
exports.preSaveFunc = preSaveFunc;

player.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
player.pre('update', function (next) {
	preSaveFunc(this);	
	next();
});