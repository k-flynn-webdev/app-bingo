"use strict";

// envs 
const env_name = process.env.npm_package_name;
const env_version = process.env.npm_package_version;
const env_mode = (process.env.NODE_ENV).toLowerCase();

const path = require('path');

// cfgs
const config = require( path.join(__dirname, 'config', 'config.js'));

const express = require('express');

// extras
const cors = require('cors');
const filter = require('content-filter'); // prevent db attacks in urls 
const rateLimit = require("express-rate-limit");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');


const app = express();

// // for CORS 
app.use(function(req, res, next) {
	res.header(
		"Access-Control-Allow-Headers", 
		"Origin, Authorization, Content-Type, Accept");
	next();
});
app.use(cors());
// if( process.env.NODE_ENV === 'development' ){
// todo need to learn this stuff!
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Expose-Headers", "Authorization, X-Another-Custom-Header");	
// }

app.use( rateLimit({ 
	windowMs: config.rate.time, 
	max: config.rate.max, 
	message: { 
		status: 429, 
		message: "Too many requests." 
}}));

app.use( filter());
app.use( bodyParser.urlencoded( { extended: true } ));
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( methodOverride('_method'));
app.use( fileUpload({ limits: { filesize: config.file.max_size },})); // also adds multipart form uploads

app.set( 'json spaces', config.jsonSpaces );

// use morgan to log requests to the console
require( path.join(__dirname, 'log', 'log.js')).init( app );

// ===================== Declare static folders ================ //
app.use( express.static( path.join(__dirname, 'public') ));

// ===================== DB SETUP ===================== //
require( path.join(__dirname, 'controllers', 'db.js')).connect( config );

// ===================== ROUTE SETUP ===================== //
require( path.join(__dirname, 'routes', 'routes.js'))(app);

// ===================== SERVER START ===================== //

let line_start = '    ';
let line_end = ',\n';

app.listen( config.port , function(){ console.log( 
	"\nstarting:\n" +
	line_start + "app: " + env_name + line_end +
	line_start + "ver: " + env_version + line_end +
	line_start + "mode: " + env_mode + line_end +
	line_start + "address: " + config.ip + "::" + config.port + '.\n' 
);});

module.exports = app; // for testing
