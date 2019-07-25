<template>
	
	<c-popup
		v-if=!state.remove
		v-bind:onShow=state.display 
		v-bind:extraClass=attrs.extraClass
		v-bind:onClick=window_game_click>

			<div slot="header">

				<h1 class="text-bold colour-fill-dark">
					{{ get_name }}
				</h1>
				
			</div>

			<div>
				<p class="header">
					{{ state.message }} 
				</p>

<!-- 				<c-button
		// TODO fix this later?
					v-if=state.type.lost||state.type.won
					ref="btnNew"
					v-bind:onClick=button_new>
						New
				</c-button> -->

				<c-button
					v-if=state.type.kicked
					ref="btnRejoin"
					v-bind:onClick=button_rejoin>
						Rejoin
				</c-button>	

				<!-- <div 
					v-if=state.type.kicked
					class="div-split"></div> -->

			</div>

		<p class="text">
			( {{ state.time }} )
		</p>

		<c-message 
			ref="msgObj">
		</c-message>


		<c-button
			slot="footer"
			ref="btnHome"
			class="button-action"
			v-bind:onClick=button_home>
				Home
		</c-button>


	</c-popup>

</template>

<script>

	import Button from '../components/c_button.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';
	import { submit } from '../mixins/h_submit.js';


	let timeObj = null;

	export default {
		name: 'cGameWindow',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					extraClass : 'bullshit-menu',
					time : 30,
				},
				state : {
					remove : true,
					display : false,
					lock : false,
					class : '',
					type : {
						lost : false,
						won : false,
						kicked : false,
					},
					message : '',
					time : 30,
				},
			}
		},

		computed : {
			get_field_class : function(){
				return this.state.class;
			},
			get_name : function(){
				return this.$store.getters['board/get_board'].data.name || 'Name';
			},				
		},

		methods:{
			message : function( input ){
				this.$refs.msgObj.$emit('message' , input);
			},


			type_reset : function(){
				this.state.type.won = false;
				this.state.type.lost = false;
				this.state.type.kicked = false;
				this.state.time = this.attrs.time;
			},


			game_won : function(){
				if( this.state.display ){
					return;
				}				
				this.state.type.won = true;
				this.state.message = 'You are the Winner!';
				this.state.lock = true;
				this.window_game_show();
			},
			game_lost : function(){
				if( this.state.display ){
					return;
				}
				this.state.type.lost = true;
				let winner = this.$store.getters['game/get_winner'];
				this.state.message = winner.data.name + ' is the Winner!';
				this.state.lock = true;
				this.window_game_show();
			},
			game_kicked : function(){
				if( this.state.display ){
					return;
				}
				this.state.type.kicked = true;
				this.state.message = 'You have been removed!';
				this.state.lock = true;
				this.window_game_show();
			},


			button_rejoin : function(){
				this.time_off();
				this.$refs.btnRejoin.$emit('state', 'waiting');
				this.$root.$emit('player-rejoin');
			},
			button_home : function(){
				this.time_off();
				this.$refs.btnHome.$emit('state', 'waiting');
				
				let self = this;
				setTimeout( function(){
					self.window_game_hide();
					self.$router.push('/');
				}, 1500);
			},
			button_new : function(){
				this.time_off();
				this.$refs.btnNew.$emit('state', 'waiting');

				let board = this.$store.getters['board/get_board'].url;

				let object = {
					url : ('/api/instance/' + board + '/create'),
					method : 'GET',
					body : '' };

				this.$root.$emit( 'player-remove' );	

				let self = this;
				this.onSubmit( object, self, this.$refs.btnNew, null, self.onSuccess, self.onError);
			},
			onSuccess : function( input ){
				let self = this;
				self.window_game_hide();
				setTimeout( function(){
					// kill all local data?
					self.$store.dispatch('board/exit');
					self.$store.dispatch('instance/exit');
					self.$store.dispatch('player/exit');
					self.$store.dispatch('game/exit');
					self.$router.push( '/instance/' +  input.data.url);

					self.$root.$emit('game-pre-reset');

				}, 1500);
			},
			onError: function( input ){
				let self = this;
				// TODO retry?
				// setTimeout( function(){
				// }, 2000);
			},


			// TODO this should be a external helper?
			time_start : function(){
				this.time_repeat();
			},
			time_repeat : function(){
				let self = this;
				timeObj = setTimeout( function(){
					self.time_tick();
				}, 1000);
			},			
			time_tick : function(){
				this.state.time -=1;
				if( this.state.time < 1){
					this.button_home();
				} else {
					this.time_repeat();
				}
			},
			time_off : function(){
				clearTimeout( timeObj );
			},


			window_game_show : function(){
				this.state.remove = false;
				this.state.display = true;

				this.$root.$on('player-message', this.message );
				this.$root.$on('player-hide', this.window_game_hide );

				this.time_start();
			},
			window_game_click : function(){
				if( this.state.lock ){
					return;
				}
				this.window_game_hide();
			},

			window_game_hide : function(){
				this.state.display = false;
				this.time_off();

				let self = this;
				setTimeout( function(){
					self.type_reset();
					self.state.remove = true;
					self.$root.$off('player-message', this.message );
					self.$root.$off('player-hide', this.window_game_hide );
				},1000);
			},

			exit : function(){
				this.$root.$off('game-won', this.game_won );
				this.$root.$off('game-lost', this.game_lost );
				this.$root.$off('game-kicked', this.game_kicked );
				this.time_off();
			},
		},
		mounted(){
			this.$root.$on('game-won', this.game_won );
			this.$root.$on('game-lost', this.game_lost );
			this.$root.$on('game-kicked', this.game_kicked );
		},		
		beforeDestroy(){
			this.exit();
		},		
		components: {
			'c-button' : Button,
			'c-popup' : PopUp,
			'c-message' : Message,
		},		
}
</script>

<style>
</style>
