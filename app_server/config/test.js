let port = process.env.PORT;
let ip = process.env.IP;

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
	rate : { time : 10 * 60 * 1000, max: 1000 },
	db : 'mongodb://127.0.0.1/app_test',
	hash : {
		strength : 10,
	},
	token : { 
		secret : process.env.TOKENSECRET, 
		expiry : 60 * 60 * 24 * 7 },
	game : {
		display : 0.8,
		win : 0.65,
		min : 5,
		max : 20,
		timeout_secs : 100,
	},
}
