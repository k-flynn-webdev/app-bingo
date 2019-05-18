<template>

	<c-game-over 
		v-bind:game_state=state.game>
	</c-game-over>


</template>

<script>

	import Message from '../components/c_message.vue';
	import GameOver from '../components/c_game_over.vue';

	export default {
		name: 'cGameState',
		data(){
			return {
				attrs : {
				},
				state : {
					init : false,
					instance_ready : false,
					board_ready : false,
					player_ready : false,
					player_pause : false,

					play : false,
					game : {
						over : false,
						won : false,
						lost : false,
						winner : '',
					},
				},

			}
		},	
		methods:{
			init : function(){

				this.$root.$on('state_instance', this.instance_state );
				this.$root.$on('state_board', this.board_state );
				this.$root.$on('state_player', this.player_state );
				this.$root.$on('state_player_pause', this.player_pause );


				this.$root.$on('state_won', this.game_won );
				
				this.$root.$on('state_reset', this.reset );
				this.$root.$on('state_exit', this.forced_redirect );

				this.state.init = true;


				let self = this;
				setTimeout( function(){
					self.$root.$emit('init_instance'); // trigger all 
				},100);

				
			},	

			instance_state : function( input ){
				if( input !== this.state.instance_ready ){
					this.state.instance_ready = input;
					this.check_game();	

					if( input && !this.state.board_ready){
						// trigger board download ..
						let self = this;
						setTimeout( function(){
							self.$root.$emit('init_board');
						},100);
					}
				}
			},			
			board_state : function( input ){
				if( input !== this.state.board_ready ){
					this.state.board_ready = input;
					this.check_game();	

					if( input && !this.state.player_ready){
						let self = this;
						setTimeout( function(){
							self.$root.$emit('init_player');
						},100);
					}									
				}
			},
			player_state : function( input ){
				if( input !== this.state.player_ready ){
					this.state.player_ready = input;
					this.check_game();					
				}
			},			
			player_pause : function( input ){
				if( input !== this.state.player_pause ){
					this.state.player_pause = input;
					this.check_game();					
				}
			},

			check_game : function(){

				if( this.state.player_pause ){
					this.stop();
					return;
				}

				if( this.state.game.won || this.state.game.lost ){
					this.stop();
					return;
				}

				if( this.init 
					&& this.state.instance_ready 
					&& this.state.board_ready 
					&& this.state.player_ready ){

						this.play();
				} else {
					this.stop();
				}
			},


			game_won : function( input ){

				if( !this.state.game.won && !this.state.game.lost ){

					let player = this.$store.getters['game/get_player'];

					this.state.game.over = true;

					if( player.url == input.data.game.winner ){
						this.state.game.won = true;
						this.state.game.winner = 'You Won!';
					} else {
						this.state.game.lost = true;
						this.state.game.winner = 'player ' + input.winner.data.name + ' has Won!';
					}

					this.$root.$emit('game_finished', this.state.game.won );

				}

				this.check_game();
			},

			play : function(){
				console.log('game state: playing.');
				this.state.play = true;
				let self = this;
				setTimeout( function(){
					self.$root.$emit('state_play', true);
				}, 100);
			},
			stop : function(){
				console.log('game state: stopping.');
				this.state.play = false;
				this.$root.$emit('state_play', false);
			},	
			reset : function(){
			},
			exit : function(){
				
				this.stop();	

				let self = this;
				setTimeout( function(){
					self.$store.dispatch('game/exit');
				}, 100);


				this.$root.$off('state_instance');
				this.$root.$off('state_board');				
				this.$root.$off('state_player');
				this.$root.$off('state_player_pause');
				this.$root.$off('state_won');


				this.$root.$off('state_exit');


				this.$root.$off('state_reset');		

				console.log('state exiting.');	
			},

			forced_redirect : function(){
				let self = this;
				setTimeout( function(){
					self.$router.push( '/' );
				}, 2000);
			},
		},
		mounted() {
			this.init();
		},
		beforeDestroy(){
			this.exit();
		},		
		components: {
			'c-game-over' : GameOver,
		},		
}
</script>

<style>


</style>

