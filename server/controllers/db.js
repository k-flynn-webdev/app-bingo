const mongoose = require('mongoose');
let logger = require( '../log/log.js' );

let db;

connect = function( config ){
	console.log('initilizing: db.');

	let console_error=[];
	db = mongoose.connect( config.db , function( error ){
		if ( error ){ console.error( 'Error: db connecting error._' + error ); console_error.push(error); }
	});
	mongoose.connection.on( 'error' , function( error ){
		if ( error ){ console.error( 'Error: db connection error._' + error ); console_error.push(error); }
	});
	mongoose.connection.on( 'disconnected' , function(){
		console.log( 'Error: db disconnected/closed: ' + config.db + '._');
	});
	mongoose.connection.on( 'connected' , function(){
		if( process.env.NODE_ENV !== 'test' ){
			console.log( 'Success: db connected: ' + config.db );
		}

		return db;
	});

}

module.exports.connect = connect;


function size( model, out ){
	model.collection.stats( function(error, result){
		if(error){
			// ignore TODO
		}
		let db_info = {  
			name : model.modelName,
			count : result.count, 
			storageSize : result.storageSize }; 

		return out( db_info );
	});
}
module.exports.size = size;

function reset( modelName , out ){
		
	let errorObj = { status : 404, message : '' };
	
	let object = mongoose.connection.collections;
	let objectProperty = 'none';

	for (var property in object) {
		if (!object.hasOwnProperty(property)) continue;
		if( property.toLowerCase() === (modelName + 's').toLowerCase() ){
			objectProperty = object[property];
		}
	}

	if( objectProperty === 'none' ){
		errorObj.message = 'collection not found: ' + modelName;
		logger.add(errorObj.message);
		return out( errorObj );
	}

	objectProperty.remove({}, function(error, result){

		if( error ){
			errorObj.message = error.message;
			logger.add(errorObj.message);
			return out( errorObj );
		}

		return out( null, true);

	});

}
module.exports.reset = reset;

// function find( modelType, query ){

// }
// module.exports.find = find;

// function save( model ){

// }
// module.exports.save = save;

