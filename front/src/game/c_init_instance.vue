<template>
</template>


<script>

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'cInitInstance',
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
			init : function(){

				let instance = this.$route.params.instance;
				let tempURL = '/api/instance/' + instance;

				this.$store.dispatch('instance/set_action', tempURL);
				this.$store.dispatch('player/set_action', tempURL);
				this.$store.dispatch('instance/set_instance', { url : instance });
				

				let action = {
					url : tempURL,
					method : 'GET',
					JSON : false };

				this.attrs.action = action;

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);

			},

			instance_success : function( input ){
				this.$store.dispatch('instance/set_instance', input.data );
				console.log( input.data );
				this.$root.$emit('init.board', input.data.data.board );
			},
			instance_error : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, null, null, self.instance_success, self.instance_error);
					}, self.attrs.server.timing );
				}
			},
			reset : function(){
				this.$store.dispatch('instance/reset');
			},
			exit : function(){
				this.$root.$off('init.instance');
				this.$store.dispatch('instance/exit');
			},

		},
		mounted() {
			this.init();
			this.$root.$on('reset', this.reset );
		},
		beforeDestroy(){
			this.exit();
		},
}
</script>



