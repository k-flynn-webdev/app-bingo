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

		<div>	
			<c-button
				ref="btnJoin"
				v-bind:onClick=onJoin>
				Join ID
			</c-button>	

			<input 
				class="" 
				type="string" 
				v-model=instance>
		</div>

		<div 
			style="position:relative;"
			ref="btnShareHolder">

			<c-button
				ref="btnShare"
				v-bind:onClick=onShare>
				Share Board
			</c-button>

			<br v-if=shareLink.show>
			<br v-if=shareLink.show>
			<br v-if=shareLink.show>

			<transition 
				name="fade">

				<div 
					ref="btnLink"
					v-if=shareLink.show
					v-bind:style="shareLink.styles"
					class="share-link-window">

						<input 
							ref="shareLinkURL"
							class="share-link-input text input"
							type="string" 
							v-model=shareLink.link>	
						
						<transition 
							name="fade">	

							<button 
								v-if=!shareLink.copied
								v-on:click=onCopy
								class="share-link-copy button no-hover">

									<p class="text text-light">Copy</p>

							</button>

						</transition>	

				</div>	

			</transition>

			<!-- TODO: on clicking pops up a box with url and copy button -->
		</div>
		<c-message ref="messageBtn"></c-message>

		


		

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';
	import Tag from '../components/c_tag.vue';

	import { submit } from '../mixins/h_submit.js';
	import { screenPos } from '../mixins/h_screen_pos.js';	

	export default {
		name: 'BoardLobby',
		mixins: [ submit, screenPos ],
		data(){
			return {
				board : '',
				instance : '',
				shareLink : {
					show : false,
					copied : false,
					link : 'this is a link',
					styles : {
						top : 0,
						left : 0,
					}
				},
			}
		},
		computed : {	
		},
		methods:{
			init : function(){
				this.board = this.$route.params.board;
				this.shareLink.link = window.location.href;
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
				let object = {
					url : ('/api/instance/' + this.board + '/' + this.instance),
					method : 'GET',
					body : '' };
				
				if( this.instance.length > 0){
					let self = this;	
					let btn = self.$refs.btnJoin;

					this.onSubmit( object, self, btn, null, self.onSuccess, self.onError);				
				}	

			},					
	

			onCopy : function(){
				let copyText = this.$refs.shareLinkURL.select();
				document.execCommand('copy');
				this.shareLink.copied = true;
			},
			onShare : function( event ){
				this.shareLink.copied = true;

				let self = this;
				setTimeout( function(){
					self.shareLink.copied = false;
				}, 100);

				this.shareLink.show = !this.shareLink.show;

				let btnPos = this.get_screen_pos(this.$refs.btnShare.$el);
				let btnHolder = this.get_screen_pos(this.$refs.btnShareHolder);

				this.shareLink.styles.left = (btnPos.left - btnHolder.left + (0.5 * btnPos.width)) + 'px';

				this.shareLink.styles.top = (btnPos.height + 5) + 'px';

			},	
		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-tag' : Tag,
		},		
}
</script>

<style>

	.share-link-window {
		border-radius: 0.25rem;
		position: absolute;
		z-index: 1;
		top : 0;
		left : 0;
		width: 90%;
		transform: translateX(-50%);
		background-color: grey;
		padding: .2rem;
		text-align: left;
	}
	.share-link-input {
		display: inline;
		/*padding-right: 5rem !important;*/
	}
	.share-link-copy {
		position: absolute;
		right: 0.4rem;
		top: 5px;
		/*top: 50%;*/
		/*transform: translateY(-50%);*/
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .33s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}



</style>

