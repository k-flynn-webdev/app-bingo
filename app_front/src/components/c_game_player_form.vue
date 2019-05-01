<template>
	
	<c-popup class="player"
		v-if=state.display 
		v-bind:onClick=window_hide>

		<div slot="header">
			Join Game
		</div>
			
		<div>

			<input 
				class="" 
				type="string"
				placeholder="Your name"
				value=form.name 
				v-model=form.name
				required>

			<c-button
				ref="btnOK"
				v-bind:onClick=send_form>
				OK
			</c-button>	

		</div>


		<div slot="footer">
		</div>

	</c-popup>

</template>

<script>

	import Button from '../components/c_buttonNew.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';

	export default {
		name: 'cPlayerForm',
		data(){
			return {
				attrs : {			
					name : {
						min : 3,
						max : 33,
					},
					player : Object,
				},
				state : {
					display : false,
					lock : false,
				},	
				form : {
					name : '',
				},
			}
		},


		methods:{
			init : function(){

				this.$root.$on('player_show', this.window_show );
				// this.$root.$on('state_reset', this.reset );

				let player = this.$store.getters['game/get_player'];
				
				// player exists but not sent ..
				if( this.validate(player.data.name) && !player.joined ){
					this.$root.$emit('state_player_join');
				}

				if( !this.validate(player.data.name) ){
					this.window_show_join()
				}					

			},

			validate : function( input ){
				if( input === '' ){
					return false;
				}
				if( input.length < this.attrs.name.min ){
					return false;
				}
				if( input.length > this.attrs.name.max ){
					return false;
				}
				return true;
			},
			form_same_store : function(){
				if( this.form.name == this.attrs.player.data.name ){
					return true;
				} else {
					return false;
				}
			},

			send_form : function(){

				if( !this.validate( this.form.name )){
					return;
				}

				if( this.form_same_store() && this.validate( this.form.name )){
					return this.window_hide();
				}

				if( !this.attrs.player.joined ){

					this.attrs.player.data.name = this.form.name;
					this.$store.dispatch('game/set_player', this.attrs.player);
					this.$root.$emit('state_player_join');
					this.state.lock = false;
					this.window_hide();

				} else {

					let toSend = {
						player : {
							url : this.$store.getters['game/get_player'].url,
							name : {
								update : this.form.name,
							},
						},
					};

					this.$root.$emit('state_player_submit',
						toSend, 
						this.send_success, 
						this.send_fail, 
						this.$refs.btnOK );
				}
			},


			send_success : function( input ){

				let player = this.$store.getters['game/get_player'];
				player.data.name = input.data.name.update;

				this.$store.dispatch('game/set_player', player );

				this.state.lock = false;
				let self = this;

				setTimeout(function(){
					self.window_hide();
				},300);
				
			},
			send_fail : function( input ){
				console.log('name change fail');
				console.log( input );
			},		

			window_show_join : function(){
				this.state.lock = true;
				this.window_show();
			},


			window_show : function(){
				this.attrs.player = this.$store.getters['game/get_player'];

				this.form.name = this.attrs.player.data.name;
				this.state.display = true;

				if( this.attrs.player.joined ){
					this.$root.$emit('state_player', false);
				}

			},
			window_hide : function(){
				if( this.state.lock ){
					// not allowed to exit unless submitting ..
					return;
				}

				this.state.display = false;

				if( this.attrs.player.joined ){
					this.$root.$emit('state_player', true);
				}

			},
			// reset : function(){
			// 	console.log('game player: resetting.');
			// 	this.$store.dispatch('game/reset_player');
			// },		

			exit : function(){
				this.$root.$off('init_player');
				this.$root.$off('player_show');
				// this.$root.$off('state_reset');
			},				
		},
		mounted(){
			this.$root.$on('init_player', this.init );
		},		
		beforeDestroy(){
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
