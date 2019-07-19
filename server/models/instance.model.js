const mongoose = require('mongoose');
const helpers = require('../controllers/helpers.js');
const config = require('../config/config.js');


var instance = mongoose.Schema({
	url : { type: String, required: true },
	data : {
		board : { type: mongoose.Schema.Types.ObjectId, required: true },
		players : { type: Array, required: true, default: [] },
		lines : { type: Array, required: true, default: [] },
		date : {
			created : { type: Date, required: true, default : Date.now() },
		},
		game : {
			time : { type: Date, required: true, default : Date.now() },
			win : { type : Number, required : true, default : 0 },
			display : { type : Number, required : true, default : 0 },
			// ahead : { type : String , required : true, default : '' },
			// winner : { type : String , required : true, default : '' },	
			winner : { 
				win : { type : Boolean, required : true, default : false },
				url : { type : String , required : true, default : '' },
				data : {
					name : { type : String , required : true, default : '' },
					score : { type : Number, required : true, default : 0 },	
				},
			},	
		},		
	},
})

module.exports = mongoose.model('Instance', instance);



function preSaveFunc( object ){
	// object.name = helpers.shorten( object.name, 100);
	// object.email = helpers.shorten( object.email, 100);
	return object;
}
exports.preSaveFunc = preSaveFunc;

instance.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
instance.pre('update', function (next) {
	preSaveFunc(this);	
	next();
});