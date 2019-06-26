

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

function instance_closed( response, self ){
	console.log( response.message );
	self.$root.$emit('game.exit');
}

function player_afk(self){
	console.log( 'validate: player logged out. re-logging in.' );
	self.$root.$emit('player.check');
}


function validate( response, self ){

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

			player_afk(self);
			return;
	}

	if( 
		response.status === 404 &&
		response.message !== undefined &&
		response.message === "Instance is now closed, try starting another from the menu." ){

			instance_closed(response, self);
			return;
	}

}


export default {
	game : validate,
}
