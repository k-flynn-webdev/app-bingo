<template>

	<c-panel>
		<div slot="header">
			Board Lobby
		</div>

		<div>
			<c-button
				ref="btnStart"
				v-bind:onClick=onStart>
				Start
			</c-button>
		</div>

		<div>
			<c-button
				ref="btnRandom"
				v-bind:onClick=onRandom>
				Random
			</c-button>
		</div>

		<c-button-expand
			ref="btnJoin"
			v-bind:buttonShow=true
			v-bind:buttonClickClose=true
			v-bind:buttonClick=onJoin>

				Join

				<input 
					slot="content"
					class="text colour-fill-bg-inv text-input" 
					type="string" 
					name="join"
					placeholder="eg 'bc8yh2'"
					v-model=join.link>

				<p class="label" slot="button">
					ok
				</p>
			
		</c-button-expand>

		<c-button-expand
			v-bind:buttonShow=true
			v-bind:buttonClickClose=true
			v-bind:buttonClick=onCopy>

			Share

			<input 
				slot="content"
				ref="shareLinkURL"
				class="text colour-fill-bg-inv text-input" 
				type="string"
				name="share"
				v-bind:value=share.link>

			<p class="label" slot="button">
				copy
			</p>
			
		</c-button-expand>


		<c-message ref="messageBtn"></c-message>

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import ButtonExpand from '../components/c_button_expand.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';
	import Tag from '../components/c_tag.vue';

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'BoardLobby',
		mixins: [ submit ],
		data(){
			return {
				board : '',
				instance : '',
				
				join : {
					link : ''
				},
				share : {
					link : '',
				},
			}
		},
		computed : {	
		},
		methods:{
			init : function(){
				this.board = this.$route.params.board;
				this.share.link = window.location.href;
			},			
			onSuccess : function( input ){
				let self = this;
				setTimeout( function(){
					self.$router.push( '/instance/' +  input.data.url);
				}, 2000);
			},
			onError: function( input ){
				let self = this;
				// TODO retry?
				// setTimeout( function(){
				// }, 2000);
			},

			onStart : function( event ){
				let object = {
					url : ('/api/instance/' + this.board + '/create'),
					method : 'GET',
					body : '' };
					
				let self = this;	
				let btn = self.$refs.btnStart;

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


			onJoin : function( event ){
				let self = this;
				self.$refs.btnJoin.$emit('state','waiting');
				setTimeout( function(){
					self.$router.push( '/instance/' +  self.join.link);
				},1000);
			},					


			onCopy : function(){
				let copyText = this.$refs.shareLinkURL.select();
				document.execCommand('copy');
			},
		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-button-expand' : ButtonExpand,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-tag' : Tag,
		},		
}
</script>

<style>





</style>

