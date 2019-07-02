const path = require( 'path' );
let env_mode = ( process.env.NODE_ENV ).toLowerCase();
let file = path.join( __dirname, env_mode + '.js' );

console.log('cfg: ' + file );

module.exports = require( file );