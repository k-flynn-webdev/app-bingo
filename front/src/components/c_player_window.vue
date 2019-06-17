<template>
	
	<c-popup class="bullshit-menu"
		v-if=state.display 
		v-bind:onClick=window_hide>

		<div slot="header" 
			class="test">
				<p class="colour-fill-bg">
					Join Game	
				</p>
		</div>
			
		<div 
			ref="field_name"
			v-bind:class=state.class
			class="field field-result">

			<input 
				class="text colour-fill-bg-inv text-input"
				type="string"
				placeholder="Your name"
				value=form.name
				v-model=form.name
				v-on:change=validate
				required>

			<c-field-result>
			</c-field-result>

			<c-button
				ref="btnOK"
				v-bind:onClick=name_update>
					<p class="colour-fill-bg-inv">
						OK	
					</p>
			</c-button>	

		</div>

	</c-popup>

</template>

<script>

	import Button from '../components/c_button.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';

	import Validate from '../helpers/h_validate_input.js';
	import FieldResult from '../components/c_field_result.vue';


	export default {
		name: 'cPlayerWindow',
		data(){
			return {
				attrs : {			
					name : {
						min : 3,
						max : 33,
					},
					// player : Object,
				},
				state : {
					display : false,
					lock : false,
					class : '',
				},	
				form : {
					name : '',
				},
			}
		},

		computed : {
			get_field_class : function(){
				return this.state.class;
			},
		},

		methods:{
			// init : function(){

				// this.$root.$on('player_show', this.window_show );
				// this.$root.$on('state_reset', this.reset );

				// let player = this.$store.getters['game/get_player'];
				
				// player exists but not sent ..
				// if( this.validate(player.data.name) && !player.joined ){
					// this.$root.$emit('state_player_join');
				// }

				// if( !this.validate(player.data.name) ){
				// 	this.window_show_join()
				// }					

			// },

			validate : function(){
				// if( input === '' ){
				// 	return false;
				// }
				// if( input.length < this.attrs.name.min ){
				// 	return false;
				// }
				// if( input.length > this.attrs.name.max ){
				// 	return false;
				// }
				// return true;
				let model = this.form.name;
				let elementClass = this.$refs.field_name;

				let result = Validate.length( model, this.attrs.name.min, this.attrs.name.max );

				let base = 'field field-result ';
				if( result === null ){
					this.state.class = base;
				}

				if( result ){
					this.state.class = base + 'pass';
				} else {
					this.state.class = base + 'fail';
				}

				return result;
			},
			// form_same_store : function(){
			// 	if( this.form.name == this.attrs.player.data.name ){
			// 		return true;
			// 	} else {
			// 		return false;
			// 	}
			// },

			// send_form : function(){

			// 	if( !this.validate( this.form.name )){
			// 		return;
			// 	}

			// 	if( this.form_same_store() && this.validate( this.form.name )){
			// 		return this.window_hide();
			// 	}

			// 	if( !this.attrs.player.joined ){

			// 		this.attrs.player.data.name = this.form.name;
			// 		this.$store.dispatch('game/set_player', this.attrs.player);
			// 		this.$root.$emit('state_player_join');
			// 		this.state.lock = false;
			// 		this.window_hide();

			// 	} else {

			// 		let toSend = {
			// 			player : {
			// 				url : this.$store.getters['game/get_player'].url,
			// 				name : {
			// 					update : this.form.name,
			// 				},
			// 			},
			// 		};

			// 		this.$root.$emit('state_player_submit',
			// 			toSend, 
			// 			this.send_success, 
			// 			this.send_fail, 
			// 			this.$refs.btnOK );
			// 	}
			// },


			// send_success : function( input ){

			// 	let player = this.$store.getters['game/get_player'];
			// 	player.data.name = input.data.name.update;

			// 	this.$store.dispatch('game/set_player', player );

			// 	this.state.lock = false;
			// 	let self = this;

			// 	setTimeout(function(){
			// 		self.window_hide();
			// 	},300);
				
			// },
			// send_fail : function( input ){
			// 	console.log('name change fail');
			// 	console.log( input );
			// },		

			window : function(){
				// this.state.lock = true;
				this.window_show();
			},


			name_update : function(){
				let result = this.validate();
				if( result ){
					let player = this.$store.getters['player/get_player'];
					player.data.name = this.form.name;
					this.$store.dispatch('player/set_player', player );
					this.$root.$emit('player.check');
				}
			},

			window_show : function(){
				let player = this.$store.getters['player/get_player'];
				this.form.name = player.data.name;

				let game = this.$store.getters['game/get_game'];

				if( !game.joined ){
					this.state.lock = true;	
				} else {
					this.state.lock = false;
				}

				this.state.display = true;
			},
			window_hide : function(){
				if( this.state.lock ){
					let result = this.validate();
					if( result ){
						this.state.lock = false;
					}
					// not allowed to exit unless submitting ..
				}
				this.state.display = false;
			},
			// reset : function(){
			// 	console.log('game player: resetting.');
			// 	this.$store.dispatch('game/reset_player');
			// },		

			exit : function(){
				// this.$root.$off('init_player');
				// this.$root.$off('player_show');
				// this.$root.$off('state_reset');
			},				
		},
		mounted(){
			this.$root.$on('player.show', this.window );
			this.$root.$on('player.hide', this.window_hide );
		},		
		beforeDestroy(){
		},		
		components: {
			'c-button' : Button,
			'c-popup' : PopUp,			
			'c-message' : Message,
			'c-field-result' : FieldResult,
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

/*input ,textarea, .input{
	background-color: var(--colour-bg-input);
}*/
.bullshit-menu input, .bullshit-menu .input , .bullshit-menu textarea {
	background-color: hsla(1,1%,33%,.8);
}
.bullshit-menu input:focus, .bullshit-menu .input:focus , .bullshit-menu textarea:focus {
	background-color: var(--colour-bg-input-focus);
}


</style>
