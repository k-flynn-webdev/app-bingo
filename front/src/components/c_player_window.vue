<template>
	
	<c-popup
		v-if=!state.remove
		v-bind:onShow=state.display 
		v-bind:extraClass=attrs.extraClass
		v-bind:onClick=window_hide>
			
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
						{{ button.label }}
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
					extraClass : 'bullshit-menu',
				},
				state : {
					remove : false,
					display : false,
					lock : false,
					class : '',
				},	
				button : {
					label : '',
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

			validate : function(){
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

			name_update : function(){

				let result = this.validate();
				if( result ){

					let player = this.$store.getters['player/get_player'];
					let game = this.$store.getters['game/get_game'];

					let hasChanged = player.data.name !== this.form.name;

					if( !hasChanged && game.joined ){
						this.window_hide();
						return;
					}

					// updating 
					if( hasChanged && game.joined ){
						this.$root.$emit('player.update', this.form.name );
						this.$refs.btnOK.$emit('state', 'waiting');
						return;
					}

					// clean join ..
					player.data.name = this.form.name;
					this.$store.dispatch('player/set_player', player );
					this.$refs.btnOK.$emit('state', 'waiting');
					this.$root.$emit('player.check');
				}
			},
			message : function( input ){
				this.$refs.msgObj.$emit('message' , input);
			},

			window_show : function(){

				let player = this.$store.getters['player/get_player'];
				this.form.name = player.data.name;

				let game = this.$store.getters['game/get_game'];

				if( !game.joined ){
					this.button.label = 'Join';
					this.state.lock = true;	
				} else {
					this.button.label = 'Update';
					this.state.lock = false;
				}

				this.state.remove = false;
				this.state.display = true;
				this.$root.$on('player.message', this.message );
			},
			window_hide : function(){
				let player = this.$store.getters['game/get_game'];
				if( player.joined ){
					this.state.lock = false;
				}

				if( this.state.lock ){
					let result = this.validate();

					if( result === null || !result ){
						return
					}
				} else {
					this.state.display = false;
					this.$root.$emit('player.closed');
					let self = this;
					setTimeout( function(){
						self.state.remove = true;
						self.$root.$off('player.message', this.message );
					},1000);
				}
			},

			exit : function(){
				this.$root.$off('player.show', this.window_show );
				this.$root.$off('player.hide', this.window_hide );
			},
		},
		mounted(){
			this.$root.$on('player.show', this.window_show );
			this.$root.$on('player.hide', this.window_hide );
		},		
		beforeDestroy(){
			this.exit();
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


.bullshit-menu input, .bullshit-menu .input , .bullshit-menu textarea {
	background-color: hsla(1,1%,33%,.8);
}
.bullshit-menu input:focus, .bullshit-menu .input:focus , .bullshit-menu textarea:focus {
	background-color: var(--colour-bg-input-focus);
}


</style>
