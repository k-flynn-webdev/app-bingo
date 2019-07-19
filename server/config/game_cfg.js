let game_cfg = {
	display : 0.8,
	win : 0.65,
	min : 5,
	max : 20,
	timeout_secs : 8*60,
};


let board_cfg = {
	lines : {
		min : 8,
		max : 50,		
	}, 
	line : {
		min : 8,
		max : 80,		
	}
};


module.exports = {
	CONFIG : game_cfg,
	BOARD : board_cfg,
}