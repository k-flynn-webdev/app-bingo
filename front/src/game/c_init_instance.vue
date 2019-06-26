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
					},
					action : Object,
				},
				state : {
					timeouts : 0,
					init : false,
				},
			}
		},	

		methods : {
			init : function(){

				let instance = this.$route.params.instance;
				let tempURL = '/api/instance/' + instance;

				this.$store.dispatch('instance/set_action', tempURL);
				this.$store.dispatch('player/set_action', tempURL);
				this.$store.dispatch('instance/set_instance', { url : instance });

				let action = {
					url : tempURL,
					method : 'GET',
					JSON : false };

				this.attrs.action = action;

				instanceGet = this.instance_get();

			},
			init_success : function( input ){
				if( !this.state.init ){

					this.$store.dispatch('game/set_game', { instance : true } );
					this.$store.dispatch('instance/set_instance', input.data );

					this.$root.$emit('board.init', input.data.data.board );

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

			instance_success : function( input ){
				let self = this;

				if( !self.state.init ){
					self.init_success( input );
				} 

				self.$store.dispatch('instance/set_players', input.data );


				instanceGet = setTimeout( self.instance_get, 10 * 1000 );

				validate_game.game( input, self );

			},

			instance_error : function( input ){

			 	// todo work on this.

				// console.log( 'input init error' );
				// console.log( input );

				validate_game.game( input, this );

				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
					}, self.attrs.server.timing );
				}
			},
			// reset : function(){
			// 	this.$store.dispatch('instance/reset');
			// },
			exit : function(){
				clearTimeout( instanceGet );
				// this.$root.$off('init.instance');
				// this.$store.dispatch('instance/exit');
			},

		},
		mounted() {
			this.init();
			// this.$root.$on('reset', this.reset );
			// this.$root.$on('game.ready', this.ready );
			// this.$root.$on('game.won', this.won );
			// this.$root.$on('game.lost', this.won );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



