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
				},
				init : false,
				words : [],
			}
		},	

		methods : {
			setup : function(){
				this.attrs.action = this.$store.getters['instance/get_action'];
				this.words = this.$store.getters['game/get_words'];
				this.init = true;

				this.attrs.action.method = 'POST';
				this.attrs.action.JSON = true;
			},


			update : function( input, request ){
				if( !this.init ){
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

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.update_success, self.update_error);
			},

			update_success : function( input ){

				// if( !this.input.selected ){
				// 	toSend.player.word = {
				// 		add : this.input.word,
				// 	}
				// 	this.$store.dispatch('game/add_word', this.input );
				// } else {
				// 	toSend.player.word = {
				// 		remove : this.input.word,
				// 	}
				// 	this.$store.dispatch('game/remove_word', this.input );
				// }				
				// this.$store.dispatch('instance/set_instance', input.data );
				// console.log( input.data );
				// this.$root.$emit('init.board', input.data.data.board );
			},
			update_error : function( input ){
				// if( this.state.timeouts < this.attrs.server.max_timeouts ){
				// 	let self = this;
				// 	setTimeout( function(){
				// 		self.state.timeouts +=1
				// 		self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
				// 	}, self.attrs.server.timing );
				// }
			},
			// reset : function(){
			// 	this.$store.dispatch('instance/reset');
			// },
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



