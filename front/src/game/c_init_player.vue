<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';

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

			init : function(){

				console.log('ready, starting player init');

				this.attrs.action = this.$store.getters['instance/get_action'];

				this.attrs.action.method = 'POST';
				this.attrs.action.JSON = true;

				let body = {
					url : this.$store.getters['player/get_url'],
					name : this.$store.getters['player/get_name'],
					score : this.$store.getters['player/get_score'],
				};

				this.attrs.action.body = body;
				this.state.init = true;

				if( this.$store.getters['player/get_name'].length > 0 ){
					this.join();
				} else {
					// todo show popup window for player join!
					// then do callback to this again..
				}
			},

			join : function(){
				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.join_success, self.join_error);
			},

			join_success : function( input ){

				// todo update store with new player details?
				this.$store.dispatch('player/set_player', input.data );

				console.log( input.data );

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
			join_error : function( input ){
				// todo
				// if( this.state.timeouts < this.attrs.server.max_timeouts ){
				// 	let self = this;
				// 	setTimeout( function(){
				// 		self.state.timeouts +=1
				// 		self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
				// 	}, self.attrs.server.timing );
				// }
			},
			reset : function(){
				this.$store.dispatch('player/reset');
			},
			// exit : function(){
			// 	this.$root.$off('init.instance');
			// 	this.$store.dispatch('instance/exit');
			// },

		},
		mounted() {
			this.$root.$on('game.ready', this.init );
			this.$root.$on('reset', this.reset );
		},
		beforeDestroy(){
			// this.exit();
		},
}
</script>



