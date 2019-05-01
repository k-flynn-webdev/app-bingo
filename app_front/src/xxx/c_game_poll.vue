<template>

	<c-message ref="msgPoll"></c-message>

</template>

<script>

	import Message from '../components/c_message.vue';

	import { submit } from '../mixins/h_submit.js';

	let counter = null;

	export default {
		name: 'cGamePoll',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					max_timeouts : 5,
					action : Object,
					timing : 5000,
				},
				state : {
					polled : 0,
					timeouts : 0,
					ready : false,
					polling : false,
				},	
			}
		},	
		methods : {
			init : function(){

				this.$root.$on('state_play', this.check_state );
				this.$root.$on('state_reset', this.reset );

				if( this.$store.getters['game/get_instance'].url === ''){
					this.$store.dispatch('game/set_instance', { url : this.$route.params.instance });
				} 

				let instance = this.$store.getters['game/get_instance'];

				let action = {
					url : ('/api/instance/' + instance.url ),
					method : 'GET',
					JSON : false,
					body : '' };


				this.attrs.action = action;

				this.poll_submit(); // one time pull ..

			},
			ready : function( input ){
				if( this.state.ready !== input ){
					this.state.ready = input;
					console.log('poll: ' + input );
					this.$root.$emit('state_poll', input);					
				}
			},

			poll_submit : function(){
				this.onSubmit( this.attrs.action, this, null, null, this.poll_success, this.poll_error);
			},
			poll_success : function( input ){

				input.data.polled = this.state.polled; // unique counter to track..

				this.$store.dispatch('game/set_instance', input.data );
				this.$root.$emit('state_poll_update');

				this.ready( true );

				if( this.state.ready && this.state.polling ){

					let self = this;
					counter = setTimeout( function(){
						self.state.polled +=1;
						console.log('poll: ' + self.state.polled);
						self.poll_submit();
					}, self.attrs.timing);

				} else {
					this.stop();
				}
				
			},
			poll_error : function( input ){
				
				if( this.state.ready && this.state.polling ){

					if( input.status === 503 ){
						// possibly ended? TODO redirect
					}

					if( this.state.timeouts < this.attrs.max_timeouts ){
						let self = this;
						counter = setTimeout( function(){
							console.log( 'retrying connection.' );
							self.state.timeouts +=1
							self.poll_submit();
						}, self.attrs.timing);	
					}

				} else {
					this.ready( false );
					this.stop();
				}
			},

			reset : function(){
				console.log('game poll: resetting.');

			},
			check_state : function( input ){
				if( input ){
					this.play();
				} else {
					this.stop();
				}
			},
			play : function(){
				this.state.polling = true;
				this.poll_submit();
			},					
			stop : function(){
				this.state.polling = false;
				clearTimeout(counter);
			},	
			exit : function(){
				this.stop();
				this.$root.$off('state_play');
				this.$root.$off('state_reset');
			},
		},
		mounted(){
			this.init();
		},	
		beforeDestroy(){
			this.exit();
		},
		components: {
			'c-message' : Message,
		},		
}
</script>

<style>



</style>

