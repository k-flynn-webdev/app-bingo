<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';
	import validate_game from '../helpers/h_validate_game.js';

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

			update_word : function( input, request ){
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

				this.attrs.action.method = 'PUT';
				this.attrs.action.body = request;
				this.attrs.action.body.player.url = this.$store.getters['player/get_url'];

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.update_success, self.update_error);
			},

			update_player : function( newName ){
				if( !this.state.init ){
					this.setup();
				}

				let game = this.$store.getters['game/get_game']
				let player = this.$store.getters['player/get_player']

				if( game.joined && player.url !== '' ){
					this.attrs.action.body = {
						player : {
							url : player.url,
							name : {
								update : newName,
							},
						},
					};
				}

				this.attrs.action.method = 'PUT';
				
				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.update_success, self.update_error);
			},

			update_success : function( input ){

				validate_game.game( input, this );

				if( input.data.word !== undefined){

						if( input.data.word.add !== undefined ){
							this.$store.dispatch('game/add_word', input.data.word.add );
							// this.$emit('trigger', 'Success');
						}
						
						if( input.data.word.remove !== undefined ){
							this.$store.dispatch('game/remove_word', input.data.word.remove );
							// this.$emit('trigger', 'Success');
						}

						if( input.data.data.score !== undefined ){
							let scoreObject = {
								data : {
									score : input.data.data.score,
								},
							};

							this.$store.dispatch('player/set_player', scoreObject );
						}

				} 

				if( input.data.name !== undefined){

					let player = this.$store.getters['player/get_player']

					player.data.name = input.data.name.update;
					this.$store.dispatch('player/set_player', player );

					let message = {
						class : 'text success colour-fill-bg',
						message : input.message,
					};

					this.$root.$emit('player.message', message);
					let self =this;
					setTimeout( function(){
						self.$root.$emit('player.hide');
						// self.$emit('trigger', 'Success');
					}, 2000 );

				} 


				// todo if user already has word?
				// todo if game is won?	401
				// todo if game is lost?	
				// todo if game is over?	

			},
			update_error : function( input ){

				validate_game.game( input, this );

				let message = {
					class : 'text error colour-fill-bg',
					message : input.message,
				};

				this.$root.$emit('player.message', message);
				// // game won / lost
				// if( input.status === 401 && 
				// 	input.win !== undefined){

				// 	let winType = input.win ? 'won' : 'lost' ;

				// 	this.$store.dispatch('game/set_game', { mode : winType } );

				// 	// this.$root.$emit('game.won');
				// 	// todo
				// 	console.log('game has been ' + winType + ', trigger exit message.');
				// 	console.log(input);
				// }


			},
			
			exit : function(){
				this.$root.$off('player.word', this.update_word );
				this.$root.$off('player.update', this.update_player );
			},

		},
		mounted() {
			this.$root.$on('player.word', this.update_word );
			this.$root.$on('player.update', this.update_player );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



