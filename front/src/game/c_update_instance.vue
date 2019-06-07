<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'cUpdateInstance',
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
				words : [],
			}
		},	

		methods : {
			setup : function(){
				this.attrs.action = this.$store.getters['instance/get_action'];
				this.words = this.$store.getters['game/get_words'];
				this.state.init = true;

				this.attrs.action.method = 'PUT';
				this.attrs.action.JSON = true;
			},


			update : function( input, request ){
				if( !this.state.init ){
					this.setup();
				}

				this.$store.dispatch('game/submit_word', input );

				if( !input.selected ){
					request.player.word = {
						add : input.word,
					}
				} else {
					request.player.word = {
						remove : input.word,
					}
				}

				this.attrs.action.body = request;
				this.attrs.action.body.player.url = this.$store.getters['player/get_url'];

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.update_success, self.update_error);
			},

			update_success : function( input ){

				if( input.status === 202 ){
					if( input.data.word !== undefined ){

						if( input.data.word.add !== undefined ){
							this.$store.dispatch('game/add_word', input.data.word.add );
						}
						
						if( input.data.word.remove !== undefined ){
							this.$store.dispatch('game/remove_word', input.data.word.remove );
						}

						let scoreObject = {
							data : {
								score : input.data.score,
							},
						};

						this.$store.dispatch('player/set_player', scoreObject );

					}
				} 



				// todo if user already has word?
				// todo if game is won?	401
				// todo if game is lost?	
				// todo if game is over?	

			},
			update_error : function( input ){


				// console.log( input );
				// game won
				if( input.status === 401 && input.win !== undefined && input.win ){
					this.$root.$emit('game.won');
					console.log('game has been won, trigger exit message.');
				}

				if( input.status === 401 && input.win !== undefined && !input.win ){
					this.$root.$emit('game.lost');
					console.log('game has been lost, trigger exit message.');
				}

				// if( this.state.timeouts < this.attrs.server.max_timeouts ){
				// 	let self = this;
				// 	setTimeout( function(){
				// 		self.state.timeouts +=1
				// 		self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
				// 	}, self.attrs.server.timing );
				// }
			},
			reset : function(){
				console.log('resetting instance');
				if( !this.state.init ){
					this.setup();
				}

				let bodyObject = {
					player : {
						url : this.$store.getters['player/get_url'],
						word : {
							reset : true,
						},
					},
				};

				this.attrs.action.body = bodyObject;

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.reset_success, self.reset_error);				
			},
			reset_success : function( input ){
				console.log( 'success on reset' );
				console.log( input );

				this.$store.dispatch('player/reset');
				this.$store.dispatch('instance/reset');


				// this.$store.dispatch('game/submit_word', input );
			},
			reset_error : function( input ){
				console.log( 'error on reset' );
				console.log( input );
			},		


			// won : function(){

			// },	

			
			exit : function(){
				this.$root.$off('init.instance');
				this.$store.dispatch('instance/exit');
			},

		},
		mounted() {
			this.$root.$on('word', this.update );
			this.$root.$on('reset', this.reset );
			this.$root.$on('game.won', this.won );
		},
		beforeDestroy(){
			// this.exit();
		},
}
</script>



