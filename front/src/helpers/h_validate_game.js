

// function instance_over( winner, self ){

// 	console.log( 'validate: winner found.' );
// 	// console.log( self.$store.getters['game/get_game'] );
// 	// console.log( self.$store.getters['player/get_url'] );

// 	if( self.$store.getters['player/get_url'] ===  winner.url ){
// 		self.$store.dispatch('game/set_game', { result : 'won' , winner : winner } );
// 	} else {
// 		self.$store.dispatch('game/set_game', { result : 'lost' , winner : winner } );
// 	}
// }

// function instance_tick( self ){
// 	self.$store.dispatch('game/set_game', { result : '' } );
// }

// function player_was_booted( response, self){
// 	self.$root.$emit('game.exit');
// }




function game_tick( self ){
	self.$store.dispatch('game/set_game', { result : '' } );
}
function game_won( self, winner ){
	self.$store.dispatch('game/set_game', { result : 'won' , winner : winner } );
	self.$root.$emit('game.won');
}
function game_lost( self, winner ){
	self.$store.dispatch('game/set_game', { result : 'lost' , winner : winner } );	
	self.$root.$emit('game.lost');
}
function game_kicked( self ){
	self.$root.$emit('game.kicked');
}
function game_afk( self ){
	// console.log( 'validate: player logged out. re-logging in.' );
	self.$root.$emit('player.rejoin');
	self.$root.$emit('player.reset');
}




function validate( response, self ){

	if( 
		response.status === 503 &&
		response.message !== undefined &&
		response.message === "Instance does not have this player, please re-join." ){

			game_afk( self );
			return;
	}

	if( 
		response.status === 404 &&
		response.message !== undefined &&
		response.message === "Instance is now closed, try starting another from the menu." ){

			game_kicked( self );
			return;
	}

	if( 
		// response.status === 202 && 
		response.data !== undefined &&
		response.data.data !== undefined &&
		response.data.data.game !== undefined &&
		response.data.data.game.winner !== undefined &&
		response.data.data.game.winner.url !== undefined ){

		console.log( ' validated' );

			let winnerURL = response.data.data.game.winner.url; 
			let playerURL = self.$store.getters['player/get_url'];

			if( 
				response.data.data.game.win &&
				winnerURL !== '' &&
				winnerURL === playerURL ){
					game_won( self, response.data.data.game.winner );
			}

			if( 
				response.data.data.game.win &&
				winnerURL !== '' &&
				winnerURL !== playerURL ){
					game_lost( self, response.data.data.game.winner );
			}

			let playerFound = false; 
			let players = self.$store.getters['instance/get_players'];
			for( let i = 0; i < players.length; i++){
				if( players[i].url === playerURL ){
					playerFound = true;
					break;
				}
			}

			if( playerFound ){
				game_tick( self );
			} else {
				game_kicked( self );
			}

	}

}


export default {
	game : validate,
}
