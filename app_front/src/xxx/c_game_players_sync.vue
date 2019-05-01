<template>

	<div>

		<c-message ref="msgPoll"></c-message>

		<p 
			v-for="(player, index) in attrs.players" 
			:key=player.url>
			
				{{ player.data.name }}
		</p>

	<!-- <p> {{ attrs.players_hash }}</p>	 -->
	</div>

</template>

<script>

	import Message from '../components/c_message.vue';

	function find_name( player, array ){
		for(let b=0;b<array.length;b++){
			if( array[b].url == player.url ){
				return array[b].data.name;
			}
		}				
		return false;
	}
	function find_index( player, array ){
		for(let b=0;b<array.length;b++){
			if( array[b].url == player.url ){
				return b;
			}
		}				
		return -1;
	}	

	export default {
		name: 'cGamePlayersSync',
		data(){
			return {
				attrs : {
					players : [],
					players_hash : '',
					win : 0,
					ahead : '',
					winner : '',
					player_url : '',
				},
				state : {
					init : false,
				},	
			}
		},	

		methods : {
			init : function(){
				this.$root.$on('state_poll_update', this.instance_diff );
				let instance = this.$store.getters['game/get_instance'];
				this.instance_copy( instance );
			},
			init_player : function(){
				this.attrs.player_url = this.$store.getters['game/get_player'].url;
				if( this.attrs.player_url.length > 2){
					this.state.init = true;
				}
			},




			instance_diff : function(){
				if( !this.state.init ){
					this.init_player();
				}

				let instance = this.$store.getters['game/get_instance'];

				let newHash = this.players_hash( instance );

				if( this.attrs.players_hash !== newHash ){
					this.instance_diff_players( instance );
				}
				if( instance.data.game.winner.length > 0){
					if( this.attrs.winner !== instance.data.game.winner ){
						this.instance_diff_winner( instance );
					}						
				}
				if( instance.data.game.ahead.length > 0){
					if( this.attrs.ahead !== instance.data.game.ahead ){
						this.instance_diff_ahead( instance );
					}
				}	

				this.instance_copy( instance );

			},

			players_hash : function( instance ){
				let hash = '';
				for(let i=0; i < instance.data.players.length;i++){
					hash += instance.data.players[i].url;
				}
				return hash;
			},
			player_self : function( check ){
				if( this.attrs.player_url === check.url ){
					return true;
				}
				return false;
			},


			instance_diff_players : function( instance ){

				let playersNew = []; 
				let playersLeft = []; 

				// find new ..
				for(let i=0; i < instance.data.players.length;i++){
					let test = find_name( instance.data.players[i], this.attrs.players );

					if( !test ){
						if( !this.player_self( instance.data.players[i] ) ){
							playersNew.push( instance.data.players[i] );
						}
						
					}
				}

				// find left ..
				for(let i=0; i < this.attrs.players.length;i++){
					let test = find_name( this.attrs.players[i], instance.data.players );

					if( !test ){
						if( !this.player_self( this.attrs.players[i] ) ){
							playersLeft.push( this.attrs.players[i] );
						}
					}
				}

				
				let allMessages = [];
				for(let i=0; i < playersNew.length;i++){
					let message = { class : 'text-positive text', message : playersNew[i].data.name + ' has joined.' }
					allMessages.push( message );
				}
				for(let i=0; i < playersLeft.length;i++){
					let message = { class : 'text-positive text', message : playersLeft[i].data.name + ' has left.' }
					allMessages.push( message );
				}

				let self = this;
				for(let i=0; i < allMessages.length;i++){
					setTimeout( function(){
						if( self !== undefined && self.$refs.msgPoll !== undefined ){
							self.$refs.msgPoll.$emit('message' , allMessages[i] );
						}
					}, i * 750 );
				}		

			},



			instance_diff_ahead : function( instance ){
				if( instance.data.game.ahead === instance.data.game.winner ){
					return; // let winner msg render.
				}

				let ahead_obj = { url : instance.data.game.ahead };
				let result = find_name( ahead_obj, instance.data.players );

				if( result !== false && !this.player_self( ahead_obj ) ){
					let message = { class : 'text-positive text', message : result + ' is ahead!' }
						this.$refs.msgPoll.$emit('message' , message );
				}	

			},			
			instance_diff_winner : function( instance ){
				let winner_obj = { url : instance.data.game.winner };
				let result = find_name( winner_obj, instance.data.players );

				if( result !== false && !this.player_self( winner_obj ) ){
					let message = { class : 'text-positive text', message : result + ' is the Winner!' }
						this.$refs.msgPoll.$emit('message' , message );
				}
			},


			instance_copy : function( instance ){
				this.attrs.win = instance.data.game.win;
				this.attrs.players = instance.data.players;
				this.attrs.players_hash = this.players_hash( instance );
				this.attrs.ahead = instance.data.game.ahead;
				this.attrs.winner = instance.data.game.winner;
			},



			exit : function(){
				this.$root.$off('state_poll_update');
			},
		},
		mounted(){
			this.init();
		},	
		beforeDestroy(){
			this.exit();
		},
		components: {
			'c-message' : Message,
		},		
}
</script>

<style>


</style>

