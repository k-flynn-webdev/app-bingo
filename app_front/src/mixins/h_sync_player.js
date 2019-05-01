export const player = {	
	methods : {
		check_player_sync : function( players ){

			if( players === undefined || players.length === 0 ){
				return true; // no players..
			}

			let player = this.$store.getters['game/get_player'];

			let index = this.player_index( players, player);
			if( index < 0 ){
				// console.log('sync: no player index found, exiting.');
				return false;
			}

			let playerServer = players[index];

			if( this.player_diff( playerServer, player) ){
				// console.log('sync: player in sync.');
				// true, no action needed ..
			} else {
				// out of sync need action ..
				// console.log( 'sync: player on server is out of sync, triggering update..');
				this.$root.$emit('state_score_update');
			}
		},
		player_index : function( players, player ){
			for(let i=0;i<players.length;i++){
				if( players[i].url === player.url){
					return i;
				}
			}
			return -1;
		},
		player_diff : function( playerServer, player){

			if( playerServer.data.name != player.data.name ){
				// console.log('name issue.');
				return false;
			}
			if( playerServer.data.score != player.data.score ){
				// console.log('score issue.');
				return false;
			}

			if( playerServer.data.words.toString() !== player.data.words.toString() ){
				// console.log('words missing issue. ' + playerServer.data.words.length + ' : ' + player.data.words.length );
				return false;				
			}

			// all test passed..
			return true;
		},
	},
}

