const mongoose = require('mongoose');
const helpers = require('../controllers/helpers.js');
const config = require('../config/config.js');

let default_date = new Date( 'January 01, 2000 00:00:00' );

var board = mongoose.Schema({
	url : { type: String, required: true, default : 'url' },
	data : {
		name : { type: String, required: true },
		owner : { type: mongoose.Schema.Types.ObjectId },
		date : {
			created : { type: Date, required: true, default : new Date() },
		},
		lines : { type: Array, required: true },
		stats : {
			played : { type: Date, required: true, default : new Date() },
			plays : { type: Number, required: true, default : 0, },
			wins : { type: Number, required: true, default : 0, },
		}
	},
})

module.exports = mongoose.model('Board', board);


function preSaveFunc( object ){

	// let tiles_display = Math.round( object.data.words.length * config.game.display );
	// if( tiles_display > config.game.max ){
	// 	tiles_display = config.game.max;
	// }

	// let tiles_win = Math.round( object.data.words.length * config.game.win );

	// if( tiles_display == tiles_win ){
	// 	tiles_display -= 1;
	// }

	// if( object.data.words.length < 7 ){
	// 	tiles_win = object.data.words.length;
	// 	tiles_display = object.data.words.length;
	// }

	// object.data.game.display = tiles_display;
	// object.data.game.win = tiles_win;
	
	return object;
}
exports.preSaveFunc = preSaveFunc;

board.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
board.pre('update', function (next) {
	preSaveFunc(this);	
	next();
});