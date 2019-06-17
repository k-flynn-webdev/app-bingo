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

				validate_game.game( input, this );

				if( input.status === 202 && 
					input.data.word !== undefined){

					if( input.data.word.add !== undefined ){
						this.$store.dispatch('game/add_word', input.data.word.add );
					}
					
					if( input.data.word.remove !== undefined ){
						this.$store.dispatch('game/remove_word', input.data.word.remove );
					}

					if( input.data.score !== undefined ){
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

				validate_game.game( input, this );

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
			
			// exit : function(){
			// 	this.$root.$off('init.instance');
			// 	this.$store.dispatch('instance/exit');
			// },

		},
		mounted() {
			this.$root.$on('word', this.update );
		},
		beforeDestroy(){
			// this.exit();
		},
}
</script>



