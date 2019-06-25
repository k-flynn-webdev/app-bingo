

function game_over( winner, self ){

	console.log( 'validate: winner found.' );
	// console.log( self.$store.getters['game/get_game'] );
	// console.log( self.$store.getters['player/get_url'] );

	if( self.$store.getters['player/get_url'] ===  winner.url ){
		self.$store.dispatch('game/set_game', { result : 'won' , winner : winner } );
	} else {
		self.$store.dispatch('game/set_game', { result : 'lost' , winner : winner } );
	}
}

function timed_out( winner, self ){

	console.log( 'validate: winner found.' );
	// console.log( self.$store.getters['game/get_game'] );
	// console.log( self.$store.getters['player/get_url'] );

	if( self.$store.getters['player/get_url'] ===  winner.url ){
		self.$store.dispatch('game/set_game', { result : 'won' , winner : winner } );
	} else {
		self.$store.dispatch('game/set_game', { result : 'lost' , winner : winner } );
	}
}

function logged_out(self){
	console.log( 'validate: player logged out. re-logging in.' );
	self.$root.$emit('player.check');
}


function validate( response, self ){

	// game won / lost
	if( 
		// response.status === 202 && 
		response.data !== undefined &&
		response.data.data !== undefined &&
		response.data.data.game !== undefined &&
		response.data.data.game.winner !== undefined &&
		response.data.data.game.winner.url !== undefined ){

		console.log( ' validated' );

			if( response.data.data.game.winner.url !== '' ){
				game_over( response.data.data.game.winner, self);
			} else {
				self.$store.dispatch('game/set_game', { result : '' } );
			}
			return;
	}


	if( 
		response.status === 503 &&
		response.message !== undefined &&
		response.message === "Instance does not have this player, please re-join." ){

			logged_out(self);

	}


		// response.data.winner.url !== ''){
			// game_over( response.data.winner.url, self);
	// }


	// if( response.status === 401 && 
	// 	response.data !== undefined &&
	// 	response.data.winner !== undefined &&
	// 	response.data.winner.url !== undefined &&
	// 	response.data.winner.url !== ''){
	// 		game_over(self);
	// }


}


export default {
	game : validate,
}
