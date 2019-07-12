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

			<div>

				<c-button-expand
					ref="btnJoin"
					v-bind:buttonShow=true
					v-bind:buttonClickClose=true
					v-bind:buttonClick=onJoin>

						Join

						<input 
							slot="content"
							class="text colour-fill-bg-inv text-input content-input" 
							type="string" 
							name="join"
							placeholder="eg 'bc8yh2'"
							v-model=join.link>

						<p class="label" slot="button">
							ok
						</p>
					
				</c-button-expand>

				<span class="text colour-fill-dark button-helper"> Join a friends game. </span>

			</div>

		</div>



		<div slot="footer" class="bottom-right">

			<div class="share colour-bg-dark border-round">

				<svg 
					class="home-icon colour-fill-pop" 
					height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" 
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
						<path d="M121.666,45.63c-0.969,-2.964 -1.492,-6.119 -1.492,-9.39c0,-17.242 14.524,-31.24 32.413,-31.24c17.889,0 32.413,13.998 32.413,31.24c0,17.242 -14.524,31.24 -32.413,31.24c-8.567,0 -16.363,-3.211 -22.161,-8.45l-52.092,31.58c0.969,2.964 1.492,6.119 1.492,9.39c0,3.271 -0.523,6.426 -1.492,9.39l52.092,31.58c5.798,-5.239 13.594,-8.45 22.161,-8.45c17.889,0 32.413,13.998 32.413,31.24c0,17.242 -14.524,31.24 -32.413,31.24c-17.889,0 -32.413,-13.998 -32.413,-31.24c0,-3.271 0.523,-6.426 1.492,-9.39l-52.092,-31.58c-5.798,5.239 -13.594,8.45 -22.161,8.45c-17.889,0 -32.413,-13.998 -32.413,-31.24c0,-17.242 14.524,-31.24 32.413,-31.24c8.567,0 16.363,3.211 22.161,8.45l52.092,-31.58Z"/>
				</svg>
						
			</div>			

		</div>




<!-- 
		<c-button-expand
			v-bind:buttonShow=true
			v-bind:buttonClickClose=true
			v-bind:buttonClick=onCopy>

			Share

			<input 
				slot="content"
				ref="shareLinkURL"
				class="text colour-fill-bg-inv text-input content-input" 
				type="string"
				name="share"
				v-bind:value=share.link>

			<p class="label" slot="button">
				copy
			</p>
			
		</c-button-expand> -->


		<!-- <c-message ref="messageBtn"></c-message> -->

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
			get_name : function(){
				return this.$store.getters['board/get_board'].data.name || 'Name';
			},
		},
		methods:{
			init : function(){
				this.board = this.$route.params.board;
				this.share.link = window.location.href;
				this.$root.$emit('page.title', 'BOARD');
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

	.bottom-right {
		position: relative;
		left: calc(100% - 2.33rem);
	}

	.share {
		width: 2.33rem;
		height: 2.33rem;
	}
	.share svg {
		margin: 10%;
		width: 80%;
		height: 80%;
	}



</style>

