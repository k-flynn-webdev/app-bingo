<template>

	<c-panel>

		<div slot="header">
			{{ get_name }}
		</div>

		<div class="text-left buttons">
			
			<div>
				<c-button
					ref="btnPlay"
					v-bind:onClick=onPlay>
					Play
				</c-button>
				
				<span class="text colour-fill-dark button-helper"> Start a game. </span>

			</div>


			<div>
				<c-button
					ref="btnRandom"
					v-bind:onClick=onRandom>
					Random
				</c-button>

				<span class="text colour-fill-dark button-helper"> Join a random game. </span>

			</div>


<!-- 			<div ref="field_join" class=field-result>

				<c-button-expand	
					ref="btnJoin"
					v-bind:buttonShow=true
					v-bind:buttonClickClose=false
					v-bind:buttonClick=onJoin>

						Join

						<input 
							slot="content"	
							class="input text colour-fill-dark"
							type="string" 
							name="join"
							placeholder="eg 'bc8yh2'"
							v-model=join.link
							v-on:change=validate>

						<template slot="button">
							ok
						</template>

				</c-button-expand>

				<span class="text colour-fill-dark button-helper">
					Join a friends game. 
				</span>

				<c-field-result>
				</c-field-result>

			</div> -->

			<c-message ref="msgObj">
			</c-message>

		</div>

		<c-button-row>

			<template slot="label"> Info </template>

			<p class="text text-bold text-center">
				Words or Phrases:
			</p>

			<div class="br-small"></div>

			<ul>
				<li class="text text-center colour-fill-bg"
					v-for="(word, index) in get_words" 
					v-bind:key="index">

						{{ word }}.
				</li>
			</ul>

		</c-button-row>


		<div slot="footer">

			<c-button-share 
				class="text-right" 
				style="position:absolute;right:0;"
				v-bind:content=share.link>
			</c-button-share>

			<br>
			<br>

		</div>

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import ButtonShare from '../components/c_button_share.vue';
	import ButtonExpand from '../components/c_button_expand.vue';
	import ButtonRow from '../components/c_button_row.vue';
	import Panel from '../components/c_panel.vue';
	
	// import Tag from '../components/c_tag.vue';

	import Validate from '../helpers/h_validate_input.js';
	import Message from '../components/c_message.vue';
	import FieldResult from '../components/c_field_result.vue';

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'BoardLobby',
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
				},
				
				join : {
					link : ''
				},
				share : {
					link : '',
				},

			}
		},
		computed : {
			get_name : function(){
				return this.$store.getters['board/get_board'].data.name || 'Name';
			},
			get_words : function(){
				return this.$store.getters['board/get_board'].data.words || 'Words';
			},			
		},
		methods:{

			init : function(){
				this.board = this.$route.params.board;
				this.share.link = window.location.href;
				this.$root.$emit('page.title', 'BOARD');

				let tempURL = '/api/board/' + this.board;

				let action = {
					url : tempURL,
					method : 'GET',
					JSON : false };

				this.attrs.action = action;

				let self = this;
				self.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);
			},

			board_success : function( input ){
				this.$store.dispatch('board/set_board', input.data );
			},
			board_error : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);
					}, self.attrs.server.timing );
				}
			},

			onSuccess : function( input ){
				let self = this;
				setTimeout( function(){
					self.$router.push( '/instance/' +  input.data.url);
				}, 2000);
			},
			onError: function( input ){
				let self = this;
				this.$refs.msgObj.$emit( input.message );
				// TODO retry?
				// setTimeout( function(){
				// }, 2000);
			},

			onPlay : function( event ){
				let object = {
					url : ('/api/instance/' + this.board + '/create'),
					method : 'GET',
					body : '' };
					
				let self = this;	
				let btn = self.$refs.btnPlay;

				this.onSubmit( object, self, btn, null, self.onSuccess, self.onError);
			},
			onRandom : function( event ){
				let object = {
					url : ('/api/instance/' + this.board + '/random'),
					method : 'GET',
					body : '' };

				let self = this;	
				let btn = self.$refs.btnRandom;

				this.onSubmit( object, self, btn, null, self.onSuccess, self.onError);
			},	


			validate : function(){
				let result = Validate.length( this.$refs.field_join, this.join.link, this.$refs.msgObj, 6, 6 );
				return result;
			},

			onJoin : function( event ){

				let result = this.validate();

				// force a feedback	
				if( result === null ){
					Validate.length( this.$refs.field_join, 'x', this.$refs.msgObj, 6, 6 );
					return;
				}

				if( !result ){
					return;
				}

				// possibly valid?
				let self = this;
				self.$refs.btnJoin.$emit('state','waiting');
				setTimeout( function(){
					self.$router.push( '/instance/' +  self.join.link);
				}, 1*1000);
			},					



		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-button-share' : ButtonShare,
			'c-button-expand' : ButtonExpand,
			'c-button-row' : ButtonRow,
			'c-panel' : Panel,
			'c-field-result' : FieldResult,
			'c-message' : Message,
		},		
}
</script>

<style>



</style>

