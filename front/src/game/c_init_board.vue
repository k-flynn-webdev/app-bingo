<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'cInitBoard',
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
			}
		},	

		methods : {
			init : function( board ){
				let tempURL = '/api/board/' + board;

				let action = {
					url : tempURL,
					method : 'GET',
					JSON : false };

				this.$store.dispatch('board/set_action', action );
				this.$store.dispatch('board/set_board', { url : board });

				this.attrs.action = action;

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);
			},

			board_success : function( input ){
				this.$store.dispatch('board/set_board', input.data );
				this.$store.dispatch('game/set_game', { board : true } );
				this.$root.$emit('player-lines-reset');
				this.$root.$emit('player-check');
			},
			board_error : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);
					}, self.attrs.server.timing );
				}

			},

			exit : function(){
				this.$root.$off('board-init', this.init );
				this.$store.dispatch('board/exit');
			},

		},
		mounted() {
			this.$root.$on('board-init', this.init );
		},
		beforeDestroy(){
			this.exit();
		},		
}
</script>



