<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';
	import validate_game from '../helpers/h_validate_game.js';


	export default {
		name: 'cInitPlayer',
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

			check : function(){
				// if player already joined and resetting ignore init??
				if( !this.state.init ){
					this.init();
				}

				if( this.$store.getters['player/get_name'] === '' ){
					this.$root.$emit('player.show');
					// todo display player join window ...
					return;
				}

				if( !this.$store.getters['game/get_game'].joined &&
					this.$store.getters['player/get_url'] === '' ){
					// begin join post process
					this.set_body();
					this.join();
					return;
				}
			},

			rejoin : function(){
				// console.log('rejoining player.');
				this.$root.$emit('player.words.reset');
				this.check();
				return;
			},

			init : function(){

				// console.log('player init');

				this.attrs.action = this.$store.getters['instance/get_action'];

				this.set_body();

				this.state.init = true;
			},

			set_body : function(){

				let playerURL = this.$store.getters['player/get_url'];
				let playerName = this.$store.getters['player/get_name'];
				let playerScore = this.$store.getters['player/get_score'];

				let body = {
					url : playerURL,
					name : playerName,
					score : playerScore,
				};

				if( playerURL === ''){
					this.attrs.action.method = 'POST';
				} else {
					this.attrs.action.method = 'PUT';
				}

				this.attrs.action.body = body;
			},


			join : function(){
				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.join_success, self.join_error);
			},

			join_success : function( input ){

				this.$store.dispatch('player/set_player', input.data );
				
				this.$store.dispatch('game/set_game', { joined : true } );
				

				validate_game.game( input, this );

				let message = {
					class : 'text success colour-fill-bg',
					message : input.message,
				};

				this.$root.$emit('game.stop');
				this.$root.$emit('player.message', message);

				let self =this;
				setTimeout( function(){
					self.$root.$emit('player.hide');
					self.$root.$emit('player.success');
					self.$store.dispatch('game/set_game', {} );
					self.$store.dispatch('game/set_game', {} );
				}, 2000 );


			},
			join_error : function( input ){

				// todo 
				this.$store.dispatch('game/set_game', { joined : false } );

				this.$root.$emit('player.message' , input.message );

				validate_game.game( input, this );

				let message = {
					class : 'text error colour-fill-bg',
					message : input.message,
				};

				this.$root.$emit('player.message', message);
				let self =this;
				setTimeout( function(){
					self.$root.$emit('player.hide');
				}, 3500 );

			},


			reset : function(){
				// console.log('resetting player');
				if( !this.state.init ){
					this.init();
				}

				let bodyObject = {
					player : {
						url : this.$store.getters['player/get_url'],
						word : {
							reset : true,
						},
					},
				};

				this.attrs.action.method = 'PUT';
				this.attrs.action.body = bodyObject;

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.reset_success, self.reset_error);				
			},
			reset_success : function( input ){
				this.$root.$emit('reset.success');
				this.join_success( input );
			},
			reset_error : function( input ){

				validate_game.game( input, this );

				this.$root.$emit('reset.fail');
				console.log( 'error on reset' );
				console.log( input );
			},
			exit : function(){
				this.$root.$off('player.check', this.check );
				this.$root.$off('player.reset', this.reset );
				this.$root.$off('player.rejoin', this.rejoin );
			},
		},
		mounted() {
			this.$root.$on('player.check', this.check );
			this.$root.$on('player.reset', this.reset );
			this.$root.$on('player.rejoin', this.rejoin );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



