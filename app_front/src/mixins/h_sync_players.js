export const players = {	

	data(){
		return {
			sync : {
				init : false,
				players : [],
				almost : '',
				win : '',
			},	
		}
	},	
	methods : {
		check_players_sync : function( input, msg ){

			if( !this.sync.init ){

				this.copy_server_to_local( input );

			} else {

				if( input.data.players.length > 1){

					let playerChange = input.data.players.length - this.sync.players.length;
					
					if( playerChange > 0 ){
						this.player_joined( input.data.players, this.sync.players, msg );
					}

					if( playerChange < 0 ){
						this.player_left( input.data.players, this.sync.players, msg );
					}

					if( this.sync.almost !== input.data.almost ){
						let index = find_index( { url : input.data.almost }, this.sync.players);
						console.log( index );
						console.log( this.sync.players[ index ] );
						this.player_almost( this.sync.players[ index ], msg );
					}

					if( this.sync.won !== input.data.won ){
						let index = find_index( { url : input.data.won }, this.sync.players);
						console.log( index );
						console.log( this.sync.players[ index ] );
						this.player_winning( this.sync.players[ index ], msg );
					}

					this.copy_server_to_local( input );
				}
			}	
		},

		copy_server_to_local : function( input ){
			this.sync.players = input.data.players;
			this.sync.almost = input.data.almost;
			this.sync.won = input.data.won;
			this.sync.init = true;
		},

		player_almost : function( player, msg){
			console.log( player );
			let message = {
				class : 'text text-positive',
				message : player.data.name.toString() + ' is ahead!',
			}
			setTimeout( function(){
				msg.$emit('message', message);	
			}, 100 );
		},

		player_winning : function( player, msg){
			console.log( player );
			let message = {
				class : 'text text-positive',
				message : player.data.name.toString() + ' is the Winner!',
			}
			setTimeout( function(){
				msg.$emit('message', message);	
			}, 100 );
		},

		player_joined : function( players, players_old, msg ){

			let newPlayers = [];
			for(let i=0;i<players.length;i++){
				let index = find_index( players[i], players_old );
				if( index === -1 ){
					newPlayers.push( players[i] );
				}		
			}

			for(let i=0;i<newPlayers.length;i++){
				let message = {
					class : 'text text-positive',
					message : newPlayers[i].data.name.toString() + ' joined.',
				}

				let self = this;
				setTimeout( function(){
					// new player joined
					msg.$emit('message', message);	
				}, i * 700 );
			}
		},
		player_left : function( players, players_old, msg ){

			let oldPlayers = [];
			for(let i=0;i<players_old.length;i++){
				let index = find_index( players_old[i], players );
				if( index === -1 ){
					oldPlayers.push( players_old[i] );
				}		
			}

			for(let i=0;i<oldPlayers.length;i++){
				let message = {
					class : 'text text-positive',
					message : oldPlayers[i].data.name.toString() + ' left.',
				}

				let self = this;
				setTimeout( function(){
					// new player joined
					msg.$emit('message', message);	
				}, i * 700 );
			}
		},



		





	},
	mounted(){
	},	
	beforeDestroy(){
	},	
}


function find_index( player, array ){
	for(let b=0;b<array.length;b++){
		if( array[b].url == player.url ){
			// console.log( array[b].url + ' : ' + player.url );
			return b;
		}
	}				
	return -1;
}