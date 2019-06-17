<!-- <template>
</template>
<script>

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'cPlayer',
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
					ready : false,
				},
			}
		},	
		computed : {
		},
		methods : {
			init : function(){

				console.log('init player');
				
				
				this.attrs.action = {
					url : ('/api/instance/' + this.$store.getters['game/get_instance'].url),
					method : 'POST',
					JSON : true,
					body : {},
				};

			},

			player_join_submit : function(){
				let player = this.$store.getters['game/get_player'];
				if( player.joined ){
					return;
				}
				
				this.attrs.action.body.name = player.data.name;
				
				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.player_join_success, self.player_join_error);
			},
			player_join_success : function( input ){
				let newPlayer = input.data;
				
				if( input.status === 201 ){
					let tempURL = 'url: ' + input.data.url;
					let tempName = 'name: ' + input.data.data.name;

					console.log('player successful joined. ' + tempURL + ' ' + tempName);
					// todo emit this message visually.
					newPlayer.joined = true;
					this.$store.dispatch('game/set_player', newPlayer);
					this.ready( true );
					this.$root.$emit('instance_update'); // now pull down latest
				}
				
			},
			player_join_error : function( input ){
				let self = this;
				// todo deal/check input error?

				if(	input.status == 401
					&& input.message == 'Game has been won.'
					&& input.win !== undefined
					&& input.win ){

						self.ready( false );
						// TODO display fullscreen game is over 
						// game is already over, exit no point joining
						return;
				}

				if( self.state.timeouts < self.attrs.server.max_timeouts ){
					
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, null, null, self.player_join_success, self.player_join_error);
					}, self.attrs.server.timing );
				} else {
					self.ready( false );
				}
			},



			player_update_submit : function( toSend, onSuccess, onFail, btn=null, msg=null ){

				let player = this.$store.getters['game/get_player'];
				if( !player.joined ){
					console.log("cant submit update, player hasn't joined.");
					return;
				}

				this.attrs.action.method = 'PUT';
				this.attrs.action.body = toSend;				

				this.onSubmit( this.attrs.action, this, btn, msg, onSuccess, onFail );
			},

			player_exit_submit : function(){
				console.log('player exiting');

				let player = this.$store.getters['game/get_player'];		
				this.attrs.action.method = 'DELETE';	
				this.attrs.action.body = { player : player };
				
				let temp = function( input ){
					console.log(input);
				};

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, temp, temp);
			},

			ready : function( input ){
				if( this.state.ready !== input ){
					this.state.ready = input;
					console.log('player: ' + input );
					this.$root.$emit('state_player', input);					
				}
			},

			exit : function(){
				this.player_exit_submit();
				this.$root.$off('init_player');
				this.$root.$off('state_player_join');
				this.$root.$off('state_player_submit');
			},
			
		},
		mounted() {
			window.addEventListener('beforeunload', this.exit );
			this.$root.$on('init_player', this.init );
			this.$root.$on('state_player_join', this.player_join_submit );
			this.$root.$on('state_player_submit' , this.player_update_submit );
		},
		beforeDestroy(){
			this.exit();
		},		
		components: {
			// 'c-word' : Word,
		},		
}
</script>

 -->