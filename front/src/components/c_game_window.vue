<template>
	
	<c-popup
		v-if=!state.remove
		v-bind:onShow=state.display 
		v-bind:extraClass=attrs.extraClass
		v-bind:onClick=window_click>

			<div
				v-if=state.type.lost>
					<p> {{ state.message }} </p>

					<br>
					
					<c-button
						ref="btnRejoin"
						v-bind:onClick=button_rejoin>
							<p class="colour-fill-bg-inv">
								Rejoin
							</p>
					</c-button>

			</div>

			<div
				v-if=state.type.won>
					<p> {{ state.message }} </p>

					<br>

					<c-button
						ref="btnRejoin"
						v-bind:onClick=button_rejoin>
							<p class="colour-fill-bg-inv">
								Rejoin
							</p>
					</c-button>	
								
			</div>

			<div
				v-if=state.type.kicked>
					<p> {{ state.message }} </p>

				<br>

				<c-button
					ref="btnRejoin"
					v-bind:onClick=button_rejoin>
						<p class="colour-fill-bg-inv">
							Rejoin
						</p>
				</c-button>	


			</div>

			<c-message 
				ref="msgObj">
			</c-message>

	</c-popup>

</template>

<script>

	import Button from '../components/c_button.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';


	export default {
		name: 'cGameWindow',
		data(){
			return {
				attrs : {
					extraClass : 'bullshit-menu',
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
				},
			}
		},

		computed : {
			get_field_class : function(){
				return this.state.class;
			},
		},

		methods:{
			message : function( input ){
				this.$refs.msgObj.$emit('message' , input);
			},


			type_reset : function(){
				this.state.won = false;
				this.state.lost = false;
				this.state.kicked = false;
			},

			// instance_over : function(){
			// 	let self = this;
			// 	setTimeout( function(){
			// 		self.$router.push('/');
			// 	}, 2000);
			// },


			game_won : function(){
				this.type_reset();
				this.state.type.won = true;
				this.state.message = 'You are the Winner!';
				this.state.lock = true;
				this.window_show();
			},
			game_lost : function(){
				this.type_reset();
				this.state.type.lost = true;
				let winner = this.$store.getters['game/get_winner'];
				this.state.message = winner.data.name + ' is the Winner!';
				this.state.lock = true;
				this.window_show();
			},
			game_kicked : function(){
				this.type_reset();
				this.state.type.kicked = true;
				this.state.message = 'You have been removed!';
				this.state.lock = true;
				this.window_show();
			},


			button_rejoin : function(){
				this.$root.$emit('player.rejoin');
			},


			window_show : function( forced ){

				this.state.remove = false;
				this.state.display = true;

				this.$root.$on('player.message', this.message );
				this.$root.$on('player.hide', this.window_hide );
			},
			window_click : function(){
				if( this.state.lock ){
					return;
				}
				this.window_hide();
			},

			window_hide : function(){
				this.state.display = false;

				let self = this;
				setTimeout( function(){
					self.state.remove = true;
					self.$root.$off('player.message', this.message );
					self.$root.$off('player.hide', this.window_hide );
				},1000);
			},

			exit : function(){
				this.$root.$off('game.won', this.game_won );
				this.$root.$off('game.lost', this.game_lost );
				this.$root.$off('game.kicked', this.game_kicked );
			},
		},
		mounted(){
			this.$root.$on('game.won', this.game_won );
			this.$root.$on('game.lost', this.game_lost );
			this.$root.$on('game.kicked', this.game_kicked );
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

.bullshit-menu .panel{
	border-radius: 1rem;
	max-width: 25rem;
	background-color: var( --colour-inv );
}

.bullshit-menu .panel header{
	margin: 0;
}
.bullshit-menu .panel .header{
	margin: 0;
}
.bullshit-menu .panel p{
	margin: 0;
}


.bullshit-menu input, .bullshit-menu .input , .bullshit-menu textarea {
	background-color: hsla(1,1%,33%,.8);
}
.bullshit-menu input:focus, .bullshit-menu .input:focus , .bullshit-menu textarea:focus {
	background-color: var(--colour-bg-input-focus);
}


</style>
