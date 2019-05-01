<template>

	<p
		class="circle player-sync"
		v-bind:class="{ 'is-sync' : state.sync }"></p>

</template>

<script>

	import Message from '../components/c_message.vue';

	let counter = null;

	export default {
		name: 'cGamePlayerSync',
		data(){
			return {
				attrs : {
				},
				state : {
					count : 0,
					sync : false,
					sent : false,
				},	
			}
		},	

		methods : {
			init : function(){
				this.$root.$on('state_poll_update', this.check );
			},
			check : function(){
				let instance = this.$store.getters['game/get_instance'];
			
				if( instance.polled !== this.state.count ){
					this.state.count = instance.polled;	
					this.state.sent = false;				
				}

				let player = this.$store.getters['game/get_player'];
				if( player.joined ){
					this.check_player_sync( instance.data.players, player );
				}
			},
			check_player_sync : function( players, player ){

				if( players === undefined || players.length === 0 ){
					return this.$root.$emit('state_exit'); // no players..
				}

				let index = this.player_index( players, player);
				if( index < 0 ){ // not found ..
					return this.$root.$emit('state_exit');
				}

				let playerServer = players[index];

				let sync = this.player_diff( playerServer, player);

				if( sync ){
					this.player_in_sync();
				} else {
					this.player_out_sync();
				}

			},

			player_in_sync : function(){
				this.state.sync = true;
				this.state.sent = false;
			},
			player_out_sync : function(){
				if( !this.state.sent){
					this.state.sync = false;
					this.state.sent = true;
					this.$root.$emit('state_player_submit');
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
	
.player-sync {
	transition: 1s;
	/*color: red;*/
	background-color: rgba(200,10,10,0.5);
}

.player-sync.is-sync {
	/*color: green;*/
	background-color: lightgreen;
}

.circle {
	width: 1rem;
	height: 1rem;
	border-radius: 50%
}

</style>

