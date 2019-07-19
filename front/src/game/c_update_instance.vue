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
			}
		},	

		methods : {
			setup : function(){
				
				let tempAction = this.$store.getters['instance/get_action'];

				let action = {
					url : tempAction.url,
					method : tempAction.method,
					JSON : tempAction.JSON,
				};

				this.attrs.action = action;
				this.state.init = true;

				this.attrs.action.method = 'PUT';
				this.attrs.action.JSON = true;
			},

			update_line : function( input, request ){
				if( !this.state.init ){
					this.setup();
				}

				this.$store.dispatch('game/submit_line', input );

				if( !input.selected ){
					request.player.line = {
						add : input.line,
					}
				} else {
					request.player.line = {
						remove : input.line,
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

				if( input.data.line !== undefined){

						if( input.data.line.add !== undefined ){
							this.$store.dispatch('game/add_line', input.data.line.add );
						}
						
						if( input.data.line.remove !== undefined ){
							this.$store.dispatch('game/remove_line', input.data.line.remove );
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
					this.$root.$emit('player.success');
					
					let self =this;
					setTimeout( function(){
						self.$root.$emit('player.hide');
					}, 2000 );

				} 


				// todo if user already has line?
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
			
			game_reset : function(){
				this.state.init = false;
			},

			exit : function(){
				this.$root.$off('player.line', this.update_line );
				this.$root.$off('player.update', this.update_player );
				this.$root.$off('game.pre.reset', this.game_reset );
			},


				


		},
		mounted() {
			this.$root.$on('player.line', this.update_line );
			this.$root.$on('player.update', this.update_player );
			this.$root.$on('game.pre.reset', this.game_reset );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



