<!-- <template> -->

	<!-- <c-players-state
		v-bind:state=state
		style="position:relative;background-color:black;width:100%;height:100%;">
		
	</c-players-state> -->
<!-- 
</template>
<script>

	import { submit } from '../mixins/h_submit.js';

	let poll_repeater = null;

	export default {
		name: 'cInstance',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					server : {
						max_timeouts : 5,
						timing : 9000,
					},
					action_poll : Object,
				},
				state : {
					requests : 0,
					timeouts : 0,
					ready : false,
					play : false,
				},
			}
		},	
		computed : {

		},
		methods : {
			init : function(){

				console.log('init instance');

				this.$root.$on('state_play', this.check );
				this.$root.$on('instance_update', this.instance_poll );


				if( this.$store.getters['game/get_instance'].url === ''){
					this.$store.dispatch('game/set_instance', { url : this.$route.params.instance });
				}

				this.attrs.action_poll = {
					url : ('/api/instance/' + this.$store.getters['game/get_instance'].url),
					method : 'GET',
					JSON : false };

				let self = this;
				this.instance_poll();

			},




			instance_poll : function(){
				this.onSubmit( this.attrs.action_poll, this, null, null, this.instance_poll_success, this.instance_poll_error);
			},
			instance_poll_success : function( input ){
				this.$store.dispatch('game/set_instance', input.data);

				if( this.state.ready 
					&& input.data.data.game.winner !== ""
					&& input.status == 202
					&& input.message == 'Game has been won.'){

						this.$root.$emit('state_won', input.data );
				}
				
				this.ready( true );

				if( this.state.play && this.state.ready ){

					let self = this;
					poll_repeater = setTimeout( function(){
						self.instance_poll();
						console.log('instance: polling.');
						self.state.requests +=1;
					}, self.attrs.server.timing );
				}

			},
			instance_poll_error : function( input ){
				let self = this;
				// todo deal/check input error?

				if(	input.status == 401
					&& input.message == 'Game has been won.'
					&& input.win !== undefined
					&& input.win ){

						self.ready( false );
						// TODO display fullscreen game is over 
						// game is already over, exit
						return;
				}


				if( this.state.ready ){
					console.log( 'error' );
					console.log( input );
				}

				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action_poll, self, null, null, self.instance_poll_success, self.instance_poll_error);
					}, self.attrs.server.timing );
				} else {
					self.ready( false );
				}
			},


			ready : function( input ){
				if( this.state.ready !== input ){
					this.state.ready = input;
					console.log('instance: ' + input );
					this.$root.$emit('state_instance', input);
				}

				if(!this.state.ready){
					clearTimeout(poll_repeater);	
				}
			},

			check : function( input ){
				if( input !== this.state.play ){
					if( input ){
						this.play();
					} else {
						this.stop();
					}
				}
			},

			play : function(){
				this.state.play = true;
				let self = this;
				poll_repeater = setTimeout( function(){
					self.instance_poll();
					self.state.requests +=1;
				}, self.attrs.server.timing );
			},
			stop : function(){
				this.state.play = false;
				clearTimeout(poll_repeater);
				console.log('instance: exiting');
			},

			exit : function(){
				this.stop();
				this.$root.$off('init_instance');
				this.$root.$off('instance_update');
				this.$root.$off('state_play');

			},
			
		},
		mounted() {
			this.$root.$on('init_instance', this.init );
			window.addEventListener('beforeunload', this.exit );
		},
		beforeDestroy(){
			this.exit();
		},		
		// components: {
		// 	'c-players-state' : PlayersState,
		// },		
}
</script>
 -->
