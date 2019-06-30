let port = process.env.PORT;
let ip = process.env.IP;

const game_cfg = require('./game_cfg.js').CONFIG;


module.exports = {
	string : { min_size : 6, max_size : 200 },
	role : {
		guest : 'guest',
		user : 'user',
		admin : 'admin' },
	file : { max_size : 10 * 20124 * 1024 },
	jsonSpaces : 2,	
	port : port,
	ip : ip,
	rate : { time : 10 * 60 * 1000, max: 500 },
	db : process.env.DATABASEURL,
	hash : {
		strength : 10,
	},
	token : { 
		secret : process.env.TOKENSECRET, 
		expiry : 60 * 60 * 24 * 7 },
	game : {
		display : game_cfg.display,
		win : game_cfg.win,
		min : game_cfg.min,
		max : game_cfg.max,
		timeout_secs : game_cfg.timeout_secs,
	},
}