const config = require('../config/config.js');
const status = require('../config/status_response.js');
const m_user = require('../models/user.model.js');
const m_token = require('../models/token.model.js');
const db = require('./db.js');
const user_func = require('./user.func.js');
const helpers = require('./helpers.js');

let messages = [
'missing admin password.',
'missing admin rights.',
'missing admin id.',
'no admin found.',
'no users found.'];

function request( input, next ){

	let adminRights = process.env.ADMINPASSWORD;

	let id_found = user_func.get_id( input );

	if( input.password === adminRights ){

		user_func.get_by_id( id_found, function(error, userFound){

			userFound.role = config.role.admin;
			user_func.save( userFound, function( error, result){

				if( error ){
					return next({
						status : status.server.bad, 
						message : error.message,
					});					
				}

				return next( null, userFound);	

			});
		});

	} else {
		
		return next({
			status : status.client.input_error, 
			message : messages[0],
		});		
	}

}
exports.request = request;


function get_users_all( input, next){
	let users_found = [];
	let search = {};
	admin_user_search(search, next, next);
}
exports.get_users_all = get_users_all;


function get_users_month( input, next){
	let users_results = {};
	let todaysDate = new Date();
	let monthOldDate = new Date ( new Date().setMonth( todaysDate.getMonth() -1 ) ).toISOString();
	todaysDate = new Date().toISOString();

	admin_user_search( {'date.created' : { $gte : monthOldDate, $lt : todaysDate }}, next, function(error, result){
		users_results.new = result;
		admin_user_search( {'date.updated' : { $gte : monthOldDate, $lt : todaysDate }}, next, function(error, result){
			users_results.updated = result;
			admin_user_search( {'date.login' : { $gte : monthOldDate, $lt : todaysDate }}, next, function(error, result){
				users_results.login = result;
				return next(null,users_results);
			});				
		});
	});
}
exports.get_users_month = get_users_month;




function check( req, res, next){

	let id_found = user_func.get_id( req.body );

	if( !helpers.existsValid( id_found )){
		return res.status(status.client.input_error).json({ 
			status : status.client.input_error, 
			message : messages[2],
		});
	}
	
	user_func.get_by_id( id_found, function(error, user_found){

		if( error ){
			return res.status(status.server.bad).json({
				status : status.server.bad, 
				message : error.message,
			});					
		}

		if( !helpers.existsValid( user_found )){
			return res.status(status.server.bad).json({
				status : status.server.bad, 
				message : messages[3],
			});					
		}
 
		if( user_found.role !== 'admin' ){
			return res.status(status.client.unauthorized).json({
				status : status.client.unauthorized, 
				message : messages[1],
			});					
		}

		return next();

	});
}
exports.check = check;


function admin_user_search( search, next, cb){

	let users_found = [];

	m_user.find( search, function(error, users ){

		if( error ){
			return next({
				status : status.server.bad, 
				message : error.message,
			});					
		}

		if( !helpers.existsValid( users )){
			return next({
				status : status.server.bad, 
				message : messages[4],
			});					
		}

		for (let count=0;count<users.length;count++){
			let clean_user = user_func.safe_data( users[count], true );
			users_found.push( clean_user );
		}

		return cb(null,users_found);

	});

}

function get_db_stats( next ){
	// get all model stats :
	let all_stats = [];

	let total = {  
			name : 'All',
			count : 0, 
			storageSize : 0 };

	db.size( m_user, function(result){
		
		total.count += result.count;
		total.storageSize += result.storageSize;

		all_stats.push( result );
		
		db.size( m_token, function(result){
			
			total.count += result.count;
			total.storageSize += result.storageSize;
		
			all_stats.push( result );
			all_stats.unshift( total );

			return next( all_stats );

		});
	})
}
exports.get_db_stats = get_db_stats;

function reset_db( collection ,next ){

	let collectionName = helpers.escape( collection );

	db.reset( collectionName, function(error, result){
		
		if( error ){
			return next({
				status : error.status || 500, 
				message : error.message,
			});					
		}

		return next( null, result );

	})
}
exports.reset_db = reset_db;


