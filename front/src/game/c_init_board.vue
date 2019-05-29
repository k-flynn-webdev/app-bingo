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

				// let board = this.$store.getters['instance/get_url'];

				this.$store.dispatch('board/set_board', { url : board });

				let action = {
					url : ('/api/board/' + board),
					method : 'GET',
					JSON : false };

				this.attrs.action = action;

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);

			},

			board_success : function( input ){
				this.$store.dispatch('board/set_board', input.data );
				console.log( input.data );
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
				this.$root.$off('init.board');
			},
			
		},
		mounted() {
			this.$root.$on('init.board', this.init );
		},
		beforeDestroy(){
			this.exit();
		},		
}
</script>



