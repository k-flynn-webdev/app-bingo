

function game_tick( self ){
	// console.log( ' game: tick' );
	self.$store.dispatch('game/set_game', { result : '' } );
}
function game_won( self, winner ){
	// console.log( ' game: won' );
	self.$store.dispatch('game/set_game', { result : 'won' , winner : winner } );
	self.$root.$emit('game-won');
}
function game_lost( self, winner ){
	// console.log( ' game: lost' );
	self.$store.dispatch('game/set_game', { result : 'lost' , winner : winner } );	
	self.$root.$emit('game-lost');
}
function game_kicked( self, response ){
	// console.log( ' game: kicked' );
	// console.log( response );
	kick( self );
}
function game_afk( self ){
	// console.log( ' game: afk kicked' );
	kick( self );
}
function kick( self ){
	self.$store.dispatch('game/set_game', { joined : false } );
	self.$store.dispatch('player/exit');
	self.$root.$emit('game-kicked');	
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


			let winnerURL = response.data.data.game.winner.url; 
			let playerURL = self.$store.getters['player/get_url'];

			if( 
				response.data.data.game.win &&
				winnerURL !== '' &&
				winnerURL === playerURL ){
					return game_won( self, response.data.data.game.winner );
			}

			if( 
				response.data.data.game.win &&
				winnerURL !== '' &&
				winnerURL !== playerURL ){
					return game_lost( self, response.data.data.game.winner );
			}

			// make sure player has joined one time
			if( playerURL === '' ){
				return game_tick( self );
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
				return game_tick( self );
			} else {
				return game_kicked( self, response  );
			}

	}

}


export default {
	game : validate,
}
