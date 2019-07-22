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
					this.$root.$emit('player-show');
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
				this.$root.$emit('player-lines-reset');
				this.check();
				return;
			},

			init : function(){

				let tempAction = this.$store.getters['instance/get_action'];

				let action = {
					url : tempAction.url,
					method : tempAction.method,
					JSON : tempAction.JSON,
				};

				this.attrs.action = action;

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

				this.$root.$emit('game-stop');
				this.$root.$emit('player-message', message);
				this.$root.$emit('player-success');

				let self =this;
				setTimeout( function(){
					self.$root.$emit('player-hide');
					self.$store.dispatch('game/set_game', {} );
				}, 2000 );


			},
			join_error : function( input ){

				// todo 
				this.$store.dispatch('game/set_game', { joined : false } );

				this.$root.$emit('player-message' , input.message );

				validate_game.game( input, this );

				let message = {
					class : 'text error colour-fill-bg',
					message : input.message,
				};

				this.$root.$emit('player-message', message);
				let self =this;
				setTimeout( function(){
					self.$root.$emit('player-hide');
				}, 3500 );

			},


			reset : function(){
				if( !this.state.init ){
					this.init();
				}

				let bodyObject = {
					player : {
						url : this.$store.getters['player/get_url'],
						line : {
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
				this.$root.$emit('reset-success');
				this.join_success( input );
			},
			reset_error : function( input ){

				validate_game.game( input, this );

				this.$root.$emit('reset-fail');
				console.log( 'error on reset' );
				console.log( input );
			},
			game_reset : function(){
				this.state.init = false;
			},


			remove : function(){
				let tempAction = this.$store.getters['instance/get_action'];
				let hasJoined = this.$store.getters['game/get_game'].joined;

				if( !hasJoined ){
					return;
				}

				let action = {
					url : tempAction.url,
					method : 'DELETE',
					JSON : true,
				};

				action.body = { player : this.$store.getters['player/get_player'] };

				let self = this;
				self.onSubmit( action, self, null, null, function(){}, function(){} );
			},


			exit : function(){
				this.$root.$off('player-check', this.check );
				this.$root.$off('player-reset', this.reset );
				this.$root.$off('player-rejoin', this.rejoin );
				this.$root.$off('player-remove', this.remove );
				this.$root.$off('game-pre-reset', this.game_reset );

				this.remove();
			},
		},
		mounted() {
			this.$root.$on('player-check', this.check );
			this.$root.$on('player-reset', this.reset );
			this.$root.$on('player-rejoin', this.rejoin );
			this.$root.$on('player-remove', this.remove );
			this.$root.$on('game-pre-reset', this.game_reset );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



