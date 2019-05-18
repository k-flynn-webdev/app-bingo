<template>
	
	<div class="people-holder">
	
		<!-- <transition-group name="people-list" tag="p" type="animation"> -->
		<transition-group name="people-list" tag="p">

			<c-person
				v-for="(player, index) in instance_players" 
				:key="player.url"
				v-bind:input=player
				v-bind:input_is_player=is_player(player)>

			</c-person>

		</transition-group>

	</div>
	

</template>
<script>

	import Person from '../components/c_person.vue';


	export default {
		name: 'cPlayersState',
		data(){
			return {
				state : {
					requests : 0,
					timeouts : 0,
					play : false,
				},
			}
		},
		computed : {
			instance_players : function(){
				let temp = [];

				temp = this.$store.getters['game/get_players'];

				if( this.state.play ){

					if( !this.player_exists(temp) && this.$store.getters['game/get_player'].joined ){

						// TODO visual message for this.
						console.log('player has been kicked by server.');
						this.$root.$emit('state_exit');

					}
				}

				return temp;
			},
			player_url : function(){
				let player = this.$store.getters['game/get_player'];

				if( player === undefined ){
					return '';
				}

				return player.url;				
			},
		},	
		methods : {
			init : function(){
				console.log('init players state.');
				this.$root.$on('state_play', this.check );
			},
			player_exists : function( players ){
				for( let i=0;i<players.length;i++ ){
					if( players[i].url == this.player_url ){
						return true;
					}
				}
				return false;
			},
			is_player : function( player ){
				if( player.url == this.player_url ){
					return true;
				}
				return false;
			},


			check : function( input ){
				if( input !== this.state.play ){
					if( input ){
						this.play();
					} else {
						this.stop();
					}
				}
			},

			play : function(){
				this.state.play = true;
				console.log('players state: ' + this.state.play);
			},
			stop : function(){
				this.state.play = false;
				console.log('players state: ' + this.state.play);
			},

			exit : function(){
				this.stop();
				this.$root.$off('state_play');
			},

		},
		mounted() {
			this.init();
		},
		beforeDestroy(){
			this.exit();
		},
		components : {
			'c-person' : Person,
		},
}
</script>

<style >
</style>
