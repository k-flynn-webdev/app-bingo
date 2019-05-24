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

<!-- 		<div>
			<c-button
				ref="btnJoin"
				v-bind:onClick=onJoin>
				Join ID
			</c-button>	

			<input 
				class="" 
				type="string" 
				v-model=instance>
		</div> -->


		<c-button-expand
			v-bind:buttonShow=true
			v-bind:buttonClickClose=true
			v-bind:buttonClick=onJoin>

			<p class="label" slot="label">
				Join
			</p>

			<div slot="content">
				<input 
					class="input text" 
					type="string" 
					name="join"
					v-model=join.link>
			</div>

			<p class="text text-bold" slot="button">
				ok
			</p>
			
		</c-button-expand>

		<c-button-expand
			v-bind:buttonShow=true
			v-bind:buttonClickClose=true
			v-bind:buttonClick=onCopy>

			<p class="label" slot="label">
				Share
			</p>

			<div slot="content">
				<input 
					ref="shareLinkURL"
					class="input text" 
					type="string" 
					name="share"
					v-bind:value=share.link>
			</div>

			<p class="text text-bold" slot="button">
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
					link : 'test'
				},
				share : {
					link : 'this is a link',
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

			// 	this.joinLink.show = !this.joinLink.show;

			// 	let btnPos = this.get_screen_pos(this.$refs.btnJoin.$el);
			// 	let btnHolder = this.get_screen_pos(this.$refs.btnJoinHolder);

			// 	this.joinLink.styles.left = (btnPos.left - btnHolder.left + (0.5 * btnPos.width)) + 'px';

			// 	this.joinLink.styles.top = (btnPos.height + 10) + 'px';
			// },
			// onJoinSubmit : function( event ){
				// let object = {
				// 	url : ('/api/instance/' + this.board + '/' + this.instance),
				// 	method : 'GET',
				// 	body : '' };
				
				// if( this.instance.length > 0){
				// 	let self = this;	
				// 	let btn = self.$refs.btnJoin;

				// 	this.onSubmit( object, self, btn, null, self.onSuccess, self.onError);				
				// }	

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

