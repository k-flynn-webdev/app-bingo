<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';
	import validate_game from '../helpers/h_validate_game.js';

	let instanceGet = null;

	export default {
		name: 'cInitInstance',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					server : {
						max_timeouts : 5,
						timing : 1000,
						time_sec : 8,
					},
					action : Object,
				},
				state : {
					timeouts : 0,
					init : false,
					stop : false,
				},
			}
		},	

		methods : {
			init : function(){

				let instance = this.$route.params.instance;
				let tempURL = '/api/instance/' + instance;

				let action = {
					url : tempURL,
					method : 'GET',
					JSON : true };

				this.$store.dispatch('instance/set_action', action);
				this.$store.dispatch('instance/set_instance', { url : instance });

				this.attrs.action = action;

				instanceGet = this.instance_get();

			},
			init_success : function( input ){
				if( !this.state.init ){

					this.$store.dispatch('game/set_game', { instance : true } );
					this.$store.dispatch('instance/set_instance', input.data );

					this.$root.$emit('board-init', input.data.data.board );

					let self = this;
					setTimeout( function(){
						self.$emit('trigger', 'Download success.' );
					}, 1500);

					this.state.init = true;
				}
				
			},

			instance_get : function(){
				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
			},


			instance_start : function(){
				if( this.state.stop ){
					this.state.stop = false;
					this.instance_get();
				}
			},
			instance_stop : function(){
				this.state.stop = true;
				clearTimeout( instanceGet );
			},

			game_reset : function(){
				this.state.init = false;
				this.init();
			},

			instance_success : function( input ){
				let self = this;

				if( !self.state.init ){
					self.init_success( input );
				} 

				self.$store.dispatch('instance/set_players', input.data );

				instanceGet = setTimeout( self.instance_get, this.attrs.server.time_sec * this.attrs.server.timing );

				validate_game.game( input, self );

			},

			instance_error : function( input ){
				let self = this;
				
				validate_game.game( input, self );

			 	// todo work on this.

				// console.log( 'input init error' );
				// console.log( input );

				// validate_game.game( input, this );

				// if( this.state.timeouts < this.attrs.server.max_timeouts ){
				// 	let self = this;
				// 	setTimeout( function(){
				// 		self.state.timeouts +=1
				// 		self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
				// 	}, self.attrs.server.timing );
				// }
			// },
			// reset : function(){
			// 	this.$store.dispatch('instance/reset');
			},



			exit : function(){
				this.instance_stop();
				this.$store.dispatch('instance/exit');
				this.$store.dispatch('game/exit');

				this.$root.$off('game-won', this.instance_stop );
				this.$root.$off('game-lost', this.instance_stop );
				this.$root.$off('game-kicked', this.instance_stop );
				this.$root.$off('game-stop', this.instance_stop );
				this.$root.$off('game-pre-reset', this.game_reset );
				this.$root.$off('game-reset', this.init );
				this.$root.$off('player-success', this.instance_start );
			},

		},
		mounted() {
			this.init();

			this.$root.$on('game-won', this.instance_stop );
			this.$root.$on('game-lost', this.instance_stop );
			this.$root.$on('game-kicked', this.instance_stop );
			this.$root.$on('game-stop', this.instance_stop );
			this.$root.$on('game-pre-reset', this.game_reset );
			this.$root.$on('game-reset', this.init );
			this.$root.$on('player-success', this.instance_start );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



