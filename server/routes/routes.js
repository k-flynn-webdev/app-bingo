const fs = require('fs');

let loadLast = ['index.js', 'home.js', 'meta.js'];

function isLast( input ){
	for( let i=0;i < loadLast.length;i++){
		if( input == loadLast[i]){
			return true;
		}
	}
	return false;
}

module.exports = function(app){
	fs.readdir(__dirname, function(error, files){

		// reorder array to have files last moved to end ..
		for(let count=files.length-1;count>=0;count--){
			if( isLast(files[count]) ){
				files.push(files.splice(count, 1)[0]);
			}
		}

		// how routes are applied
		console.log('Routes found: ');
		for(let i =0;i<files.length;i++){
			if ( files[i] == 'routes.js' ) continue; // ignore self
			console.log( '	adding  ' + files[i] );
		}
		console.log('\n');

		// apply routes ..
		files.forEach(function(file) {
			let filePath = __dirname + '/' + file;
			if ( file == 'routes.js' ) return; // ignore self
			if ( filePath.endsWith('.js') === false ) return; // ignore none routes
			
			require( filePath )(app);
		});

	});

}