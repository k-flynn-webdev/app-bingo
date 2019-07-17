<template>
	
	<c-popup
		v-if=!state.remove
		v-bind:onShow=state.display 
		v-bind:extraClass=attrs.extraClass
		v-bind:onClick=window_click>

			<div slot="header">

				<p class=" text-bold colour-fill-dark">
					{{ get_name }}
				</p>
				
			</div>

			<div ref="field_name" class="field-result">

				<div 
					class="field">

					<p class="label colour-fill-dark">
						Name
					</p>

					<input
						class="input text colour-fill-dark"
						type="string"
						placeholder="Your name"
						value=form.name
						v-model=form.name
						v-on:change=validate
						required>

					<c-field-result>
					</c-field-result>

				</div>

			</div>

			<div 
				class="button-row" 
				v-bind:data-info=state.info
				v-on:click=button_info>

					<span class="label colour-fill-dark"> Info </span>
					<div class="button-row-icon anim-3"></div>	

					<div class="row-content anim-3">

						<p class="text text-center colour-fill-bg">
								Players ({{ get_players.length }}):
						</p>

						<div v-if="get_players.length">

							<span
								class="text colour-fill-bg"
								v-for="(player, index) in get_players"
								v-bind:key="player.url">
									{{ player.data.name }}, 
							</span>

						</div>

						<div class="br-split"></div>

						<div>
							<c-button
								style="margin-left:0;"
								ref="btnBoard"
								v-bind:onClick=go_to_Board>
								Board
							</c-button>

							<span class="text colour-fill-dark button-helper"> View Board. </span>

						</div>


					</div>

			</div>


			<c-button
				ref="btnOK"
				class="button-action"
				v-bind:onClick=name_updated>
					<p class="colour-fill-bg-inv label">
						{{ button.label }}
					</p>
			</c-button>

		<c-message slot="footer"
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
				},
				state : {
					remove : false,
					display : false,
					info : false,
					lock : false,
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
			get_name : function(){
				return this.$store.getters['board/get_board'].data.name || 'Name';
			},
			get_players : function(){
				return this.$store.getters['instance/get_players'];
			},
		},

		methods:{

			button_info : function(){
				this.state.info = !this.state.info;
			},


			go_to_Board : function(){
				let board = this.$store.getters['board/get_board'].url;
				this.$router.push('/' + 'board/' + board );
			},



			validate : function(){
				let result = Validate.length( this.$refs.field_name, this.form.name, this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );

				return result;
			},

			name_updated : function(){

				let result = this.validate();

				// force a feedback	
				if( result === null ){
					Validate.length( this.$refs.field_name, 'x', this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );
					return;
				}

				if( !result ){
					return;
				}

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

			},

			button_success : function(){
				this.$refs.btnOK.$emit('state', 'success');
			},

			message : function( input ){
				this.$refs.msgObj.$emit('message' , input);
			},

			window_show : function(){

				this.$root.$on('player.message', this.message );
				this.$root.$on('player.success', this.button_success );
				this.$root.$on('player.hide', this.window_hide );
				
				let player = this.$store.getters['player/get_player'];
				this.form.name = player.data.name;

				let game = this.$store.getters['game/get_game'];

				Validate.reset( this.$refs.field_name );
				
				this.state.info = false;

				if( !game.joined ){
					this.button.label = 'Join';
					this.state.lock = true;
					this.$root.$emit('page.title', 'JOIN');
				} else {
					this.button.label = 'Update';
					this.$root.$emit('page.title', 'UPDATE');
					this.state.lock = false;
					
				}

				this.state.remove = false;
				this.state.display = true;		
			},

			window_click : function(){
				if( this.state.lock ){
					return;
				}
				this.window_hide();
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
					
					this.$root.$off('player.success', this.button_success );
					this.$root.$off('player.message', this.message );
					this.$root.$off('player.hide', this.window_hide );

					let self = this;
					setTimeout( function(){
						self.state.remove = true;	
						self.$root.$emit('player.closed');		
						self.$root.$emit('page.title', '');
					}, 1*1000);
				}
			},

			exit : function(){
				this.$root.$off('player.show', this.window_show );	
			},
		},
		mounted(){
			this.$root.$on('player.show', this.window_show );
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
</style>
