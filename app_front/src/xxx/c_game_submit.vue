<template>

	<c-message ref="msgPoll"></c-message>

</template>

<script>

	import Message from '../components/c_message.vue';

	import { submit } from '../mixins/h_submit.js';

	let counter = null;
	let submitOnWait = null;

	export default {
		name: 'cGameSubmit',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					max_timeouts : 5,
					action : Object,
					timing : 5000,
				},
				state : {
					sent : 0,
					timeouts : 0,
					ready : false,

					play : false,

					joining : false,
					sending : false,
					waiting : false,
				},	
			}
		},
		methods : {
			init : function(){
				if( !this.state.ready ){

					let instance = this.$store.getters['game/get_instance'];
					if( instance.url === '' ){
						return;
					}

					this.$root.$on('state_play', this.check_state );
					this.$root.$on('state_reset', this.reset );

					this.$root.$on('state_player_join', this.join_submit);	
					this.$root.$on('state_player_submit', this.player_submit );
					
					let action = {
						url : ('/api/instance/' + instance.url ),
						method : 'POST',
						JSON : true,
						body : {
							player : {},
						},
					};

					this.attrs.action = action;
					this.ready( true );
				}
			},

			ready : function( input ){
				if( this.state.ready !== input ){
					this.state.ready = input;
					console.log('submit: ' + input );
					this.$root.$emit('state_submit', input);	
				}
			},
			

			prepare_player_changes : function(){
				this.attrs.action.body.player = this.$store.getters['game/get_player'];
			},

			player_submit : function(){

				if( !this.state.ready ){
					this.init();
				}

				if( !this.state.sending){
					this.send_submit();			
				} else {
					if( !this.state.waiting ){
						this.state.waiting = true;
						let self = this;
						submitOnWait = setTimeout( function(){
							self.player_submit();
							self.state.waiting = false;
							console.log('sending a delayed submit.');
						}, 3000);
					}
				}
			},


			join_submit : function(){
				this.prepare_player_changes();

				let previous = this.state.joining;

				if( !this.state.joining && !this.attrs.action.body.player.joined){
					this.state.joining = true;				
					this.state.sending = true;
					this.attrs.action.method = 'POST';

					// console.log('this.state.joining');
					// console.log( previous + ' : ' + this.state.joining );
					

					this.onSubmit( this.attrs.action, this, null, null, this.send_success, this.send_error);
				}
			},
			exit_submit : function(){
				console.log('sending exit submit!');
				this.prepare_player_changes();			
				this.state.sending = true;
				this.attrs.action.method = 'DELETE';
				let exit = function(){};
				this.onSubmit( this.attrs.action, this, null, null, exit, exit);
			},
			send_submit : function(){
				this.prepare_player_changes();			
				this.state.sending = true;
				this.attrs.action.method = 'PUT';
				this.onSubmit( this.attrs.action, this, null, null, this.send_success, this.send_error);
			},


			send_success : function( input ){
				this.state.sending = false;
				let self = this;
				if( this.state.play ){
					this.state.sent +=1;
				}	

				if( input.data !== undefined && input.data !== true){
					// this.state.joining = false;
					if( !this.attrs.action.body.player.joined && input.data.url !== '' ){
						input.data.joined = true;
						this.$root.$emit('state_player', true);
						// console.log('state_player: ' + true );
					}

					this.$store.dispatch('game/set_player', input.data );
				}			
			},
			send_error : function( input ){
				let self = this;
				if( this.state.sending ){
					this.state.sending = false;

					// 304 code is returned on no modification..

					if( input.status === 503 &&  input.message === 'Game has finished.' ){

						// move was not accepted, reject?

						// going to need pending changes?
						// based on playersync, if server refuses, we emit event and player cync reverts back to last known?


						// possibly ended? TODO redirect
						// this.$root.$emit('state_exit');
						// ANNOY player to rejoin before timeout forces in?
						
						// this.join_submit();
					}

					if( this.state.timeouts < this.attrs.max_timeouts ){
						counter = setTimeout( function(){
							console.log( 'retrying connection.' );
							self.state.timeouts +=1
							self.send_submit();
						}, self.attrs.timing);	
					} else {
						this.$root.$emit('state_exit');
					}

				} 
				// else {
				// 	this.stop();
				// }
			},

			check_state : function( input ){
				if( this.state.play !== input ){
					if( this.state.play ){
						this.play();
					} else {
						this.stop();
					}
				}
			},			
			play : function(){
				this.state.play = true;
			},	
			stop : function(){
				this.state.play = false;
				clearTimeout(counter);
				clearTimeout(submitOnWait);
			},				
			reset : function(){
				console.log('game submit: resetting.');
				
			},

			exit : function(){
				this.exit_submit();
				this.stop();

				this.$root.$off('init');
				this.$root.$off('init_submit');
				this.$root.$off('state_play');
				this.$root.$off('state_reset');
				this.$root.$off('state_player_submit');
			},
		},
		mounted(){
			this.$root.$on('init_submit', this.init );
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

