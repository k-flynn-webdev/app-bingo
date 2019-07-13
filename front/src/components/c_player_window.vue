<template>
	
	<c-popup
		v-if=!state.remove
		v-bind:onShow=state.display 
		v-bind:extraClass=attrs.extraClass
		v-bind:onClick=window_click>

			<div slot="header">

				<p class="colour-fill-dark">
					{{ get_name }}
				</p>
				
			</div>

			<br>

			<div 
				ref="field_name"
				v-bind:class=get_field_class>

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

			<br>

			<!-- <div 
				class="game-info">

				<div>

					<p 
						class="text colour-fill-bg">
							Current Players ({{ get_players.length }}):
					</p>

					<div 
						v-if="get_players.length">

						<p 
							v-if="!get_joined"
							class="text colour-fill-bg"
							v-for="(player, index) in get_players"
							v-bind:key="player.url">
								{{ player.data.name }} : {{ player.data.score }}
						</p>

					</div>

				</div>

			</div>
 -->

			<div class="text-left buttons">

				<div>
					<c-button
						ref="btnBoard"
						v-bind:onClick=go_to_Board>
						Board
					</c-button>

					<span class="text colour-fill-dark button-helper"> View Board. </span>

				</div>

			</div>

			<br>
			<br>

			<c-button
				ref="btnOK"
				class="button-action"
				style="min-width: 100%;"
				v-bind:onClick=name_update>
					<p class="colour-fill-bg-inv label">
						{{ button.label }}
					</p>
			</c-button>

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
			get_name : function(){
				return this.$store.getters['board/get_board'].data.name || 'Name';
			},			
			get_field_class : function(){
				return this.state.class;
			},
			get_joined : function(){
				return this.$store.getters['game/get_game'].joined;
			},
			get_players : function(){
				return this.$store.getters['instance/get_players'];
			},		
		},

		methods:{
			go_to_Board : function(){
				// todo
			},

			reset_validate : function(){
				let base = 'field field-result ';
				this.state.class = base;
			},

			validate : function(){
				let model = this.form.name;
				let elementClass = this.$refs.field_name;

				let result = Validate.length( model, this.attrs.name.min, this.attrs.name.max );

				this.reset_validate();

				if( result === null ){
					return;
				}

				if( result ){
					this.state.class += ' pass';
				} else {
					this.state.class += ' fail';
				}

				return result;
			},

			name_update : function(){

				let result = this.validate();

				if( result === undefined ){
					this.reset_validate();
					this.state.class += ' fail';
				}

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

				this.$root.$on('player.message', this.message );
				this.$root.$on('player.hide', this.window_hide );
				
				let player = this.$store.getters['player/get_player'];
				this.form.name = player.data.name;

				let game = this.$store.getters['game/get_game'];

				this.reset_validate();

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
					this.$root.$emit('player.closed');
					let self = this;
					setTimeout( function(){
						self.state.remove = true;
						self.$root.$off('player.message', this.message );
						self.$root.$off('player.hide', this.window_hide );
						self.$root.$emit('page.title', '');
					},1000);
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

/*.bullshit-menu .panel{
	border-radius: .5rem;
	max-width: 25rem;
	background-color: var( --colour-inv );
}*/

/*.bullshit-menu .panel header, .bullshit-menu .panel .footer {
	padding-top: unset;
	margin: unset;
}
.bullshit-menu .panel main {
	min-height: unset;
}*/



/*.bullshit-menu .panel header{
	margin: 0;
}
.bullshit-menu .panel .header{
	margin: 0;
}
.bullshit-menu .panel p{
	margin: 0;
}*/


/*.bullshit-menu input, .bullshit-menu .input , .bullshit-menu textarea {
	background-color: hsla(1,1%,33%,.8);
}
.bullshit-menu input:focus, .bullshit-menu .input:focus , .bullshit-menu textarea:focus {
	background-color: var(--colour-bg-input-focus);
}
*/

</style>
